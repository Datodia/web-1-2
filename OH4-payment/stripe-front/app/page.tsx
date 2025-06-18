'use client'
import Image from "next/image";

export default function Home() {
  const handleBuy = async () => {
    const resp = await fetch('http://localhost:3001/stripe/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "nika@gmail.com",
        priceId: "price_1RbOacEWaHsE9wj7cCNHWtyG",
        quantity: 1
      })
    })

    const data = await resp.json()
    if(data.url) window.location.href = data.url
    
  }
  return (
    <div>
      <button onClick={handleBuy}>Buy Mabook</button>
    </div>
  );
}
