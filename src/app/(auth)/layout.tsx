import { AppSidebar } from "@/components/app-sidebar-auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Providers } from "@/components/session-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          {/* Área principal (header + conteúdo) */}
          <div className="flex-1 flex flex-col">
            <DashboardHeader />

            <main className="flex-1 p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </Providers>
  )
}