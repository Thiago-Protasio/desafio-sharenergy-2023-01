import { Transition, Dialog } from "@headlessui/react";
import { FormEvent, Fragment } from "react";
import { IClientData } from "../../pages/Clients";
import api from "../../services/api";

interface IProps {
  client: IClientData | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  saveClientUrl: string;
  fetchClients(): Promise<void>;
  cancelButtonRef: React.MutableRefObject<null>;
  token: string;
  title: string;
}

function ClientsModal({ client, setIsOpen, cancelButtonRef, isOpen, saveClientUrl, fetchClients, token, title }: IProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await api.post(saveClientUrl, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        state: data.state,
        address_number: data.address_number,
        street: data.street,
        cep: data.cep,
        cpf: data.cpf
      }, { headers: { "Authorization": `Bearer ${token}` }});

      fetchClients();
      setIsOpen(false);
    } catch (error) {
      console.log("Could not save client")
    }
  }

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="bg-white md:w-2/4 p-6 rounded-md shadow">
                  <Dialog.Title className="font-bold text-slate-700 text-xl">{title}</Dialog.Title>
                  <form onSubmit={(e) => handleSubmit(e)} className="flex flex-wrap text-left">

                    <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                      <div className="mt-4 w-[48%]">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input  
                          id="name" 
                          name="name" 
                          type="text"
                          defaultValue={client?.name}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm" 
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[48%]">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                        <input 
                          id="cpf" 
                          name="cpf" 
                          type="number"
                          defaultValue={client?.cpf} 
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                    </div>
                    <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                      <div className="mt-4 w-[48%]">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                          id="email" 
                          name="email" 
                          type="text" 
                          defaultValue={client?.email}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[48%]">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          defaultValue={client?.phone}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                    </div>
                    <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
                        <input 
                          id="cep" 
                          name="cep" 
                          type="number" 
                          defaultValue={client?.cep}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Rua</label>
                        <input 
                          id="street" 
                          name="street" 
                          type="text" 
                          defaultValue={client?.street}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="address_number" className="block text-sm font-medium text-gray-700">Número</label>
                        <input 
                          id="address_number" 
                          name="address_number" 
                          type="text" 
                          defaultValue={client?.address_number}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                    </div>
                    <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input 
                          id="city" 
                          name="city" 
                          type="text" 
                          defaultValue={client?.city}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                        <input 
                          id="state" 
                          name="state" 
                          type="text" 
                          defaultValue={client?.state}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                      <div className="mt-4 w-[32%]">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                        <input 
                          id="country" 
                          name="country" 
                          type="text" 
                          defaultValue={client?.country}
                          className="relative block w-full mt-1 shadow-sm appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#00a2a2] focus:outline-none focus:ring-[#00a2a2] sm:text-sm"
                          required 
                        />
                      </div>
                    </div>
                    <div className="py-3 mt-5 sm:flex-row w-full flex flex-col items-center sm:justify-end">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-3/6 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-3/6 justify-center rounded-md bg-[#1ba2a1] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#126e6e] focus:outline-none focus:ring-2 focus:ring-[#00a2a2] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default ClientsModal;