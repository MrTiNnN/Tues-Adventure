import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(localStorage.getItem('refresh') || null)
    const [access, setAccess] = useState(localStorage.getItem('access') || null)

    const [ctaEmail, setCtaEmail] = useState('')


    // Sets the url for the backend server
    axios.defaults.baseURL = 'http://127.0.0.1:8000'

    // Makes a CRUD operation to the backend server
    const crud = async ({ url, method, body = null, headers = null }) => {
        try {
            const config = {
                headers: access ? {
                    'Authorization': `Bearer ${access}`,
                    ...headers
                } : {
                    headers
                }
            }

            let response;
            if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
                response = await axios[method](url, config);
            } else {
                response = await axios[method](url, body, config);
            }

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
                refresh, setRefresh, access, setAccess,
                crud
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider