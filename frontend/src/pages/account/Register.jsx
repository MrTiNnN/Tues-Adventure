import { useContext, useState } from "react"
import axios from 'axios'
import { DataContext } from "../../context/DataContext"

const Register = () => {
    const { ctaEmail, setCtaEmail } = useContext(DataContext)
    const [firstName, setFirstName] = useState('')
    const [classNumber, setClassNumber] = useState(8)
    const [classLetter, setClassLetter] = useState('a')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { navigate } = useContext(DataContext)

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

        try {
            const response = await axios.post('http://localhost:8000/authentication/registration/', obj)
            
            console.log(response)

            if(response.status == 201) {
                // setCtaEmail('')
                // setFirstName('')
                // setLastName('')
                // setClassNumber(8)
                // setClassLetter('a')
                // setPassword('')
                // setConfirmPassword('')
                
                // navigate('/login')
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
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Име"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <select 
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
                value={classLetter}
                onChange={(e) => setClassLetter(e.target.value)}
            >
                 <option value={'a'} >А</option>
                 <option value={'b'} >Б</option>
                 <option value={'v'} >В</option>
                 <option value={'g'} >Г</option>
            </select>

            <input 
                type="password" 
                placeholder="Парола"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input 
                type="password" 
                placeholder="Потвърди Парола"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="btn">Регистрация</button>
        </form>
    )
}

export default Register