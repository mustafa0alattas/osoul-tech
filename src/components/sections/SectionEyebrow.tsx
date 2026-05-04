import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium tracking-[0.04em] text-osoul-deep",
        "before:block before:h-px before:w-8 before:bg-osoul-deep/60",
        className,
      )}
    >
      {children}
    </span>
  );
}
