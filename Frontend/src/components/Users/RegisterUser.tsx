import { useForm } from "react-hook-form";
import { UseAuth } from "../../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from '../../_081281a1-9319-40c4-bef7-ceb89ad608ca.jpeg'
import imgBienvenidos from '../../bienvenidos.jpeg'
import { Link } from "react-router-dom";

const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {register:registerUser, isAuthenticated} = UseAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (isAuthenticated) navigate('/')
    }, [isAuthenticated])
    
    const submitRegister = handleSubmit( (body) => {
        registerUser({
            _id:body._id,
            name:body.name,
            surname: body.surname,
            email : body.email, 
            password : body.password
        })
        console.log(body.name)
        console.log(body.surname)
        console.log(body.email)
        console.log(body.password)
       
    })


  return (
    <>
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>

      <style>
        {`@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css');`}
      </style>

      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-300 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-neutral-700 py-10 px-10">
            <img className="object-cover object-center w-full h-full rounded-full" src={img} alt="Buy me a beer"/>
                    </div>

            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
                <form onSubmit={submitRegister} > 
              <div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                  <label  className="text-xs font-semibold px-1">First name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                        <input type="text" 
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                        placeholder="John"
                        {...register("name", { required: { value: true, message: "name es requerido" } })}
                        
                        />
                    </div>  
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label  className="text-xs font-semibold px-1">Last name</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input type="text" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="Smith"
                                        {...register("surname", { required: { value: true, message: "surname es requerido" } })}
                                        />
                                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                        </div>
                                        <input  
                                        type="email" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="johnsmith@example.com"
                                        {...register("email", { required: { value: true, message: "email es requerido" } })}
                                        />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label  className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input 
                                        type="password" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="************"
                                        {...register("password", { required: { value: true, message: "password es requerido" } })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button 
                                    className="block w-full max-w-xs mx-auto bg-neutral-700 hover:bg-gray-700 focus:bg-orange-500 text-white rounded-lg px-3 py-3 font-semibold"
                                    type="submit"
                                    >
                                        REGISTRARSE

                                    </button>
                                    <p className="mt-4 text-center text-gray-500">Ya tienes tu cuenta? <Link to="/login" className="text-neutral-700 font-bold">Iniciar Sesion</Link></p>
                    </div>
                </div>
              </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a title="Buy me a beer" href="/login" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img className="object-cover object-center w-full h-full rounded-full" src={imgBienvenidos} alt="Buy me a beer"/>
          </a>
        </div>
      </div>
    </>
  );
}
 
export default RegisterUser;

      