import useAdmin from "../hooks/useAdmin"
import Swal from "sweetalert2"
import styles from '../css/Animation.module.css'

const Expense = ({expense}) => {

    const { category, type, price, id, user } = expense
    const { handleEditExpense, handleDeleteExpense } = useAdmin()

    let showCategory
    switch (category) {
        case 'gastosFijos':
            showCategory = 'Gastos Fijos'
            break;
        case 'compras':
            showCategory = 'Compras'
            break;
        case 'gato':
            showCategory = 'Gato'
            break;
        case 'permitidos':
            showCategory = 'Permitidos'
            break;
        default:
            break;
    }

    const userName = user === 1 ? 'Edu' : 'Jan'

    const handleClick = expense => {
        Swal.fire({
            title: 'Que deseas hacer con el gasto?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: `Eliminar`,
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: styles.swal_popup,
                title: styles.swal_title,
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleEditExpense(expense)
            } else if (result.isDenied) {
                handleDeleteExpense(expense.id)
            }
        })
        
    }

    return (
        <div className="flex relative justify-center min-w-fit border-2 border-white rounded-xl hover:border-green-500 
            hover:scale-105 sm:hover:scale-110 hover:cursor-pointer transition-all py-4 px-6"
            onClick={() => handleClick(expense)}
        >
            
            <p className="text-lg text-green-500 absolute left-2 top-2">{userName}</p>
            <div className="flex flex-col">
                <h3 className="text-white text-center font-bold text-3xl mb-4">
                    {type}
                </h3>
                <div className="flex gap-6 items-center">        
                    <p className="text-2xl text-amber-500 font-bold">${price}</p>
                    <p className="text-white bg-green-700 py-1 px-3 mx-auto text-center rounded-full text-md">
                        {showCategory}
                    </p>
                </div>     
            </div>    
        </div>
    )
}

export default Expense