import React from 'react'
import Search from '../components/Search';

const Api = () => {

    const [animeData, setAnimeData] = useState([]);



  
    useEffect(() => {
      async function getAnimeData() {
        try {
          const res = await fetch(
            `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/popular`,
            { cache: "no-store" }
          );
          const data = await res.json();
          setAnimeData(data.results);
        } catch (error) {
          console.error('Error fetching anime data:', error);
        }
      }
  
      getAnimeData();
    }, []);
  return (
    <div>
      {/* <Search data={animeData}/> */}
      
    </div>
  )
}

export default Api


