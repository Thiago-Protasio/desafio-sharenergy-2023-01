import axios from "axios";
import { FormEvent, useState } from "react";
import Header from "../../components/Header";

function HttpCat() {
  const [code, setCode] = useState("");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    setCode(String(data.code));
  }

  return (
    <div className="max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]">
      <Header />
      <h1 className="text-4xl mb-6 font-semibold mx-auto mt-12 text-slate-700">HTTP Cat</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="sm:w-1/2 mx-auto flex flex-col sm:flex-row items-center">
        <input className="h-12 sm:m-8 mb-4 sm:mb-0 p-6 w-full text-lg bg-transparent border-b border-gray-300 outline-none font-semibold text-slate-700 hover:border-teal-700 focus:border-teal-700" placeholder="Código HTTP" title="Code" type="text" name="code" id="code" />
        <button className="w-fit h-fit p-3 bg-[#1ba2a1] text-white rounded-lg hover:bg-[#126e6e] hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ba2a1] focus:ring-offset-2" type="submit">Enviar</button>
      </form>
      { code ? 
        <img className="sm:w-1/3 w-1/2 mx-auto mt-4 mb-6" src={`https://http.cat/${code}`} alt="http-cat" />
        : ""
      }
    </div>
  );
}

export default HttpCat;