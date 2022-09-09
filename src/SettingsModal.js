import { useState } from 'react'
import { ReactComponent as Minus } from './Minus.svg';
import { ReactComponent as Plus } from './Plus.svg';

const SettingsModal = ({ 
  setShowSettings, 
  changeWord, 
  allowedGuesses, 
  changeAllowedGuesses 
}) => {
  const [pendingWord, setPendingWord] = useState('');
  const [pendingGuesses, setPendingGuesses] = useState(allowedGuesses);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // const host = 'http://localhost:3000';
  const host = 'https://phrazy.littleapp.io';

  const shareUrl = `${host}?g=${pendingGuesses}&w=${encodeURIComponent(btoa(pendingWord))}`;

  const shareDetails = { 
    url: shareUrl, 
    title: 'Phrazy!', 
    text: 'I made you this Phrazy!'
  }

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
      } catch (error) {
        navigator.clipboard.writeText(shareUrl);
        setCopiedToClipboard(true);
      }
    } else {
      // fallback code
      navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
    }
  };

  const handleGuessDecrement = () => {
    setPendingGuesses(Math.max(1, pendingGuesses - 1));
    setCopiedToClipboard(false);
  }

  const handleGuessIncrement = () => {
    setPendingGuesses(pendingGuesses + 1);
    setCopiedToClipboard(false);
  }

  const handleTextInput = (value) => {
    setPendingWord(value.toUpperCase());
    setCopiedToClipboard(false);
  }

  const startGame = () => {
    changeWord(pendingWord);
    changeAllowedGuesses(pendingGuesses);
    setShowSettings(false);
  }

  const copiedText = 'The link to this Phrazy was copied to your clipboard!';

  return (
    <div className='SettingsModal'>
      <h1 className='SettingsHeader'>
        Start a New Game
      </h1>
      <p className='SettingsInfo'>
        Enter a phrase and set the number of guesses. <br/>
        Play on this device or share with a friend!
      </p>
      <div className='WordEntry'>
        <input className='WordEntryInput'
          placeholder="YOUR PHRASE HERE"
          onChange={(e) => handleTextInput(e.target.value)} 
        />
      </div>

      <div className='AllowedGuessesEntry'>
        <div className="AllowedGuessesButton" onClick={handleGuessDecrement}>
          <Minus />
        </div>
        <div className="AllowedGuessesText">{pendingGuesses}</div>
        <div className="AllowedGuessesButton" onClick={handleGuessIncrement}>
          <Plus />
        </div>
      </div>

      <div className='ShareSection'>
        <p className='ShareLinkText'>{pendingWord ? shareUrl : ''}</p>
        <p className='CopiedText'>{copiedToClipboard ? copiedText : ''}</p>
        <button className='SettingsButton GreenButton'
          onClick={handleSharing}
          disabled={!pendingWord}
        >
          Share this Phrazy!
        </button>
      </div>

      <div className='SettingsFooter'>
        <button 
          className='SettingsButton' 
          onClick={() => setShowSettings(false)}
        >
          Cancel
        </button>
        <button 
          className='SettingsButton GreenButton'
          onClick={startGame}
          disabled={!pendingWord}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
