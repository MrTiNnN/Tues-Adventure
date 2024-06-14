import { useContext, useState } from "react"
import { DataContext } from "../../context/DataContext"
import AccountSection from "./AccountSection"

const Register = () => {
    const { ctaEmail, setCtaEmail } = useContext(DataContext)
    const [firstName, setFirstName] = useState('')
    const [classNumber, setClassNumber] = useState(8)
    const [classLetter, setClassLetter] = useState('a')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(null)

    const { navigate, crud } = useContext(DataContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email: ctaEmail,
            firstName,
            lastName,
            classNumber,
            classLetter,
            password,
            confirmPassword
        }

        console.log(obj)

        const response = await crud({
            url: '/authentication/registration/',
            method: 'post',
            body: obj
        })
        
        console.log(response)

        if(response.status == 201) {
            setCtaEmail('')
            
            navigate('/login')
        }
        else {
            setError(response.response.data)
        }
    }
    
    return (
        <AccountSection>
            <div className="account-textbox">
                <h2 className="account-heading">Регистрация</h2>
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
                    value={ctaEmail}
                    onChange={(e) => setCtaEmail(e.target.value)}
                    required
                />

                <input
                    className="account-input"
                    type="text" 
                    placeholder="Име"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <input
                    className="account-input"
                    type="text" 
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <select
                    className="account-select"
                    value={classNumber}
                    onChange={(e) => setClassNumber(e.target.value)}
                >
                    <option value={8} >8</option>
                    <option value={9} >9</option>
                    <option value={10} >10</option>
                    <option value={11} >11</option>
                    <option value={12} >12</option>
                </select>

                <select
                    className="account-select"
                    value={classLetter}
                    onChange={(e) => setClassLetter(e.target.value)}
                >
                    <option value={'a'} >А</option>
                    <option value={'b'} >Б</option>
                    <option value={'v'} >В</option>
                    <option value={'g'} >Г</option>
                </select>

                <input
                    className="account-input"
                    type="password" 
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    className="account-input"
                    type="password" 
                    placeholder="Потвърди Парола"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" className="account-btn">Регистрация</button>
            </form>
        </AccountSection>
    )
}

export default Register