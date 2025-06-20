import { useState } from 'react';

export default function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text) => {
    if (!navigator?.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch (e) {
      setIsCopied(false);
      return false;
    }
  };

  return [isCopied, copy];
} 