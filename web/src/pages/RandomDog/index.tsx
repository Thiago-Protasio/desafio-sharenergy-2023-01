import { ArrowPathIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

function RandomDog() {
  const [image, setImage] = useState("");

  async function fetchImage() {
    await axios.get("https://random.dog/woof?filter=mp4,webm").then(response => {
      setImage(response.data);
    });
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]">
      <Header />
      <h1 className="text-4xl mb-6 font-semibold mx-auto mt-12 text-slate-700">Random Dog</h1>
      <div className="sm:w-9/12 flex sm:justify-end justify-center">
        <button onClick={fetchImage} type="button" title="Atualizar imagem" className="bg-[#1ba2a1] text-white w-fit p-4 rounded-2xl hover:bg-[#126e6e] hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ba2a1] focus:ring-offset-2"><ArrowPathIcon className="h-5" /></button>
      </div>
      { image ? 
        <img className="sm:w-1/3 w-1/2 mx-auto mt-4 mb-6" src={`https://random.dog/${image}`} alt="dog" />
        : ''
      }
    </div>
  );
}

export default RandomDog;