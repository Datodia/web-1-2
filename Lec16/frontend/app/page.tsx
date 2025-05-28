'use client'
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any>([])
  const router = useRouter()

  const token = getCookie('accessToken')

  if(!token) {
    router.push('/auth/sign-in')
    return
  }
  

  const getUser = async () => {
    const resp = await fetch('http://localhost:4000/auth/current-user',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await resp.json()

    if(resp.status === 200){
      setUser(data)
    }else{
      deleteCookie('accessToken')
      router.push('/auth/sign-in')
    }
  }

  const getPosts = async () => {
    const resp = await fetch('http://localhost:4000/posts',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await resp.json()

    if(resp.status === 200){
      setPosts(data)
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])



  return (
    <div>
      <h1>Hello world</h1>
      <h1>{user?.fullName}</h1>
      <h1>{user?.email}</h1>
      <div>
        {posts.map((e:any) => (
          <div className="border-2 border-black">
            <h1>{e.title}</h1>
            <h1>{e.content}</h1>
            <p>{e.author.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
