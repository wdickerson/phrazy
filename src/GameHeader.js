import { ReactComponent as SettingsCog } from './SettingsCog.svg';

const GameHeader = ({ showSettings, setShowSettings }) => {
  return (
      <div className='Header'>
        <div className='HeaderSpacer' />
        <div className='HeaderText'>Phrazy!</div>
        <div className='HeaderSettings' onClick={() => setShowSettings(true)}>
          {!showSettings && <SettingsCog />}
        </div>
      </div>
  );
};

export default GameHeader;