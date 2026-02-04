"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Validação básica
  if (!email || !password) {
    return { error: "Por favor, preencha todos os campos." };
  }

  try {
    // 2. Busca o usuário no banco
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) { // Nota: Em produção, use bcrypt para comparar senhas!
      return { error: "E-mail ou senha inválidos." };
    }

    // 3. Se deu certo, você criaria a sessão aqui (ex: via NextAuth ou Cookies)
    console.log("Usuário logado:", user.id);

  } catch (error) {
    return { error: "Ocorreu um erro interno no servidor." };
  }

  // 4. Redireciona após o sucesso
  redirect("/dashboard");
}