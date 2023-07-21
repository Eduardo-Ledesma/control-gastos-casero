import Header from './components/Header';
import ChooseUser from './components/ChooseUser';
import Expense from './components/Expense';
import ShowTotal from './components/ShowTotal';
import 'animate.css';
import useAdmin from './hooks/useAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { user, expenses } = useAdmin()
  
  return (
    
      !user ? (
        <ChooseUser />
      ) : (
        <>
          <header>
            <Header />
          </header>
          <ToastContainer />
          <main>
            { expenses.length ? (
              <article className='mt-16 px-4 md:px-16'>
                  <h2 className='text-center text-4xl text-green-400 mb-14 font-bold'>Gastos Registrados:</h2>
                  <section className='flex'>
                    <div className='flex gap-6 md:w-4/6 flex-wrap h-fit'>
                    { expenses.map(expense => (
                      <Expense 
                          key={expense.id}
                          expense={expense}
                      />
                    ))}
                    </div>
                    <div className='text-white md:w-2/6 text-center border-2 border-green-500 rounded-xl py-12 h-fit'>
                      <ShowTotal />
                    </div>
                  </section>
              </article>
            ) : (
              <div className='flex flex-col items-center gap-10 mt-10 text-3xl text-gray-200 p-6'>
                <p className=''>No hay gastos registrados.</p>
                <img src="/img/rat-GIF.gif" alt="rata peinandose"
                  className=''
                />
              </div>
            )}
          </main>
        </>
      )
  )
}

export default App
