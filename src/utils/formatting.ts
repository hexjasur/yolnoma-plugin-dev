/**
 * String formatting utilities for project names and identifiers.
 */

export function toKebabCase(str: string): string {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

export function toPascalCase(str: string): string {
  return str
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

export function toTitleCase(str: string): string {
  return str
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generatePluginId(name: string, namespace = 'com.example'): string {
  const cleanName = toKebabCase(name);
  return `${namespace}.${cleanName}`;
}

export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Project name cannot be empty.' };
  }

  const trimmed = name.trim();
  if (trimmed.length > 214) {
    return { valid: false, error: 'Project name cannot be longer than 214 characters.' };
  }

  if (/[~'!()*]/.test(trimmed)) {
    return { valid: false, error: 'Project name may not contain special characters (~!()*).' };
  }

  if (trimmed.startsWith('.') || trimmed.startsWith('_')) {
    return { valid: false, error: 'Project name cannot start with a dot or underscore.' };
  }

  if (/[A-Z]/.test(trimmed)) {
    // We allow it, but recommend kebab-case
  }

  return { valid: true };
}
