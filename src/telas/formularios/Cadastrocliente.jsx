




import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';

export default function CadastroCliente(props) {
    const [validado, setValidado] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [cliente, setCliente] = useState(props.clienteSelecionado);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;

        if (form.checkValidity() === false) {
            setValidado(true);
            return;
        }

        if (!props.modoEdição) {
            props.setListaDeclientes([...props.listaDeclientes, cliente]);
        } else {
            const novaLista = [...props.listaDeclientes];
            const indice = props.listaDeclientes.findIndex(c => c.cpf === cliente.cpf);
            novaLista[indice] = cliente;
            props.setListaDeclientes(novaLista);
        }

        props.setModoEdição(false);
        props.setClienteSelecionado({
            cpf: '',
            nome: '',
            sobrenome: '',
            sexo: '',
            data_nascimento: '',
            email: '',
            estado_civil: '',
            cidade: { id: 1, nome: 'São Paulo', estado: 'SP' }
        });

        props.setMostrarTabela(true);
        setCadastroSucesso(true);
        setTimeout(() => setCadastroSucesso(false), 3000);
        limparFormulario();
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
        setCliente({ ...cliente, [evento.target.name]: evento.target.value });
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
            </Form>
        </div>
    );
}

















// import { useState } from 'react';
// import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';
// import axios from 'axios';

// export default function CadastroCliente(props) {
//     const [validado, setValidado] = useState(false);
//     const [cadastroSucesso, setCadastroSucesso] = useState(false);
//     const [cliente, setCliente] = useState(props.clienteSelecionado);

//     async function manipularSubmissao(evento) {
//         evento.preventDefault();
//         evento.stopPropagation();

//         const form = evento.currentTarget;

//         if (form.checkValidity() === false) {
//             setValidado(true);
//             return;
//         }

//         try {
//             if (!props.modoEdição) {
//                 // Envia requisição para cadastrar um cliente
//                 await axios.post('http://localhost:3000/clientes', cliente);
//                 props.setListaDeclientes([...props.listaDeclientes, cliente]);
//             } else {
//                 // Envia requisição para atualizar o cliente
//                 await axios.put(`http://localhost:3000/clientes/${cliente.cpf}`, cliente);
//                 const novaLista = [...props.listaDeclientes];
//                 const indice = props.listaDeclientes.findIndex(c => c.cpf === cliente.cpf);
//                 novaLista[indice] = cliente;
//                 props.setListaDeclientes(novaLista);
//             }

//             props.setModoEdição(false);
//             props.setClienteSelecionado({
//                 cpf: '',
//                 nome: '',
//                 sobrenome: '',
//                 sexo: '',
//                 data_nascimento: '',
//                 email: '',
//                 estado_civil: '',
//                 cidade: { id: 1, nome: 'São Paulo', estado: 'SP' }
//             });

//             props.setMostrarTabela(true);
//             setCadastroSucesso(true);
//             setTimeout(() => setCadastroSucesso(false), 3000);
//             limparFormulario();
//         } catch (error) {
//             console.error("Erro ao processar cliente:", error.message);
//         }
//     }

//     async function limparFormulario() {
//         setValidado(false);
//         setCliente({
//             cpf: '',
//             nome: '',
//             sobrenome: '',
//             sexo: '',
//             data_nascimento: '',
//             email: '',
//             estado_civil: '',
//             cidade: { id: 0, nome: '', estado: '' }
//         });
//     }

//     function atualizarCliente(evento) {
//         setCliente({ ...cliente, [evento.target.name]: evento.target.value });
//     }

//     function selecionarCidade(evento) {
//         const id_cidade = Number(evento.target.value);
//         const cidadeSelecionada = props.listaDeCidades.find(cidade => cidade.id === id_cidade);
//         setCliente({ ...cliente, cidade: cidadeSelecionada });
//     }

//     return (
//         <div>
//             <Alert className="text-center"><h2>Cadastro de Clientes</h2></Alert>
//             {cadastroSucesso && <Alert variant="success">Cadastro concluído com sucesso!</Alert>}

