import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FormEvent } from "react";
import img2 from "./../../assets/img2.png";
import PropTypes from "prop-types";
import api from "../../services/api";
 
function Home({setToken}: any) { 
  async function handleLogIn(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const remember = data.remember === "on" ? true : false;

    try {
      const response = await api.post(`/users/auth`, {
        username: data.username,
        password: data.password,
        remember,
      });

      setToken(response.data, remember);
      window.location.reload()
    } catch (error) {
      alert("Could not Log in"); 
    }
  }

  return (
    <div className='max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]'>
    <div className='flex flex-1 flex-row flex-wrap gap-2 mt-0 mb-0 min-h-screen max-[640px]:flex-col'>
      <div className='flex-1 flex-col justify-center my-auto'>
        <h1 className="font-bold tracking-tight text-gray-900 md:text-5xl sm:text-3xl max-[640px]:mt-4 text-center">
          <span className="text-[#d6df27]">Bem</span>{' '}
          <span className="text-[#1ba2a1]">vindo!</span>
        </h1>
        <div className='h-52 flex flex-row justify-center align-middle gap-8'>
          <form className="w-1/2 mt-6" onSubmit={(e) => handleLogIn(e)} method="POST">
            <div>
              <label htmlFor="username" className="block ml-[1px] text-sm font-medium text-gray-700">Username</label>
              <input className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm sm:w-full" id="username" autoComplete="username" name="username" type="username" required />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm" id="password" name="password" type="password" required />
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded-lg border-gray-300 accent-[#00a2a2] focus:ring-[#00a2a2] focus:border-[#00a2a2]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="font-medium text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#1ba2a1] py-2 px-4 text-sm font-medium text-white hover:bg-[#126e6e] focus:outline-none focus:ring-2 focus:ring-[#1ba2a1] focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-[#21c8c7] group-hover:text-[#1ba2a1]" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='sm:w-1/2 my-auto mx-auto mb-0'>
        <img src={img2} alt='' />
      </div>
    </div>
  </div>
  );
}

Home.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Home;