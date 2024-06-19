import { useContext, useEffect, useState } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './newAdventure.css'
import { DataContext } from '../../context/DataContext'

const NewAdventure = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())
    
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())

    const { crud } = useContext(DataContext)

    useEffect(() => {
        setDay(date.getDate())
        setMonth(date.getMonth() + 1)
        setYear(date.getFullYear())
    }, [date])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(day)
        console.log(month)
        console.log(year)

        const obj = {
            name,
            description,
            date: `${day}-${month}-${year}`
        }

        const response = await crud({
            url: 'adventure/creation/',
            method: 'post',
            body: obj
        })

        console.log(response)
    }

    return (
        <section className="section section-new">
            <form className="adventure-form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Заглавие"
                    required
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                    required
                />

                <DatePicker selected={date} onChange={e => setDate(e)} />

                <button type="submit" className="btn">Създаване</button>
            </form>
        </section>
    )
}

export default NewAdventure