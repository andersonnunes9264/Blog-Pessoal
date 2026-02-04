// "use server"

// import { prisma } from '@/lib/prisma';

// export default async function createPostAction(text: string, content: string, authorId: string, image: string | null = null) {
//     try {
//         const post = await prisma.post.create({
//             data: {
//                 title: text,
//                 content: content,
//                 image: image,
//                 slug: text.toLowerCase().replace(/\s+/g, '-'),
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 author: {
//                     connect: {
//                         id: authorId,
//                     },
//                 },
//             },
//         })

//         return post;
//     } catch (error) {
//         return null;
//     };
    
// }    

"use server"

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'; // Importe isso para atualizar a home na hora

export default async function createPostAction(
    title: string, 
    content: string, 
    image: string | null = null, 
    authorEmail: string // Alteramos para receber e-mail
) {
    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                image: image,
                // Geramos um slug único adicionando o timestamp para evitar erros de duplicidade
                slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                author: {
                    connect: {
                        email: authorEmail, // Conectamos via e-mail (mais simples vindo da sessão)
                    },
                },
            },
        })

        // Isso limpa o cache da página inicial para o post novo aparecer imediatamente
        revalidatePath('/');
        
        return post;
    } catch (error) {
        console.error("Erro ao criar post:", error);
        return null;
    }
}