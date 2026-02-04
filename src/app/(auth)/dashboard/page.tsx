import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  // 1. Busca a sessão do usuário no servidor
  const session = await auth();

  // 2. Verificação extra (caso o middleware falhe ou não esteja configurado)
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center border">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao seu Dashboard!</h1>
        
        {/* Exibe a foto do Google se existir */}
        {session.user?.image && (
          <img 
            src={session.user.image} 
            alt="Foto do usuário" 
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary"
          />
        )}

        <p className="text-gray-600 mb-2">Olá, <strong>{session.user?.name}</strong></p>
        <p className="text-sm text-gray-400 mb-6">{session.user?.email}</p>

        <hr className="my-6" />

        {/* Botão de Logout usando Server Action do NextAuth */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button variant="destructive" className="w-full">
            Sair da conta
          </Button>
        </form>
      </div>
    </div>
  );
}