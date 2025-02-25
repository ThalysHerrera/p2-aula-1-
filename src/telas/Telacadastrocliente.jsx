import Pagina from "../templates/Pagina"
import Cadastrocliente from "./formularios/Cadastrocliente"

export default function Telacadastrocliente(props){
    return(
        <Pagina titulo="Tela de cadastro de Clientes">
            <Cadastrocliente/>
        </Pagina>
    )
}