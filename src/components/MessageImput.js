import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css';

const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const { workspaceId, channelId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const newMessage = {
        id: new Date().getTime().toString(),
        user: 'Yo',
        text: message,
        workspaceId,
        channelId,
      };

      addMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <Form className="message-input d-flex mt-2" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          aria-label="Message"
        />
        <Button type="submit" variant="secondary" className="">
          Enviar
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;