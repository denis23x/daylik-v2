import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserRoundPlus } from 'lucide-react';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { BorderBeam } from '@/components/magicui/border-beam';

const TeammatesCardNew = () => {
  const { openModal } = useTeammatesStore();

  const handleInsert = () => {
    openModal('insert');
  };

  return (
    <Card className="relative size-full gap-0 p-2">
      <CardContent className="translate-y-2 p-4 sm:p-3">
        <Avatar className="aspect-square size-full border border-dashed p-1">
          <AvatarFallback asChild>
            <Button className="shadow-none" variant="secondary" size="icon" onClick={handleInsert}>
              <UserRoundPlus className="size-5" />
            </Button>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0 text-center">
        <span className="truncate text-lg font-semibold sm:text-2xl">New</span>
        <p className="text-muted-foreground truncate text-xs sm:text-sm">Add a teammate</p>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
};

export default TeammatesCardNew;
