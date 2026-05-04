import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-24", className)}
      {...props}
    />
  );
}
