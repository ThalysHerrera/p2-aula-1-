import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';

export default function Cadastroprodutos() {
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
           <Alert className="text-center"><h2>Cadastro de Produtos</h2></Alert>

            {cadastroSucesso && (
                <Alert variant="success">Cadastro concluído com sucesso!</Alert>
            )}

            <Form id="form-cadastro" noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Nome do produto </Form.Label>
                        <Form.Control required type="text" placeholder="Nome do produto" />
                        <Form.Control.Feedback type="invalid">Informe o Nome do produto</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control required type="text" placeholder="Marca" />
                        <Form.Control.Feedback type="invalid">Informe a Marca do produto </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Codigo de Barras</Form.Label>
                        <Form.Control required type="text" placeholder="Codigo de Barras" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o Codigo de Barras.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control required type="text" />
                        <Form.Control.Feedback type="invalid">Por favor, insira a Quantidade do produto.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Preço de Custo</Form.Label>
                     
                            <Form.Control required type="text" placeholder="Preço de Custo" />
                            <Form.Control.Feedback type="invalid">Por favor, informe o Preço de Custo.</Form.Control.Feedback>
                       
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                        <Form.Label>Preço de Venda</Form.Label>
                        <Form.Control required type="text" placeholder="Preço de Venda" />
                        <Form.Control.Feedback type="invalid">Por favor, insira o Preço de Venda.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control required type="text" placeholder="categoria" />
                        <Form.Control.Feedback type="invalid">Por favor, informe qual a categoria do produto.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>Validade</Form.Label>
                        <Form.Control required type="text" placeholder="Validade" />
                        <Form.Control.Feedback type="invalid">Por favor, informe a Validade.</Form.Control.Feedback>
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
