import Pagina from "../templates/Pagina"
import Cadastrofornecedor from "./formularios/Cadastrofornecedor"

export default function Telacadastrofornecedor(props){
    return(
        <Pagina titulo="Tela de cadastro de fornecedores">
            <Cadastrofornecedor/>
        </Pagina>
    )
}