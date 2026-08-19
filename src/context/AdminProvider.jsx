import { createContext, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../lib/supabase'

const AdminContext = createContext()

const getLocalDate = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000

  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

const formatDate = date => {
  const [, month, day] = date.split('-')

  return `${day}/${month}`
}

const AdminProvider = ({ children }) => {
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')) ?? null)
  const [formAddExpense, setFormAddExpense] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [expense, setExpense] = useState({})
  const [expensesUser1, setExpensesUser1] = useState(0)
  const [expensesUser2, setExpensesUser2] = useState(0)
  const [passwordModal, setPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [access, setAccess] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const [authUserId, setAuthUserId] = useState(null)
  const [wrongPassword, setWrongPassword] = useState(false)
  const [apiDown, setApiDown] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getAllExpenses = useCallback(async () => {
    setIsLoading(true)

    const { data, error } = await supabase
      .from('expenses')
      .select('id, name, category, price, username, date')
      .order('created_at', { ascending: true })

    if (error) {
      setApiDown(true)
      setIsLoading(false)
      return
    }

    setExpenses(data.map(item => ({ ...item, date: formatDate(item.date) })))
    setApiDown(false)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true

    const restoreSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (mounted) {
        setAccess(Boolean(session))
        setAuthUserId(session?.user.id ?? null)
        setAuthReady(true)
      }
    }

    restoreSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return

      setAccess(Boolean(session))
      setAuthUserId(session?.user.id ?? null)
      setAuthReady(true)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (access) {
      getAllExpenses()
    } else if (authReady) {
      setExpenses([])
    }
  }, [access, authReady, getAllExpenses])

  useEffect(() => {
    const totalExpenses = expenses.reduce((acc, item) => Number(item.price) + acc, 0)
    const user1Total = expenses
      .filter(item => item.username === 'Edu')
      .reduce((acc, item) => Number(item.price) + acc, 0)
    const user2Total = expenses
      .filter(item => item.username === 'Janis')
      .reduce((acc, item) => Number(item.price) + acc, 0)

    setTotal(totalExpenses)
    setExpensesUser1(user1Total)
    setExpensesUser2(user2Total)
  }, [expenses])

  const resetApp = async () => {
    if (!authUserId) return

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('owner_id', authUserId)

    if (error) {
      toast.error('No se pudieron eliminar los gastos', {
        position: 'top-center',
        theme: 'colored',
      })
      return
    }

    await getAllExpenses()
  }

  const addExpense = async newExpense => {
    setIsSubmiting(true)

    const { error } = await supabase
      .from('expenses')
      .insert({
        name: newExpense.name,
        category: newExpense.category,
        price: Number(newExpense.price),
        username: newExpense.username,
        date: getLocalDate(),
      })

    if (error) {
      setIsSubmiting(false)
      return 500
    }

    await getAllExpenses()
    handleFormAddExpense()
    setIsSubmiting(false)
    return 200
  }

  const editExpense = async updatedExpense => {
    setIsSubmiting(true)

    const { error } = await supabase
      .from('expenses')
      .update({
        name: updatedExpense.name,
        category: updatedExpense.category,
        price: Number(updatedExpense.price),
        username: updatedExpense.username,
      })
      .eq('id', updatedExpense.id)

    if (error) {
      setIsSubmiting(false)
      return 500
    }

    await getAllExpenses()
    handleFormAddExpense()
    setIsSubmiting(false)
    return 200
  }

  const deleteExpense = async id => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('No se pudo eliminar el gasto', {
        position: 'top-center',
        theme: 'colored',
      })
      return
    }

    await getAllExpenses()
    handleFormAddExpense()
    toast.success('Gasto Eliminado!', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'colored',
    })
  }

  const handleUser = selectedUsername => {
    setUsername(selectedUsername)

    if (access) {
      localStorage.setItem('username', JSON.stringify(selectedUsername))
      return
    }

    setPasswordModal(true)
  }

  const handleGetExpenseById = async id => expenses.find(item => item.id === id)

  const handleFormAddExpense = () => {
    setFormAddExpense(false)
    setExpense({})
  }

  const handleAddExpense = async newExpense => addExpense(newExpense)

  const handleEditExpense = selectedExpense => {
    setExpense(selectedExpense)
    setFormAddExpense(true)
  }

  const handleConfirmEditExpense = async updatedExpense => editExpense(updatedExpense)

  const handleDeleteExpense = async id => {
    await deleteExpense(id)
  }

  const handleLogOut = () => {
    setUsername(null)
    localStorage.removeItem('username')
  }

  const handleSetPassword = value => {
    setPassword(value)
  }

  const handlePasswordSubmit = async event => {
    event.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_SUPABASE_LOGIN_EMAIL,
      password,
    })

    if (error) {
      setWrongPassword(true)
      setTimeout(() => setWrongPassword(false), 3500)
      return
    }

    setAccess(true)
    setPassword('')
    setPasswordModal(false)
    localStorage.setItem('username', JSON.stringify(username))
  }

  const handleHidePasswordModal = () => {
    setPassword('')
    setPasswordModal(false)
  }

  return (
    <AdminContext.Provider
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
        authReady,
        wrongPassword,
        apiDown,
        isSubmiting,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export { AdminProvider }
export default AdminContext
