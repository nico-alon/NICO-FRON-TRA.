import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [editChannelName, setEditChannelName] = useState('');
  const [editingChannelId, setEditingChannelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // recupera los canales guardados en localstorage
    const savedChannels = JSON.parse(localStorage.getItem('channels')) || [];
    setChannels(savedChannels);
    const currentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    if (currentWorkspaceId) {
      filterChannels(savedChannels, currentWorkspaceId);
    }
    if (savedChannels.length === 0) {
      createDefaultChannel();
    }
  }, []);

  useEffect(() => {
    //filtro los canales y me quedo con el del espacio de trabajo seleccionado
    const currentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    if (currentWorkspaceId) {
      filterChannels(channels, currentWorkspaceId);
    }
  }, [channels]);

  const filterChannels = (channelsList, workspaceId) => {
    const filtered = channelsList.filter(channel => channel.workspaceId === workspaceId);
    setFilteredChannels(filtered);
  };

  const createDefaultChannel = () => {
    const workspaceId = localStorage.getItem('currentWorkspaceId');
    if (!workspaceId) return;

    const defaultChannel = {
      id: new Date().getTime().toString(),
      name: 'general',
      workspaceId: workspaceId,
    };

    const updatedChannels = [defaultChannel];
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    filterChannels(updatedChannels, workspaceId);
    navigate(`/workspace/${workspaceId}/${defaultChannel.id}`);
  };

  const handleCreateChannel = (event) => {
    event.preventDefault();
    const workspaceId = localStorage.getItem('currentWorkspaceId');
    if (!workspaceId) return;

    const newChannel = {
      id: new Date().getTime().toString(), //genero un id unico con la hora para el canal
      name: newChannelName,
      workspaceId: workspaceId,
    };
    const updatedChannels = [...channels, newChannel];
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    setNewChannelName('');
    setShowCreateModal(false);
    filterChannels(updatedChannels, workspaceId);
    navigate(`/workspace/${workspaceId}/${newChannel.id}`);
  };

  const handleEditChannel = (event) => {
    event.preventDefault();
    const updatedChannels = channels.map(channel =>
      channel.id === editingChannelId ? { ...channel, name: editChannelName } : channel
    );
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    setEditChannelName('');
    setEditingChannelId(null);
    setShowEditModal(false);
    const currentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    if (currentWorkspaceId) {
      filterChannels(updatedChannels, currentWorkspaceId);
    }
  };

  const openEditModal = (channelId, currentName) => {
    setEditingChannelId(channelId);
    setEditChannelName(currentName);
    setShowEditModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  return (
    <aside className="sidebar">
      <h2>Canales</h2>
      <ListGroup>
        {filteredChannels.map(channel => (
          <ListGroup.Item key={channel.id} className="d-flex justify-content-between align-items-center">
            <Link to={`/workspace/${channel.workspaceId}/${channel.id}`} className="channelList">
              {channel.name}
            </Link>
            <Button variant="link" className='editBtn' onClick={() => openEditModal(channel.id, channel.name)}>
              <i className='fa fa-pencil'></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="" className="createBtn mt-3" onClick={() => setShowCreateModal(true)}>
        <i className="fa fa-plus"></i> Crear
      </Button>

      {/* Modal para crear un canal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Canal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateChannel}>
            <Form.Group>
              <Form.Label>Nombre del Canal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del canal"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCreateModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Crear
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para editar un canal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Canal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditChannel}>
            <Form.Group>
              <Form.Label>Nombre del Canal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nuevo nombre del canal"
                value={editChannelName}
                onChange={(e) => setEditChannelName(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </aside>
  );
};

export default Sidebar;
