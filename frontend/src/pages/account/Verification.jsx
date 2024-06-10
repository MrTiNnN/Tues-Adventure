import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/DataContext"

const Verification = () => {
    const id = useParams().id
    const token = useParams().token

    const { crud } = useContext(DataContext)

    useEffect(() => {
        const fetching = async () => {
            const obj = {
                id,
                token
            }

            const response = await crud({
                url: '/authentication/verification/',
                method: 'patch',
                body: obj
            })

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