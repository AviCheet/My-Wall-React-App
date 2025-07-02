'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';


interface Post {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();

    const subscription = supabase
      .channel('realtime:posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        setPosts((current) => [payload.new as Post, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setPosts(data);
  };

  return (
    //  Feed 
    <div className="p-4 bg-white shadow rounded">
      {posts.map((post) => (
        <div key={post.id} className="border-b py-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{post.user_name}</p>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
          <p>{post.message}</p>
        </div>
      ))}
    </div>
  );
}