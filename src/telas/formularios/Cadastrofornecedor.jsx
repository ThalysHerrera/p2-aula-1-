import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';

export default function Cadastrofornecedor() {
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
            setCadastroSucesso(true); 
            setTimeout(() => setCadastroSucesso(false), 3000); 

           
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
            <h3>Formulário de Cadastro de Fornecedores</h3>

            {cadastroSucesso && (
                <Alert variant="success">Cadastro concluído com sucesso!</Alert>
            )}

            <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Nome Fantasia </Form.Label>
                        <Form.Control required type="text" placeholder="Nome Fantasia" />
                        <Form.Control.Feedback type="invalid">Informe o Nome Fantasia da Empresa</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>razão Social</Form.Label>
                        <Form.Control required type="text" placeholder="Razão" />
                        <Form.Control.Feedback type="invalid">Informe a Razão social </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>CNPJ</Form.Label>
                        <Form.Control required type="text" placeholder="CNPJ" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o CNPJ da Empresa.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o Telefone da Empresa.</Form.Control.Feedback>
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
                        <Form.Label>Banco</Form.Label>
                        <Form.Control required type="text" placeholder="Banco" />
                        <Form.Control.Feedback type="invalid">Por favor, informe qual o Banco utilizado pela Empresa.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>agência</Form.Label>
                        <Form.Control required type="text" placeholder="agência" />
                        <Form.Control.Feedback type="invalid">Por favor, informe a agência.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>Conta</Form.Label>
                        <Form.Control required type="text" placeholder="Conta" />
                        <Form.Control.Feedback type="invalid">Por favor, informe a Conta.</Form.Control.Feedback>
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
