const LetterSquare = ({ displayLetter }) => {
  if (displayLetter !== ' ') return <div className='LetterSquare'>{displayLetter}</div>;
};

export const CompletedLetterSquare = ({ 
  displayLetter, 
  realLetter, 
  guess, 
  word,
  letterNumber,
}) => {
  
  const shouldBeYellow = () => {
    if (displayLetter === realLetter) return false;
    if (!word.includes(displayLetter)) return false;

    let unmatchedCount = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === displayLetter && guess[i] !== displayLetter) unmatchedCount++;
    }

    let misplacedAppearanceInGuessCount = 0;
    for (let i = 0; i <= letterNumber; i++) {
      if (guess[i] === displayLetter && word[i] !== displayLetter) misplacedAppearanceInGuessCount++;
    }

    // Only show N yellow squares for N "unfound" letters
    // Show a grey square for the (N+1)...th occurrences in the guess
    if (misplacedAppearanceInGuessCount > unmatchedCount) return false;

    return true;
  }
  

  if (displayLetter === realLetter) {
    return <div className='LetterSquare GreenSquare'>{displayLetter}</div>;
  }

  // If word includes displayLetter in a place that hasn't been guessed correctly
  if (shouldBeYellow()) {
    return <div className='LetterSquare YellowSquare'>{displayLetter}</div>;
  }

  return <div className='LetterSquare GreySquare'>{displayLetter}</div>;
};

export const FutureLetterSquare = ({ realLetter }) => {
  if (realLetter !== ' ') return <div className='LetterSquare'></div>;
};

export default LetterSquare;
