import Head from 'next/head';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 sm:px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
          {/* Sign-in Section */}
          <div className="w-full sm:flex sm:space-x-4 p-5">
            <div className="w-full sm:w-3/5">
              <div className="text-left font-bold">
                <span className="text-blue-400"> Biznes </span>
              </div>
              <div className="py-6">
                <h2 className="text-2xl font-bold text-blue-400">Ingresa a la cuenta</h2>
                <div className="border-2 w-8 border-blue-400 inline-block mb-2"></div>
                {/* Social Media Sign-in */}
                <div className="flex justify-center my-2">
                  <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                    <FaGoogle />
                  </a>
                </div>
                <p className="text-gray-400 my-3">Ingresar con Email</p>
                {/* Email Sign-in */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                    <span className="text-gray-400 mr-2">
                      <FaRegEnvelope />
                    </span>
                    <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1"/>
                  </div>
                  <div className="bg-gray-100 w-full p-2 flex items-center mb-3">
                    <span className="text-gray-400 mr-2">
                      <MdLockOutline />
                    </span>
                    <input type="password" name="contraseña" placeholder="Contraseña" className="bg-gray-100 outline-none text-sm flex-1"/>
                  </div>
                  <div className="flex justify-between w-full mb-5">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1"/> Recuerdame
                    </label>
                    <a href="#" className="text-xs">¿Olvidaste la Contraseña?</a>
                  </div>
                  {/* Sign Up Button */}
                  <a href="#" className="border-2 border-blue-500 text-blue-500 rounded-full px-8 py-2 inline-block font-semibold hover:bg-blue-500  hover:text-white">Sign Up</a>
                </div>
              </div>
            </div>
            {/* Sign Up Section */}
            <div className="w-full sm:w-2/5 bg-blue-400 text-white rounded-r-2xl py-10 px-6">

              <h2 className="text-2xl font-bold mb-2">Bienvenido!</h2>
              <div className="border-2 w-8 border-white inline-block mb-2"></div>
              <p className="mb-4">Llena tu informacion personal y comienza esta aventura con nosotros</p>
              {/* Sign Up Button */}
              <a href="#" className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500">Sign Up</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
