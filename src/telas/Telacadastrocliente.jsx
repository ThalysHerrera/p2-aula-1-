



import Pagina from "../templates/Pagina";
import Cadastrocliente from "./formularios/Cadastrocliente";
import TabelaCliente from "./tabelas/TabelaCliente";
import { useState, useEffect } from "react";
import api from "../api";  // Certifique-se de importar a configuração do axios

export default function Telacadastrocliente(props) {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [listaDeclientes, setListaDeclientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        cpf: '',
        nome: '',
        sobrenome: '',
        sexo: '',
        data_nascimento: '',
        email: '',
        estado_civil: '',
        cidade: { id: 0, nome: '', estado: '' }
    });
    const [modoEdição, setModoEdição] = useState(false);
    const [cidades, setCidades] = useState([]);  // Estado para armazenar as cidades

    // Função para buscar os clientes do backend
    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await api.get("/clientes");
                console.log("Clientes do backend:", response.data);  // Requisição GET para /clientes
                setListaDeclientes(response.data); // Atualiza o estado com os clientes
            } catch (error) {
                console.error("Erro ao carregar os clientes:", error);
            }
        }

        fetchClientes(); // Chama a função para carregar os clientes
    }, []);  // O array vazio [] faz com que isso seja executado apenas uma vez, quando o componente for montado.

    // Função para buscar as cidades do backend
    useEffect(() => {
        async function fetchCidades() {
            try {
                const response = await api.get("/cidades");  // Ajuste a URL conforme necessário
                console.log("Cidades do backend:", response.data);
                setCidades(response.data);  // Atualiza o estado com as cidades
            } catch (error) {
                console.error("Erro ao carregar as cidades:", error);
            }
        }

        fetchCidades(); // Chama a função para carregar as cidades
    }, []);  // O array vazio [] faz com que isso seja executado apenas uma vez, quando o componente for montado.

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
                        listaDeCidades={cidades} // Passando a lista de cidades para o cadastro
                        clienteSelecionado={clienteSelecionado}
                        setClienteSelecionado={setClienteSelecionado}
                        modoEdição={modoEdição}
                        setModoEdição={setModoEdição} />
            }
        </Pagina>
    );
}