//             <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Nome</Form.Label>
//                         <Form.Control required type="text" placeholder="Nome" name='nome' value={cliente.nome} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Informe o Nome do cliente</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Sobrenome</Form.Label>
//                         <Form.Control required type="text" placeholder="Sobrenome" name='sobrenome' value={cliente.sobrenome} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Informe o Sobrenome do cliente</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Form.Group as={Col} md="3">
//                     <Form.Label>CPF</Form.Label>
//                     <Form.Control required type="text" placeholder="000.000.000-00" name='cpf' value={cliente.cpf} onChange={atualizarCliente} />
//                     <Form.Control.Feedback type="invalid">Por favor, informe o CPF.</Form.Control.Feedback>
//                 </Form.Group>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="6">
//                         <Form.Label>Sexo</Form.Label>
//                         <Form.Control required type="text" placeholder="Sexo" name='sexo' value={cliente.sexo} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, insira o sexo do cliente.</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} md="6">
//                         <Form.Label>Data de Nascimento</Form.Label>
//                         <Form.Control required type="date" name='data_nascimento' value={cliente.data_nascimento} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, insira a data de nascimento.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Email</Form.Label>
//                         <InputGroup hasValidation>
//                             <InputGroup.Text>@</InputGroup.Text>
//                             <Form.Control required type="email" placeholder="Email" name='email' value={cliente.email} onChange={atualizarCliente} />
//                             <Form.Control.Feedback type="invalid">Por favor, informe o email.</Form.Control.Feedback>
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Cidade</Form.Label>
//                         <Form.Select required value={cliente.cidade ? cliente.cidade.id : 0} onChange={selecionarCidade}>
//                             <option value={0} disabled>Selecione a cidade</option>
//                             {props.listaDeCidades.map((cidade) => (
//                                 <option key={cidade.id} value={cidade.id}>
//                                     {cidade.id + " - " + cidade.nome + "/" + cidade.estado}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                         <Form.Control.Feedback type="invalid">Por favor, selecione uma cidade.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="3">
//                         <Form.Label>Estado Civil</Form.Label>
//                         <Form.Control required type="text" placeholder="Estado Civil" name='estado_civil' value={cliente.estado_civil} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, informe o estado civil.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Form.Group className="mb-3">
//                     <Form.Check required label="Concordo com os termos e condições" feedback="Você deve concordar antes de enviar." feedbackType="invalid" />
//                 </Form.Group>

//                 <Button type="submit">{props.modoEdição ? "Atualizar" : "Cadastrar"}</Button>
//                 <Button variant="secondary" onClick={() => { props.setModoEdição(false); props.setMostrarTabela(true); }} style={{ marginLeft: '10px' }}>Voltar</Button>
//             </Form>
//         </div>
//     );
// }



























// import { useState, useEffect } from 'react';
// import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';
// import axios from 'axios';

// export default function CadastroCliente(props) {
//     const [validado, setValidado] = useState(false);
//     const [cadastroSucesso, setCadastroSucesso] = useState(false);
//     const [cliente, setCliente] = useState({
//         cpf: '',
//         nome: '',
//         sobrenome: '',
//         sexo: '',
//         data_nascimento: '',
//         email: '',
//         estado_civil: '',
//         cidade: { id: 0, nome: '', estado: '' }
//     });
//     const [listaDeclientes, setListaDeClientes] = useState([]);

//     // Carregar lista de clientes ao montar o componente
//     useEffect(() => {
//         listarClientes();
//     }, []);

//     async function listarClientes() {
//         try {
//             const response = await axios.get('http://localhost:3000/clientes');
//             setListaDeClientes(response.data.clientes);
//         } catch (error) {
//             console.error("Erro ao listar clientes:", error.message);
//         }
//     }

//     async function salvarCliente(cliente) {
//         try {
//             await axios.post('http://localhost:3000/clientes', cliente);
//             listarClientes(); // Atualiza a lista de clientes após salvar
//             setCadastroSucesso(true);
//             setTimeout(() => setCadastroSucesso(false), 3000);
//         } catch (error) {
//             console.error("Erro ao salvar cliente:", error.message);
//         }
//     }

//     async function atualizarClienteBackend(cpf, cliente) {
//         try {
//             await axios.put(`http://localhost:3000/clientes/${cpf}`, cliente);
//             listarClientes(); // Atualiza a lista de clientes após atualizar
//             setCadastroSucesso(true);
//             setTimeout(() => setCadastroSucesso(false), 3000);
//         } catch (error) {
//             console.error("Erro ao atualizar cliente:", error.message);
//         }
//     }

//     async function manipularSubmissao(evento) {
//         evento.preventDefault();
//         evento.stopPropagation();

//         const form = evento.currentTarget;

//         if (form.checkValidity() === false) {
//             setValidado(true);
//             return;
//         }

//         try {
//             if (!props.modoEdição) {
//                 await salvarCliente(cliente); // Cadastrar cliente no backend
//             } else {
//                 await atualizarClienteBackend(cliente.cpf, cliente); // Atualizar cliente no backend
//             }

