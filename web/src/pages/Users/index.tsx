import { AtSymbolIcon, CalendarIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../../components/Header";

interface IUserData {
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }
}

function Users() {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUserData[]>([]);
  const [scrollHasMore, setScrollHasMore] = useState(true);

  async function fetchUsers() {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=15&inc=picture,name,email,dob,login");
      setUsers(users.concat(response.data.results));
    } catch (error) {
      console.log("Could not fetch users!");
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]); 

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    
    if (search) {
      setScrollHasMore(false);
    } else {
      setScrollHasMore(true);
    }

    const results = users.filter(user => 
      user.name.first.toLowerCase().includes(search) 
      || user.name.last.toLowerCase().includes(search) 
      || user.email.toLowerCase().includes(search) 
      || user.login.username.toLowerCase().includes(search)
    );

    setFilteredUsers(results);
  }

  if (users) {   
    return (
      <div className="max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]">
        <Header />
        <h1 className="text-4xl mb-8 font-semibold mx-auto mt-12 text-slate-700">Lista de usuários</h1>
        <div className="sm:w-1/2 mx-auto">
          <input onChange={handleSearch} className="h-12 sm:m-8 p-6 w-full text-lg bg-transparent border-b border-gray-300 outline-none font-semibold text-slate-700 hover:border-teal-700 focus:border-teal-700" type="text" name="search" id="search" placeholder="Buscar" />
        </div>
        <div className="sm:w-1/3 mx-auto overflow-visible">
          <InfiniteScroll
            dataLength={users.length}
            next={fetchUsers}
            hasMore={scrollHasMore}
            loader={<h4>Loading...</h4>}
            scrollThreshold={1}
          >
            {filteredUsers.map((user) => {
              return (
                <div className="sm:m-8 mt-8" key={user.login.uuid}>
                  <h3 className="font-semibold text-2xl text-slate-800 mb-1">{user.name.first} {user.name.last}</h3>
                  <div className="flex flex-row">
                    <img className="h-24" src={user.picture.large} alt={user.login.username} title={user.name.first}/>
                    <div className="flex flex-col gap-1 justify-center text-md text-gray-600 text-ellipsis font-medium">
                      <div className="flex flex-row items-center justify-start" title="Email">
                        <EnvelopeIcon className="h-5 ml-2 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex flex-row items-center justify-start" title="Username">
                        <AtSymbolIcon className="h-5 ml-2 mr-1" />
                        {user.login.username}
                      </div>
                      <div className="flex flex-row items-center justify-start" title="Age">
                        <CalendarIcon className="h-5 ml-2 mr-1" />
                        Age: {user.dob.age}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>
  }

}

export default Users;