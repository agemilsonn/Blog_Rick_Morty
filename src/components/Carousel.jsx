import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

function CharacterCarousel() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character")
      .then(response => {
        const primeirosCinco = response.data.results.slice(0, 5);
        setCharacters(primeirosCinco);
      })
      .catch(error => console.error("Erro ao buscar personagens:", error));
  }, []);

  return (
    <Carousel className="mb-4">
      {characters.map((char) => (
        <Carousel.Item key={char.id}>
          <img
            className="d-block w-100"
            src={char.image}
            alt={char.name}
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{char.name}</h3>
            <p>{char.status} - {char.species}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CharacterCarousel;
