import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/DataContext"
import './adventure.css'

const Adventure = () => {
    const id = useParams().id

    const { crud } = useContext(DataContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [adventure, setAdventure] = useState(null)

    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                url: `adventure/adventure?id=${id}`,
                method: 'get'
            })

            console.log(response)
            setLoading(false)

            if(response.status == 200) {
                setAdventure(response.data)
            }
            else setError(response.response.data)
        }

        fetching()
    }, [id])

    const handleSigningUp = async () => {
        const response = await crud({
            url: `adventure/signingUp/?id=${id}`,
            method: 'patch'
        })

        console.log(response)
    }

    return (
        <section className="section section-adventure">
            {
                loading &&
                <p>LOADING</p>
            }

            {
                !loading && error &&
                <p>{error}</p>
            }

            {
                !loading && !error && adventure &&
                <>
                    <h1>{adventure.name}</h1>
                    <p>{adventure.description}</p>
                    <p>{adventure.date}</p>
                    <p>Participants: </p>
                    <ul>
                        {
                            adventure.participants.map((participant, i) => (
                                <li key={i}>{participant.firstName} {participant.lastName} ({participant.grade})</li>
                            ))
                        }
                    </ul>
                    <button className="btn" onClick={handleSigningUp}>Ще участвам</button>
                </>
            }
        </section>
    )
}

export default Adventure