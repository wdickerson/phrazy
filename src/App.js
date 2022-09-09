import './App.css';
import WordRow from './WordRow.js';
import Keyboard from './Keyboard.js';
import SettingsModal from './SettingsModal.js';
import GameHeader from './GameHeader.js';
import React, {useState} from 'react';

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const startWord = params.w ? decodeURIComponent(atob(params.w)).toUpperCase() : 'OLD SAN JUAN';
  const startNumberOfGuesses = params.g ? parseInt(params.g) : 6;
  const storedGuesses = localStorage.getItem(startWord);
  const startGuesses = storedGuesses ? storedGuesses.split(',') : [];

  const [word, setWord] = useState(startWord);
  const [allowedGuesses, setAllowedGuesses] = useState(startNumberOfGuesses);
  const [guesses, setGuesses] = useState(startGuesses);
  const [pendingGuess, setPendingGuess] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const letters = word.split('');

  const changeWord = (newWord) => {
    setWord(newWord);
    setGuesses([]);
    setPendingGuess('');
  }

  const changeAllowedGuesses = (newGuesses) => {
    if (newGuesses === 0) return;
    setAllowedGuesses(newGuesses);
    setGuesses([]);
    setPendingGuess('');
  }

  // word:                     HI MY FRIEND
  //
  // pendingGuess:             OHNOPL
  // spaceAppliedPendingGuess: OH NO PL
  //
  // pendingGuess:             OHNOPLEASE
  // spaceAppliedPendingGuess: OH NO PLEASE
  const pendingLetters = pendingGuess.split('');
  const realLetters = word.split('');
  const spaceAppliedPendingLetters = [];
  while (pendingLetters.length) {
    const realLetter = realLetters.shift();
    if (realLetter === ' ') {
      spaceAppliedPendingLetters.push(' ');
    } else {
      spaceAppliedPendingLetters.push(pendingLetters.shift());
    }
  }
  const spacesAppliedPendingGuess = spaceAppliedPendingLetters.join('');

  const handleLetter = (letter) => {
    // Ignore letter entry all guesses have been used
    if (guesses.length >= allowedGuesses) return;

    // Ignore letter entry if previous guess is correct
    if (guesses.slice(-1)[0] === word) return;

    // Ignore letter entry if all squares of the pending guess are filled
    if (spacesAppliedPendingGuess.length >= word.length) return;

    setPendingGuess(pendingGuess + letter);
  }

  const handleBack = () => {
    if (pendingGuess.length > 0) {
      setPendingGuess(pendingGuess.slice(0, -1));
    }
  }

  const handleEnter = () => {
    if (spacesAppliedPendingGuess.length === word.length) {
      guesses.push(spacesAppliedPendingGuess);
      setGuesses(guesses);
      localStorage.setItem(word, guesses.join());
      setPendingGuess('');
    }
  }

  const wordRows = [];
  for (let i = 0; i < allowedGuesses; i++) {
    const row = <WordRow 
      key={i} 
      letters={letters}
      realWord={word}
      isActiveRow={guesses.length === i}
      completedGuess={guesses[i]}
      pendingGuess={spacesAppliedPendingGuess}
    />;
    wordRows.push(row);
  }

  return (
    <div className="App">
      {
        showSettings && (
          <SettingsModal 
            setShowSettings={setShowSettings} 
            changeWord={changeWord}
            allowedGuesses={allowedGuesses}
            changeAllowedGuesses={changeAllowedGuesses}
          />
        )
      }
      <GameHeader showSettings={showSettings} setShowSettings={setShowSettings} />
      <div className='WordRows'>
        {wordRows}
      </div>
      {
        !showSettings && <Keyboard 
          word={word}
          guesses={guesses}
          handleLetter={handleLetter} 
          handleEnter={handleEnter} 
          handleBack={handleBack} 
        />
      }
    </div>
  );
}

export default App;
