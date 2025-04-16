
// components/CommentForm.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Button } from 'react-bootstrap';

const CommentForm = () => {
  const [formData, setFormData] = useState({ name: '', comment: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then(result => alert('Comentário enviado com sucesso!'))
      .catch(error => alert('Erro ao enviar comentário.'));
  };

  return (
    <Form onSubmit={handleSubmit} className="text-white">
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} className="custom-input" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Comentário</Form.Label>
        <Form.Control as="textarea" rows={3} name="comment" value={formData.comment} onChange={handleChange} className="custom-input" required />
      </Form.Group>
      <Button variant="light" type="submit" className="custom-btn">Enviar</Button>
    </Form>
  );
};

export default CommentForm;




