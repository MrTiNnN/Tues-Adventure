import { useState } from "react"
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [classNumber, setClassNumber] = useState(8)
    const [classLetter, setClassLetter] = useState('a')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        let id = 1

        const responseGet = await axios.get('http://localhost:8000/accounts')

        if(responseGet.data.length) id = responseGet.data[responseGet.data.length - 1].id + 1

        console.log(id)

        const obj = {
            id,
            email,
            firstName,
            lastName,
            class: `${classNumber}${classLetter}`,
            password
        }

        try {
            const response = await axios.post('http://localhost:8000/accounts', obj)
            
            console.log(response)
        } catch(err) {
            console.log(err)
        } finally {
            setEmail('')
            setFirstName('')
            setLastName('')
            setClassNumber(8)
            setClassLetter('a')
            setPassword('')
        }
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

            <button type="submit" className="btn">Регистрация</button>
        </form>
    )
}

export default Register