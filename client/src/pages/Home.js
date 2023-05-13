import { useState, useEffect } from "react";
import Axios from "axios";


function Home() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };
    return (
        <div className="App">
        <h1 className="title">RateMyRental</h1>
        <div className="moto">
          <h2>No more bad landlords, With your help.</h2>
          <h2>Where renters and properties meet excellence.</h2>
        </div>
        <div className="signup">
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age..."
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={createUser}> Sign Up </button>
        </div>
      </div>
    );
//     return (
//         <div>
//         <h1>Home Page</h1>
//         {/* Your write-review page content goes here */}
//         </div>
//   );
}
export default Home;