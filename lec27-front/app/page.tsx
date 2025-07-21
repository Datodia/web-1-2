'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { axiosInstance, createEventSource } from "@/lib/axios-instance";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useRef } from "react";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any>(null)
  const token = getCookie('token')
  const [page, setPage] = useState(1)
  const [paginationCount, setPaginationCount] = useState<number[]>([])
  const [prompt, setPrompt] = useState('')
  const [markDown, setMarkDown] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visibleContent, setVisibleContent] = useState('')
  const fullContentRef = useRef('')
  const charIndexRef = useRef(0)

  if (!token) {
    router.push('/auth/sign-in')
    return null
  }

  const getCurrentUser = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current-user`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })


    const data = await resp.json()
    if (resp.status === 200) {
      setUser(data)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const animateTyping = () => {
    if (charIndexRef.current < fullContentRef.current.length) {
      setVisibleContent(prev => prev + fullContentRef.current.charAt(charIndexRef.current));
      charIndexRef.current++;

      // Add variable timing for more natural feel
      const delay = Math.floor(Math.random() * 10) + 5; // 5-15ms
      setTimeout(animateTyping, delay);
    }
  };

  // Update handleSubmit to use animation
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMarkDown('');
    setVisibleContent('');
    fullContentRef.current = '';
    charIndexRef.current = 0;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ai/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsLoading(false);
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                streamedContent += parsed.content;

                // Update the full content reference
                fullContentRef.current = streamedContent;

                // If this is the first chunk, start the animation
                if (charIndexRef.current === 0) {
                  animateTyping();
                }

                // Store the full content for markdown rendering
                setMarkDown(streamedContent);
              } else if (parsed.error) {
                console.error('Error from server:', parsed.error);
                setIsLoading(false);
              }
            } catch (e) {
              console.error('Error parsing data chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error with streaming response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if(!user) return null

  return (
    // <div className="max-w-4xl mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">AI Nutritionist</h1>
    //   <form onSubmit={handleSubmit} className="mb-6">
    //     <div className="flex gap-2">
    //       <input
    //         type="text"
    //         placeholder="Ask about nutrition, diet plans, or healthy eating..."
    //         className="border-2 w-full h-12 rounded px-4"
    //         onChange={(e) => setPrompt(e.target.value)}
    //         value={prompt}
    //         disabled={isLoading}
    //       />
    //       <Button type="submit" disabled={isLoading}>
    //         {isLoading ? 'Thinking...' : 'Ask'}
    //       </Button>
    //     </div>
    //   </form>

    //   <div className="response-container relative rounded-lg border p-4 min-h-[200px]">
    //     {isLoading && !visibleContent && (
    //       <div className="flex items-center justify-center absolute inset-0">
    //         <div className="typing-indicator">
    //           <span></span>
    //           <span></span>
    //           <span></span>
    //         </div>
    //       </div>
    //     )}

    //     <div className={`${isLoading || visibleContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
    //       <MarkdownRenderer content={visibleContent} />
    //     </div>
    //   </div>
    // </div>
    <>

      <h1>{user?.fullName}</h1>
      <h1>{user?.email}</h1>
      {user?.avatar ? <Image
        alt={user?.fullName}
        src={user.avatar}
        width={50}
        height={50}
      /> : null}

    </>
  );
}