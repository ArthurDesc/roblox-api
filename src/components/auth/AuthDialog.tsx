"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { cn } from "@/lib/utils"

export function AuthDialog() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center relative group w-fit">
          {/* Effet de glow en arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--button-from))] via-[hsl(var(--button-to))] to-[hsl(var(--button-glow))] rounded-[20px] opacity-[var(--button-opacity)] blur-md group-hover:opacity-100 transition-all duration-500 group-hover:duration-200 animate-tilt"></div>
          
          <div className="bg-gradient-to-b from-[hsl(var(--button-from)_/_0.4)] to-transparent p-[2px] rounded-[16px] relative">
            <button
              className={cn(
                "group p-[2px] rounded-[12px]",
                "bg-gradient-to-b from-[hsl(var(--button-to))] to-[hsl(var(--button-from))]",
                "shadow-[0_2px_4px_rgba(0,0,0,0.7)]",
                "hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)]",
                "hover:translate-y-[-2px]",
                "active:shadow-[0_0px_1px_rgba(0,0,0,0.8)]",
                "active:translate-y-[1px]",
                "active:scale-[0.98]",
                "transition-all duration-300",
                "text-white font-semibold text-lg"
              )}
            >
              <div className="relative bg-gradient-to-b from-[hsl(var(--button-to))] to-[hsl(var(--button-from))] rounded-[8px] px-4 py-[0.6rem] overflow-hidden">
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                
                <div className="flex gap-2 items-center relative z-10">
                  <span className="font-semibold text-white text-lg group-hover:scale-105 transition-transform duration-200">
                    Start the adventure !
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentification</DialogTitle>
        </DialogHeader>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSuccess={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 