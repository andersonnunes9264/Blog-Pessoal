"use client";

import React, { useEffect, useState } from 'react';
import { ListPostAction } from './listPostsActions/listPostAction';

interface Post {
  id: number;
  title: string;
  content: string;
}
export default function ListPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const rawPosts = await ListPostAction();
            const fetchedPosts: Post[] = rawPosts.map((item: any) => ({
                id: item.id ?? item.postId,
                title: item.title ?? '',
                content: item.content ?? '',
            }));
            setPosts(fetchedPosts);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}