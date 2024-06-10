import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const navigate = useNavigate()

    const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('acc')) || null)

    const [ctaEmail, setCtaEmail] = useState('')


    // Sets the url for the backend server
    axios.defaults.baseURL = 'http://127.0.0.1:8000'

    // Makes a CRUD operation to the backend server
    const crud = async ({ url, method, body = null, headers = null }) => {
        try {
            const response = await axios[method](url, body, headers)

            if(response) return response
        } catch(err) {
            return err
        }
    }

    return (
        <DataContext.Provider
            value={{
                navigate,
                ctaEmail, setCtaEmail,
                acc, setAcc,
                crud
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider