import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.send(
            'service_wvgyzu8', // Service ID
            'template_cw77zxp', // Template ID
            formData,
            'R_IpbZ1eZUyXqXFDz' // User ID
        )
            .then((response) => {
                console.log('E-mail enviado!', response.status, response.text);
                setSendStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((err) => {
                console.error('Falha no envio:', err);
                setSendStatus('error');
            })
            .finally(() => {
                setIsSending(false);
                setTimeout(() => setSendStatus(null), 5000);
            });
    };

    return (
        <Container className="contact-container">
            <div className="portal-card">
                <h1 className="portal-title">Portal de Contato Interdimensional</h1>

                <p className="portal-text">
                    Envie uma mensagem diretamente para nosso email através deste portal dimensional!
                </p>

                <div className="divider"></div>

                <div className="contact-form">
                    {sendStatus === 'success' && (
                        <Alert variant="success" className="portal-alert">
                            Mensagem enviada com sucesso! Retornaremos em breve.
                        </Alert>
                    )}
                    {sendStatus === 'error' && (
                        <Alert variant="danger" className="portal-alert">
                            O portal falhou! Tente novamente mais tarde.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Seu Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Email Dimensional</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label">Mensagem</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button
                                type="submit"
                                className="btn-portal"
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-send-fill me-2"></i>
                                        Enviar Mensagem
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default Contact;