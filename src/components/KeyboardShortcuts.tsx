"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const shortcuts = [
  { keys: ["/"], label: "Focus search" },
  { keys: ["g", "i"], label: "Go to Issues" },
  { keys: ["g", "c"], label: "Go to Civic Intel" },
  { keys: ["g", "e"], label: "Go to Explorer" },
  { keys: ["g", "p"], label: "Go to Parties" },
  { keys: ["g", "t"], label: "Go to Timeline" },
  { keys: ["g", "h"], label: "Go to Home" },
  { keys: ["g", "s"], label: "Go to Stats" },
  { keys: ["?"], label: "Toggle this help" },
];

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("politik:focus-search"));
        return;
      }

      // Handle g + key combos
      if (pendingKey === "g") {
        setPendingKey(null);
        if (e.key === "i") {
          window.location.href = "/civic-ledger";
        } else if (e.key === "c") {
          window.location.href = "/civic-intel";
        } else if (e.key === "e") {
          window.location.href = "/explore";
        } else if (e.key === "p") {
          window.location.href = "/compare-parties";
        } else if (e.key === "t") {
          window.location.href = "/timeline";
        } else if (e.key === "h") {
          window.location.href = "/";
        } else if (e.key === "s") {
          window.location.href = "/stats";
        }
        return;
      }

      if (e.key === "g") {
        e.preventDefault();
        setPendingKey("g");
        // Reset after 500ms if second key not pressed
        setTimeout(() => setPendingKey(null), 500);
        return;
      }

      if (e.key === "Escape" && showHelp) {
        setShowHelp(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingKey, showHelp]);

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-[var(--color-text-muted)]">
            Keyboard Shortcuts
          </span>
          <button
            onClick={() => setShowHelp(false)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {shortcuts.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-[var(--color-text-secondary)]">
                {s.label}
              </span>
              <div className="flex gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-muted)]"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-[var(--color-border)] pt-3">
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
            Press <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-1 py-0.5 text-[9px]">?</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
