import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/DataContext"
import './verification.css'
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Verification = () => {
    const id = useParams().id
    const token = useParams().token

    const { crud } = useContext(DataContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

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

            if(response.status == 200) setMessage(response.data)
            if(response.status !== 200) setError(response.response.data)

            setLoading(false)
        }

        fetching()
    }, [])

    return (
        <section className="section verification-section">
            <div className="verification-container">
                {
                    loading &&
                    <>
                        <Loading />
                        <div className="verification-heading">Изчакайте, докато потвърдим акаунта Ви...</div>
                    </>
                }

                {
                    !loading && error &&
                    <>
                        <FaCircleXmark className="dot-spinner"/>
                        <div className="verification-heading">Грешка!</div>
                        <p className="verification-text">{error}</p>
                        <Link to='/register' className="verification-btn">Назад</Link>
                    </>
                }

                {
                    !loading && !error &&
                    <>
                        <FaCircleCheck className="dot-spinner"/>
                        <div className="verification-heading">Успешно!</div>
                        <p className="verification-text">Успешно потвърдихте акаунта си.</p>
                        <Link to='/login' className="verification-btn">Вход</Link>
                    </>
                }
            </div>
        </section>
    )
}

const Loading = () => {
    return (
        <div className="dot-spinner">
            {
                Array.from({ length: 8 }, _ => null).map(_ => (
                    <div className="dot-spinner__dot"></div>
                ))
            }
        </div>
    )
}

export default Verification