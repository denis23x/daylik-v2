import { Card as CardWrapper, CardContent } from '../../ui/card';

export default function Card({ item }: { item: number | string }) {
  return (
    <CardWrapper className="aspect-[2/3] p-2">
      <CardContent className="flex size-full items-center justify-center p-0">
        <p className="font-mono text-2xl font-semibold">{item}</p>
      </CardContent>
    </CardWrapper>
  );
}
