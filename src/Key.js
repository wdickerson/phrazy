const Key = ({ word, guesses, value, handleLetter }) => {
  const guessedLetters = ''.concat(...guesses);
  const locationGuessedCorrectly = guesses.some(guess => {
    return [...guess].some((letter, i) => word[i] === letter && letter === value);
  });

  // The letter hasn't been guessed
  if (!guessedLetters.includes(value)) {
    return (
      <div onClick={() => handleLetter(value)} className='Key'>
        {value}
      </div>
    );
  }

  // The letter has been guessed in the correct location
  if (locationGuessedCorrectly) {
    return (
      <div onClick={() => handleLetter(value)} className='Key GreenKey'>
        {value}
      </div>
    );
  }

  // The letter has been guessed in the correct location
  if (word.includes(value)) {
    return (
      <div onClick={() => handleLetter(value)} className='Key YellowKey'>
        {value}
      </div>
    );
  }

  // The letter has been guessed but is not in the word :(
  return (
    <div onClick={() => handleLetter(value)} className='Key GreyKey'>
      {value}
    </div>
  );
};

export const EnterKey = ({ value, handleEnter }) => {
  return (
    <div onClick={handleEnter} className='Key EnterKey'>
      {value}
    </div>
  );
};

export const BackKey = ({ value, handleBack }) => {
  return (
    <div onClick={handleBack} className='Key BackKey'>
      {value}
    </div>
  );
};

export default Key;
