
import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar= () => {
    const [nombre,setNombre] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [repetirPassword,setRepetirPassword] = useState('')


    const [alerta,setAlerta] = useState('')

    

    const handleSubmit = async e =>{
        e.preventDefault();

        if([nombre,email,password,repetirPassword].includes('')){
           setAlerta({msg:'Hay campos vacios',error: true})
            return;
        }
        if(password !== repetirPassword){
            setAlerta({msg:'Contraseñas diferentes',error: true})
            return
        }

        if(password.length < 6){
            setAlerta({msg:'La contraseña debe tener mas de 6 caracteres',error: true})
        }
        setAlerta({})

        //Crear el usuario en la api
        try {
            
            await clienteAxios.post('/veterinarios',{nombre,email,password })
            setAlerta({msg:'Usuario Creado Correctamente',error: false})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error : true
            })
        }



    }
    const {msg} = alerta 
    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra {""}<span className="text-black">tus pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta
                alerta = {alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre:
                    </label>
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Correo:
                    </label>
                    <input
                        type="email"
                        placeholder="Tu Correo"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        placeholder="Tu contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value = {password}
                        onChange = {e=> setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Contraseña:
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value = {repetirPassword}
                        onChange = {e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input 
                type="submit"
                value="Crear Cuenta"
                className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold rounded-xl mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-gray-500'
                    to="/">¿Ya tienes una cuenta? <span className='text-indigo-700'>Inicia Sesion</span>
                </Link>
                <Link
                    className='block text-center my-5 text-gray-500'
                    to="/olvide-password">Olvide mi password
                </Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Registrar