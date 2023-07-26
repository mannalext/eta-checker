import { useState } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [streetAddress, setStreetAddress] = useState('5151 Bonner Drive');
  const [city, setCity] = useState('Hilliard');
  const [state, setState] = useState('Ohio');
  const [zipCode, setZipCode] = useState('43026');
  const [data, setData] = useState(null);


  const handleButtonClick = async () => {
    const res = await fetch('/api/directions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ streetAddress, city, state, zipCode })
    });
    const data = await res.json();
  
    setData(data);
    console.log(data);
  }

  return (
    <div className="container">
      <Head>
        <title>ETA-Checker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Check ETAs to a new address:" />
        <p className="description">
          Enter the address of the new house in the fields below
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
        {data && (
          <div className="results-container">
            {data.map((item, index) => (
              <div key={index}>
                <p>{JSON.stringify(item.origin).replace("\"", "")}:</p>
                <pre>Distance: {JSON.stringify(item.distance).replace("\"", "")}</pre>
                <pre>Duration: {JSON.stringify(item.duration).replace("\"", "")}</pre>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
