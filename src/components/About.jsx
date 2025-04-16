import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-5 text-light">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="custom-card p-4 shadow-lg border-0">
            <Card.Body>
              <Card.Title className="custom-title text-center text-3xl">
                Sobre o Blog da Série Rick and Morty
              </Card.Title>
              <Card.Text className="mt-3">
                Este blog foi criado para ser a Ultima avaliação da matéria LABORATÓRIO DE PRODUÇÃO DE SOFTWARE
              </Card.Text>
              <h2 className="text-secondary mt-4">Integrantes do Blog:</h2>
              <ul className="list-unstyled text-secondary">
                <li>Thiago Allan – Desenvolvedor & Data Engineer</li>
                <li>Ademilson Ribeiro – Desenvolvedor</li>
                <li>Felipe Rebelo – Web Designer</li>
                <li>João Victor – Universitário</li>
                <li>Agemilson Abreu – Universitário</li>
              </ul>


              <h3 className="custom-title mt-4">Entre em contato</h3>
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Control 
                      type="text" 
                      placeholder="Seu nome" 
                      className="custom-input" 
                      required 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                      type="email" 
                      placeholder="Seu e-mail" 
                      className="custom-input" 
                      required 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Mensagem" 
                      className="custom-input" 
                      required 
                  />
                </Form.Group>
                <Button variant="custom-btn" 
                        type="submit" 
                        className="w-100">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;