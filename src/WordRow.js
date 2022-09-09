import LetterSquare, { CompletedLetterSquare, FutureLetterSquare } from './LetterSquare';

const WordRow = ({ realWord, isActiveRow, completedGuess, pendingGuess }) => {
  // Show letters of the active row
  if (isActiveRow) {
    const activeRowWords = [[]];

    for (let i = 0; i < realWord.length; i++) {
      if (realWord[i] === ' ') {
        activeRowWords.push([]);
      } else {
        activeRowWords[activeRowWords.length - 1].push(pendingGuess[i])
      }
    }
    
    return (
      <div className='WordRow'>
        {
          activeRowWords.map((word, i) => (
            <div className="Word" key={i}>
              {word.map((letter, i) => <LetterSquare displayLetter={letter} key={i} />)}
            </div>
          ))
        }
      </div>
    );
  }

  const words = realWord.split(' ').map(word => word.split(''));

  //Show empty squares for future guesses
  if (!completedGuess) {
    return (
      <div className='WordRow'>
        {
          words.map((word, i) => (
            <div className="Word" key={i}>
              {word.map((letter, i) => <FutureLetterSquare realLetter={letter} key={i} />)}
            </div>
          ))
        }
      </div>
    );
  };

  const completedGuessWords = completedGuess.split(' ').map(word => word.split(''));
  // Show letters of the previous guesses
  return (
    <div className='WordRow'>


      {
        completedGuessWords.map((word, i) => (
          <div className="Word" key={i}>
            {
              word.map((letter, j) => {
                const letterNumber = completedGuessWords.slice(0, i).reduce((priorLetters, priorWord) => priorLetters + priorWord.length, 0) + i + j;
                return <CompletedLetterSquare 
                  displayLetter={letter} 
                  realLetter={words[i][j]} 
                  guess={completedGuess}
                  word={realWord}
                  letterNumber={letterNumber} 
                  key={j} 
                />
              })
            }
          </div>
        ))
      }
    </div>
  );
}

export default WordRow;
