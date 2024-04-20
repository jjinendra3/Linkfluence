import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionsBar from "../components/OptionsBar";
import Card from "../components/Card";
import axios from "axios";

const Posts = () => {
  const [listType, setlistType] = useState("events");
  const [list, setlist] = useState([]);
  const [date, setdate] = useState();
  const [genre, setgenre] = useState(["All"]);
  const [venue, setvenue] = useState(["All"]);
  const [budget, setbudget] = useState(["All"]);
  const [sortby, setsortby] = useState({type:'All',order:1})
  useEffect(() => {
    
  }, [listType]);

  const fetchList = async () => {
    const { data } = await axios.post(`http://localhost:5000/${listType}/filtered`, {
      sortby: sortby,
      date: {
        selectedMonths: [date.getMonth()],
        selectedYears: [date.getYear()],
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
