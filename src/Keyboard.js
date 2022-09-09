import Key, { EnterKey, BackKey } from './Key.js';

const Keyboard = ({ word, guesses, handleLetter, handleEnter, handleBack }) => {
  return (
    <div className='Keyboard'>
      <div className='KeyboardRow'>
        <Key value='Q' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='W' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='E' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='R' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='T' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='Y' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='U' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='I' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='O' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='P' handleLetter={handleLetter} guesses={guesses} word={word} />
      </div>
      <div className='KeyboardRow'>
        <Key value='A' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='S' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='D' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='F' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='G' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='H' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='J' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='K' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='L' handleLetter={handleLetter} guesses={guesses} word={word} />
      </div>
      <div className='KeyboardRow'>
        <EnterKey value='ENTER' handleEnter={handleEnter} />
        <Key value='Z' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='X' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='C' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='V' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='B' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='N' handleLetter={handleLetter} guesses={guesses} word={word} />
        <Key value='M' handleLetter={handleLetter} guesses={guesses} word={word} />
        <BackKey value='BACK' handleBack={handleBack} />
      </div>
    </div>
  );
};

export default Keyboard;
