export const uniqueNodeName = (name: string, takenNames: Set<string>): string => {
  if (!takenNames.has(name)) return name;
  let suffix = 1;
  while (takenNames.has(`${name} ${suffix}`)) suffix++;
  return `${name} ${suffix}`;
};
