import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
  initialFocusRef,
  className = "fixed inset-0 z-50 flex items-center justify-center",
  panelClassName = "",
  backdropClassName = "fixed inset-0 dark:bg-white/5 bg-black/50 z-[-9]",
  size = 'md'
}) {
  const width = size === 'md' ? 'w-[500px]' : size === 'lg' ? 'w-[800px]' : 'w-[300px]';
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);
  const portalRoot = typeof document !== "undefined"
    ? document.getElementById("modal-root") || document.body
    : null;

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;

    const firstFocusable =
      (initialFocusRef && initialFocusRef.current) ||
      panelRef.current?.querySelector(
        "[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
    firstFocusable?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") trapFocus(e);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, initialFocusRef]);

  const trapFocus = (e) => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    ).filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!portalRoot || !open) return null;

  const handleBackdrop = () => closeOnBackdrop && onClose();
  const stop = (e) => e.stopPropagation();

  return createPortal(
    <div
      aria-hidden={!open}
      className={className}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={backdropClassName} />
      <div ref={panelRef} className={`bg-white rounded shadow-lg dark:bg-slate-800 p-4 ${panelClassName} ${width}`} onClick={stop}>
        <div className="flex items-center justify-between gap-4">
          {title ? (
            <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
          ) : <span className="sr-only">Modal Dialog</span>}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex items-center justify-center rounded-[50%] p-1 hover:bg-slate-300 dark:bg-white"
          >
            <X className="text-lg"/>
          </button>
        </div>
        <div className="mt-3 dark:text-white">{children}</div>
      </div>
    </div>,
    portalRoot
  );
}