//             props.setModoEdição(false);
//             limparFormulario();
//         } catch (error) {
//             console.error("Erro ao enviar cliente:", error.message);
//         }
//     }

//     async function excluirCliente(cpf) {
//         try {
//             await axios.delete(`http://localhost:3000/clientes/${cpf}`);
//             listarClientes(); // Atualizar a lista de clientes após exclusão
//         } catch (error) {
//             console.error("Erro ao excluir cliente:", error.message);
//         }
//     }

//     function limparFormulario() {
//         setValidado(false);
//         setCliente({
//             cpf: '',
//             nome: '',
//             sobrenome: '',
//             sexo: '',
//             data_nascimento: '',
//             email: '',
//             estado_civil: '',
//             cidade: { id: 0, nome: '', estado: '' }
//         });
//     }

//     function atualizarCliente(evento) {
//         setCliente({ ...cliente, [evento.target.name]: evento.target.value });
//     }

//     function selecionarCidade(evento) {
//         const id_cidade = Number(evento.target.value);
//         const cidadeSelecionada = props.listaDeCidades.find(cidade => cidade.id === id_cidade);
//         setCliente({ ...cliente, cidade: cidadeSelecionada });
//     }

//     return (
//         <div>
//             <Alert className="text-center"><h2>Cadastro de Clientes</h2></Alert>
//             {cadastroSucesso && <Alert variant="success">Operação concluída com sucesso!</Alert>}

//             <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Nome</Form.Label>
//                         <Form.Control required type="text" placeholder="Nome" name='nome' value={cliente.nome} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Informe o Nome do cliente</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Sobrenome</Form.Label>
//                         <Form.Control required type="text" placeholder="Sobrenome" name='sobrenome' value={cliente.sobrenome} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Informe o Sobrenome do cliente</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Form.Group as={Col} md="3">
//                     <Form.Label>CPF</Form.Label>
//                     <Form.Control required type="text" placeholder="000.000.000-00" name='cpf' value={cliente.cpf} onChange={atualizarCliente} />
//                     <Form.Control.Feedback type="invalid">Por favor, informe o CPF.</Form.Control.Feedback>
//                 </Form.Group>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="6">
//                         <Form.Label>Sexo</Form.Label>
//                         <Form.Control required type="text" placeholder="Sexo" name='sexo' value={cliente.sexo} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, insira o sexo do cliente.</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} md="6">
//                         <Form.Label>Data de Nascimento</Form.Label>
//                         <Form.Control required type="date" name='data_nascimento' value={cliente.data_nascimento} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, insira a data de nascimento.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Email</Form.Label>
//                         <InputGroup hasValidation>
//                             <InputGroup.Text>@</InputGroup.Text>
//                             <Form.Control required type="email" placeholder="Email" name='email' value={cliente.email} onChange={atualizarCliente} />
//                             <Form.Control.Feedback type="invalid">Por favor, informe o email.</Form.Control.Feedback>
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group as={Col} md="4">
//                         <Form.Label>Cidade</Form.Label>
//                         <Form.Select required value={cliente.cidade ? cliente.cidade.id : 0} onChange={selecionarCidade}>
//                             <option value={0} disabled>Selecione a cidade</option>
//                             {props.listaDeCidades.map((cidade) => (
//                                 <option key={cidade.id} value={cidade.id}>
//                                     {cidade.id + " - " + cidade.nome + "/" + cidade.estado}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                         <Form.Control.Feedback type="invalid">Por favor, selecione uma cidade.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                     <Form.Group as={Col} md="3">
//                         <Form.Label>Estado Civil</Form.Label>
//                         <Form.Control required type="text" placeholder="Estado Civil" name='estado_civil' value={cliente.estado_civil} onChange={atualizarCliente} />
//                         <Form.Control.Feedback type="invalid">Por favor, informe o estado civil.</Form.Control.Feedback>
//                     </Form.Group>
//                 </Row>

//                 <Form.Group className="mb-3">
//                     <Form.Check required label="Concordo com os termos e condições" feedback="Você deve concordar antes de enviar." feedbackType="invalid" />
//                 </Form.Group>

//                 <Button type="submit">{props.modoEdição ? "Atualizar" : "Cadastrar"}</Button>
//                 <Button variant="secondary" onClick={() => { props.setModoEdição(false); props.setMostrarTabela(true); }} style={{ marginLeft: '10px' }}>Voltar</Button>
//             </Form>

// </div>);}


