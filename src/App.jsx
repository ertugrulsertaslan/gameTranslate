import { Icon } from "@iconify/react";
import React, { useState } from "react";
function App() {
  const [selectedGameTime, setSelectedGameTime] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([
    { value: "1", label: "1-3", price: "$200" },
    { value: "2", label: "4-5", price: "$300" },
    { value: "3", label: "5+", price: "$400" },
  ]);
  const [gameTimes, setGameTimes] = useState([
    { value: "30", label: "30m - 40m" },
    { value: "40", label: "40m -50m" },
    { value: "1", label: "1h - 2h" },
  ]);
  return (
    <div className="flex  h-screen w-full px-10">
      <div className="flex flex-col w-full">
        <div className="w-full flex gap-12 h-1/5  p-10 rounded-sm items-center justify-between bg-gray-200">
          <h1 className="text-xl">Game Translate</h1>

          <div className="w-1/5 relative">
            <input className="border h-16 w-full border-1 rounded-full p-5 pr-16" />
            <Icon
              className="absolute top-3 right-6 w-8 h-8"
              icon="iconamoon:search-fill"
            />
          </div>

          <h1 className="text-xl">Game Translate</h1>
        </div>
        <div className="w-full h-screen flex">
          <div className="w-3/4 flex gap-6 py-5 flex-wrap justify-center">
            <div className="w-1/4 h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
            <div className="w-1/4 h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
            <div className="w-1/4  h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
            <div className="w-1/4  h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
            <div className="w-1/4  h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
            <div className="w-1/4  h-60 bg-gray-200 rounded-sm p-5">
              <h1 className="text-xl">Game Translate</h1>
            </div>
          </div>
          <div className="overflow-y-auto w-1/4 h-[740px] space-y-6 bg-gray-200 p-5">
            <div className="w-full p-3 space-y-3">
              <p>Sort by</p>
              <select className="px-2 py-1 ml-1">
                <option value="recommended" disabled>
                  Recommended
                </option>
                <option value="currentToFuture">From Present to Future</option>
                <option value="futureToCurrent">From Future to Present</option>
              </select>
            </div>
            {/* Game Time Filter */}
            <div className="space-y-2 my-5">
              <p className="font-bold">Game Time</p>
              {selectedGameTime && (
                <p className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded">
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
                <p className="text-center cursor-pointer mt-4 bg-red-500 text-white rounded">
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
                      />
                      <label className="ml-2" htmlFor="pm">
                        {player.label}
                      </label>
                    </div>
                    <p>{player.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
