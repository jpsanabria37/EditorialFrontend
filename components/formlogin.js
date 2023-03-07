export default function FormLogin() {
  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">BIENVENIDO</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        ¡¡Porfavor Ingrese sus Credenciales!!
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Correo Electronico</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Ingrese su usuario"
            required={true}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Ingrese su contraseña"
            type="password"
            required={true}
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
      </div>
    </div>
  );
}
