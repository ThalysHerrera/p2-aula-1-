





import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ContextoLogin } from '../App';

export default function Menu() {
    const contextoLogin = useContext(ContextoLogin);

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg">
            <Container>
                {/* Logo/Menu */}
                <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
                   Menu
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Dropdown de Cadastros */}
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown" className="fw-semibold">
                            <NavDropdown.Item as={Link} to="/clientes" className="dropdown-item-custom">
                                Clientes
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/fornecedor" className="dropdown-item-custom">
                                Fornecedor
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/produtos" className="dropdown-item-custom">
                                Produtos
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/funcionarios" className="dropdown-item-custom">
                                Funcionários
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/veiculos" className="dropdown-item-custom">
                                Veículos
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/imoveis" className="dropdown-item-custom">
                                Imóveis
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/* Botão de Logout */}
                    <Button 
                        variant="outline-danger" 
                        className="fw-semibold"
                        onClick={() => contextoLogin.setDadosLogin({ Usuario: "", logado: false })}
                    >
                        Sair
                    </Button>
                </Navbar.Collapse>
            </Container>

            {/* Estilos personalizados */}
            <style>
                {`
                    .dropdown-item-custom {
                        transition: background-color 0.3s ease-in-out;
                    }
                    .dropdown-item-custom:hover {
                        background-color: #dc3545 !important;
                        color: white !important;
                    }
                `}
            </style>
        </Navbar>
    );
}
