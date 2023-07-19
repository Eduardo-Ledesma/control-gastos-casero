import { useState, useEffect, createContext } from "react"
import { toast } from "react-toastify"

const AdminContext = createContext()

const AdminProvider = ({children}) => {

    const [user, setUser] = useState(1)
    const [formAddExpense, setFormAddExpense] = useState(false)
    const [expenses, setExpenses] = useState([])
    
    // Agregar el gasto
    const addExpense = expense => {
        setExpenses([...expenses, expense])

        handleFormAddExpense()
        toast.success('Gasto Agregado!', {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
        });
    }

    // Definir el usuario
    const handleUser = num => {
        setUser(num)
    }

    // Ocultar el modal de formulario
    const handleFormAddExpense = () => {
        setFormAddExpense(false)
    }

    // Handle para manejar agregar gasto
    const handleAddExpense = expense => {
        addExpense(expense)
    }
    return <AdminContext.Provider
        value={{
            handleUser,
            user,
            formAddExpense,
            setFormAddExpense,
            handleFormAddExpense,
            handleAddExpense,
            expenses
        }}
    >
        {children}
    </AdminContext.Provider>
}

export { 
    AdminProvider
}

export default AdminContext