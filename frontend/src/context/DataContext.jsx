import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const navigate = useNavigate()

    const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('acc')) || null)

    const [ctaEmail, setCtaEmail] = useState('')

    return (
        <DataContext.Provider
            value={{
                navigate,
                ctaEmail, setCtaEmail,
                acc, setAcc
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider