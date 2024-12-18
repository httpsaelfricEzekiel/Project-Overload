import { useState, useEffect } from "react";

function Home() {
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    useEffect(() => {
        try {
            fetch("/home")
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message)
            })
            .catch((error) => {
                console.log(`Failed to retrieve data from server: ${error}`)
            })
        } catch (error) {
            console.log(`Failed to retrieve data from server: ${error}`)
        }
    }, [])

    useEffect(() => {
        try {
            const firstName = localStorage.getItem("firstName");
            const lastName = localStorage.getItem("lastName");
            if (!firstName || !lastName) {
                return;
            } else {
                setFirstName(firstName);
                setLastName(lastName);
            }
        } catch (error) {
            console.log(`Failed to retrieve data from local storage: ${error}`)
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