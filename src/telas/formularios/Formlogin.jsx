


import { Container, Form, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useRef, useContext } from "react";
import { ContextoLogin } from "../../App"; 

export default function Formlogin(props) {
    const contextoLogin = useContext(ContextoLogin);
    const Usuario = useRef();
    const Senha = useRef();

    function verificaCredenciais(evento) {
        evento.preventDefault(); 
        evento.stopPropagation();

        const UsuarioInformado = Usuario.current.value;
        const SenhaInformado = Senha.current.value;

        if (UsuarioInformado === 'Thalys' && SenhaInformado === '0011') {
            contextoLogin.setDadosLogin({
                Usuario: UsuarioInformado,
                logado: true
            });
            alert("Login realizado com sucesso!");
        } else {
            alert("Usuário ou senha estão incorretos.");
        }
    }

    return (
        <div className="login-container">
            <Container className=" d-flex justify-content-center align-items-center vh-100 ">
                <Card className="p-5  shadow-lg w-5 text-white bg-dark bg-opacity-75">
                    <h2 className="text-center mb-4">Login</h2>
                    <Form className="mt-3" onSubmit={verificaCredenciais}> 
                        <Form.Group className="mb-3">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control
                                type="text"
                                id="Usuario"
                                name="Usuario"
                                placeholder="Digite seu usuário"
                                ref={Usuario}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                id="Senha"
                                name="Senha"
                                ref={Senha}
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>

        </div>
    );
}











