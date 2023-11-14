import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useAdmin from '../hooks/useAdmin'

function PasswordModal() {

    const { password, passwordModal, handlePasswordSubmit, handleSetPassword, handleHidePasswordModal, wrongPassword } = useAdmin()

    return (
        <Transition.Root show={passwordModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleHidePasswordModal}>
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
                                    onClick={handleHidePasswordModal}
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
                                        Escribe la contraseña
                                    </Dialog.Title>
                                    <form className='mt-10 mb-6'
                                        onSubmit={handlePasswordSubmit}
                                    >
                                        <input type="password"
                                            name='password'
                                            id='password' 
                                            placeholder='Contraseña'
                                            className='py-2 px-3 mt-2 w-full rounded-md text-xl focus:outline-none'
                                            value={password}
                                            onChange={(e) => handleSetPassword(e.target.value)}
                                        />
                                        { wrongPassword && <p className='text-red-500 text-center mt-2 text-lg'>Contraseña incorrecta</p>}
                                        <input type="submit"
                                            value='Aceptar'
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

export default PasswordModal