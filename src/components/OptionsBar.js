import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Select from "react-select";


const Genre = [
  { value: "All", label: "All" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
];
const Budget = [
  { value: "All", label: "All" },
  { value: "$", label: "$" },
  { value: "$$", label: "$$" },
  { value: "$$$", label: "$$$" },
];
const Venue = [
  { value: "All", label: "All" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
  { value: "sample", label: "sample" },
];

const OptionsBar = (props) => {
  const { userDetails } = useContext(AppContext);
  const { setlistType,genre,setgenre,setdate,venue,setvenue,budget,setbudget,fetchList } =
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
              setlistType("companies");
            }}
            className="flex justify-center items-center rounded-xl w-24 h-10 bg-white"
          >
            Companies
          </button>
        )}
        {userDetails.type !== "Events" && (
          <button
            onClick={() => {
              setlistType("events");
            }}
            className="flex justify-center items-center rounded-xl w-24 h-10 bg-white"
          >
            Events
          </button>
        )}
        {userDetails.type !== "Influencer" && (
          <button
            onClick={() => {
              setlistType("influencers");
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
          <div class="dropdown-content"></div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBar;
