import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <main className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                {/* Header Sofisticado */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Left side */}
                            <div className="flex items-center gap-4">
                                <SidebarTrigger className="text-slate-400 hover:text-slate-100 transition-colors" />
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                                            ATech<span className="text-indigo-500">&</span>Money
                                        </h1>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium leading-none">
                                            Insights for the Digital Age
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - opcional para adicionar navegação/search */}
                            <nav className="hidden md:flex items-center gap-6 text-sm">
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                                    Artigos
                                </a>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                                    Tecnologia
                                </a>
                                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                                    Finanças
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>

                {/* Footer Moderno */}
                <footer className="mt-16 border-t border-slate-800/50 bg-slate-950/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">AT</span>
                                </div>
                                <span className="text-slate-400 text-sm">
                                    &copy; 2025 ATech&Money. Tecnologia e inovação.
                                </span>
                            </div>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                    Sobre
                                </a>
                                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                    Contato
                                </a>
                                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                    Privacidade
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </SidebarProvider>
    )
}