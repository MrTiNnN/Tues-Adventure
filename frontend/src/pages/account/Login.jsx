import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import './account.css'
import wave from '../../img/wave.png'
import AccountSection from "./AccountSection"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)

    const { navigate, setAcc, crud } = useContext(DataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email,
            password
        }

        const response = await crud({
            url: '/authentication/authentication/',
            method: 'post',
            body: obj
        })

        console.log(response)

        if(response.status == 200) {
            setAcc(response.data.user.id)
            localStorage.setItem('acc', response.data.user.id)
            navigate('/')
        }
        else {
            setError(response.response.data)
        }
    }

    return (
        <AccountSection>
            <div className="account-textbox login">
                <h2 className="account-heading">Вход</h2>
                <p className="account-text">Влезте в акаунта си, за да виждате дейностите на <span>TUES Adventure</span></p>
                {
                    error &&
                    <p className="account-text error">{error}</p>
                }
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="account-form">
                <input
                    className="account-input"
                    type="email" 
                    placeholder="Elsys Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="account-input" 
                    type="password" 
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="account-btn">Вход</button>
            </form>
        </AccountSection>
    )
}

export default Login