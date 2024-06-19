import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context/DataContext"
import './allAdventures.css'

const AllAdventures = () => {
    const { crud, navigate, refresh, access } = useContext(DataContext)

    const [adventures, setAdventures] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!refresh && !access) navigate('/login')
    }, [])

    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                url: '/adventure/allAdventures/',
                method: 'get'
            })

            setLoading(false)

            if(response.status == 200) setAdventures(response.data.adventures)
            else setError(true)

            // console.log(response)
        }

        fetching()
    }, [])

    return (
        <section className="section section-adventures">
            {
                loading &&
                <h2>Loading...</h2>
            }

            {
                !loading && error &&
                <h2>Error retrieving adventures.</h2>
            }

            {
                !loading && !error && adventures &&
                <>
                    {
                        adventures.map(adventure => (
                            <div key={adventure.id} onClick={() => navigate(`/adventure/${adventure.id}`)} className="adventure-container">
                                <h1>{adventure.name}</h1>
                                <p>{adventure.description}</p>
                                <p>{adventure.date}</p>
                            </div>
                        ))
                    }
                </>
            }
        </section>
    )
}

export default AllAdventures