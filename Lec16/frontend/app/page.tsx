'use client'
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any>([])
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postImg, setPostImg] = useState<FileList | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [postId, setPostId] = useState('')
  const [updateModalTitle, setUpdateModalTitle] = useState('')
  const [updateModalContent, setUpdateModalCotent] = useState('')
  const [updatePost, setUpdatePost] = useState<any>({})
  const [updateModalImg, setUpdateModalImg] = useState<FileList | null>(null)

  const [loadingId, setLoadingId] = useState('')

  const router = useRouter()

  const token = getCookie('accessToken')

  if (!token) {
    router.push('/auth/sign-in')
    return
  }


  const getUser = async () => {
    const resp = await fetch('http://localhost:4000/auth/current-user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await resp.json()

    if (resp.status === 200) {
      setUser(data)
    } else {
      deleteCookie('accessToken')
      router.push('/auth/sign-in')
    }
  }

  const getPosts = async () => {
    const resp = await fetch('http://localhost:4000/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await resp.json()

    if (resp.status === 200) {
      setPosts(data)
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])


  const hanldeUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setPostImg(e.target.files)
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData()


    formdata.append('title', postTitle)
    formdata.append('content', postContent)
    if (postImg && postImg[0]) {
      formdata.append('image', postImg[0])
    }

    const resp = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formdata
    })

    if (resp.status === 201) {
      getPosts()
      setPostTitle('')
      setPostContent('')
    }

  }

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    const resp = await fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (resp.status === 200) {
      getPosts()
      setLoadingId('')
    }
  }

  const getPostById = async (id: string) => {
    const resp = await fetch(`http://localhost:4000/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await resp.json()

    if (resp.status === 200) {
      setUpdatePost(data)
      setUpdateModalCotent(data.content)
      setUpdateModalImg(data.image)
      setUpdateModalTitle(data.title)
    }
  }

  const handleEdit = async (id: string) => {
    await getPostById(id)
    setPostId(id)
    setShowModal(true)
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData()


    formdata.append('title', updateModalTitle)
    formdata.append('content', updateModalContent)
    if (updateModalImg && updateModalImg[0]) {
      formdata.append('image', updateModalImg[0])
    }

    const resp = await fetch(`http://localhost:4000/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formdata
    })

    if (resp.status === 200) {
      getPosts()
      setUpdateModalCotent('')
      setUpdateModalTitle('')
      setPostId('')
      setShowModal(false)
    }
  }


  return (
    <div>
      <h1>Hello world</h1>
      <h1>{user?.fullName}</h1>
      <h1>{user?.email}</h1>

      {showModal ? <div onClick={() => setShowModal(false)} className="fixed top-0 w-full h-screen flex items-center justify-center bg-black/70">
        <form onSubmit={handleUpdate} className="flex p-2 bg-white flex-col gap-2 w-1/3 mx-auto" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            onChange={(e) => setUpdateModalTitle(e.target.value)}
            value={updateModalTitle}
            className="border-2"
          />
          <input
            type="text"
            onChange={(e) => setUpdateModalCotent(e.target.value)}
            value={updateModalContent}
            className="border-2"
          />
          {updatePost?.image ? <Image src={updatePost?.image} alt="rame" width={50} height={50} /> : null}
          <input
            type="file"
            onChange={(e) => setUpdateModalImg(e.target.files)}
          />
          <button className="p-2 bg-blue-500">Update</button>
        </form>
      </div> : null}

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 w-1/3 mx-auto">
        <input
          type="text"
          placeholder="Post title"
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
          className="border-2"
        />
        <input
          type="text"
          placeholder="Post content"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
          className="border-2"
        />
        <input
          type="file"
          onChange={hanldeUploadImage}
        />
        <button className="bg-blue-500 p-2">Create Post</button>
      </form>

      <div>
        {posts.map((e: any) => (
          <div className="border-2 border-black">
            {e.image ? <Image
              src={e.image}
              alt={e.title}
              width={50}
              height={50}
            /> : null}
            <h1>{e.title}</h1>
            <h1>{e.content}</h1>
            <p>{e.author.email}</p>
            {e.author._id === user._id ? <button onClick={() => handleDelete(e._id)} className="p-2 bg-red-500">{loadingId === e._id ? 'deleting...' : 'Delete'}</button> : null}
            {e.author._id === user._id ? <button onClick={() => handleEdit(e._id)} className="p-2 bg-blue-500">Edit</button> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
