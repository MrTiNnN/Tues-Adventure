import axios from "axios"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const responseGet = await axios.get(`http://localhost:8000/accounts`)

        let foundAcc

        if(responseGet.data.length) foundAcc = responseGet.data.find(account => account.email === email)

        if(foundAcc) {
            if(password === foundAcc.password) console.log('login successful')
            else console.log('wrong password')
        }
        else console.log('didnt find it')
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                type="email" 
                placeholder="Elsys Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password" 
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn">Вход</button>
        </form>
    )
}

export default Login