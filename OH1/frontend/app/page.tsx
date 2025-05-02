'use client'

import { FormEvent, use, useEffect, useState } from "react";

type Post = {
  id: number,
  content: string,
  userName: string,
  createdAt: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [content, setContent] = useState('')
  const [userName, setUserName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [updateContent, setUpdateContent] = useState('')
  const [updateUserName, setUpdateUserName] = useState('')
  const [updatePostId, setUpdatePostId] = useState<Number | null>(null)

  const getPosts = async () => {
    const resp = await fetch('https://df883k90-4000.euw.devtunnels.ms/posts')
    const data = await resp.json()
    setPosts(data)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await fetch('https://df883k90-4000.euw.devtunnels.ms/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        userName
      })
    })

    if (resp.status === 201) {
      setContent('')
      setUserName('')
      await getPosts()
    }
  }

  const handleDelete = async (id: number) => {
    const resp = await fetch(`https://df883k90-4000.euw.devtunnels.ms/posts/${id}`, {
      method: 'DELETE'
    })

    if (resp.status === 200) {
      await getPosts()
    }
  }

  const handleUpdate = async (id: number) => {
    setShowModal(true)
    setUpdatePostId(id)
    const resp = await fetch(`https://df883k90-4000.euw.devtunnels.ms/posts/${id}`)
    const data = await resp.json()
    setUpdateContent(data.content)
    setUpdateUserName(data.userName)
  }


  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const resp = await fetch(`https://df883k90-4000.euw.devtunnels.ms/posts/${updatePostId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: updateContent,
        userName: updateUserName
      })
    })

    if(resp.status === 200){
      setUpdatePostId(null)
      setShowModal(false)
      await getPosts()
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="p-4">
      {showModal ?
        <div onClick={() => {
          setShowModal(false)
          setUpdatePostId(null)
          }} className="w-full h-screen fixed flex items-center justify-center">
          <form onSubmit={updatePost} onClick={(e) => e.stopPropagation()} className="bg-gray-400">
            <input 
              type="text" 
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
              className="w-[200px] border-2 border-black h-8"
            />
            <input 
              type="text" 
              value={updateUserName}
              onChange={(e) => setUpdateUserName(e.target.value)}
              className="w-[200px] border-2 border-black h-8"
            />
            <button>Update Post</button>
          </form>
        </div> : null}

      <h1>Posts</h1>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <input
          required
          type="text"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[200px] border-2 border-black h-8"
        />
        <input
          required
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-[200px] border-2 border-black h-8"
        />
        <button className="bg-blue-500 p-4 rounded-md">Create New Post</button>
      </form>

      <div className="grid grid-cols-3 gap-2">
        {posts?.map(el => (
          <div key={el.id} className="rounded-md p-4 border-2 border-black">
            <h1>{el.content}</h1>
            <p>{el.userName}</p>
            <p>{el.createdAt}</p>
            <button onClick={() => handleDelete(el.id)} className="bg-red-500 p-2 rounded-sm">Delete</button>
            <button onClick={() => handleUpdate(el.id)} className="bg-blue-500 p-2 rounded-sm">Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}
