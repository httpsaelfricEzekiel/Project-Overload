import { useState, useEffect } from "react";

function Home() {
    
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("/home")
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message)
            })
            .catch((error) => {
                console.log(`Failed to retrieve data from server: ${error}`)
            })
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <p>{message}</p>
        </div>
    );
}

export default Home;