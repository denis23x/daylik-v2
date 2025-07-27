import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Grid2x2Plus } from 'lucide-react';
import { useTeamsStore } from '@/store/useTeamsStore';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useTranslations } from 'next-intl';

const TeamsCardNew = () => {
  const t = useTranslations('components.dashboard.teams.cardNew');
  const { openModal } = useTeamsStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <Card className="relative size-full gap-0 p-2">
      <CardHeader className="relative mb-auto flex min-h-9 items-center justify-between gap-x-1.5 gap-y-0 p-0">
        <span className="truncate text-base font-semibold">{t('title')}</span>
      </CardHeader>
      <CardContent className="my-2 p-4 sm:p-3">
        <Avatar className="aspect-square size-full border border-dashed p-1">
          <AvatarFallback asChild>
            <Button className="shadow-none" variant="secondary" size="icon" onClick={handleInsert}>
              <Grid2x2Plus className="size-5" />
            </Button>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0 text-center">
        <Button variant="secondary" onClick={handleInsert}>
          {t('createButton')}
        </Button>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
};

export default TeamsCardNew;
