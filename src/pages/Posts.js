import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionsBar from "../components/OptionsBar";
import Card from "../components/Card";
import axios from "axios";

const Posts = () => {
  const [listType, setlistType] = useState("companyproduct");
  const [list, setlist] = useState([]);
  const [date, setdate] = useState([new Date()]);
  const [genre, setgenre] = useState([]);
  const [venue, setvenue] = useState([]);
  const [budget, setbudget] = useState([]);
  const [sortby, setsortby] = useState("none");
  useEffect(() => {
    fetchList();
  }, [listType]);

  const fetchList = async () => {
    // console.log(budget)
    const months = date.map((date) => date.toLocaleString('en-US', { month: 'long' }));
    const years = date.map((date) => date.getFullYear());
    const { data } = await axios.post(
      `http://localhost:5000/common/filter/${listType}`,{},
      // {
      //   // selectedMonths: months,
      //   // selectedYears: years,
      //   // genre: genre,
      //   // venue: venue,
      //   // pricerange: budget.map((b)=> b.length),
      // },
      {
        headers: {
          "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2NWJkNDM4NWU1MGQ1NDI0NGU2MTEzMDgiLCJ0eXBlIjoiSW5mbHVlbmNlciIsImlhdCI6MTcwNzA2NTYxNH0.ACf0nxKHrZlHlOTtDnEuoQmzF6iDUMoJqtY_25zQEjc`,
        },
      }
    );
    // console.log(data.response)
    setlist(data.response);
  };
  return (
    <>
      <TopBar />
      <OptionsBar
        listType={listType}
        setlistType={setlistType}
        date={date}
        setdate={setdate}
        setgenre={setgenre}
        setbudget={setbudget}
        setvenue={setvenue}
        fetchList={fetchList}
        setsortby={setsortby}
        sortby={sortby}
      />
      <div className="flex flex-wrap m-10 min-h-screen">
        {list.map((item) => {
          return <Card item={item} />;
        })}
      </div>
    </>
  );
};

export default Posts;
