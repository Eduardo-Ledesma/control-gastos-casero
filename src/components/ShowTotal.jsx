import { useState, useEffect } from "react"
import useAdmin from "../hooks/useAdmin"

const ShowTotal = () => {

    const [fixed, setFixed] = useState('')
    const [buys, setBuys] = useState('')
    const [cat, setCat] = useState('')
    const [allowed, setAllowed] = useState('')
    const { total, expenses } = useAdmin()

    const calculateCategory = () => {
        setFixed(expenses.filter(exp => exp.category === 'gastosFijos').reduce((acc, exp) => exp.price + acc, 0))
        setBuys(expenses.filter(exp => exp.category === 'compras').reduce((acc, exp) => exp.price + acc, 0))
        setCat(expenses.filter(exp => exp.category === 'gato').reduce((acc, exp) => exp.price + acc, 0))
        setAllowed(expenses.filter(exp => exp.category === 'permitidos').reduce((acc, exp) => exp.price + acc, 0))
    }

    useEffect(() => {
        calculateCategory()
    }, [expenses])

    return (
        <>
            <div className="flex gap-3 justify-center items-center mb-10">
                <h3 className='font-bold text-5xl'>Total:</h3>
                <p className='text-amber-500 font-bold text-5xl'>${total}</p>
            </div>

            <div>
                <h4 className="text-2xl font-bold mb-2">Resumen:</h4>
                { fixed > 0 && <p className="mb-1 text-lg">Gastos Fijos: <span className="text-amber-500 font-bold">${fixed}</span></p> }
                { buys > 0 && <p className="mb-1 text-lg">Compras: <span className="text-amber-500 font-bold">${buys}</span></p> }
                { cat > 0 && <p className="mb-1 text-lg">Gato: <span className="text-amber-500 font-bold">${cat}</span></p> }
                { allowed > 0 && <p className="text-lg">Permitidos: <span className="text-amber-500 font-bold">${allowed}</span></p> }
            </div>
        </>
    )
}

export default ShowTotal