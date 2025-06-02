'use client'

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type User = {
  id: number,
  fullName: string,
  email: string,
  avatar: string,
}

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [img, setImg] = useState<any | null>(null)

  const getAllusers = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
    const data = await resp.json()
    setUsers(data)
  }

  useEffect(() => {
    getAllusers()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('avatar', img[0])

    const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
      method: "POST",
      body: formData
    })
    if(resp.status === 201){
      await getAllusers()
    }
  }

  const handleDelete = async (id: number) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
      method: "DELETE"
    })

    if(resp.status === 200){
      await getAllusers()
    }
  }


  return (
    <div>
      <form className="my-8" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 w-[200px] h-[30px]"
          placeholder="full name"
          required   
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          className="border-2 w-[200px] h-[30px]"
          placeholder="email"
          required   
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="file" onChange={(e) => setImg(e.target.files)} />
        <button>Create User</button>
      </form>
      {users?.length ? users.map(el => (
        <div key={el.id}>
          <h1>{el.fullName}</h1>
          <Image src={el.avatar} alt={el.avatar} width={100} height={100} />
          <button onClick={() => handleDelete(el.id)}>Delete</button>
        </div>
      )) : <h1>Loading...</h1>}
    </div>
  );
}
