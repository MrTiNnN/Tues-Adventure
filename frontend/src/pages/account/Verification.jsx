import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Verification = () => {
    const id = useParams().id
    const token = useParams().token

    useEffect(() => {
        const fetching = async () => {
            const obj = {
                id,
                token
            }

            const response = await axios.patch('http://127.0.0.1:8000/authentication/verification/', obj)

            console.log(response)
        }

        fetching()
    }, [])

    return (
        <div className="account-form">
            You confirmed it yay
        </div>
    )
}

export default Verification