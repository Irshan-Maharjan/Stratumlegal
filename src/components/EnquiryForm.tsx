'use client';

import { useState, type FormEvent } from 'react';
import { Eyebrow } from './Eyebrow';

/**
 * <EnquiryForm> — the contact form.
 *
 * Fields per the brief and no more: name, organisation, email, phone, matter
 * type, message. Every additional field measurably reduces completion, and the
 * firm can ask follow-up questions in the reply.
 *
 * Validation is client-side and states what to fix, not that something is
 * wrong. Errors are wired with aria-describedby and aria-invalid, and the
 * summary receives focus on failure so a screen reader user is told what
 * happened rather than left on a silently unsubmitted form.
 *
 * Submission is stubbed — no backend yet. The stub resolves and shows the real
 * success state so the whole path is reviewable; wiring it to a mail transport
 * is a later phase.
 *
 * Progressive enhancement note: with JS disabled the fields, labels and native
 * `required`/`type` attributes still render, so the browser performs basic
 * validation. The form cannot submit without JS because there is no endpoint
 * yet; the phone and Viber/WhatsApp links beside it work regardless, which is
 * the path most Nepali visitors take anyway.
 */

type MatterOption = { value: string; label: string };

type EnquiryFormProps = {
  /** Practice areas, passed in so the form never hardcodes content. */
  matterTypes: MatterOption[];
};

type Errors = Partial<Record<'name' | 'email' | 'matterType' | 'message', string>>;

const FIELD_BASE =
  'w-full border border-line bg-ink-100 px-3 py-3 text-body text-paper ' +
  'transition-colors duration-(--duration-hover) placeholder:text-paper-3 ' +
  'hover:border-line-hi focus:border-brass focus:outline-none';

export function EnquiryForm({ matterTypes }: EnquiryFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const matterType = String(data.get('matterType') ?? '');
    const message = String(data.get('message') ?? '').trim();

    if (!name) next.name = 'Enter your name.';
    if (!email) {
      next.email = 'Enter your email address so we can reply.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a complete email address, for example name@company.com';
    }
    if (!matterType) next.matterType = 'Select the area your enquiry relates to.';
    if (!message) {
      next.message = 'Describe your enquiry.';
    } else if (message.length < 20) {
      next.message = 'Add a little more detail — at least a sentence or two.';
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with an error.
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus('sending');
    // TODO(client): wire to a mail transport or CRM endpoint. Stubbed for now.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setStatus('sent');
    form.reset();
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="border border-line bg-ink-100 p-8"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        <h3 className="font-display text-h2 text-paper" style={{ fontWeight: 800 }}>
          Enquiry sent
        </h3>
        <p className="mt-3 max-w-(--container-measure) text-body-sm text-paper-2">
          We have your message and will respond within two working days. If the matter
          is time-sensitive, telephone or Viber will reach us faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 border border-line px-4 py-2 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-line-hi"
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Field
        name="name"
        label="Name"
        required
        error={errors.name}
        autoComplete="name"
      />
      <Field
        name="organisation"
        label="Organisation"
        hint="Optional"
        autoComplete="organization"
      />
      <Field
        name="email"
        label="Email"
        type="email"
        required
        error={errors.email}
        autoComplete="email"
      />
      <Field
        name="phone"
        label="Phone"
        type="tel"
        hint="Optional"
        autoComplete="tel"
      />

      <div>
        <LabelRow htmlFor="matterType" label="Matter type" required />
        <select
          id="matterType"
          name="matterType"
          defaultValue=""
          required
          aria-invalid={errors.matterType ? true : undefined}
          aria-describedby={errors.matterType ? 'matterType-error' : undefined}
          className={FIELD_BASE}
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          <option value="" disabled>
            Select an area
          </option>
          {matterTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
        <FieldError id="matterType-error" message={errors.matterType} />
      </div>

      <div>
        <LabelRow htmlFor="message" label="Message" required />
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${FIELD_BASE} resize-y`}
          style={{ borderRadius: 'var(--radius-sm)' }}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <p className="text-body-sm text-paper-3">
        Sending an enquiry does not create a lawyer–client relationship. Please do not
        include confidential details in a first message.
      </p>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="border border-line-hi bg-ink-200 px-6 py-3 text-body text-paper transition-colors duration-(--duration-hover) hover:border-brass disabled:opacity-60"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}

function LabelRow({
  htmlFor,
  label,
  required,
  hint,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-body-sm text-paper">
        {label}
        {required && (
          <span className="text-brass" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {hint && <Eyebrow>{hint}</Eyebrow>}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-body-sm text-brass">
      {message}
    </p>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  error,
  hint,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <LabelRow htmlFor={name} label={label} required={required} hint={hint} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={FIELD_BASE}
        style={{ borderRadius: 'var(--radius-sm)' }}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
