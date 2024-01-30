export const required = (value: string | boolean): string | null => {
  if (value === undefined || value === null || (typeof value === 'string' && value.length === 0)) {
    return 'Required!';
  }

  return null;
};
