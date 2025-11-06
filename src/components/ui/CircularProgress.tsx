import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    progress: number;
    className?: string;
    emptyClass: string;
    fillClass: string;
    children?: React.ReactNode;
}

export default function CircularProgress({ progress, className, emptyClass, fillClass, children }: Props) {
    return (
        <div className={twMerge("relative size-40", className)}>
          <svg className="size-full -rotate-90 transition-all" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className={clsx("stroke-current", emptyClass)} strokeWidth="2"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className={clsx("stroke-current", fillClass)} strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - progress} strokeLinecap="round"></circle>
          </svg>

          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            {children}
          </div>
        </div>
    )
}