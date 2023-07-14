import { useState, useEffect, createContext } from "react"

const AdminContext = createContext()

const AdminProvider = ({children}) => {

    const [user, setUser] = useState(false)

    const handleUser = () => {
        setUser(true)
    }

    return <AdminContext.Provider
        value={{
            handleUser,
            user
        }}
    >
        {children}
    </AdminContext.Provider>
}

export { 
    AdminProvider
}

export default AdminContext