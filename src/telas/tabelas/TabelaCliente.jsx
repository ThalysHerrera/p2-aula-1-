



import { Alert, Container, Table, Button } from "react-bootstrap";

export default function TabelaCliente(props) {

    function selecionarClienteParaEdicao(cliente) {
        props.setClienteSelecionado(cliente); 
        props.setModoEdição(true);
        props.setMostrarTabela(false); 
    }

    return (
        <Container>
            <Alert className="text-center"><h2>Tabela de Clientes</h2></Alert>

            <Button onClick={() => props.setMostrarTabela(false)} className="mb-3" variant="primary">
                Novo Cliente
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>CPF</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>Email</th>
                        <th>Estado_Civil</th>
                        <th>Cidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeclientes?.map((cliente) => (
                        <tr key={cliente.cpf}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.sobrenome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.sexo}</td>
                            <td>{cliente.data_nascimento}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.estado_civil}</td>
                            <td>{cliente.cidade?.nome}/{cliente.cidade?.estado}</td>
                            <td>
                                <Button onClick={() => selecionarClienteParaEdicao(cliente)} variant="warning" className="me-2">Editar</Button>
                             
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}













