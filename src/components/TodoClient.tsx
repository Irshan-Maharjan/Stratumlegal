import type { ReactNode } from 'react';

/**
 * <TodoClient> — a visible placeholder for a fact the firm has not yet supplied.
 *
 * Fabricated lawyer credentials, firm history, or registration numbers on a live
 * law firm site are both a Bar Council compliance problem and a lie. So nothing
 * unsourced is ever invented, and every gap renders loudly instead: brass, mono,
 * bracketed, and impossible to mistake for content.
 *
 * It renders in production deliberately. A placeholder that disappears at build
 * time is a placeholder that ships empty and nobody notices.
 */

export function TodoClient({ children }: { children: ReactNode }) {
  return (
    <mark
      className="inline-block border border-brass bg-transparent px-1.5 py-0.5 font-mono text-data text-brass"
      style={{ borderRadius: 'var(--radius-sm)' }}
      data-todo-client=""
    >
      TODO(client): {children}
    </mark>
  );
}

/**
 * Renders `value` when present, otherwise a TodoClient naming what is missing.
 * The single call site for every nullable field in the content model.
 */
export function OrTodo({
  value,
  label,
  children,
}: {
  value: string | null | undefined;
  /** What to ask the client for, e.g. "Nepal Bar Council licence number". */
  label: string;
  /** Optional renderer for a present value. */
  children?: (value: string) => ReactNode;
}) {
  if (!value) return <TodoClient>{label}</TodoClient>;
  return <>{children ? children(value) : value}</>;
}
