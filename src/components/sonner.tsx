'use client';

import { Toaster, type ToasterProps } from 'sonner';
import { useTheme } from 'next-themes';

const Sonner = () => {
  const { resolvedTheme } = useTheme();

  return <Toaster theme={resolvedTheme as ToasterProps['theme']} />;
};

export default Sonner;
