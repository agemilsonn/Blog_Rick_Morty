import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './About.css';

const About = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="portal-card p-4 shadow-lg border-0">
            <Card.Body>
              <Card.Title className="portal-title text-center mb-4">
                Sobre o Blog Interdimensional
              </Card.Title>
              
              <div className="portal-content">
                <p>
                  Este portal foi desenvolvido como projeto final para a matéria de 
                  <strong> Laboratório de Produção de Software</strong>, explorando 
                  a incrível dimensão de Rick and Morty.
                </p>
                
                <h3 className="portal-subtitle mt-4">Equipe de Desenvolvimento</h3>
                
                <ul className="team-list">
                  <li className="team-member">
                    <span className="member-name">Thiago Allan</span> – Desenvolvedor & Data Engineer
                  </li>
                  <li className="team-member">
                    <span className="member-name">Ademilson Ribeiro</span> – Desenvolvedor
                  </li>
                  <li className="team-member">
                    <span className="member-name">Felipe Rebelo</span> – Web Designer
                  </li>
                  <li className="team-member">
                    <span className="member-name">João Victor</span> – Universitário
                  </li>
                  <li className="team-member">
                    <span className="member-name">Agemilson Abreu</span> – Universitário
                  </li>
                </ul>

                <div className="portal-footer mt-4">
                  <p>
                    Este projeto utiliza a <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">Rick and Morty API</a> para 
                    trazer informações precisas sobre todos os personagens da série.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;