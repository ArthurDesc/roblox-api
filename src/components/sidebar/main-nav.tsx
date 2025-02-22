import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Accueil
      </Link>
      <Link
        href="/history"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Historique
      </Link>
      <Link
        href="/starred"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Favoris
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Paramètres
      </Link>
    </nav>
  )
} 