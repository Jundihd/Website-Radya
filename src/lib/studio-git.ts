import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export interface GitOperationResult {
  success: boolean;
  method: 'local_git' | 'github_api' | 'local_only' | 'failed';
  message: string;
  commitSha?: string;
  error?: string;
  /** Tahap yang gagal: 'write' | 'add' | 'commit' | 'push' | 'api' — untuk diagnosis di UI. */
  step?: string;
  /** Potongan log tahap yang gagal (stderr, sudah dibersihkan dari kredensial). */
  detail?: string;
}

/** Ambil ekor error exec (stderr > message), buang baris ber-URL kredensial. */
function errTail(err: any, max = 300): string {
  const raw = String(err?.stderr || err?.message || err || '');
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/https?:\/\/[^@\s]*@/i.test(l));
  return lines.join(' | ').trim().slice(-max) || 'penyebab tidak diketahui';
}

/** Bungkus exec agar tahap yang gagal terlacak (add/commit/push). */
async function gitStep(step: string, cmd: string, timeoutMs: number): Promise<void> {
  try {
    await execPromise(cmd, { timeout: timeoutMs });
  } catch (e: any) {
    throw { step, err: e };
  }
}

/** Quote sederhana untuk argumen shell (cegah injeksi via slug/pesan). */
function q(s: string): string {
  return `"${String(s).replace(/["$`\\]/g, '')}"`;
}

/** Cek apakah mesin punya git identity; kalau tidak, commit memakai identitas fallback. */
async function hasGitIdentity(): Promise<boolean> {
  try {
    const { stdout } = await execPromise('git config user.name && git config user.email', {
      timeout: 15000,
    });
    return Boolean(stdout && stdout.trim());
  } catch {
    return false;
  }
}

/** Commit dengan identitas mesin bila ada, fallback ke identitas Studio. */
async function gitCommitStep(commitMsg: string): Promise<void> {
  const identity = (await hasGitIdentity())
    ? ''
    : '-c user.name="Radya Labs Studio" -c user.email="studio@radya-labs.local" ';
  await gitStep('commit', `git ${identity}commit -m ${q(commitMsg)}`, 60000);
}

const GITHUB_REPO = process.env.GITHUB_REPO || 'Jundihd/Website-Radya';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

function getGitHubToken(): string | null {
  return (
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_PAT ||
    process.env.GH_TOKEN ||
    null
  );
}

/**
 * Operasi commit & push langsung ke GitHub via REST API
 * (Berjalan di cloud seperti Vercel serverless tanpa butuh filesystem writable).
 */
async function pushViaGitHubApi(
  relFilePath: string,
  contentString: string,
  commitMessage: string,
): Promise<GitOperationResult> {
  const token = getGitHubToken();
  if (!token) {
    return {
      success: false,
      method: 'failed',
      message: 'GITHUB_TOKEN belum diset di Environment Variables.',
    };
  }

  const normalizedPath = relFilePath.replace(/\\/g, '/');
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${normalizedPath}`;

  try {
    // 1. Cek apakah file sudah ada di GitHub untuk mendapatkan SHA-nya
    let existingSha: string | undefined;
    const checkRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Radya-Labs-Studio-CMS',
      },
      cache: 'no-store',
    });

    if (checkRes.ok) {
      const checkData = await checkRes.json();
      existingSha = checkData.sha;
    }

    // 2. Buat atau update file di GitHub
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Radya-Labs-Studio-CMS',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(contentString, 'utf8').toString('base64'),
        branch: GITHUB_BRANCH,
        sha: existingSha,
      }),
    });

    const putData = await putRes.json();
    if (!putRes.ok) {
      throw new Error(putData.message || `HTTP ${putRes.status}`);
    }

    return {
      success: true,
      method: 'github_api',
      message: 'Berhasil di-push langsung ke GitHub via GitHub API.',
      commitSha: putData.commit?.sha,
    };
  } catch (err: any) {
    console.error('[studio-git] GitHub API push error:', err);
    return {
      success: false,
      method: 'failed',
      message: `Gagal push ke GitHub API: ${err.message}`,
      error: err.message,
    };
  }
}

/**
 * Operasi delete file langsung ke GitHub via REST API
 */
async function deleteViaGitHubApi(
  relFilePath: string,
  commitMessage: string,
): Promise<GitOperationResult> {
  const token = getGitHubToken();
  if (!token) {
    return {
      success: false,
      method: 'failed',
      message: 'GITHUB_TOKEN belum diset di Environment Variables.',
    };
  }

  const normalizedPath = relFilePath.replace(/\\/g, '/');
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${normalizedPath}`;

  try {
    const checkRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Radya-Labs-Studio-CMS',
      },
      cache: 'no-store',
    });

    if (!checkRes.ok) {
      return {
        success: true,
        method: 'github_api',
        message: 'File sudah tidak ada di GitHub.',
      };
    }

    const checkData = await checkRes.json();
    const sha = checkData.sha;

    const delRes = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Radya-Labs-Studio-CMS',
      },
      body: JSON.stringify({
        message: commitMessage,
        sha,
        branch: GITHUB_BRANCH,
      }),
    });

    if (!delRes.ok) {
      const errData = await delRes.json();
      throw new Error(errData.message || `HTTP ${delRes.status}`);
    }

    return {
      success: true,
      method: 'github_api',
      message: 'File berhasil dihapus dari GitHub repository.',
    };
  } catch (err: any) {
    console.error('[studio-git] GitHub API delete error:', err);
    return {
      success: false,
      method: 'failed',
      message: `Gagal delete di GitHub API: ${err.message}`,
      error: err.message,
    };
  }
}

