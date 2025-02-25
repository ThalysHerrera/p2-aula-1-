

import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';

export default function CadastroCliente() {
    const [validado, setValidado] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        } else {
            setValidado(true);
            setCadastroSucesso(true); // Exibe a mensagem de sucesso
            setTimeout(() => setCadastroSucesso(false), 3000); // Oculta após 3 segundos

            // Aqui você pode adicionar o envio dos dados para a API
            console.log("Cadastro realizado com sucesso!");
        }
    }

    function limparFormulario() {
        setValidado(false);
        setCadastroSucesso(false);
        document.getElementById("form-cadastro").reset();
    }

    return (
        <div>
            <h3>Formulário de Cadastro de Cliente</h3>

            {cadastroSucesso && (
                <Alert variant="success">Cadastro concluído com sucesso!</Alert>
            )}

            <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required type="text" placeholder="Nome" />
                        <Form.Control.Feedback type="invalid">Informe o Nome do cliente</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control required type="text" placeholder="Sobrenome" />
                        <Form.Control.Feedback type="invalid">Informe o Sobrenome do cliente</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control required type="text" placeholder="Sexo" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o sexo do cliente.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control required type="date" />
                        <Form.Control.Feedback type="invalid">Por favor, insira a data de nascimento.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control required type="email" placeholder="Email" />
                            <Form.Control.Feedback type="invalid">Por favor, informe o email.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Endereço Completo</Form.Label>
                        <Form.Control required type="text" placeholder="Endereço" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o endereço completo.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="3">
                        <Form.Label>Estado Civil</Form.Label>
                        <Form.Control required type="text" placeholder="Estado Civil" />
                        <Form.Control.Feedback type="invalid">Por favor, informe o estado civil.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>RG</Form.Label>
                        <Form.Control required type="text" placeholder="RG" />
                        <Form.Control.Feedback type="invalid">Por favor, informe o RG.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Check required label="Concordo com os termos e condições" feedback="Você deve concordar antes de enviar." feedbackType="invalid" />
                </Form.Group>

                <Button type="submit">Cadastrar</Button>
                <Button variant="secondary" type="button" onClick={limparFormulario} className="ms-2">Limpar</Button>
            </Form>
        </div>
    );
}
