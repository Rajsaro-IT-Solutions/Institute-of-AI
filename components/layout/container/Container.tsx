import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;

  className?: string;

  as?: React.ElementType;

  fluid?: boolean;
}

export default function Container({
  children,
  className,
  as: Component = "div",
  fluid = false,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",

        !fluid && "max-w-7xl",

        className
      )}
    >
      {children}
    </Component>
  );
}