/**
 * Simpan dan auto-push file ke Git:
 * 1. Simpan ke disk lokal jika filesystem writable.
 * 2. Lakukan `git add`, `git commit`, dan `git push origin main`.
 * 3. Jika filesystem read-only (Vercel) atau git lokal gagal, fallback ke GitHub REST API.
 */
export async function saveAndPushPostToGit(
  slug: string,
  markdownContent: string,
  action: 'create' | 'update' | 'status_change',
): Promise<GitOperationResult> {
  const relPath = `content/posts/${slug}.md`;
  const fullPath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  const commitMsg =
    action === 'create'
      ? `feat(blog): tambah artikel baru ${slug}`
      : action === 'status_change'
      ? `chore(blog): perbarui status artikel ${slug}`
      : `feat(blog): perbarui artikel ${slug}`;

  let localSaved = false;
  let isReadOnly = false;

  // Coba tulis ke disk lokal
  try {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, markdownContent, 'utf8');
    localSaved = true;
  } catch (err: any) {
    if (err.code === 'EROFS' || err.message?.includes('read-only')) {
      isReadOnly = true;
    } else {
      throw err;
    }
  }

  // Jika di Vercel / read-only filesystem, langsung gunakan GitHub API
  if (isReadOnly) {
    const ghRes = await pushViaGitHubApi(relPath, markdownContent, commitMsg);
    if (ghRes.success) return ghRes;
    return {
      success: false,
      method: 'failed',
      step: 'api',
      message:
        'File TIDAK tersimpan di mana pun: server Vercel read-only dan GITHUB_TOKEN belum diset. Perbaikan: Vercel Dashboard → Project → Settings → Environment Variables → tambah GITHUB_TOKEN (token dengan akses Contents baca-tulis ke repo Jundihd/Website-Radya) → Redeploy. Atau simpan ulang dari Studio yang berjalan lokal (npm run dev).',
      error: ghRes.error,
    };
  }

  // Jika di environment lokal dengan git CLI
  if (localSaved) {
    const gitDir = path.join(process.cwd(), '.git');
    if (fs.existsSync(gitDir)) {
      try {
        await gitStep('add', `git add ${q(relPath)}`, 60000);
        try {
          // Identitas fallback agar commit tetap jalan di mesin tanpa git config.
          await gitStep(
            'commit',
            `git -c user.name="Radya Labs Studio" -c user.email="studio@radya-labs.local" commit -m ${q(commitMsg)}`,
            60000,
          );
        } catch (se: any) {
          const tail = errTail(se?.err || se);
          if (/nothing to commit|nothing added to commit|no changes added to commit/i.test(tail)) {
            // Isi identik dengan commit terakhir — tetap coba push
            // (barangkali ada commit lokal yang belum terkirim).
            try {
              await execPromise(`git push origin ${GITHUB_BRANCH}`, { timeout: 90000 });
            } catch {
              // abaikan, bukan fatal
            }
            return {
              success: true,
              method: 'local_git',
              message: 'Tidak ada perubahan isi baru; file sudah tersimpan & sinkron dengan Git.',
            };
          }
          throw se;
        }
        await gitStep('push', `git push origin ${GITHUB_BRANCH}`, 90000);
        return {
          success: true,
          method: 'local_git',
          message: 'Tersimpan & auto-push ke GitHub main berhasil!',
        };
      } catch (se: any) {
        const step = se?.step || 'git';
        const detail = errTail(se?.err || se);
        console.warn(`[studio-git] Local git ${step} gagal:`, detail);
        // Jika git CLI gagal (misal tidak ada remote creds), coba GitHub API jika ada token
        if (getGitHubToken()) {
          const ghRes = await pushViaGitHubApi(relPath, markdownContent, commitMsg);
          if (ghRes.success) return ghRes;
        }
        // Gagal push = LOUD (success:false) agar UI tidak menampilkan "sukses" palsu.
        // File tetap tersimpan lokal — pesan menjelaskannya.
        return {
          success: false,
          method: 'failed',
          step,
          detail,
          message: `File tersimpan lokal, tetapi AUTO-PUSH GAGAL di tahap "${step}". Penyebab: ${detail}`,
          error: detail,
        };
      }
    }
  }

  return {
    success: true,
    method: 'local_only',
    message: 'Tersimpan di server lokal (folder ini bukan repo git, jadi tidak ada yang di-push).',
  };
}

