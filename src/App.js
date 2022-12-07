import React, { useEffect, useState } from "react";

import style from "./style.css";

import data from "./data/clubs.json";

function App() {


  const [difficulty, setDifficulty] = useState(100)
  const [clubs, setClubs] = useState([])
  const [leftClub, setLeftClub] = useState("");
  const [rightClub, setRightClub] = useState("");
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  const [reveal, setReveal] = useState(false);
  const [newGame, setNewGame] = useState(false);





  useEffect(() => {   
    resetClubPool()
    setReveal(false)
    shuffleData();
    setLeftClub(clubs.pop());
    setRightClub(clubs.pop());
    setScore(0)
    
  }, [newGame]);

  useEffect(() => {
    if(score > highscore){
      setHighscore(score)
    }
  }, [score])

  const shuffleData = () => {
    
    for (var i = clubs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = clubs[i];
      clubs[i] = clubs[j];
      clubs[j] = temp;
    }
  };

  const resetClubPool = () =>{
    
    for(let i = 0; i < difficulty; i++){
      clubs[i]= data.at(i)
    }
  }



  

  const getNewClubs = () => {
    setTimeout(() => {
      setLeftClub(clubs.pop())
      setRightClub(clubs.pop())
      setReveal(false)
    },3000)

  }

  const handleChoice = (choice) => {
    setReveal(true);
 
    if( choice === 1 && rightClub.pts > leftClub.pts ||  // if choice is "higher" and it's correct
        choice === 0 && rightClub.pts < leftClub.pts || //if choice is "lower" and it's correct
        leftClub.pts === rightClub.pts){                //if the clubs have the same amount of points
      setScore(score + 1)
      getNewClubs()
    }

    
  };

  return (
    <body className="body">
      <main>
        <div className="column left">
          <div className="card">
            <img
              className="card--img"
              src={leftClub.img}
              alt={leftClub.name}
            ></img>
            <div className="card--name">{leftClub.name}</div>
            <div className="card--pts">{leftClub.pts} points</div>
            {reveal && <div className="card--rank">#{leftClub.rank}</div>}
          </div>
        </div>

        <div className="column middle">
          <button className="newGame" onClick={() => {setNewGame(!newGame)}}>
            New game
          </button>
          <div className="difficulty">
            <text>Difficulty: </text>
            <button onSelect={() => (setDifficulty(100), resetClubPool())}>
              #1-100
            </button>
            <button onClick={() => (setDifficulty(200), setNewGame(!newGame))}>
              #1-200
            </button>
            <button>
              #1-300
            </button>
            <button>
              #1-400
            </button>
            <button>
              #1-500
            </button>
          </div>
          <h1 className="score">Score: {score}</h1>
          <h2 className="highscore">Highscore: {highscore}</h2>
        </div>
        <div className="column right">
          <div className="card">
            <img
              className="card--img"
              src={rightClub.img}
              alt={rightClub.name}
            ></img>
            <div className="card--name">{rightClub.name}</div>
            {reveal && <div className="card--pts">{rightClub.pts} points</div>}
            {reveal && <div className="card--rank">#{rightClub.rank}</div>}

            {!reveal && (
              <button
                className="button--higher"
                onClick={() => {
                  handleChoice(1);
                }}
              >
                Higher
              </button>
            )}
            {!reveal && (
              <button
                className="button--lower"
                onClick={() => {
                  handleChoice(0);
                }}
              >
                Lower
              </button>
            )}
          </div>
        </div>
      </main>
    </body>
  );
}

export default App;
