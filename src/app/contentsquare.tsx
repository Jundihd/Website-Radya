'use client';
import { useEffect } from 'react';
import { injectContentsquareScript } from '@contentsquare/tag-sdk';

export function Contentsquare() {
  useEffect(() => {
    injectContentsquareScript({ clientId: '3cf6b9ab41531' });
  }, []);
  return null;
}
