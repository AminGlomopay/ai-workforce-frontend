// The backend rejects a save whose node names are empty or used more than once, compared exactly after trimming.
export const findNodeNameIssue = (name: string, otherNames: string[]): string | undefined => {
  if (!name) return "A node name can't be empty. Name unchanged.";
  if (otherNames.includes(name)) return `Another node is already named "${name}". Name unchanged.`;
  return undefined;
};
