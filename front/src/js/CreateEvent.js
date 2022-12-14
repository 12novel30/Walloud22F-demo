import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { users } from "./Var";
import personSrc from "../img/person.png";
import API from "../API";

var eventList = [
  {
    index: 1,
    place: "newEvent",
    name: "me",
    price: "101010",
    date: "2022/02/28",
    participants: ["sungjun", "haeun", "jangwon", "yooseung"],
  },
  {
    index: 2,
    place: "place",
    name: "name",
    price: "price",
    date: "date",
    participants: [
      "sungjun",
      "haeun",
      "jangwon",
      "yooseung",
      "doyoon",
      "heejeong",
    ],
  },
];

var payer = [];
var participants = [...users];
function CreateEvent() {
  const user = useLocation().state.user;
  const travel = useLocation().state.travel;

  const [inputs, setInputs] = useState({
    place: "",
    price: "",
    date: "",
  });

  

  const { place, price, date } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function CreateUser() {
  //////////////////////////
    const create_user_func = async() => {
      await API.post("/createUser",{ 
        place : place,
        price : price,
        date : date
      })
      .then((response)=> {
        console.log(response)
        window.alert("Successfully Added");
      })
      .catch((error) => {
        console.log(error);
      })
    }
    

    const [participate, setParticipate] = useState("participate");
    const [nameColor, setNameColor] = useState("green");
    const onClickIcon = () => {
      if (participate === "participate") {
        setParticipate("no");
        setNameColor("black");
        participants.pop(user.name);
      } else if (participate === "no") {
        setParticipate("payer");
        setNameColor("blue");
        participants.push(user.name);
        payer.push(user.name);
      } else if (participate === "payer") {
        setParticipate("participate");
        setNameColor("green");
        payer.pop(user.name);
      }
      console.log(payer);
      console.log(participants);
    };

    return (
      <div className="user" onClick={onClickIcon}>
        <img className="icon" src={personSrc} alt="profile" />
        <br />
        <span style={{ color: nameColor }}>{user.name}</span>
      </div>
    );
  }

  const onClickSubmit = (e) => {
    if (payer.length === 1) {
      console.log("okay");
      const newEvent = {
        index: eventList.length + 1,
        place: document.querySelector("#place").value,
        name: payer[0],
        price: document.querySelector("#price").value,
        date: document.querySelector("#date").value,
        participants: participants,
      };
      console.log(participants);
      eventList.push(newEvent);
    } else if (payer.length > 1) {
      alert("???????????? ??? ???????????? ?????????\nError: Too Many Payers");
    } else if (payer.length === 0) {
      alert("???????????? ??? ???????????? ?????????\nError: No Payer");
      e.preventDefault();
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="??????"
          type="text"
          id="place"
          name="place"
          onChange={onChange}
          value={place}
          size="5"
        />
        <input
          placeholder="??????"
          type="text"
          id="price"
          name="price"
          onChange={onChange}
          value={price}
          size="5"
        />
        <input
          placeholder="??????"
          type="date"
          id="date"
          name="date"
          onChange={onChange}
          value={date}
          size="5"
        />
      </div>
      <div>
        {users.map((user) => (
          <CreateUser user={user} key={user.index} />
        ))}
      </div>
      <Link to="/" onClick={onClickSubmit}>
        <button>????????? ??????</button>
      </Link>
    </div>
  );
}

export { CreateEvent, eventList };
