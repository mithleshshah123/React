import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurant, setfilteredRestaurant] = useState([]);

  const [searchText, setsearchText] = useState("");

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
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRestaurant(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //Conditional Rendering
  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
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

        <button
          className="filter-btn"
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
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
