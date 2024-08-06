import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageImput';
import { Container, Row, Col } from 'react-bootstrap';

const Chat = ({ messages, addMessage }) => {
  const { workspaceId, channelId } = useParams();
  const [workspaceName, setWorkspaceName] = useState('');
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const savedChannels = JSON.parse(localStorage.getItem('channels')) || [];

    const workspace = savedWorkspaces.find(ws => ws.id === workspaceId);
    setWorkspaceName(workspace ? workspace.name : '');

    const channel = savedChannels.find(ch => ch.id === channelId && ch.workspaceId === workspaceId);
    setChannelName(channel ? channel.name : '');
  }, [workspaceId, channelId]);

  return (
    <Container fluid className="chat-page">
      <Row>
        <Col md={2} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col md={10} className="chat-window-col">
          <div className="d-flex flex-column h-100">
            <div className="d-flex justify-content-between mb-3">
              <span className='breadcrumb'>
                {workspaceName.toUpperCase()} / {channelName.toUpperCase()}
              </span>
            </div>
            <div className="flex-grow-1">
              <MessageList messages={messages} />
              <MessageInput addMessage={addMessage} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
