import React, { useEffect, useState } from "react";
import Player from "@oplayer/core";
import ui from "@oplayer/ui";
import hls from "@oplayer/hls";
import { Link, useParams } from "react-router-dom";

import backgroundImage from '../assets/img.jpg';

const Watch = () => {
  const { anime } = useParams();
  const { id: watch } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [animeData, setAnimeData] = useState(null);
  const [videoSource, setVideoSource] = useState("");
  const [player, setPlayer] = useState(null);

  const findEpisodeNumber = (episodeId) => {
    const episode = animeData?.episodes.find((ep) => ep.id === episodeId);
    return episode ? episode.number : "Unknown";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const episodeRes = await fetch(
          `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/watch/${watch}`,
          { cache: "no-store" }
        );
        const episodeData = await episodeRes.json();
        const animeRes = await fetch(
          `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/info/${anime}`,
          { cache: "no-store" }
        );
        const animeData = await animeRes.json();

        setEpisodes(episodeData);
        setAnimeData(animeData);

        if (episodeData.sources && episodeData.sources.length > 0) {
          setVideoSource(episodeData.sources[episodeData.sources.length - 1].url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    return () => {
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [anime, watch]);

  useEffect(() => {
    if (!videoSource || !animeData) return;

    const newPlayer = Player.make("#app", {
      source: { src: videoSource },
      defaultQuality: "1080p",
    }).use([
      ui({
        theme: {
          primaryColor: "rgb(231 170 227)",
        },
        controlBar: { back: "always" },
        icons: {
          play: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
          pause: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>`,
          volume: [
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
            `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
          ],
          fullscreen: [
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`,
          ],
          loop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-2"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/></svg>`,
          playbackRate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
        },
      }),
      hls({ forceHLS: true }),
    ]);

    newPlayer.create();
    setPlayer(newPlayer);

    return () => {
      if (newPlayer && typeof newPlayer.destroy === "function") {
        newPlayer.destroy();
      }
    };
  }, [videoSource, animeData]);

  if (!animeData) {
    return <div>Now Loading...</div>;
  }

  return (
    <div
      className="relative h-full p-8 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
      <div className="relative z-10 max-w-screen-lg mx-auto py-10 px-5 text-white">
        <div id="app" className="relative rounded-lg overflow-hidden shadow-lg mb-5"></div>
        <div id="animetitle" className="text-center text-2xl font-semibold mb-5">
          Episode {findEpisodeNumber(watch)}
        </div>
        <div id="episodetitle" className="text-center text-xl font-medium text-purple-300 mb-8">
          <Link to={`/anime/${animeData.id}`} className="hover:underline">
            {animeData.title}
          </Link>
        </div>
        <div id="episodes">
          <h2 className="text-lg font-semibold mb-4">
            Episodes ({animeData.totalEpisodes})
          </h2>
          <div className="episodelist-container flex overflow-x-scroll space-x-4 py-2 px-2 bg-black bg-opacity-50 rounded-lg">
            {animeData.episodes.map((ep) => (
              <div
                className="episode-box min-w-[80px] p-2 bg-purple-900 bg-opacity-80 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 ease-in-out"
                key={ep.id}
              >
                <Link
                  to={`/watch/${anime}/${ep.id}`}
                  className="block text-center text-purple-300 font-medium"
                >
                  {ep.number}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
