"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/features/settings/sidebar-nav";
import { AccountForm } from "@/components/features/settings/account-form";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings",
  },
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Security",
    href: "/settings/security",
  },
];

export default function SettingsPage() {
  return (
    <div className="container relative min-h-screen">
      <div className="space-y-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-3xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account settings.
                </p>
              </div>
              <Separator />
              <AccountForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
