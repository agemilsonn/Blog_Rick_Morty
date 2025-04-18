// utils/search.js
import axios from 'axios';

// Função para buscar personagens baseados no termo de busca
export const searchCharacters = async (searchTerm) => {
  if (!searchTerm) return []; // Se não houver termo de busca, retorna um array vazio

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
    const { results } = response.data;
    
    // Retorna apenas os resultados correspondentes à pesquisa
    return results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return [];
  }
};
