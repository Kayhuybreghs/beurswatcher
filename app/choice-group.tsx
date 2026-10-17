'use client';

type Choice = string | { value: string; label: string };

// These controls change a filter or calculation input, not a tab panel.
// The existing data-slot hooks retain their visual style without tab roles.
export function ChoiceGroup({
  label,
  value,
  options,
  onChange,
  className = '',
  variant = 'default',
}: {
  label: string;
  value: string;
  options: readonly Choice[];
  onChange: (value: string) => void;
  className?: string;
  variant?: 'default' | 'line';
}) {
  return (
    <div className={'flex flex-col gap-2 ' + className}>
      <fieldset
        aria-label={label}
        data-slot="tabs-list"
        data-variant={variant}
        className={
          'inline-flex h-8 min-w-0 w-fit items-center justify-center border-0 p-[3px] text-muted-foreground ' +
          (variant === 'line' ? 'gap-1 bg-transparent' : 'rounded-lg bg-muted')
        }
      >
        {options.map((item) => {
          const option =
            typeof item === 'string' ? { value: item, label: item } : item;
          return (
            <button
              type="button"
              key={option.value}
              data-slot="tabs-trigger"
              data-active={value === option.value ? '' : undefined}
              aria-pressed={value === option.value}
              onClick={() => onChange(option.value)}
              className="relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#093060]"
            >
              {option.label}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}
