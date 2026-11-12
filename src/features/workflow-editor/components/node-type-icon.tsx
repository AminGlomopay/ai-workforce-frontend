import { FC } from 'react';
import { Box } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

import { CodingAgentIcon } from './coding-agent-icon';
import { GitHubIcon } from './github-icon';
import { LibreChatIcon } from './librechat-icon';
import { SlackIcon } from './slack-icon';
import { ZohoDeskIcon } from './zoho-desk-icon';

// Lucide dropped brand icons, so brand names the backend serves map to bundled SVGs. The Coding Agent's
// `code` icon is a lucide name, but the node gets its own portrait instead.
const BUNDLED_ICONS: Record<string, FC<{ className: string }>> = {
  slack: SlackIcon,
  librechat: LibreChatIcon,
  'zoho-desk': ZohoDeskIcon,
  github: GitHubIcon,
  code: CodingAgentIcon,
};

interface NodeTypeIconProps {
  icon: string;
  className: string;
}

export const NodeTypeIcon: FC<NodeTypeIconProps> = ({ icon, className }) => {
  const BundledIcon = BUNDLED_ICONS[icon];
  if (BundledIcon) return <BundledIcon className={className} />;
  return iconNames.includes(icon as IconName) ? <DynamicIcon name={icon as IconName} className={className} /> : <Box className={className} />;
};
