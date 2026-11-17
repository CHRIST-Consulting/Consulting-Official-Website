// Shared between the contact form (browser) and /api/contact (server) so the
// rules can never drift apart. Keep this file free of browser/Node-only APIs.

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asTrimmedString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

/** Trims the fields and returns them along with any validation errors. */
export function validateContactInput(raw: unknown): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data: ContactInput = {
    name: asTrimmedString(source.name),
    email: asTrimmedString(source.email),
    message: asTrimmedString(source.message),
  };

  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > CONTACT_LIMITS.name)
    errors.name = `Name must be at most ${CONTACT_LIMITS.name} characters.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (!data.message) errors.message = "Please tell us about your requirements.";
  else if (data.message.length > CONTACT_LIMITS.message)
    errors.message = `Message must be at most ${CONTACT_LIMITS.message} characters.`;

  return { data, errors };
}
