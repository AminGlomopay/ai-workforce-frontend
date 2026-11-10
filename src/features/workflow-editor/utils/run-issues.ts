// The backend names the node in run issues as `node "<name>" ...`.
export const isIssueForNode = (issue: string, nodeName: string): boolean => issue.startsWith(`node "${nodeName}"`);
