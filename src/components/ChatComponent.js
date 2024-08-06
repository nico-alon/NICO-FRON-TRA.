import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MessageList from './MessageList';
import MessageInput from './MessageImput'; // Asegúrate de que el nombre del archivo sea correcto

const ChatComponent = () => {
  return (
    <Container fluid className="chat-component d-flex flex-column h-100">
      <Row className="flex-grow-1 d-flex flex-column">
        <Col className="message-list-col p-3 flex-grow-1 overflow-auto">
          <MessageList />
        </Col>
        <Col className="message-input-col p-3">
          <MessageInput />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatComponent;
