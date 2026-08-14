'use client';

import { useEffect } from 'react';
import { injectContentsquareScript } from '@contentsquare/tag-sdk';

const TAG_ID =
  process.env.NEXT_PUBLIC_CONTENTSQUARE_TAG_ID ||
  process.env.NEXT_PUBLIC_HOTJAR_ID ||
  '3cf6b9ab41531';

export function Contentsquare() {
  useEffect(() => {
    if (!TAG_ID) return;

    // Detect format:
    // If hexadecimal string (e.g. 3cf6b9ab41531), use clientId
    // If numeric string (e.g. 3849120), use siteId
    const isHexTag = /^[a-f0-9]+$/i.test(TAG_ID) && isNaN(Number(TAG_ID));

    if (isHexTag) {
      injectContentsquareScript({ clientId: TAG_ID });
    } else {
      injectContentsquareScript({ siteId: TAG_ID });
    }
  }, []);

  return null;
}
