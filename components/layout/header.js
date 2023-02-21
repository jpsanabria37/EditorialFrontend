const header = () => {
  return (
    <>
      <header className="bg-gray-200 text-black">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <a className="font-bold text-sm">Mi Dashboard</a>
              <div className="flex items-center">
                  <a className="mr-4">

                  </a>
                  <button className="bg-white text-gray-800 rounded-md py-2 px-4 hover:bg-gray-200 focus:outline-none">
                      Cerrar Sesión
                  </button>
              </div>
          </div>
      </header>
    </>
  );
};

export default header;
