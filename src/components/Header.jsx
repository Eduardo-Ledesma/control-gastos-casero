import { useState, useEffect } from 'react';
import FormAddExpense from './FormAddExpense';
import animation from '../css/Animation.module.css'
import useAdmin from '../hooks/useAdmin'
import Swal from 'sweetalert2';

const Header = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [size, setSize] = useState(false)
    const { setFormAddExpense, resetApp } = useAdmin()

    useEffect(() => {
        const text = document.querySelector('#texto')

        if(!text) {
            setSize(false)
            return
        }
        const textLoad = () => {
            if(windowWidth < 1194) {
                setSize(false)
                return
            }
            setTimeout(() => {
                text.textContent = 'pollo';
            }, 0);
            setTimeout(() => {
                text.textContent = 'carne';
            }, 3000);
            setTimeout(() => {
                text.textContent = 'verduras';
            }, 6000);
            setTimeout(() => {
                text.textContent = 'fideos';
            }, 9000);
            setTimeout(() => {
                text.textContent = 'de todo!!!';
            }, 12000);
        }
        if(size) return
        textLoad()
        setSize(true)
        setInterval(textLoad, 15000);
    }, [windowWidth])

    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Limpieza del evento al desmontar el componente
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleReset = async () => {
        Swal.fire({
            title: 'Borrar todos los gastos?',
            icon: 'warning',
            iconColor: '#c54444',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar',
            customClass: {
                popup: animation.swal_popup,
                title: animation.swal_title,
            }
        }).then( async (result) => {
            if (result.isConfirmed) {
                await resetApp()
            }
        })
    }


    return (
    <>
        {windowWidth > 1194 ? (
            <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                <div className='font-bold text-4xl overflow-hidden'>
                    <span className={`${animation.text} ${animation[`first-text`]}`}>Hay que comprar: </span>
                    <span className={`${animation.text} ${animation[`second-text`]} text-green-600`} id='texto'></span>
                </div>

                <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
            </div>
        ) : (
            <div className='p-10 flex flex-col gap-10 lg:flex-row items-center justify-between'>
                <h1 className="text-gray-200 font-bold text-6xl">Control de gastos</h1>
                <div className='font-bold text-4xl'>
                    <p className='text-gray-200'>¿Qué hay que <span className='text-green-600'>comprar?</span> </p>
                </div>
            </div>
        )}
        
        <nav className='bg-green-900 p-6 flex justify-center gap-12 overflow-hidden border-y border-green-500'>
            <button type='button' 
                className="animate__animated animate__fadeInLeftBig
            text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
                onClick={() => setFormAddExpense(true)}
            >
                Agregar Gasto
            </button>

            <button type='button' 
                className="animate__animated animate__fadeInRightBig
            text-gray-200 hover:text-green-500 font-bold text-md sm:text-xl bg-gray-900 border-2 border-gray-400 p-3 rounded-md transition-colors hover:border-green-500"
                onClick={handleReset}
            >
                Reiniciar Gastos
            </button>
        </nav>

        <FormAddExpense />
    </>
    )
}

export default Header



