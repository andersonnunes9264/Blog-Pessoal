import React from "react"
import { Calendar, Home, Inbox, Search, Settings, DollarSign, Computer, Phone, LogInIcon, CoinsIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Postagens",
    url: "/dashboard/publicar",
    icon: Computer,
  },
   {
      title: "Início",
      url: "/",
      icon: Home,
    },
    {
      title: "Tecnologia",
      url: "/tecnologia",
      icon: Computer,
    },
    {
      title: "Mercado Financeiro",
      url: "/mercado-financeiro",
      icon: DollarSign,
    },
    {
      title: "Conversor de Moedas",
      url: "/conversorMoedas",
      icon: CoinsIcon,
    },
    {
      title: "Contato",
      url: "/contato",
      icon: Phone,
    },
 
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-800/50 bg-slate-950/95 backdrop-blur-sm">
      {/* Header da Sidebar */}
      <SidebarHeader className="border-b border-slate-800/50 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AT</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-700 to-zinc-400 bg-clip-text text-transparent">
              ATech<span className="text-indigo-500">&</span>Money
            </h1>
            <span className="text-xs text-slate-500">Insights for the Digital Age</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group hover:bg-slate-800/50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500/10 data-[active=true]:to-blue-600/10 data-[active=true]:border-l-2 data-[active=true]:border-cyan-500 rounded-lg transition-all duration-200"
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                      <item.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-data-[active=true]:text-cyan-400 transition-colors" />
                      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-500 group-data-[active=true]:text-cyan-400 transition-colors">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer da Sidebar */}
      <SidebarFooter className="border-t border-slate-800/50 p-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/50">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center">
            <span className="text-slate-300 text-xs font-bold">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-300 truncate">Usuário</p>
            <p className="text-xs text-slate-500 truncate">user@atech.com</p>
          </div>
          <Settings className="w-4 h-4 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}