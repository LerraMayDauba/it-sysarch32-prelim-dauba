// Pokedex.jsx
import React, { useState, useEffect } from 'react';
import Pokemon from './pokemon';


const LANGUAGES = ['English', 'Japanese', 'Chinese', 'French'];

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pokedex">
      <div className="language-filter">
        {LANGUAGES.map(lang => (
          <button key={lang} onClick={() => setLanguage(lang.toLowerCase())}>{lang}</button>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        <p>{currentPage} out of {totalPages}</p>
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Back</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </div>
          <div className="pokemon-list">
            {pokemonList.map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
            ))}
          </div>
        
        </>
      )}
    </div>
  );
}

export default Pokedex;



