import axios from 'axios';


export const searchCharacters = async (searchTerm) => {
  if (!searchTerm) return [];

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
    const { results } = response.data;

    return results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return [];
  }
};
