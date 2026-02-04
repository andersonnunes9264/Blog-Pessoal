import React from 'react';
import ListPosts from '../actions/ListPosts/listPost';
import { List } from 'lucide-react';
import { prisma } from '@/lib/prisma';

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export default async function PaginaInicial() {
  // MANEIRA MODERNA: Busca direta no Banco de Dados
  // O Next.js entende que isso é um Server Component e roda apenas no servidor
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc' // Opcional: traz os mais novos primeiro
    }
  });
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div id="postsInicio" className="transition-transform duration-300 hover:scale-105">
        {posts.map((post: Post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <footer className="..."> &copy; ATech, 2025. </footer>
    </div>
  );
}