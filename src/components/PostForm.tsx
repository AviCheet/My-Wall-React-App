'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function PostForm() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = async () => {
    if (!userName.trim() || !message.trim()) return;
    await supabase.from('posts').insert({
      id: uuidv4(),
      user_name: userName,
      message,
    });
    setUserName('');
    setMessage('');
  };

  return (
    // Name
    <div className="p-4 bg-white shadow rounded mb-6">
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      {/* What's on your mind? */}
      <textarea
        placeholder="What's on your mind?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={280}
        className="w-full p-2 mb-2 border rounded" 
      />
        {/* Characters Remaining... */}
        <p className="text-sm text-gray-500 text-left mb-2">
        {280 - message.length} characters remaining
        </p>

        {/* Share BUtton.. */}
        <div className="flex justify-end">
            <button
                onClick={handlePost}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!userName || !message} >
                Share
            </button>
        </div>

    </div>
  );
}
