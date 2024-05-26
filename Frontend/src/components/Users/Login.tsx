import { UseAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import img from '../../bienvenidos.jpeg'
import registerImg from '../../_081281a1-9319-40c4-bef7-ceb89ad608ca.jpeg'


export default function Login() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const {login,isAuthenticated,errors:loginErrors} = UseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const submitLogin = handleSubmit((body) => {
    login({
      email: body.email, 
        password: body.password
    })
    console.log(body.email)
    console.log(body.password)
  });

  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-300 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              </div>
              <form onSubmit={submitLogin}>
                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                  <input type="text" className="border rounded py-2 px-3 text-grey-darkest" placeholder="Email" {...register("email", { required: { value: true, message: "Email is required" } })} />
                  {errors.email && (<p className="text-red-500 font-semibold">{errors.email.message}</p>)}
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                  <input type="password" className="border rounded py-2 px-3 text-grey-darkest" placeholder="Password" {...register("password", { required: { value: true, message: "Password is required" } })} />
                  {errors.password && (<p className="text-red-500 font-semibold">{errors.password.message}</p>)}
                </div>
                <button type="submit" className="block w-full max-w-xs mx-auto bg-neutral-700 hover:bg-gray-700 focus:bg-orange-500 text-white rounded-lg px-3 py-3 font-semibold">LOGIN</button>
              </form>
              <p className="mt-4 text-center text-gray-500">Aun no tienes una cuenta? <Link to="/register" className="text-neutral-700 font-bold">Register</Link></p>
            </div>
            <div className="hidden md:block w-1/2 bg-neutral-700 py-10 px-10">
              <img src={img} alt="" />
            </div>
            
          </div>
        </div>
        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a title="Buy me a beer" href="/register" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img className="object-cover object-center w-full h-full rounded-full" src={registerImg} alt="Buy me a beer"/>
          </a>
        </div>
      </div>
      </div>
    </>
  );
}