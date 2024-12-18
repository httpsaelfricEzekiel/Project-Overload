import { useState, useEffect } from "react";

function Home() {
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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

    useEffect(() => {
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        if (!firstName || !lastName) {
            return;
        } else {
            setFirstName(firstName);
            setLastName(lastName);
        }
    }, [])
    
    return (
        <div>
            <h1>Home</h1>
            <p>{message}</p>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
        </div>
    );
}

export default Home;