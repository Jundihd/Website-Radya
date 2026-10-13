$ErrorActionPreference = "Stop"
$destZip = "radya-labs-handover.zip"

if (Test-Path $destZip) {
    Remove-Item $destZip -Force
}

$itemsToZip = Get-ChildItem -Path . -Force | Where-Object {
    $_.Name -ne "node_modules" -and
    $_.Name -ne ".next" -and
    $_.Name -ne ".git" -and
    $_.Name -ne "radya-labs-handover.zip" -and
    $_.Name -ne "tsconfig.tsbuildinfo"
}

Write-Host "Mengompres berkas proyek Radya Labs ke $destZip..."
Compress-Archive -Path $itemsToZip -DestinationPath $destZip -CompressionLevel Optimal -Force

$zipInfo = Get-Item $destZip
Write-Host "SUKSES: $destZip berhasil dibuat dengan ukuran $($zipInfo.Length / 1MB | ForEach-Object { '{0:N2} MB' -f $_ })"
