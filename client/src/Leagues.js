import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function Leagues() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeagues() {
    try {
      const response = await axios.get(BASE_URL + "/api/leagues");

      setLeagues(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLeagues();
  }, []);

  const onDeleteHandler = async (leagueId) => {
    try {
      await axios.delete(BASE_URL + "/api/leagues/" + leagueId);
    } catch (e) {
      console.log(e);
    } finally {
      fetchLeagues();
    }
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col">
        <div className="flex justify-end mr-10">
          <Link
            to="/add"
            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
          >
            Add New League
          </Link>
        </div>
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      index
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      League Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4  text-center"
                    >
                      Total Matches
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <td>Loading...</td>
                  ) : (
                    <>
                      {leagues.length > 0 ? (
                        <>
                          {leagues.map((league, index) => {
                            return (
                              <tr
                                key={league._id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {league.name}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                  {league.matches.length}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex space-x-2">
                                  <Link
                                    to={league._id}
                                    className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-green-dark flex items-center"
                                    style={{
                                      backgroundColor: "#38c172",
                                      color: "white",
                                    }}
                                  >
                                    Show Ranking
                                  </Link>
                                  <div className="flex justify-center">
                                    <button
                                      onClick={async () =>
                                        await onDeleteHandler(league._id)
                                      }
                                    >
                                      <svg
                                        className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                        fill="none"
                                        stroke="currentColor"
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
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>No League Data Found</>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leagues;
