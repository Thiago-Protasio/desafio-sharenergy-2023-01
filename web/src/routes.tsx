import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import useToken from "./hooks/useToken";
import Users from "./pages/Users";
import Clients from "./pages/Clients";
import RandomDog from "./pages/RandomDog";
import HttpCat from "./pages/HttpCat";

function Router() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Home setToken={setToken} />;
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}/>
        <Route path="/clients" element={<Clients token={token} />}/>
        <Route path="/random-dog" element={<RandomDog />}/>
        <Route path="/http-cat" element={<HttpCat />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;