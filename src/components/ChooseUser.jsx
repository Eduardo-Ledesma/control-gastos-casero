import useAdmin from '../hooks/useAdmin';

const ChooseUser = () => {

    const { handleUser } = useAdmin()

    return (
        <main className='text-gray-200 mt-20 p-6'>
            <h2 className='text-center text-3xl mt-10 animate__animated animate__jackInTheBox'>¿Quién Eres?</h2>

            <div className='flex flex-col sm:flex-row gap-16 justify-center mt-16 animate__animated animate__zoomIn'>
                <button type='button'
                    className='w-1/2 mx-auto sm:mx-0 sm:w-auto border-2 border-green-600 rounded-md hover:cursor-pointer transition-all 
                    hover:scale-110 hover:border-white'
                    onClick={() => handleUser(1)}  
                >
                    <p className='font-bold text-2xl sm:text-4xl text-center py-2 text-green-600'>Edu</p>
                    <img src="/img/messi.webp" alt="foto ledu"
                    className='w-auto sm:w-52 border-t-2 border-green-600 hover:border-white transition-colors'
                    />
                </button>

                <button type='button' 
                    className='w-1/2 mx-auto sm:mx-0 sm:w-auto border-2 border-green-600 rounded-md hover:cursor-pointer transition-all 
                    hover:scale-110 hover:border-white'
                    onClick={() => handleUser(2)}
                >
                    <p className='font-bold text-2xl sm:text-4xl text-center py-2 text-green-600'>Janis</p>
                    <img src="/img/kim.webp" alt="foto janis"
                    className='w-auto sm:w-52 border-t-2 border-green-600 hover:border-white transition-colors'
                    />
                </button>
            </div>
        </main>
    )
}

export default ChooseUser