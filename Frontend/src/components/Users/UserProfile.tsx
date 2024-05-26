import {  useEffect, useState } from 'react';
import defautPhoto from '../../bienvenidos.jpeg'
import { UseAuth, User } from '../../context/UserContext';
import '../../styles/Users/profileUser.css'
import { Helmet } from 'react-helmet';
const ProfileUser = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const { user, obtenerUsuario } = UseAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) { // Asegurarse de que user esté definido antes de llamar a obtenerUsuario
                try {
                    const fetchedUserData = await obtenerUsuario(user.id);
                    setUserData(fetchedUserData);
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                }
            }
        };
        
        fetchUserData(); // Llamar a fetchUserData solo una vez cuando el componente se monta inicialmente
    }, [user, obtenerUsuario]); // Depender de user y obtenerUsuario para volver a ejecutar el efecto si alguno de ellos cambia

    console.log(userData);
    
  return (
    <>
        <Helmet>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        </Helmet>
    <body className = "body" >
    <section className="bg-gray-100 py-5"> 
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <a href="/" className="btn btn-outline-primary">Atrás</a>
                <a href="#" className="btn btn-outline-secondary"><i className="fas fa-pencil-alt"></i></a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src= {defautPhoto} alt="Perfil" className="rounded-circle img-fluid m-8" style={{ width: '150px' }} />
                            <h5 className="my-3"> {userData?.name}, {userData?.surname} </h5>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">Ciudad, Provincia</p>
                            <div className="flex justify-center">
                                <a href="#" className="btn btn-outline-primary">Mis Productos</a>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4 lg:mb-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                                <li className="list-group-item flex justify-between items-center p-3">
                                    <i className="fas fa-globe fa-lg text-warning"></i>
                                    <p className="mb-0">https://mdbootstrap.com</p>
                                </li>
                                <li className="list-group-item flex justify-between items-center p-3">
                                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                                <li className="list-group-item flex justify-between items-center p-3">
                                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                    <p className="mb-0">@mdbootstrap</p>
                                </li>
                                <li className="list-group-item flex justify-between items-center p-3">
                                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                                <li className="list-group-item flex justify-between items-center p-3">
                                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="flex justify-between mb-3">
                                <p className="mb-0">Usuario</p>
                                <p className="text-muted mb-0"> { userData?.name } { userData?.surname } </p>
                            </div>
                            <hr />
                            <div className="flex justify-between mb-3">
                                <p className="mb-0">Correo</p>
                                <p className="text-muted mb-0"> { userData?.email } </p>
                            </div>
                            <hr />
                            <div className="flex justify-between mb-3">
                                <p className="mb-0">Celular</p>
                                <p className="text-muted mb-0">0123456789</p>
                            </div>
                            <hr />
                            <div className="flex justify-between mb-3">
                                <p className="mb-0">Direccion</p>
                                <p className="text-muted mb-0">Ciudad, Provincia</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card mb-4 md:mb-0">
                            <div className="card-body">
                                <h5 className="card-title mb-4"><span className="text-primary font-italic me-1">Mis Productos</span> Recientes</h5>
                                <div className="mb-4">
                                    <p className="card-text text-sm">Descripción del Producto 1 <a href="#"><i className="material-symbols-outlined">visibility</i></a></p>
                                    <p className="card-subtitle mt-2 text-muted text-xs">Fecha de Publicación</p>
                                </div>
                                <div className="mb-4">
                                    <p className="card-text text-sm">Descripción del Producto 2 <a href="#"><i className="material-symbols-outlined">visibility</i></a></p>
                                    <p className="card-subtitle mt-2 text-muted text-xs">Fecha de Publicación</p>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 md:mb-0">
                            <div className="card-body">
                                <h5 className="card-title mb-4"><span className="text-primary font-italic me-1">Mis Productos</span> Antiguos</h5>
                                <div className="mb-4">
                                    <p className="card-text text-sm">Descripción del Producto 3 <a href="#"><i className="material-symbols-outlined">visibility</i></a></p>
                                    <p className="card-subtitle mt-2 text-muted text-xs">Fecha de Publicación</p>
                                </div>
                                <div className="mb-4">
                                    <p className="card-text text-sm">Descripción del Producto 4 <a href="#"><i className="material-symbols-outlined">visibility</i></a></p>
                                    <p className="card-subtitle mt-2 text-muted text-xs">Fecha de Publicación</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </body>
    </>
  )
}

export default ProfileUser
