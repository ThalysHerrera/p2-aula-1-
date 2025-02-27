import Pagina from "../templates/Pagina"
import Cadastroprodutos from "./formularios/Cadastroprodutos"

export default function Telacadastroprodutos(props){
    return(
        <Pagina titulo="Tela de cadastro de produtos">
            <Cadastroprodutos/>
        </Pagina>
    )
}