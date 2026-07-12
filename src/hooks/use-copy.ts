import { useState, useEffect } from 'react';
import copyToClipboard from 'copy-to-clipboard';

export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    if (copied) return;
    const success = copyToClipboard(text);
    if (success) {
      setCopied(true);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, timeout);
    return () => clearTimeout(timer);
  }, [copied, timeout]);

  return { copied, copy };
}
