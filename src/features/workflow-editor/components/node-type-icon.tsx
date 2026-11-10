import { FC } from 'react';
import { Box } from 'lucide-react';
import { DynamicIcon, IconName, iconNames } from 'lucide-react/dynamic';

interface NodeTypeIconProps {
  icon: string;
  className: string;
}

export const NodeTypeIcon: FC<NodeTypeIconProps> = ({ icon, className }) =>
  iconNames.includes(icon as IconName) ? <DynamicIcon name={icon as IconName} className={className} /> : <Box className={className} />;
