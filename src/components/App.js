import Map from './Map';
import React, { useEffect, useState} from 'react';




function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setdata] = useState({})

      useEffect(() => {
          fetch(`http://localhost:5067/api/restaurant`)
          .then((response) => response.json())
          .then(({ data }) => {
          setdata(data)
          setLoading(false);
          })
      }, [])
  
  
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
      <div>
      <Map data={data} setdata={setdata} />
      </div>
    )
}

export default App
