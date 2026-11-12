import { FC } from 'react';
import { Box } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

import { GitHubIcon } from './github-icon';
import { LibreChatIcon } from './librechat-icon';
import { SlackIcon } from './slack-icon';
import { ZohoDeskIcon } from './zoho-desk-icon';

// Lucide dropped brand icons, so brand names the backend serves map to bundled SVGs.
const BRAND_ICONS: Record<string, FC<{ className: string }>> = {
  slack: SlackIcon,
  librechat: LibreChatIcon,
  'zoho-desk': ZohoDeskIcon,
  github: GitHubIcon,
};

interface NodeTypeIconProps {
  icon: string;
  className: string;
}

export const NodeTypeIcon: FC<NodeTypeIconProps> = ({ icon, className }) => {
  const BrandIcon = BRAND_ICONS[icon];
  if (BrandIcon) return <BrandIcon className={className} />;
  return iconNames.includes(icon as IconName) ? <DynamicIcon name={icon as IconName} className={className} /> : <Box className={className} />;
};
