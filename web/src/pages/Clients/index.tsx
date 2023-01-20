import { CalendarDaysIcon, EnvelopeIcon, IdentificationIcon, MapPinIcon, PencilIcon, PhoneIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import ClientsModal from "../../components/ClientsModal";
import Header from "../../components/Header";
import api from "../../services/api";

export interface IClientData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  address_number: string;
  cep: number;
  cpf: number;
  created_at: string;
}

function convertDate(created_at: string) {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  let date = new Date(created_at);
  let convertedDate = ((date.getDate() + " " + months[(date.getMonth())] + " " + date.getFullYear()));
  return convertedDate;
}

function Clients(token: any) {
  const [clients, setClients] = useState<IClientData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedClient, setClickedClient] = useState<IClientData>();
  const [saveClientUrl, setSaveClientUrl] = useState("");
  const [title, setTitle] = useState("");
  const cancelButtonRef = useRef(null);
  
  let page = 1;

  async function fetchClients() {
    try {
      await api.get(`/clients/?page=${page}`, 
        {headers: { "Authorization": `Bearer ${token.token}` }
      }).then(response => {
        setClients(response.data.clients);
      })
    } catch (error) {
      console.log(`Error: ${error} Could not fetch clients`);
    }
  }

  function handleEditClient(client: IClientData) {
    setClickedClient(client);
    setSaveClientUrl(`/clients/update/${client._id}`);
    setTitle("Atualizar Cliente");
    setIsOpen(true);
  }

  function handleAddClient() {
    setClickedClient(undefined);
    setSaveClientUrl(`/clients`);
    setTitle("Adicionar Cliente");
    setIsOpen(true);
  }

  async function handleDeleteClient(id: string) {
    try {
      await api.delete(`/clients/delete/${id}`, { headers: { "Authorization": `Bearer ${token.token}` } }).then(response => {
        fetchClients();
      })
    } catch (error) {
      console.log(`Error: ${error}. Could not delete client!`);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]">
      <Header />
      <h1 className="text-4xl mb-6 font-semibold mx-auto mt-12 text-slate-700">Clientes</h1>
      <div className="sm:w-4/5 flex flex-row justify-center sm:justify-end m-5">
        <button onClick={handleAddClient} className="p-3 pr-4 flex flex-row items-center bg-[#1ba2a1] text-white font-medium rounded-3xl hover:bg-[#126e6e] hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ba2a1] focus:ring-offset-2" type="button"><PlusIcon className="h-5 mr-1" />Adicionar cliente</button>
      </div>
      <div className="sm:w-2/4 mx-auto">
        {clients.map((client) => {
          return (
            <div className="m-8 border-b border-gray-300 pb-2" key={client._id}>
              <div className="m-2 rounded-lg text-left p-6 shadow-md bg-[#f4f4f4]">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row flex-wrap items-center">
                    <h3 title="Nome" className="text-xl font-bold text-gray-800">{client.name}</h3>
                    <h3 title="Cpf" className="flex flex-row items-center sm:ml-2 text-md font-semibold text-gray-700">
                      <IdentificationIcon className="h-5 mr-1" />
                      {client.cpf}
                    </h3>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button type="button" onClick={() => handleEditClient(client)} className="flex flex-row h-9 w-9 bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-[#1ba2a1] focus:ring-offset-2" title="candidates" about="candidates"><PencilIcon className="h-5" /></button>
                    <button type="button" onClick={() => handleDeleteClient(client._id)} className="bg-red-600 h-9 w-9 text-white p-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2" title="delete" about="delete"><TrashIcon className="h-5" /></button>
                  </div>
                </div>
                <div title="Email" className="flex w-full flex-row gap-4 font-semibold text-sm text-gray-700">
                  <span className="flex flex-row items-center"><EnvelopeIcon className="h-5 mr-1" /> {client.email}</span>
                </div>
                <div title="Telefone" className="flex w-full mt-2 flex-row gap-4 font-semibold text-sm text-gray-700">
                  <span className="flex flex-row items-center"><PhoneIcon className="h-5 mr-1" /> {client.phone}</span>
                </div>
                <div title="Endereço" className="flex w-full mt-2 flex-col gap-1 font-semibold text-sm text-gray-700">
                  <span className="flex flex-row items-center">
                    <MapPinIcon className="h-5 mr-1" />
                    Rua: {client.street}, {client.address_number}
                  </span>
                  <p className="ml-6">{client.city}, {client.state} - {client.country}</p>
                  <p className="ml-6">CEP: {client.cep}</p>
                </div>
                <div>
                  <div title="Data de criação" className="flex flex-row text-sm font-semibold text-gray-700 items-center justify-end"><CalendarDaysIcon className="h-5 mr-1" />{convertDate(client.created_at)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ClientsModal title={title} fetchClients={fetchClients} token={token.token} saveClientUrl={saveClientUrl} isOpen={isOpen} client={clickedClient} cancelButtonRef={cancelButtonRef} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default Clients;