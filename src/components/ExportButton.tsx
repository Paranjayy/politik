"use client";

interface ExportButtonProps {
  data: unknown[];
  filename: string;
}

export function ExportButton({ data, filename }: ExportButtonProps) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
    >
      ↓ EXPORT JSON
    </button>
  );
}
