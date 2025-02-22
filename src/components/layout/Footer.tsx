"use client"

import Link from "next/link"
import { Home, Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container flex flex-col gap-6 py-8 peer-data-[collapsible=icon]:ml-[3rem] peer-data-[collapsible=offcanvas]:ml-0 transition-[margin] duration-200 ease-linear">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Accueil
              </Link>
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                Paramètres
              </Link>
            </nav>
          </div>

          {/* Section Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex flex-col space-y-2">
              <Link href="mailto:support@izirobux.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@izirobux.com
              </Link>
            </div>
          </div>

          {/* Section Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <Button variant="secondary" size="sm" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} iZi Robux. Tous droits réservés.</p>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 