import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useState, useEffect,useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
// import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant, setfilteredRestaurant] = useState([]);

  const [searchText, setsearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    //Optional Chaining
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like you are offline!! Please check your internet Connection!</h1>

  const {loggedInUser, setUserName} = useContext(UserContext);
  //Conditional Rendering
  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-6 p-6">
          <input
            type="text"
            data-testId = "searchInput"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-6 py-1 bg-green-100 m-6 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });

              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

       <div className="search m-6 p-6 flex items-center">
        <button
          className="px-6 py-1 bg-gray-100 rounded-lg"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => {
              return res.info.avgRating > 4;
            });
            setfilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
       </div> 
       <div className="search m-6 p-6 flex items-center">
          <label>UserName : </label>
          <input className="border border-black p-2 " value = {loggedInUser} onChange={(e) => setUserName(e.target.value)}/>
       </div> 
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData = {restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )

            }
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
