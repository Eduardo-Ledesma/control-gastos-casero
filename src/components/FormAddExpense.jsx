import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useAdmin from '../hooks/useAdmin'

function FormAddExpense() {

    const [id, setId] = useState(null)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [categoryAlert, setCategoryAlert] = useState({})
    const [typeAlert, setTypeAlert] = useState({})
    const [priceAlert, setPriceAlert] = useState({})

    const { formAddExpense, handleFormAddExpense, handleAddExpense, expense, handleConfirmEditExpense, user } = useAdmin()

    useEffect(() => {
        if(formAddExpense === true) {
            if(expense?.category) {
                const { category, type, price, id } = expense
                setCategory(category)
                setType(type)
                setPrice(price)
                setId(id)
            } else {
                setCategory('')
                setType('')
                setPrice('')
            }
        } else {
            setCategory('')
            setType('')
            setPrice('')
            setId(null)
        }
    }, [formAddExpense, expense])

    useEffect(() => {
        category.length && setCategoryAlert({})
    }, [category])

    useEffect(() => {
        type.length && setTypeAlert({})
    }, [type])

    useEffect(() => {
        price > 0 && setPriceAlert({})
    }, [price])

    const handleSubmit = e => {
        e.preventDefault()

        if(!category && !type.length && price <= 0) {
            setCategoryAlert({ msg: 'Elegime una categoria fiera'})
            setTypeAlert({ msg: 'Poneme un nombre fiera'})
            setPriceAlert({ msg: 'Poneme un precio fiera'})
            return
        }
        if(!category) return setCategory({ msg: 'Elegime una categoria fiera'})
        if(!type.trim()) return setTypeAlert({ msg: 'Poneme un nombre fiera'})
        if(price <= 0) return setPriceAlert({ msg: 'Poneme un precio fiera'})
        
        if(id) {
            handleConfirmEditExpense({ category, type, price, id, user: expense.user }) // Editar gasto
        } else {
            handleAddExpense({ category, type, price, id: Date.now(), user }) // Agregar gasto
        }
        
        setCategory('')
        setType('')
        setPrice('')
        setId(null)
    }

    return (
        <Transition.Root show={formAddExpense} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleFormAddExpense}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block w-2/3 border-2 border-green-700 min-w-fit align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={handleFormAddExpense}
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h2" className="text-3xl leading-6 font-bold text-green-500 text-center">
                                        { expense?.category ? 'Editar Gasto' : 'Agregar Gasto' }
                                    </Dialog.Title>
                                    <form className='mt-10 mb-6'
                                        onSubmit={handleSubmit}
                                    >
                                        
                                        <div className='mb-8 flex flex-col'>
                                            <label htmlFor="category"
                                                className='tex-gray-700 uppercase text-xl font-bold text-left text-white'
                                            >
                                                Tipo de Gasto
                                            </label>
                                            <select
                                                id='category'
                                                name='category'
                                                className={`border-2 w-full text-xl py-2 px-3 mt-2 placeholder-gray-400 rounded-md
                                                focus:outline-none hover:cursor-pointer ${ categoryAlert.msg ? `border-4 border-red-600` : ''}`}
                                                value={category}
                                                onChange={e => setCategory(e.target.value)}
                                            >
                                                <option value="">-- Categoria --</option>
                                                <option value="gastosFijos">Gastos Fijos</option>
                                                <option value="compras">Compras</option>
                                                <option value="gato">Gato</option>
                                                <option value="permitidos">Permitidos</option>
                                                
                                            </select>
                                            { categoryAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{categoryAlert.msg}</p>}

                                            <input type="text" 
                                                name='type'
                                                placeholder='Nombre del gasto'
                                                className={`py-2 px-3 mt-4 text-xl rounded-md focus:outline-none ${typeAlert.msg ? `border-4 border-red-600` : ''}`}
                                                value={type}
                                                onChange={e => setType(e.target.value)}
                                            />                                                
                                            { typeAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{typeAlert.msg}</p>}
                                        </div>

                                        <div className='mb-5 flex flex-col'>
                                            <label htmlFor="number"
                                                className='tex-gray-700 uppercase text-xl font-bold text-left text-white'
                                            >
                                                Precio
                                            </label>
                                            <input type="number"
                                                name='price'
                                                id='price' 
                                                placeholder='Precio'
                                                className={`py-2 px-3 mt-2  rounded-md text-xl focus:outline-none ${priceAlert.msg ? `border-4 border-red-600` : ''}`}
                                                value={price}
                                                onChange={e => setPrice(+e.target.value)}
                                            />
                                            { priceAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{priceAlert.msg}</p>}
                                        </div>

                                        <input type="submit"
                                            value={ expense?.category ? 'Editar gasto' : 'Agregar gasto'}
                                            className='bg-green-700 hover:bg-green-800 w-full p-3 mt-4 text-white uppercase 
                                            font-bold hover:cursor-pointer transition-colors rounded text-lg'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default FormAddExpense