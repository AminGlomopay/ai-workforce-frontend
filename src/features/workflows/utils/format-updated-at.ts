const UPDATED_AT_FORMAT = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export const formatUpdatedAt = (updatedAt: string) => UPDATED_AT_FORMAT.format(new Date(updatedAt));
