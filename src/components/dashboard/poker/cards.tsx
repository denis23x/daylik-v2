import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card as CardWrapper, CardContent } from '../../ui/card';
import { usePokerByUUID } from '@/hooks/usePoker';
import { useParams } from 'next/navigation';

function PokerCards() {
  const params = useParams();
  const { data: poker } = usePokerByUUID({
    query: '*',
    UUID: params.UUID as string,
  });

  return (
    <ScrollArea className="w-full max-w-screen rounded-md border whitespace-nowrap">
      <ul className="flex flex-row gap-2 p-4">
        {poker?.cards.map((card, i) => (
          <li className="min-w-24 cursor-pointer" key={i}>
            <CardWrapper className="aspect-[2/3] p-2">
              <CardContent className="flex size-full items-center justify-center p-0">
                <p className="font-mono text-2xl font-semibold">{card}</p>
              </CardContent>
            </CardWrapper>
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" className="h-2" />
    </ScrollArea>
  );
}

export default PokerCards;
