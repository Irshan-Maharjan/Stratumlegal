import type { ReactNode } from 'react';

/**
 * <TodoClient> — a placeholder for a fact the firm has not yet supplied.
 *
 * Nothing unsourced is ever invented: fabricated credentials, firm history or
 * registration numbers on a live law firm site are both a Bar Council
 * compliance problem and a lie. So a missing fact renders nothing at all
 * rather than a guess.
 *
 * VISIBILITY: the marker used to render in production so gaps could not ship
 * unnoticed. The site is now in front of clients, so in a production build it
 * renders null — a bracketed "TODO(client)" on a law firm's live contact page
 * reads as an unfinished site. In development it still renders loudly, which
 * is where the remaining gaps should be caught.
 *
 * The consequence to keep in mind: a section whose every field is missing now
 * collapses to empty space in production. Call sites that would look broken
 * empty should check the value themselves and omit their own heading too,
 * rather than relying on this to say something.
 */

const SHOW_MARKERS = process.env.NODE_ENV !== 'production';

export function TodoClient({ children }: { children: ReactNode }) {
  if (!SHOW_MARKERS) return null;

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
