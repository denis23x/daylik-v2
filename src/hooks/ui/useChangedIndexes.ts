import { useEffect, useRef, useState } from 'react';

type Item<T> = T & {
  UUID: string;
};

type Index = {
  UUID: string;
  oldIndex: number;
  newIndex: number;
};

export function useChangedIndexes<T>(items: Item<T>[]) {
  const prevItemsRef = useRef<Item<T>[]>([]);
  const [indexes, setIndexes] = useState<Index[]>([]);

  useEffect(() => {
    const prevItems = prevItemsRef.current;

    if (prevItems.length > 0 && items.length > 0) {
      const changed = items
        .map((item, newIndex) => {
          const oldIndex = prevItems.findIndex((j) => j.UUID === item.UUID);

          return {
            UUID: item.UUID,
            oldIndex,
            newIndex,
            changed: oldIndex !== newIndex,
          };
        })
        .filter((j) => j.changed)
        .map((j) => {
          return {
            UUID: j.UUID,
            oldIndex: j.oldIndex,
            newIndex: j.newIndex,
          };
        });

      setIndexes(changed);
    } else {
      setIndexes([]);
    }

    prevItemsRef.current = items;
  }, [items]);

  return { indexes };
}
