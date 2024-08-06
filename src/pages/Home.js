import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Card, Modal } from 'react-bootstrap';
import '../App.css';

const Home = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    setWorkspaces(savedWorkspaces);
  }, []);

  const handleAddWorkspace = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setFormValidated(true);
      return;
    }

    if (newWorkspaceName.trim()) {
      const lastId = workspaces.length > 0 ? Math.max(workspaces.map(ws => ws.id)) : 0;
      const newId = lastId + 1;

      const newWorkspace = {
        id: newId,
        name: newWorkspaceName,
        description: newWorkspaceDescription || '',
      };
      const updatedWorkspaces = [...workspaces, newWorkspace];
      setWorkspaces(updatedWorkspaces);
      localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));
      setNewWorkspaceName('');
      setNewWorkspaceDescription('');
      setShowModal(false);

      // Guardar currentWorkspaceId en localStorage
      localStorage.setItem('currentWorkspaceId', newWorkspace.id);

      // Redirigir al primer canal si existe, o a '/workspace/${newWorkspace.id}/1' si no hay canales
      redirectToWorkspace(newWorkspace.id);
    }
  };

  const handleClearData = () => {
    localStorage.removeItem('workspaces');
    localStorage.removeItem('channels');
    localStorage.removeItem('messages');
    setWorkspaces([]);
    window.location.reload(); // Recargar la página para asegurar que todos los datos se eliminen correctamente
  };

  const handleWorkspaceClick = (event, workspaceId) => {
    event.preventDefault(); // Evita la navegación predeterminada
    localStorage.setItem('currentWorkspaceId', workspaceId);
    redirectToWorkspace(workspaceId);
  };

  const redirectToWorkspace = (workspaceId) => {
    const savedChannels = JSON.parse(localStorage.getItem('channels')) || [];
    const firstChannel = savedChannels.find(channel => Number(channel.workspaceId) === workspaceId);
    if (firstChannel) {
      firstChannel.id = Number(firstChannel.id);
      navigate(`/workspace/${workspaceId}/${firstChannel.id}`);
    } else {
      navigate(`/workspace/${workspaceId}/1`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <Button variant="" className='createBtn' onClick={() => setShowModal(true)}>
          <i className="fa fa-plus"></i> Crear nuevo
        </Button>
        {workspaces.length > 0 && (
          <Button 
            variant="" 
            onClick={handleClearData} 
            className="btn btn-sm btn-outline-danger"
          >
            <i className="fa fa-trash"></i> Limpiar datos
          </Button>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Espacio de Trabajo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={formValidated} onSubmit={handleAddWorkspace}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del espacio de trabajo"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                required
                isInvalid={formValidated && !newWorkspaceName.trim()}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingrese un nombre.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción (opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese una descripción (opcional)"
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                maxLength={90}
                isInvalid={false}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
              <Button variant="" className='createBtn' type="submit">
                Crear
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="mt-4">
        <h3>Espacios de Trabajo</h3>
        <div className="row">
          {workspaces.length > 0 ? (
            workspaces.map((workspace) => (
              <div className="col-md-4 mb-4" key={workspace.id}>
                <Card className='cardws'>
                  <Card.Body className='d-flex flex-column'>
                    <div className='flex-grow-1'>
                      <Card.Title>{workspace.name}</Card.Title>
                      <Card.Text>
                        {workspace.description}
                      </Card.Text>
                    </div>
                    <Link 
                      className='wsLink' 
                      to={`/workspace/${workspace.id}/1`} 
                      onClick={(e) => handleWorkspaceClick(e, workspace.id)}
                    >
                      Ingresar <i className="fa fa-arrow-right"></i>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div>No workspaces available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
