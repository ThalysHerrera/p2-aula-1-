




import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';
import axios from 'axios'; // Importe o axios para fazer requisição ao backend

export default function CadastroCliente(props) {
    const [validado, setValidado] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [cliente, setCliente] = useState(props.clienteSelecionado);

    function excluirCliente(cpf) {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            axios
                .delete(`http://localhost:3000/clientes/${cpf}`)
                .then((response) => {
                    console.log('Cliente excluído:', response.data);
                    // Atualiza a lista de clientes removendo o cliente excluído
                    const novaLista = props.listaDeclientes.filter(c => c.cpf !== cpf);
                    props.setListaDeclientes(novaLista);

                    // Volta para a tela de listagem de clientes
                    props.setModoEdição(false);
                    props.setMostrarTabela(true);
                })
                .catch((error) => {
                    console.error('Erro ao excluir cliente:', error);
                });
        }
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;

        if (form.checkValidity() === false) {
            setValidado(true);
            return;
        }

        const clienteData = { ...cliente, cidade_id: cliente.cidade.id };

        if (!props.modoEdição) {
            axios
                .post('http://localhost:3000/clientes', clienteData)
                .then((response) => {
                    console.log('Cliente cadastrado:', response.data);
                    props.setListaDeclientes([...props.listaDeclientes, response.data]);
                    setCadastroSucesso(true);
                    setTimeout(() => setCadastroSucesso(false), 3000);
                })
                .catch((error) => {
                    console.error('Erro ao cadastrar cliente:', error);
                });
        } else {
            axios
                .put(`http://localhost:3000/clientes/${cliente.cpf}`, clienteData)
                .then((response) => {
                    console.log('Cliente atualizado:', response.data);
                    const novaLista = props.listaDeclientes.map((c) =>
                        c.cpf === cliente.cpf ? response.data : c
                    );
                    props.setListaDeclientes(novaLista);
                    setCadastroSucesso(true);
                    setTimeout(() => setCadastroSucesso(false), 3000);
                })
                .catch((error) => {
                    console.error('Erro ao atualizar cliente:', error);
                });
        }

        limparFormulario();
        props.setModoEdição(false);
        props.setMostrarTabela(true);
    }

    function limparFormulario() {
        setValidado(false);
        setCliente({
            cpf: '',
            nome: '',
            sobrenome: '',
            sexo: '',
            data_nascimento: '',
            email: '',
            estado_civil: '',
            cidade: { id: 0, nome: '', estado: '' }
        });
    }

    function atualizarCliente(evento) {
        const { name, value } = evento.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function selecionarCidade(evento) {
        const id_cidade = Number(evento.target.value);
        const cidadeSelecionada = props.listaDeCidades.find(cidade => cidade.id === id_cidade);
        setCliente({ ...cliente, cidade: cidadeSelecionada });
    }

    return (
        <div>
            <Alert className="text-center"><h2>Cadastro de Clientes</h2></Alert>
            {cadastroSucesso && <Alert variant="success">Cadastro concluído com sucesso!</Alert>}

            <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required type="text" placeholder="Nome" name='nome' value={cliente.nome} onChange={atualizarCliente} />
                        <Form.Control.Feedback type="invalid">Informe o Nome do cliente</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control required type="text" placeholder="Sobrenome" name='sobrenome' value={cliente.sobrenome} onChange={atualizarCliente} />
                        <Form.Control.Feedback type="invalid">Informe o Sobrenome do cliente</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group as={Col} md="3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control required type="text" placeholder="000.000.000-00" name='cpf' value={cliente.cpf} onChange={atualizarCliente} />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF.</Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control required type="text" placeholder="Sexo" name='sexo' value={cliente.sexo} onChange={atualizarCliente} />
                        <Form.Control.Feedback type="invalid">Por favor, insira o sexo do cliente.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control required type="date" name='data_nascimento' value={cliente.data_nascimento} onChange={atualizarCliente} />
                        <Form.Control.Feedback type="invalid">Por favor, insira a data de nascimento.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control required type="email" placeholder="Email" name='email' value={cliente.email} onChange={atualizarCliente} />
                            <Form.Control.Feedback type="invalid">Por favor, informe o email.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Select required value={cliente.cidade ? cliente.cidade.id : 0} onChange={selecionarCidade}>
                            <option value={0} disabled>Selecione a cidade</option>
                            {props.listaDeCidades.map((cidade) => (
                                <option key={cidade.id} value={cidade.id}>
                                    {cidade.id + " - " + cidade.nome + "/" + cidade.estado}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Por favor, selecione uma cidade.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Estado Civil</Form.Label>
                            <Form.Control required type="text" placeholder="Estado Civil" name='estado_civil' value={cliente.estado_civil} onChange={atualizarCliente} />
                            <Form.Control.Feedback type="invalid">Por favor, informe o estado civil.</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                <Form.Group className="mb-3">
                    <Form.Check required label="Concordo com os termos e condições" feedback="Você deve concordar antes de enviar." feedbackType="invalid" />
                </Form.Group>

                <Button type="submit">{props.modoEdição ? "Atualizar" : "Cadastrar"}</Button>
                <Button variant="secondary" onClick={() => { props.setModoEdição(false); props.setMostrarTabela(true); }} style={{ marginLeft: '10px' }}>Voltar</Button>

                {/* Mostrar botão de excluir somente quando estiver no modo de edição */}
                {props.modoEdição && (
                    <Button variant="danger" onClick={() => excluirCliente(cliente.cpf)} style={{ marginLeft: '10px' }}>
                        Excluir Cliente
                    </Button>
                )}
            </Form>
        </div>
    );
}















