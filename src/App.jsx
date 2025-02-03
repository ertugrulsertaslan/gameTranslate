import { Icon } from "@iconify/react";
import React, { useState } from "react";
import gameData from "./data/gameTranslate.json";

function App() {
  const [selectedSortOption, setSelectedSortOption] = useState("sortby");
  const [selectedGameTime, setSelectedGameTime] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedGameAge, setSelectedGameAge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([
    { value: "1-3", label: "1-3" },
    { value: "4-5", label: "4-5" },
    { value: "5+", label: "5+" },
  ]);
  const [gameTimes, setGameTimes] = useState([
    { value: "30-40", label: "30m - 40m" },
    { value: "40-50", label: "40m - 50m" },
    { value: "60-120", label: "1h - 2h" },
  ]);

  const [gameAges, setGameAges] = useState([
    { value: "6", label: "6+" },
    { value: "8", label: "8+" },
    { value: "10", label: "10+" },
    { value: "12", label: "12+" },
    { value: "14", label: "14+" },
    { value: "18", label: "18+" },
  ]);

  const filteredGames = gameData.filter((game) => {
    const gameDuration = parseInt(game.duration);

    let isTimeMatch = true;
    if (selectedGameTime) {
      const [minTime, maxTime] = selectedGameTime.split("-").map(Number);
      isTimeMatch = gameDuration >= minTime && gameDuration <= maxTime;
    }
    let isPlayerMatch = true;
    if (selectedPlayer) {
      const [minPlayers, maxPlayers] = selectedPlayer.includes("+")
        ? [parseInt(selectedPlayer), Infinity]
        : selectedPlayer.split("-").map(Number);

      const gamePlayerNumbers = game.players.match(/\d+/g).map(Number);
      isPlayerMatch = gamePlayerNumbers.some(
        (num) => num >= minPlayers && num <= maxPlayers
      );
    }
    let isAgeMatch = true;
    if (selectedGameAge) {
      isAgeMatch = parseInt(game.age_limit) >= parseInt(selectedGameAge);
    }
    let isCategoryMatch = true;
    if (selectedCategory) {
      isCategoryMatch = game.category === selectedCategory;
    }

    let isSearchMatch = true;
    if (searchTerm) {
      isSearchMatch = game.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return (
      isTimeMatch &&
      isPlayerMatch &&
      isAgeMatch &&
      isCategoryMatch &&
      isSearchMatch
    );
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (selectedSortOption === "currentToFuture") {
      return new Date(a.year) - new Date(b.year);
    }
    if (selectedSortOption === "futureToCurrent") {
      return new Date(b.year) - new Date(a.year);
    }
    return 0;
  });
  const categories = [...new Set(gameData.map((game) => game.category))];
  return (
    <div className="flex  h-screen w-full px-10">
      <div className="flex flex-col w-full ">
        <div className="w-full flex gap-12 h-1/5 mx-5 px-10 border border-gray-200 rounded-sm items-center justify-between bg-gray-100">
          <h1 className="text-xl w-40">Game Translate</h1>
          <div className="w-[90%] relative">
            <input
              className="h-12 w-full border-1 rounded-xl p-5 pl-16 border-gray-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon
              onClick={() => setSearchTerm(searchTerm)}
              className="absolute top-3 left-4 w-6 h-6 text-gray-700"
              icon="iconamoon:search-fill"
            />
          </div>
        </div>
        <div className="w-full h-screen flex px-5 py-5">
          <div className="overflow-y-auto w-1/4 h-[740px] space-y-6 p-5 px-10 border border-gray-300 bg-gray-100 rounded-md">
            {/* Category Filter */}
            <div className="space-y-2 my-5">
              <p className="font-bold">Category</p>
              {selectedCategory && (
                <p
                  className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear Selection
                </p>
              )}
              <div className="flex flex-col">
                {categories.map((category, index) => (
                  <div key={index} className="mb-1">
                    <input
                      type="radio"
                      id={`category-${index}`}
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                    />
                    <label className="ml-2" htmlFor={`category-${index}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Game Time Filter */}
            <div className="space-y-2 my-5">
              <p className="font-bold">Game Time</p>
              {selectedGameTime && (
                <p
                  className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded"
                  onClick={() => setSelectedGameTime(null)}
                >
                  Clear Selection
                </p>
              )}
              <div className="flex flex-col">
                {gameTimes.map((game, index) => (
                  <div key={index} className="mb-1">
                    <input
                      type="radio"
                      id="am"
                      name="game-time"
                      value={game.value}
                      checked={selectedGameTime === game.value}
                      onChange={() => setSelectedGameTime(game.value)}
                    />
                    <label className="ml-2" htmlFor="am">
                      {game.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Player Filter */}
            <div className="space-y-2 my-5">
              <p className="font-bold">Player</p>
              {selectedPlayer && (
                <p
                  className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded"
                  onClick={() => setSelectedPlayer(null)}
                >
                  Clear Selection
                </p>
              )}
              <div className="flex flex-col">
                {players.map((player, index) => (
                  <div key={index} className="flex justify-between mb-1">
                    <div>
                      <input
                        type="radio"
                        id="pm"
                        name="fly-time"
                        value={player.value}
                        checked={selectedPlayer === player.value}
                        onChange={() => setSelectedPlayer(player.value)}
                      />
                      <label className="ml-2" htmlFor="pm">
                        {player.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Game Age Filter */}
            <div className="space-y-2 my-5">
              <p className="font-bold">Age</p>
              {selectedGameAge && (
                <p
                  className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded"
                  onClick={() => setSelectedGameAge(null)}
                >
                  Clear Selection
                </p>
              )}
              <div className="flex flex-col">
                {gameAges.map((game, index) => (
                  <div key={index} className="mb-1">
                    <input
                      type="radio"
                      id="am"
                      name="game-time"
                      value={game.value}
                      checked={selectedGameAge === game.value}
                      onChange={() => setSelectedGameAge(game.value)}
                    />
                    <label className="ml-2" htmlFor="am">
                      {game.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-6 py-5 flex-wrap overflow-y-auto w-full h-[740px] px-10">
            <div className="w-full justify-end text-right h-10">
              <select
                className="px-2 py-1 ml-1 rounded-md border border-gray-400"
                value={selectedSortOption}
                onChange={(e) => setSelectedSortOption(e.target.value)}
              >
                <option value="sortby" disabled>
                  Sort By: Recommended
                </option>
                <option value="currentToFuture">From Present to Future</option>
                <option value="futureToCurrent">From Future to Present</option>
              </select>
            </div>
            <div className="flex gap-6 py-5 flex-wrap w-full">
              {sortedGames.length > 0 &&
                sortedGames.map((game) => (
                  <div
                    key={game.id}
                    className="w-[32%] h-112 border border-gray-300 rounded-md text-center"
                  >
                    <img
                      className="w-full mb-3 rounded-tr-md rounded-tl-md"
                      src={game.imageSource}
                      alt=""
                    />
                    <div className="flex-col justify-between w-full px-5">
                      <h1 className="text-xl w-full mb-5">{game.name}</h1>
                      <p className="mb-5">{game.description}</p>
                      <div className="flex w-full gap-6 justify-center mb-5">
                        <div>
                          <p>Age</p>
                          <p className="text-sm">{game.age_limit}</p>
                        </div>
                        <div>
                          <p>Player</p>
                          <p className="text-sm">{game.players}</p>
                        </div>
                        <div>
                          <p>Time</p>
                          <p className="w-20 text-sm">{game.durationLabel}</p>
                        </div>
                        <div>
                          <p>Year</p>
                          <p className="text-sm">{game.year}</p>
                        </div>
                        <div>
                          <p>Category</p>
                          <p className="text-sm">{game.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
