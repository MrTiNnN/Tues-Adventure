import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/DataContext"

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

    return (
        <section className="section">
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
                </>
            }
        </section>
    )
}

export default Adventure