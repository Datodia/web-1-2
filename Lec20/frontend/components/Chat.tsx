import socket from '@/config/socket'
import React, { FormEvent, useEffect, useState } from 'react'

type PropType = {
    roomId: string,
    userEmail: string
}

type MessageType = PropType & {
    msg: string
}

export default function Chat({ roomId, userEmail }: PropType) {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [msg, setMsg] = useState('')

    const handleSendPrivateMsg = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        socket.emit('privateMessage', { roomId, userEmail, msg })
        setMsg('')
    }

    useEffect(() => {
        socket.on('privateMessage', (data: MessageType) => {
            setMessages(prev => [...prev, data])
        })
    }, [socket])

    return (
        <div>
            <h1>Chat</h1>

            <form onSubmit={handleSendPrivateMsg}>
                <input
                    type="text"
                    placeholder="write text"
                    className="border-2"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                />
            </form>
            <div className='p-2 border'>
                {messages.map((el, i) => (
                    <div key={i} className={`border-2 w-1/3 ${userEmail === el.userEmail ? 'justify-self-end' : ''} `}>
                        <h2>{el.msg}</h2>
                        <p>{el.userEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
