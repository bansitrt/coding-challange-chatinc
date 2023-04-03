import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const Ranking = () => {
  const [ranking, setRanking] = useState(null);
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);

  const { leagueId } = useParams();

  useEffect(() => {
    async function fetchLeague() {
      try {
        setLoading(true);

        const response = await axios.get(
          BASE_URL + "/api/leagues/" + leagueId + "/ranking"
        );

        setRanking(response.data.ranking);
        setLeague(response.data.league);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchLeague();
  }, []);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <table className="p-10 m-auto mt-10">
          <caption className="bg-slate-300 px-3 uppercase font-semibold mb-10">
            {league}
          </caption>
          <thead>
            <tr className="border-2 font-semibold">
              <td className="px-2">Rank</td>
              <td className="px-2">Team Name</td>
              <td className="px-2">Score</td>
            </tr>
          </thead>
          <tbody>
            {ranking?.map((team, index) => {
              return (
                <tr className="border-2" key={index}>
                  <td className="px-2 text-center mr-5">{index + 1}</td>
                  <td className="px-2 text-left mx-5">{team.team}</td>
                  <td className="px-2 text-center ml-5">{team.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Ranking;
