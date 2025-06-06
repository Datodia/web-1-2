'use client'

import Chat from "@/components/Chat";
import socket from "@/config/socket";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [echo, setEcho] = useState('')
  const [echos, setEchos] = useState<string[]>([])

  const [groupMsg, setGroupMsg] = useState('')
  const [groupMsgs, setGroupMsgs] = useState<string[]>([])

  const [roomId, setRoomId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showChat, setShowChat] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    socket.emit('echoReciever', echo)
    setEcho('')
  }

  const handleGroupMessages = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    socket.emit('groupChat', groupMsg)
    setGroupMsg('')
  }

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    socket.emit('joinRoom', { roomId, userEmail })
    setShowChat(true)
  }

  useEffect(() => {
    socket.on('echoSender', (data) => {
      setEchos(prev => [...prev, data])
    })

    socket.on('groupChat', (data) => {
      setGroupMsgs(prev => [...prev, data])
    })
  }, [socket])

  return (
    <div>
      {showChat ? <Chat roomId={roomId} userEmail={userEmail} /> :
        <>
          <h1>Hello wrold</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="echo"
              className="border-2"
              value={echo}
              onChange={(e) => setEcho(e.target.value)}
            />
          </form>
          {echos.map((e, i) => (
            <h1 key={i}>{e}</h1>
          ))}

          <form onSubmit={handleGroupMessages}>
            <input
              type="text"
              placeholder="GroupChat"
              className="border-2"
              value={groupMsg}
              onChange={(e) => setGroupMsg(e.target.value)}
            />
          </form>
          {groupMsgs.map((e, i) => (
            <h1 key={i}>{e}</h1>
          ))}

          <form onSubmit={handleJoinRoom} className="mt-2">
            <input
              type="text"
              placeholder="RoomId"
              className="border-2"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="User Email"
              className="border-2"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <button>Join Room</button>
          </form>
        </>
      }
    </div>
  );
}
