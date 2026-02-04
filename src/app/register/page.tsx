"use client"

import * as React from "react"
import { registerAction } from "@/app/actions/register"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, setIsPending] = React.useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await registerAction(formData)

    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    } else {
      // Cadastro ok! Manda para o login
      router.push("/login?success=Account created")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded">{error}</p>}
            
            <div className="space-y-2">
              <label htmlFor="name">Nome completo</label>
              <Input id="name" name="name" placeholder="Anderson Nunes" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="email">E-mail</label>
              <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Senha</label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Criando conta..." : "Registrar"}
            </Button>

            <p className="text-center text-sm">
              Já tem uma conta? <a href="/login" className="underline">Faça login</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}