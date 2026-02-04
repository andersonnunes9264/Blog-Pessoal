"use server";

import { prisma } from '@/lib/prisma';

export async function ListPostAction() {
    try {
        const posts = await prisma.postTag.findMany(
            // {
            //     orderBy: {
            //         created_at: 'desc',
            //     },
            // }
        );
        return posts;
    } catch (error) {
        console.error("Erro ao listar posts", error);
        return [];
    }
}