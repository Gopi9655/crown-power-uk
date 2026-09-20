"use client";
import {
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEventHandler,
} from "react";
export function Modal({
  children,
  title,
  onClose,
  className = "",
  onKeyDown,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        type="button"
        className="icon-button modal-close"
        onClick={onClose}
        aria-label={`Close ${title}`}
      >
        ×
      </button>
      {children}
    </dialog>
  );
}
