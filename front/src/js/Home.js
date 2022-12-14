import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import DisplayUsers from "./DisplayUsers";
import Events from "./Events";
import { Link, useLocation } from "react-router-dom";
import { users, eventList } from "./Var";
import API from "../API";
import axios from "axios";

const Home = () => {
  const user = useLocation().state.user;
  const travel = useLocation().state.travel;

  const [userList, setuserList] = useState(users);
  const [eventList, seteventList] = useState(eventList);

////////////////////////////////////

  useEffect(() => {
    getEvent();
  },[]);

  // parameter = user info
  const getEvent = async(travel) => {
    await API.get("/travelComponents",{
      params : {
        user,
        travel
      },
    }).then((res_event, res_users) => {
      seteventList(res_event)
      setuserList(res_users)
    }).catch((error) => {
      console.log(error);
      alert("travel missmatch");
    })
  } 

/////////////////////////////////

  let initialPreferences = {
    displayIcon: true,
    displayMoney: true,
  };

  let [preferences, setPreferences] = useState(initialPreferences);

  localStorage.getItem("preferences") === null
    ? localStorage.setItem("preferences", JSON.stringify(initialPreferences))
    : (preferences = JSON.parse(localStorage.getItem("preferences")));

  const styleheader = {
    backgroundColor: "#DAF1D8",
    display: "inline-block",
    borderRadius: "15px",
    width: "95%",
    height: "10%",
    margin: "2.5%",
  };

  return (
    <>
      <div style={styleheader}>
        <h1
          style={{
            margin: "2.5%",
            textAlign: "center",
          }}
        >
          N분의 1로
        </h1>
      </div>
      <div style={{ margin: "1.5%" }}>
        <Link to="createEvent" state={{ user: user, travel: travel }}>
          <button>이벤트 추가</button>
        </Link>
        <Link to="createUser" state={{ user: user, travel: travel }}>
          <button>사용자 추가</button>
        </Link>
      </div>
      <div className="box1">
        {eventList.map((event) => (
          <Events event={event} key={event.index} />
        ))}
      </div>
      <div className="App">





        <DisplayUsers users={userList} preferences={preferences} />
        <NavigationBar
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>
    </>
  );
};

export default Home;
