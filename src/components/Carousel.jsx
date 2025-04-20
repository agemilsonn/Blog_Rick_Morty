import React, { useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarouselComponent = () => {
  const carouselWrapperStyle = {
    position: 'relative',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '0 70px',
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    objectPosition: 'top',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  const hoverImageStyle = {
    ...imageStyle,
    transform: 'scale(1.02)',
  };

  const controlStyle = {
    filter: 'invert(100%)',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    backgroundSize: '30px 30px',
    backgroundPosition: 'center',
    margin: '0 -50px',
  };

  const randomImageIds = useMemo(() => {
    const ids = new Set();
    while (ids.size < 5) {
      ids.add(Math.floor(Math.random() * 826) + 1);
    }
    return Array.from(ids);
  }, []);

  return (
    <div style={carouselWrapperStyle}>
      <Carousel
        indicators={false}
        controls={true}
        nextIcon={<span className="carousel-control-next-icon" style={controlStyle} />}
        prevIcon={<span className="carousel-control-prev-icon" style={controlStyle} />}
      >
        {randomImageIds.map((id, index) => (
          <Carousel.Item key={index}>
            <Link to={`/post/${id}`}>
              <img
                src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
                alt={`Character ${id}`}
                style={imageStyle}
                onMouseEnter={e => (e.target.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
              />
            </Link>
            <Carousel.Caption style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '10px' }}>
              <h5>Personagem #{id}</h5>
              <p>Clique para ver detalhes</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;