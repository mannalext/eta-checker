import { useState } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [streetAddress, setStreetAddress] = useState('5151 Bonner Drive');
  const [city, setCity] = useState('Hilliard');
  const [state, setState] = useState('Ohio');
  const [zipCode, setZipCode] = useState('43026');

  // const handleButtonClick = async () => {
  //   try {
  //     const result1 = await fetch(`https://maps.googleapis.com/maps/api/directions/json?destination=${streetAddress.replace(' ', '+')}+${city}+${state}+${zipCode}&origin=3596+South+Medina+Line+Road+Wadsworth+Ohio+44281&key=AIzaSyBYhfwE4TJKvDSrcFfdSXqMUpzz8v2Y4k8`);
  //   } catch (error) {
  //     console.log(JSON.stringify(error))
  //   }
  //   // TODO: other calls
  //   console.log(result1);
  // }

  const handleButtonClick = async () => {
    const res = await fetch('/api/directions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ streetAddress, city, state, zipCode })
    });
    const data = await res.json();
  
    console.log(data);
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Check ETAs from a new address:" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="addressContainer">
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Street Address"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Ohio"
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip Code"
          />
        </div>
        <button onClick={handleButtonClick}>
            magic
          </button>
      </main>

      <Footer />
    </div>
  )
}
