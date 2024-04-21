import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-multi-date-picker";

const Genre = [
   { value: "All", label: "All"},    
   { value: "Fashion", label: "Fashion"},    
   { value: "Fitness", label: "Fitness"},
   { value: "Travel", label: "Travel"},
   { value: "Beauty", label: "Beauty"},
   { value: "Gaming", label: "Gaming"},
   { value: "Food", label: "Food"},
   { value: "Lifestyle", label: "Lifestyle"},
   { value: "Technology", label: "Technology",},
   { value: "Comedy", label: "Comedy"},
   { value: "Music", label: "Music"},
   { value: "Health", label: "Health"},
   { value: "DIY", label: "DIY"},
   { value: "Sports", label: "Sports"}
];

const Budget = [
  { value: "All", label: "All" },
  { value: "$", label: "$" },
  { value: "$$", label: "$$" },
  { value: "$$$", label: "$$$" },
];
const Venue = [
  { value: "All", label: "All" },
  { value: "Delhi", label: "Delhi" },
  { value: "Noida", label: "Noida" },
  { value: "sample", label: "sample" },
];

const OptionsBar = (props) => {
  const { userDetails } = useContext(AppContext);
  const { setlistType,genre,setgenre,date,setdate,venue,setvenue,budget,setbudget,fetchList,setsortby,sortby} =
    props;
  const handleGenre = (genres) => {
    const genreValues = genres.map(item => item.value);
    setgenre(genreValues);
    fetchList();
  };
  const handleVenue = (venues) => {
    const venueValues = venues.map(item => item.value);
    setvenue(venueValues);
    fetchList();
  };
  const handlebudget = (budgets) => {
    const budgetValues = budgets.map(item => item.value);
    setbudget(budgetValues);
    fetchList();
  };
  const handledate = (date) => {
    setdate(date);
    fetchList();
  };

  const handleSort = (type) => {
    setsortby(type);
    fetchList();
  }

  const resetStates = () => {
    setgenre(["All"]);
    setvenue(["All"]);
    setbudget(["All"]);
    setdate({
      month: "All",
      year: "All",
    });
    fetchList();
  };

  return (
    <div className=" bg-slate-400 w-full h-14 flex items-center gap-40 px-20">
      <div className="flex gap-10">
        {userDetails.type !== "Companies" && (
          <button
            onClick={() => {
              setlistType("companyproduct");
            }}
            className="flex justify-center items-center rounded-xl w-24 h-10 bg-white"
          >
            Companies
          </button>
        )}
        {userDetails.type !== "Events" && (
          <button
            onClick={() => {
              setlistType("event");
            }}
            className="flex justify-center items-center rounded-xl w-24 h-10 bg-white"
          >
            Events
          </button>
        )}
        {userDetails.type !== "Influencer" && (
          <button
            onClick={() => {
              setlistType("influencer");
            }}
            className="flex justify-center items-center rounded-xl w-24 h-10 bg-white"
          >
            Influencers
          </button>
        )}
      </div>
      <div className="flex gap-8">
        <div className="flex justify-center items-center text-lg">Filters</div>
        <div class="filters">
          <button class="filter">Sort By &nbsp; ▼</button>
          <div class="dropdown-content">
            <select className="flex flex-col bg-white text-black">
                <option onClick={() => handleSort('None')}>None</option>
                <option onClick={() => handleSort('Genre')}>Genre</option>
                <option onClick={() => handleSort('Venue')}>Venue </option>
                <option onClick={() => handleSort('Date')}>Date </option>
                <option onClick={() => handleSort('Budget')}>Budget</option>
              </select>
          </div>
        </div>
        <div class="filters">
          <button class="filter">Genre &nbsp; ▼</button>
          <div class="dropdown-content">
            {
              <Select
                defaultValue={[Genre[0]]}
                isMulti
                name="genre"
                options={Genre}
                className="basic-multi-select"
                classNamePrefix="select"
                value={genre}
                onChange={handleGenre}
                />
            }
          </div>
        </div>
        <div class="filters">
          <button class="filter">Budget &nbsp; ▼</button>
          <div class="dropdown-content">
          <Select
                defaultValue={[Budget[0]]}
                isMulti
                name="budget"
                options={Budget}
                className="basic-multi-select"
                classNamePrefix="select"
                value={budget}
                onChange={handlebudget}
              />
          </div>
        </div>
        <div class="filters">
          <button class="filter">Venue &nbsp; ▼</button>
          <div class="dropdown-content">
          <Select
                defaultValue={[Venue[0]]}
                isMulti
                name="venue"
                options={Venue}
                className="basic-multi-select"
                classNamePrefix="select"
                value={venue}
                onChange={handleVenue}
              />
          </div>
        </div>
        <div class="filters">
          <button class="filter">Date &nbsp; ▼</button>
          <div class="dropdown-content">
          {/* <DatePicker selected={date} active onChange={handledate} /> */}
          <DatePicker value={date} onChange={handledate} multiple={true} onlyMonthPicker={true}/>;
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBar;
