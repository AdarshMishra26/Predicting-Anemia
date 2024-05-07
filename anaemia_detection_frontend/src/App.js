import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Predict from './components/Predict';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const setLogged = () => {
    setLoggedIn(true);
    console.log("F",loggedIn)
  }
  return (
    <div className="App">
      {!signedUp ? (
        <SignUp setSignedUp={setSignedUp} setLoggedIn={setLogged} />
      ) : <h1>LogIn</h1>}
      {/* {
        loggedIn ? (
          <Predict />
        ) : (
          <SignIn setLoggedIn={setLoggedIn} />
        )
      } */}
    </div>
  );
}

export default App;
