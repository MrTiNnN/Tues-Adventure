import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const navigate = useNavigate()

    const [ctaEmail, setCtaEmail] = useState('')

    return (
        <DataContext.Provider
            value={{
                navigate,
                ctaEmail, setCtaEmail
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider