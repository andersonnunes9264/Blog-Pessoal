"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "Preencha todos os campos." }
  }

  try {
    // 1. Verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return { error: "Este e-mail já está cadastrado." }
    }

    // 2. Criptografa a senha (NUNCA salve senha em texto puro!)
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Salva no banco de dados
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    return { error: "Ocorreu um erro ao criar a conta." }
  }
}