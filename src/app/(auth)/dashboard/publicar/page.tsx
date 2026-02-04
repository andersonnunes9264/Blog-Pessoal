"use client";

import React from 'react';
import { List } from 'lucide-react';
import CreatePost from '@/app/(auth)/_components/createPosts/createPost';

export default function PublicarPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="text-4xl font-bold mb-4">Publicar</h1>
            <CreatePost />
            <p className="text-xl">Página em construção</p>
        </div>
    );
}

