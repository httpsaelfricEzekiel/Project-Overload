import React, {useState, useEffect} from "react"

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((err) => console.log(`failed to fetch data ${err}`))
  }, [])

  return (
    <div>
      {typeof message === "object" ? (
        <h1>loading ....</h1>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  )
}

export default App;