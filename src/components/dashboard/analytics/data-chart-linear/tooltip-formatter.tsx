import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/formatDuration';
import { ChartConfig } from '@/components/ui/chart';

type TooltipFormatterProps = {
  config: ChartConfig;
  value: number;
  name: string;
  item: { color: string };
};

export const TooltipFormatter = ({ value, name, item, config }: TooltipFormatterProps) => {
  return (
    <div className="flex flex-1 items-center gap-2">
      <div
        className={cn('h-2 w-2 rounded-full border-(--color-border) bg-(--color-bg)')}
        style={
          {
            '--color-bg': item.color,
            '--color-border': item.color,
          } as React.CSSProperties
        }
      />
      <div className="flex flex-1 items-center justify-stretch gap-2">
        <span className="block w-full text-xs first-letter:capitalize">
          {config[name as keyof ChartConfig].label}
        </span>
        {(name === 'total' || name === 'paused') && (
          <span className="text-muted-foreground text-xs">
            {formatDuration((value as number) * 1000)}
          </span>
        )}
        {name === 'overtime' && (
          <span
            className={`block text-xs ${value > 1 ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            {value > 0 ? `x${value.toFixed(1)}` : '-'}
          </span>
        )}
      </div>
    </div>
  );
};
