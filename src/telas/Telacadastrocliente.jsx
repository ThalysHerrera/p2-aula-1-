



import Pagina from "../templates/Pagina"
import Cadastrocliente from "./formularios/Cadastrocliente"
import TabelaCliente from "./tabelas/TabelaCliente"
import { useState } from "react";
import clientes from "../dados/clientes";
import cidades from "../dados/cidades";

export default function Telacadastrocliente(props) {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [listaDeclientes, setListaDeclientes] = useState(clientes);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        cpf: '',
        nome: '',
        sobrenome: '',
        sexo: '',
        data_nascimento: '',
        email: '',
        estado_civil: '',
        cidade: { id: 1, nome: 'São Paulo', estado: 'SP' }
    });

    const [modoEdição, setModoEdição] = useState(false);

    return (
        <Pagina titulo="Tela de cadastro de Clientes">
            {
                mostrarTabela ?
                    <TabelaCliente 
                        mostrarTabela={mostrarTabela}
                        setMostrarTabela={setMostrarTabela}
                        listaDeclientes={listaDeclientes}
                        setListaDeclientes={setListaDeclientes}
                        setClienteSelecionado={setClienteSelecionado}
                        setModoEdição={setModoEdição} /> :
                    <Cadastrocliente 
                        mostrarTabela={mostrarTabela}
                        setMostrarTabela={setMostrarTabela}
                        listaDeclientes={listaDeclientes}
                        setListaDeclientes={setListaDeclientes}
                        listaDeCidades={cidades}
                        clienteSelecionado={clienteSelecionado}
                        setClienteSelecionado={setClienteSelecionado} 
                        modoEdição={modoEdição}
                        setModoEdição={setModoEdição}/>
            }
        </Pagina>
    );
}
