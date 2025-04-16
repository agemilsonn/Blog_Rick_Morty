import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from '../components/CommentForm';

function Post() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => setCharacter(response.data));
  }, [id]);

  if (!character) return <p>Carregando personagem...</p>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} className="img-fluid rounded-4 mb-3" />
          <ul>
            <li>Status: {character.status}</li>
            <li>Espécie: {character.species}</li>
            <li>Gênero: {character.gender}</li>
            <li>Origem: {character.origin.name}</li>
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Comentários</h4>
          <CommentForm characterId={character.id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
