import { classNames } from "~/utils/classNames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Card({ children, className, ...props }: Props) {
  return (
    <div
      className={classNames(
        "rounded-md border border-slate-200 dark:border-slate-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
