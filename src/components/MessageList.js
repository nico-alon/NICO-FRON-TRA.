import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../App.css';

const MessageList = ({ messages }) => {
  // Mensajes de prueba
  const testMessages = [
    { id: '1', user: 'Yo', text: 'Este es un mensaje de prueba de mi parte.' },
    { id: '2', user: 'Bot', text: 'Este es un mensaje de prueba de otro usuario.' },
  ];

  // Combinar mensajes reales y de prueba
  const allMessages = [...testMessages, ...messages];

  return (
    <ListGroup className="message-list">
      {allMessages.map(message => (
        <ListGroup.Item 
          key={message.id} 
          className={`message-item ${message.user === 'Yo' ? 'my-message' : 'other-message'}`}
        >
          <div className="message-content">
            <div className="message-user">{message.user}</div>
            <div className="message-text">{message.text}</div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MessageList;
