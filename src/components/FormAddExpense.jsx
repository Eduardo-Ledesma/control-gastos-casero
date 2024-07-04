import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useAdmin from '../hooks/useAdmin'
import { toast } from "react-toastify"
import BeatLoader from 'react-spinners/BeatLoader'

function FormAddExpense() {

    const [id, setId] = useState(null)
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [categoryAlert, setCategoryAlert] = useState({})
    const [nameAlert, setNameAlert] = useState({})
    const [priceAlert, setPriceAlert] = useState({})

    const { formAddExpense, handleFormAddExpense, handleAddExpense, expense, handleConfirmEditExpense, username, isSubmiting } = useAdmin()

    useEffect(() => {
        setCategoryAlert({})
        setNameAlert({})
        setPriceAlert({})
        
        if(formAddExpense === true) {
            if(expense?.category) {
                const { category, name, price, id } = expense
                setCategory(category)
                setName(name)
                setPrice(price)
                setId(id)
            } else {
                setCategory('')
                setName('')
                setPrice('')
            }
        } else {
            setCategory('')
            setName('')
            setPrice('')
            setId(null)
        }
    }, [formAddExpense, expense])

    useEffect(() => {
        category.length && setCategoryAlert({})
    }, [category])

    useEffect(() => {
        name.length && setNameAlert({})
    }, [name])

    useEffect(() => {
        price > 0 && setPriceAlert({})
    }, [price])

    const resetForm = () => {
        setCategory('')
        setName('')
        setPrice('')
        setId(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(!category.length && !name.length && price <= 0) {
            setCategoryAlert({ msg: 'Elegime una categoria fiera'})
            setNameAlert({ msg: 'Poneme un nombre fiera'})
            setPriceAlert({ msg: 'Poneme un precio fiera'})
            return
        }
        if(!category.length) return setCategoryAlert({ msg: 'Elegime una categoria fiera'})
        if(!name.trim()) return setNameAlert({ msg: 'Poneme un nombre fiera'})
        if(price <= 0) return setPriceAlert({ msg: 'Poneme un precio fiera'})
        
        let response
        if(id) {
            response = await handleConfirmEditExpense({ category, name, price, id, username }) // Editar gasto
        } else {
            response = await handleAddExpense({ name, price, category, username }) // Agregar gasto
        }

        if(response === 200) {
            if(id) {
                toast.success('Gasto Editado Correctamente!', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            } else {
                toast.success('Gasto Agregado!', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
            resetForm()
        } else {
            toast.error('Algo salió mal D:', {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
        }
    }

    return (
        <Transition.Root show={formAddExpense} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleFormAddExpense}>
                <div className="flex items-end justify-center min-h-screen pt-4 px- pb-20 text-center sm:block sm:p-0">
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
                            <div className="inline-block sm:w-2/3 border-2 border-green-700 mx-auto sm:mx-0 align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6">


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
                                                name='name'
                                                placeholder='Nombre del gasto'
                                                className={`py-2 px-3 mt-4 text-xl rounded-md focus:outline-none ${nameAlert.msg ? `border-4 border-red-600` : ''}`}
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />                                                
                                            { nameAlert.msg && <p className='text-red-500 text-center mt-2 text-lg'>{nameAlert.msg}</p>}
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

                                        <button onClick={handleSubmit}
                                            className='bg-green-700 hover:bg-green-800 w-full p-3 mt-4 text-white uppercase 
                                            font-bold hover:cursor-pointer transition-colors rounded text-lg'
                                        >
                                            { isSubmiting ? <BeatLoader color='white' size={13} /> : expense?.category ? 'Editar gasto' : 'Agregar gasto'}
                                        </button>
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