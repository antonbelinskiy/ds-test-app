
import { useCallback } from 'react';

type ExportOptions =
  | { type: 'all' }
  | { type: 'single'; id: string }
  | { type: 'selected'; ids: string[] };

export function useOrderExport() {
  return useCallback(async (options: ExportOptions) => {
    const res = await fetch('/api/export-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });

    if (!res.ok) {
      console.error('Failed to export orders');
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders.csv`;
    link.click();
  }, []);
}
  
