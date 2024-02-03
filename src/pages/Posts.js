import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionsBar from "../components/OptionsBar";
import Card from "../components/Card";
import axios from "axios";

const Posts = () => {
  const [listType, setlistType] = useState("events");
  const [list, setlist] = useState([]);
  const [date, setdate] = useState({
    month: "All",
    year: "All",
  });
  const [genre, setgenre] = useState(["All"]);
  const [venue, setvenue] = useState(["All"]);
  const [budget, setbudget] = useState(["All"]);

  useEffect(() => {
    // const {data} = axios.post(`http://localhost:5000/${listType}/all`);
    // setlist(data.items);
  }, [listType]);

  const fetchList = async (filter) => {
    const { data } = await axios.post(`http://localhost:5000/${listType}/filtered`, {
      date: {
        selectedMonths: [date.month],
        selectedYears: [date.year],
      },
      genre: genre,
      venue: venue,
      budget: budget
    });
    setlist(data.items);
  };

  return (
    <>
      <TopBar />
      <OptionsBar
        listType={listType}
        setlistType={setlistType}
        setdate={setdate}
        setgenre={setgenre}
        setbudget={setbudget}
        setvenue={setvenue}
        fetchList={fetchList}
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
