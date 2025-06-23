'use client';

import { cn } from '@/lib/utils';
import type { Teammate } from '@/types/teammate.type';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { useEffect, useState } from 'react';

const AvatarInitials = ({ teammate, className }: { teammate: Teammate; className?: string }) => {
  const [initials, setInitials] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (teammate) {
      const words = teammate.name.trim().split(' ');
      const initials =
        words.length >= 2
          ? words
              .slice(0, 2)
              .map((word) => word.charAt(0))
              .join('')
          : teammate.name.slice(0, 2);

      setInitials(initials.toUpperCase());
      setColor(getContrastingColor(teammate.color));
    }
  }, [teammate]);

  return (
    <span className={cn('text-base', className)} style={{ color }}>
      {initials}
    </span>
  );
};

export default AvatarInitials;