/**
 * Hapus file dan auto-push penghapusan ke Git
 */
export async function deleteAndPushPostFromGit(
  slug: string,
): Promise<GitOperationResult> {
  const relPath = `content/posts/${slug}.md`;
  const fullPath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  const commitMsg = `chore(blog): hapus artikel ${slug}`;

  let localDeleted = false;
  let isReadOnly = false;

  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      localDeleted = true;
    }
  } catch (err: any) {
    if (err.code === 'EROFS' || err.message?.includes('read-only')) {
      isReadOnly = true;
    } else {
      throw err;
    }
  }

  if (isReadOnly) {
    return await deleteViaGitHubApi(relPath, commitMsg);
  }

  if (localDeleted) {
    const gitDir = path.join(process.cwd(), '.git');
    if (fs.existsSync(gitDir)) {
      try {
        try {
          await execPromise(`git rm -f ${q(relPath)}`, { timeout: 60000 });
        } catch {
          await gitStep('add', `git add -A ${q(relPath)}`, 60000);
        }
        try {
          await gitStep(
            'commit',
            `git -c user.name="Radya Labs Studio" -c user.email="studio@radya-labs.local" commit -m ${q(commitMsg)}`,
            60000,
          );
        } catch (se: any) {
          const tail = errTail(se?.err || se);
          if (/nothing to commit|nothing added to commit|no changes added to commit/i.test(tail)) {
            return {
              success: true,
              method: 'local_git',
              message: 'Artikel sudah terhapus & sinkron dengan Git.',
            };
          }
          throw se;
        }
        await gitStep('push', `git push origin ${GITHUB_BRANCH}`, 90000);
        return {
          success: true,
          method: 'local_git',
          message: 'Artikel berhasil dihapus & perubahan di-push ke GitHub.',
        };
      } catch (se: any) {
        const step = se?.step || 'git';
        const detail = errTail(se?.err || se);
        console.warn(`[studio-git] Local git delete ${step} gagal:`, detail);
        if (getGitHubToken()) {
          const ghRes = await deleteViaGitHubApi(relPath, commitMsg);
          if (ghRes.success) return ghRes;
        }
        return {
          success: false,
          method: 'failed',
          step,
          detail,
          message: `File terhapus lokal, tetapi AUTO-PUSH GAGAL di tahap "${step}". Penyebab: ${detail}`,
          error: detail,
        };
      }
    }
  }

  return {
    success: true,
    method: 'local_only',
    message: 'Artikel berhasil dihapus dari server.',
  };
}
