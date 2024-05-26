import { Link } from "react-router-dom"
import { UseAuth, User } from "../context/UserContext"
import { useEffect, useState } from "react";


const Navbar = () => {
    const { logout, user, obtenerUsuario } = UseAuth();
    const [userData, setUserData] = useState<User | null>(null);
    console.log(user.id)
    

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user._id) {
                console.log("hello")
                try {
                    const fetchedUserData = await obtenerUsuario(user._id);
                
                    setUserData(fetchedUserData);

                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            } else {
                const fetchedUserData = await obtenerUsuario(user.id);
                setUserData(fetchedUserData);
            }
                
        };
    
        fetchUserData();
    }, [user, obtenerUsuario]);

    // Agregar un efecto secundario que se ejecute cuando `userData` cambie
    useEffect(() => {
        if (userData) {
            console.log(userData.name); // Aquí `userData` debería tener los datos del usuario
        }
    }, [userData]);

  return (
    <body >    
        <div className="relative container flex flex-col mx-auto bg-white">
            <aside className="min-w-screen min-h-screen bg-gray-900 group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-gray-300 border-r border-r-dashed border-slate-400 sidenav fixed-start loopple-fixed-start" id="sidenav-main">
            <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
            <a className="transition-colors duration-200 ease-in-out" href="https://www.loopple.com">
            </a>
        </div>
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
        <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center mr-5">
            <div className="mr-5">
                <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                </div>
            </div>
            <div className="mr-2 ">
                <a href="" className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium text-slate-100 text-secondary-inverse">{userData?.name} {userData?.surname} </a>
                <span className="text-secondary-dark text-slate-100 font-medium block text-[0.85rem]">{userData?.email} </span>
            </div>
            </div>
            <a className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" href=")">
            <span className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </span>
            </a>
        </div>
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="relative pl-3 my-5 overflow-y-scroll">
            <div className="flex flex-col w-full font-medium">
            <div>
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <a href="/" className="flex items-center flex-grow text-[1.15rem] dark:text-black-400/75 text-slate-100 hover:text-dark">Tareas</a>
                </span>
            </div>
            <div>
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <Link to='addTask/' className="flex items-center flex-grow text-[1.15rem] dark:text-black-400/75 text-slate-100 hover:text-dark">Agregar Tarea</Link>
                </span>
            </div>
            <div>
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <a href="profile/" className="flex items-center flex-grow text-[1.15rem] dark:text-black-400/75 text-slate-100 hover:text-dark">Perfil</a>
                </span>
            </div>
            <div>
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <Link to='login/' onClick={()=> logout()} className="flex items-center flex-grow text-[1.15rem] dark:text-black-400/75 text-slate-100 hover:text-dark">logout</Link>
                </span>
            </div>
            </div>
            </div>
        </aside>
        </div>
        <div className="flex flex-wrap ml-9 my-5">
            <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
            </div>
        </div>
    </body>
  )
}
export default Navbar
