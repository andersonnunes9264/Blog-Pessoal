import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/login', // Redireciona para sua página de login customizada
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redireciona para o login
      } else if (isLoggedIn) {
        // Se estiver logado e tentar acessar o login, manda pro dashboard
        // return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Deixe vazio aqui por enquanto
} satisfies NextAuthConfig