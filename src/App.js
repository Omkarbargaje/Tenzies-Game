import React from "react";
import "./App.css";
import Die from "./components/Die";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  const [Tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(1);

  function counter() {
    function increment() {
      setCount(count + 1);
    }
    increment();
    console.log(count);
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    // .every =It is javascript method which:returns true if all elements in an array pass a test (provided as a function)

    const firstValue = dice[0].value;

    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  function genrateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: uuidv4(),
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(genrateNewDice());
    }
    return newDice;
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  function rollDice() {
    if (!Tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : genrateNewDice();
        })
      );
      counter();
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <div className="heading--container">
      {Tenzies ? <Confetti /> : null}
      <Header className="header" />
      <div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Note: Roll until all dice are the same. Click each die to freeze it at
          its current value between rolls.
        </p>
      </div>

      <div className="App">
        <main className="dice--container">{diceElements}</main>

        <button className="button" onClick={rollDice}>
          {Tenzies ? "new Game" : "Roll"}
        </button>
      </div>

      <h1 className={Tenzies ? "count-won" : "count"}>
        {Tenzies ? "You Won" : null}
        <br />
        Rolls:
        <br />
        {count}
      </h1>
    </div>
  );
}

export default App;
