import Header from './components/Header';
import ChooseUser from './components/ChooseUser';
import 'animate.css';
import useAdmin from './hooks/useAdmin';

function App() {
  
  const { user } = useAdmin()
  
  return (
    <>
      { !user ? (
        <ChooseUser />
      ) : (
        <>
          <header>
            <Header />
          </header>
          
          <main className='text-gray-200 p-6'>
            <div className='flex flex-col items-center gap-10 mt-10 text-3xl'>
              <p className=''>No hay gastos registrados.</p>
              <img src="/img/rat-GIF.gif" alt="rata peinandose"
                className=''
              />
            </div>
          </main>
        </>
      )}
      
    </>
  )
}

export default App
