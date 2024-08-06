import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleExit = () => {
    navigate('/'); // Redirige al inicio de la aplicación
  };

  // Verifica si la ruta actual es la página de inicio
  const isHome = location.pathname === '/';

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
        Slick <i className="fa fa-comments" style={{ fontSize: '30px', color: '#ff7830' }}></i>
        </Navbar.Brand>
        {!isHome && (
          <Navbar.Collapse className="justify-content-end">
            <Button variant="danger" onClick={handleExit}>
              Salir
            </Button>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
