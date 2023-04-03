import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const LeagueInput = () => {
  const [matches, setMatches] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [league, setLeague] = useState("");

  const handleAddMatch = (e) => {
    e.preventDefault();

    const newMatch = {
      firstTeam: {
        name: e.target.elements.team1.value,
        score: parseInt(e.target.elements.score1.value),
      },
      secondTeam: {
        name: e.target.elements.team2.value,
        score: parseInt(e.target.elements.score2.value),
      },
      date: new Date().toISOString(),
    };

    if (editIndex === -1) {
      setMatches([...matches, newMatch]);
    } else {
      setMatches([
        ...matches.slice(0, editIndex),
        newMatch,
        ...matches.slice(editIndex + 1),
      ]);
      setEditIndex(-1);
    }
    e.target.reset();
  };

  const addLeagueHandler = async () => {
    try {
      await axios.post(BASE_URL + "/api/leagues", { name: league, matches });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteMatch = (index) => {
    setMatches([...matches.slice(0, index), ...matches.slice(index + 1)]);
  };

  const handleEditMatch = (index) => {
    setEditIndex(index);
    const match = matches[index];
    document.getElementsByName("team1")[0].value = match.firstTeam.name;
    document.getElementsByName("score1")[0].value = match.firstTeam.score;
    document.getElementsByName("team2")[0].value = match.secondTeam.name;
    document.getElementsByName("score2")[0].value = match.secondTeam.score;
  };

  return (
    <div className="flex flex-col mt-10 mx-10">
      <h1 className="flex justify-center font-bold mb-5">
        Enter League Details
      </h1>
      <div className="mb-5 mx-20 flex items-center">
        <label className="flex  space-x-2 items-center">
          <span>League Name:</span>
          <input
            className="border  rounded-md"
            type="text"
            name="league"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
          />
        </label>
      </div>
      <form onSubmit={handleAddMatch}>
        <div className="flex flex-col p-10">
          <div className="flex flex-col space-y-1">
            <div className="flex space-x-2 justify-between mx-10">
              <label className="flex  space-x-2">
                <span> Team 1:</span>
                <input className="border rounded-md" type="text" name="team1" />
              </label>
              <label className="flex  space-x-2">
                <span> Score 1:</span>
                <input
                  className="border  rounded-md"
                  type="number"
                  name="score1"
                />
              </label>
            </div>

            <div className="flex space-x-2 justify-between mx-10">
              <label className="flex  space-x-2">
                <span> Team 2:</span>
                <input className="border rounded-md" type="text" name="team2" />
              </label>
              <label className="flex  space-x-2">
                <span> Score 2:</span>
                <input
                  className="border rounded-md"
                  type="number"
                  name="score2"
                />
              </label>
            </div>
          </div>
          <div className="flex space-x-3 justify-end mx-10">
            <button
              type="submit"
              className="bg-green-500 py-1 px-5 w-fit text-white font-semibold rounded-md mt-5"
            >
              {editIndex === -1 ? "Add" : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setEditIndex(-1)}
              className="bg-gray-500 py-1 px-5 w-fit text-white font-semibold rounded-md mt-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {matches.length > 0 && (
        <>
          <h2>Matches:</h2>
          <table>
            <thead>
              <tr>
                <th className="text-center border">Team 1</th>
                <th className="text-center border">Score 1</th>
                <th className="text-center border">Team 2</th>
                <th className="text-center border">Score 2</th>
                <th className="text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index + match}>
                  <td className="text-center border">{match.firstTeam.name}</td>
                  <td className="text-center border">
                    {match.firstTeam.score}
                  </td>
                  <td className="text-center border">
                    {match.secondTeam.name}
                  </td>
                  <td className="text-center border">
                    {match.secondTeam.score}
                  </td>
                  <td className="text-center border">
                    <button
                      type="button"
                      onClick={() => handleEditMatch(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMatch(index)}
                    >
                      <svg
                        class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                        fill="none"
                        stroke="red"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-green-500 py-2 px-10 w-fit text-white font-semibold rounded-md mt-5"
              onClick={async () => await addLeagueHandler()}
            >
              Add League
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeagueInput;
