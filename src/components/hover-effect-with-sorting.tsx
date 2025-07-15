'use client';

import React, { useState, useRef } from 'react';
import { motion, spring } from 'motion/react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Teammate } from '@/types/teammate.type';
import { cn } from '@/lib/utils';

type HoverEffectWithSortingProps = {
  items: Teammate[];
  setItems: (newItems: Teammate[]) => void;
  children: (
    item: Teammate,
    dragHandle: {
      attributes: React.HTMLAttributes<HTMLElement>;
      listeners?: React.DOMAttributes<HTMLElement>;
    }
  ) => React.ReactNode;
  className?: string;
};

function SortableItem({
  id,
  item,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  id: string;
  item: Teammate;
  children: (
    item: Teammate,
    dragHandle: {
      attributes: React.HTMLAttributes<HTMLElement>;
      listeners?: React.DOMAttributes<HTMLElement>;
    }
  ) => React.ReactNode;
  onMouseEnter: (e: React.MouseEvent<HTMLLIElement>) => void;
  onMouseLeave: () => void;
}) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id,
  });

  return (
    <motion.li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        borderRadius: 'var(--radius-lg)',
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? 'var(--shadow-2xl)' : undefined,
      }}
      transition={spring}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children(item, { attributes, listeners })}
    </motion.li>
  );
}

const HoverEffectWithSorting = ({
  items,
  setItems,
  children,
  className,
}: HoverEffectWithSortingProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const [hasInitialized, setHasInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLUListElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const newStyle = {
      top: targetRect.top - containerRect.top - 8,
      left: targetRect.left - containerRect.left - 8,
      width: targetRect.width + 16,
      height: targetRect.height + 16,
    };

    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    setHighlightStyle(newStyle);
    setIsVisible(true);
    setHasInitialized(true);
  };

  const handleMouseLeaveItem = () => {
    setIsVisible(false);
  };

  const handleMouseLeaveGrid = () => {
    setIsVisible(false);
    hideTimeout.current = setTimeout(() => {
      setHasInitialized(false);
    }, 300);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setIsVisible(false);
    setHasInitialized(false);
    setHighlightStyle({ top: 0, left: 0, width: 0, height: 0 });

    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.UUID === active.id);
    const newIndex = items.findIndex((item) => item.UUID === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items?.map((item) => item.UUID)} strategy={rectSortingStrategy}>
        <ul
          ref={containerRef}
          onMouseLeave={handleMouseLeaveGrid}
          className={cn(
            'relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7',
            className
          )}
        >
          {hasInitialized && !isDragging && (
            <motion.div
              className="bg-muted pointer-events-none absolute z-0 rounded-2xl"
              initial={{
                top: highlightStyle.top,
                left: highlightStyle.left,
                width: highlightStyle.width,
                height: highlightStyle.height,
                opacity: 0,
              }}
              animate={{
                top: highlightStyle.top,
                left: highlightStyle.left,
                width: highlightStyle.width,
                height: highlightStyle.height,
                opacity: isVisible ? 1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.3 },
              }}
            />
          )}

          {items?.map((item) => (
            <SortableItem
              key={item.UUID}
              id={item.UUID}
              item={item}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeaveItem}
            >
              {(item, dragHandle) => children(item, dragHandle)}
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default HoverEffectWithSorting;
