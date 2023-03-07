import FormLogin from "components/formlogin";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex w-full h-screen bg-[#879ab5]">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <FormLogin></FormLogin>
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
}
