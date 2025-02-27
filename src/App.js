import Telalogin from "./telas/formularios/Telalogin";
import Telacadastrocliente from "./telas/Telacadastrocliente";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Telamenu from "./telas/Telamenu";
import { useState } from "react";
import { createContext } from "react";
import Telacadastrofornecedor from "./telas/Telacadastrofornecedor";
import Telacadastroprodutos from "./telas/Telacadastroprodutos";

export const ContextoLogin=createContext();

function App() {
    const [dadosLogin, setDadosLogin] = useState({Usuario:"",logado:false});
    
    if(dadosLogin.logado){

    

  return (
    <div className="App">
      <ContextoLogin.Provider value={{dadosLogin,setDadosLogin}}>
      <BrowserRouter>
       <Routes>
      <Route path="/" element={<Telamenu/>}></Route>
      <Route path="/clientes" element={<Telacadastrocliente/>}></Route>
      <Route path="/fornecedor" element={<Telacadastrofornecedor/>}></Route>
      <Route path="/produtos" element={<Telacadastroprodutos/>}></Route>
        </Routes>
      </BrowserRouter>
      </ContextoLogin.Provider>
    </div>
  );
    }else{
      return(
        <div className="app">
          <ContextoLogin.Provider value={{dadosLogin,setDadosLogin}}>
            <Telalogin/>
          </ContextoLogin.Provider>
        </div>
      )
    }
}

export default App;
