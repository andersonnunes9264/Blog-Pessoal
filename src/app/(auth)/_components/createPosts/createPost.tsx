"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Importe o Textarea do Shadcn
import { Button } from "@/components/ui/button";
import { ImagePlus, Link as LinkIcon, Send } from "lucide-react";
import createPostAction from "./createPostAction/createPostAction";

export default function CreatePostForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const { data: session } = useSession();

    async function fetchMetadata() {
        const url = prompt("Cole a URL do artigo aqui:");
        if (!url) return;

        setIsFetching(true);
        try {
            const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
            const data = await res.json();

            if (data.title) setTitle(data.title);
            if (data.description) setDescription(data.description);
            if (data.image) setImageUrl(data.image);
        } catch (err) {
            alert("Não foi possível extrair dados desta URL.");
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!session?.user?.email) return;

        setIsPending(true);

        // Enviando os dados para a sua Action (ajuste a action para receber 3 argumentos)
        await createPostAction(title, description, imageUrl, session.user.email);

        setIsPending(false);
        window.location.reload();
    }

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-10 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
                        <Send className="w-4 h-4 text-indigo-500" /> Criar nova publicação
                    </h3>

                    {/* O BOTÃO NOVO ENTRA AQUI */}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={fetchMetadata}
                        disabled={isFetching}
                        className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white gap-2 h-8"
                    >
                        <LinkIcon className="w-3 h-3" />
                        {isFetching ? "Buscando..." : "Importar URL"}
                    </Button>
                </div>

                {/* Campo de Título */}
                <Input
                    placeholder="Título impactante da notícia"
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-indigo-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* Campo de URL da Imagem */}
                <div className="relative">
                    <Input
                        placeholder="URL da imagem (ex: https://imagem.jpg)"
                        className="bg-zinc-950 border-zinc-800 text-zinc-100 pl-10"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <ImagePlus className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                </div>

                {/* Campo de Descrição (Maior) */}
                <Textarea
                    placeholder="Escreva o conteúdo ou cole o texto aqui..."
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 min-h-[150px] resize-none focus:ring-indigo-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div className="flex justify-end gap-3">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8"
                    >
                        {isPending ? "Publicando..." : "Publicar agora"}
                    </Button>
                </div>
            </form>
        </div>
    );
}