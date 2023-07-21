import useAdmin from "../hooks/useAdmin"
import Swal from "sweetalert2"
import styles from '../css/Animation.module.css'

const Expense = ({expense}) => {

    const { category, type, price, id } = expense
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

    const handleClick = expense => {
        Swal.fire({
            title: 'Que deseas hacer con el gasto?',
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
        <div className="flex min-w-fit hover:scale-110 hover:cursor-pointer transition-transform"
            onClick={() => handleClick(expense)}
        >
            <div className="border-2 border-white py-4 px-6 rounded-xl">

                <h3 className="text-white text-center font-bold text-3xl mb-4">{type}</h3>
                <div className="flex gap-4 items-center">        
                    <p className="text-2xl text-amber-500 font-bold">${price}</p>
                    <p className="text-white bg-green-700 py-1 px-3 mx-auto text-center rounded-full text-md">{showCategory}</p>
                </div>            
            </div>
        </div>
    )
}

export default Expense