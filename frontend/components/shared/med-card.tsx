import { cn } from "@/lib/utils"

interface MedCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    premium?: boolean
}

export function MedCard({ children, premium = true, className, ...props }: MedCardProps) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all duration-300",
                premium && "premium-shadow",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
