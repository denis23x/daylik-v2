'use client';

import { cloneElement, ReactNode, ReactElement, useState, useEffect, useRef } from 'react';
import type { Attributes } from 'react';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getCookie, setCookie } from '@/hooks/useCookie';
import { COOKIE_CONSENT } from '@/lib/constants';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';

const CardView = ({ disabled = false, children }: { disabled?: boolean; children: ReactNode }) => {
  const keyNames = useRef('sync-cards-show-names');
  const keyRoles = useRef('sync-cards-show-roles');
  const [open, setOpen] = useState(false);
  const { showRoles, showNames, setShowRoles, setShowNames } = useSyncLiveStore();

  useEffect(() => {
    setShowRoles(!!Number(getCookie(keyRoles.current)));
    setShowNames(!!Number(getCookie(keyNames.current)));
  }, [setShowRoles, setShowNames]);

  const handleRoles = (value: boolean) => {
    setShowRoles(value);

    // Disable others views
    if (value) {
      handleNames(false);
    }

    // Save the value to cookie
    handleCookie(keyRoles.current, value);
  };

  const handleNames = (value: boolean) => {
    setShowNames(value);

    // Disable others views
    if (value) {
      handleRoles(false);
    }

    // Save the value to cookie
    handleCookie(keyNames.current, value);
  };

  const handleCookie = (key: string, value: boolean) => {
    if (Number(getCookie(COOKIE_CONSENT))) {
      setCookie(key, String(value ? 1 : 0));
    }
  };

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {cloneElement(children as ReactElement, { disabled } as Attributes)}
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-44"
        sideOffset={16}
        collisionPadding={16}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-roles"
              disabled={disabled}
              checked={showRoles}
              onCheckedChange={handleRoles}
            />
            <Label htmlFor="show-roles">Show roles</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-names"
              disabled={disabled}
              checked={showNames}
              onCheckedChange={handleNames}
            />
            <Label htmlFor="show-names">Show names</Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CardView;
