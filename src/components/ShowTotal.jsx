import { useState, useEffect } from "react"
import useAdmin from "../hooks/useAdmin"

const ShowTotal = () => {

    const [fixed, setFixed] = useState('')
    const [buys, setBuys] = useState('')
    const [cat, setCat] = useState('')
    const [allowed, setAllowed] = useState('')
    const [division, setDivision] = useState(null)
    const [debt, setDebt] = useState('')
    const [favor, setFavor] = useState('')
    
    const { total, expenses, expensesUser1, expensesUser2 } = useAdmin()

    const calculateCategory = () => {
        setFixed(expenses.filter(exp => exp.category === 'gastosFijos').reduce((acc, exp) => Number(exp.price) + acc, 0))
        setBuys(expenses.filter(exp => exp.category === 'compras').reduce((acc, exp) => Number(exp.price) + acc, 0))
        setCat(expenses.filter(exp => exp.category === 'gato').reduce((acc, exp) => Number(exp.price) + acc, 0))
        setAllowed(expenses.filter(exp => exp.category === 'permitidos').reduce((acc, exp) => Number(exp.price) + acc, 0))
    }

    const calculateDivision = () => {
        if(expensesUser1 > expensesUser2) {
            setDivision((expensesUser1 - expensesUser2) / 2)
            setDebt('Janis')
            setFavor('Edu')
        } else {
            setDivision((expensesUser2 - expensesUser1) / 2)
            setDebt('Edu')
            setFavor('Janis')
        }
    }

    useEffect(() => {
        calculateDivision()
    }, [total])

    useEffect(() => {
        calculateCategory()
    }, [expenses])

    return (
        <>
            <div className="flex gap-3 justify-center items-center mb-10">
                <h3 className='font-bold text-3xl sm:text-5xl'>Total:</h3>
                <p className='text-amber-500 font-bold text-3xl sm:text-5xl animate__animated animate__heartBeat'>${total}</p>
            </div>

            <div>
                <h4 className="text-2xl font-bold mb-2">Resumen:</h4>
                { fixed > 0 && <p className="mb-1 text-lg">Gastos Fijos: <span className="text-amber-500 font-bold">${fixed}</span></p> }
                { buys > 0 && <p className="mb-1 text-lg">Compras: <span className="text-amber-500 font-bold">${buys}</span></p> }
                { cat > 0 && <p className="mb-1 text-lg">Gato: <span className="text-amber-500 font-bold">${cat}</span></p> }
                { allowed > 0 && <p className="text-lg">Permitidos: <span className="text-amber-500 font-bold">${allowed}</span></p> }
                <p className="mb-1 mt-4 text-lg">Edu gastó: <span className="text-amber-500 font-bold">${expensesUser1}</span></p>
                <p className="text-lg">Janis gastó: <span className="text-amber-500 font-bold">${expensesUser2}</span></p>
                { division > 0 ? 
                    <p className="text-2xl mt-4 text-green-500">{debt} debe: <span className="text-amber-500 font-bold">${division}</span> a {favor}.</p> :
                    <p className="text-2xl mt-4 text-green-500">Ambos gastaron lo mismo</p>} 
            </div>

        </>
    )
}

export default ShowTotal