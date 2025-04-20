import React, { useEffect, useRef } from 'react';
import { FormControl, Dropdown, Image } from 'react-bootstrap';
import './SearchOverlay.css';

const SearchOverlay = ({ visible, onClose, suggestions, searchTerm, setSearchTerm, onSuggestionClick }) => {
  const overlayRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="search-overlay">
      <div className="search-box" ref={overlayRef}>
        <FormControl
          type="search"
          placeholder="Buscar personagens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <Dropdown.Menu show className="suggestion-dropdown">
            {suggestions.map((char) => (
              <Dropdown.Item key={char.id} onClick={() => onSuggestionClick(char.id)}>
                <Image src={char.image} roundedCircle style={{ width: '30px', marginRight: '10px' }} />
                {char.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
