"use client";

import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root providers component - combines all context providers
 * Updated to use only frontend providers (no backend)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
    </>
  );
}
