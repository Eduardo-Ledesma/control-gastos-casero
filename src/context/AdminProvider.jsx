import { useState, useEffect, createContext } from "react"
import { toast } from "react-toastify"

const AdminContext = createContext()

const AdminProvider = ({children}) => {

    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')) ?? null)
    const [formAddExpense, setFormAddExpense] = useState(false)
    const [expenses, setExpenses] = useState([])
    const [total, setTotal] = useState(0)
    const [expense, setExpense] = useState({})
    const [expensesUser1, setExpensesUser1] = useState([])
    const [expensesUser2, setExpensesUser2] = useState([])
    const [passwordModal, setPasswordModal] = useState(false)
    const [password, setPassword] = useState('')
    const [access, setAccess] = useState(JSON.parse(localStorage.getItem('access')) ?? false)
    const [wrongPassword, setWrongPassword] = useState(false)

    const divideExpenses = () => {
        if(expenses.length > 0) {
            setExpensesUser1(expenses.filter(exp => exp.username === 'Edu').reduce((acc, exp) => exp.price + acc, 0))
            setExpensesUser2(expenses.filter(exp => exp.username === 'Janis').reduce((acc, exp) => exp.price + acc, 0))
        }
    }    

    const resetApp = async () => {
        try {
            const result = await fetch(import.meta.env.VITE_BACKEND_URL, { method: 'DELETE' })
            if(result.ok) {
                await getAllExpenses()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const calcTotal = () => {
        if(expenses.length > 0) {
            const totalExpenses = expenses.reduce((acc, exp) => exp.price + acc, 0)
            setTotal(totalExpenses);
        }
    }

    useEffect(() => {
        const init = async () => {
            if(access) {
                await getAllExpenses()
            }
        }
        init()
    }, [access])

    useEffect(() => {
        calcTotal()
        divideExpenses()
    }, [expenses])

    const getAllExpenses = async () => {
        try {
            const result = await fetch(import.meta.env.VITE_BACKEND_URL)
            const expenses = await result.json()
            setExpenses(expenses);
        } catch (error) {
            console.log(error);
        }
    }

    const getExpenseById = async id => {
        try {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${id}`)
            const expense = await result.json()
            if(expense) {
                return expense
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar el gasto
    const addExpense = async expense => {
        try {
            const result = await fetch(import.meta.env.VITE_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            })
            if(result.ok) {
                await getAllExpenses()
                handleFormAddExpense()
                toast.success('Gasto Agregado!', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Editar el gasto
    const editExpense = async expense => {
        try {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${expense.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            })
            if(result.ok) {
                await getAllExpenses()
                handleFormAddExpense()
                toast.success('Gasto Editado Correctamente!', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar el gasto
    const deleteExpense = async id => {
        try {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${id}`, { method: 'DELETE' })
            if (result.ok) {
                await getAllExpenses()
                handleFormAddExpense()
                toast.success('Gasto Eliminado!', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Definir el usuario
    const handleUser = username => {
        setUsername(username)
        setPasswordModal(true)
    }

    const handleGetExpenseById = async id => {
        const [expense] = await getExpenseById(id)
        return expense;
    }

    // Ocultar el modal de formulario
    const handleFormAddExpense = () => {
        setFormAddExpense(false)
        setExpense({})
    }

    // Handle para manejar agregar gasto
    const handleAddExpense = async expense => {
        await addExpense(expense)
    }

    // handle para llenar el form con el gasto a editar
    const handleEditExpense = expense => {
        setExpense(expense)
        setFormAddExpense(true)
    }

    // Handle para manejar confirmar editar gasto
    const handleConfirmEditExpense = async expense => {
        await editExpense(expense)
    }

    // Handle para manejar eliminar gasto
    const handleDeleteExpense = async id => {
        await deleteExpense(id)
    }

    const handleLogOut = () => {
        setUsername(null)
        setAccess(false)
        localStorage.removeItem('username')
        localStorage.removeItem('access')
    }

    const handleSetPassword = evt => {
        setPassword(evt)
    }

    const handlePasswordSubmit = async e => {
        e.preventDefault()

        if(password === import.meta.env.VITE_API_PASSWORD) {
            setAccess(true)
            localStorage.setItem('username', JSON.stringify(username))
            localStorage.setItem('access', JSON.stringify(true))
        } else {
            setWrongPassword(true)
            setTimeout(() => {
                setWrongPassword(false)
            }, 3500)
        }
    }

    const handleHidePasswordModal = () => {
        setPasswordModal(false)
    }

    return <AdminContext.Provider
        value={{
            handleUser,
            username,
            formAddExpense,
            setFormAddExpense,
            handleGetExpenseById,
            handleFormAddExpense,
            handleAddExpense,
            expenses,
            total,
            handleEditExpense,
            handleConfirmEditExpense,
            handleDeleteExpense,
            expense,
            resetApp,
            expensesUser1,
            expensesUser2,
            handleLogOut,
            passwordModal,
            handleHidePasswordModal,
            password,
            handleSetPassword,
            handlePasswordSubmit,
            access,
            wrongPassword
        }}
    >
        {children}
    </AdminContext.Provider>
}

export { 
    AdminProvider
}

export default AdminContext