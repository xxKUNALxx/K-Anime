import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import './Main.css'
import Preloader from './Preloader';

const Main = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAnimeData() {
      try {
        const res = await fetch(
          'https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/popular',
          { cache: 'no-store' }
        );
        const data = await res.json();
        setAnimeData(data.results);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    }

    getAnimeData();
  }, []);

  return (
    <div className="relative h-full">
      {loading ? (
        <Preloader />
      ) : (
        <div 
          className="relative h-full p-4 bg-custom transition-opacity duration-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
          <div className="relative z-10">
            <h1 className="text-white font-extrabold text-4xl md:text-5xl p-4 text-center drop-shadow-lg">
              Popular Anime
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
              {animeData.map((anime) => (
                <Link to={`/details/${anime.id}`} key={anime.id}>
                  <Card 
                    title={anime.title} 
                    image={anime.image}
                    className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
