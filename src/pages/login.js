import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Account/authenticate`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#879ab5]">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-semibold">BIENVENIDO</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            ¡¡Porfavor Ingrese sus Credenciales!!
          </p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-lg font-medium">
                  Correo Electrónico
                </label>
                <input
                  name="email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingrese su usuario"
                  type="email"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-lg font-medium">Contraseña</label>
                <input
                  name="password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingrese su contraseña"
                  type="password"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-8  flex justify-between items-center">
                <button className="font-medium text-base text-blue-600">
                  Forgot password
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  href="../dashboard"
                  className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6"
                >
                  Iniciar sesion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:flex w-1/2 items-center justify-center h-full bg-[#3f485b]">
        <img
          src="login.sgv"
          alt="image"
          className="rounded-full animate-bounce w-60 h-60 bg-gradient-to-tr"
        ></img>
      </div>
    </div>
  );
};

export default LoginPage;
