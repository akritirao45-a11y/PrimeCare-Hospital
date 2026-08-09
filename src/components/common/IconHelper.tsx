import React from 'react';
import * as Icons from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-6 h-6', size = 24 }) => {
  // @ts-expect-error Dynamic lucide icon access
  const IconComponent = Icons[name] || Icons.Stethoscope;
  return <IconComponent className={className} size={size} />;
};
