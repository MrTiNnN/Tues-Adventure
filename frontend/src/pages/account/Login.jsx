import axios from "axios"
import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import './account.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { navigate, setAcc } = useContext(DataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email,
            password
        }

        try {
            const response = await axios.post(`http://localhost:8000/authentication/authentication/`, obj)

            console.log(response)

            if(response.status == 200) {
                setAcc(response.data.user.id)
                localStorage.setItem('acc', response.data.user.id)
                navigate('/')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="account-form">
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