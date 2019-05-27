import React, { useEffect, useContext, useState } from 'react';
import { Store, functionsToDispatch, Context } from './store/index';
import { inactiveStyle, activeStyle} from './store/dataBanks';
import './css/styles.css';

const projectName = 'drum-machine-by-Yan Santos Policar';

(localStorage.getItem('project_name') === null) && localStorage.setItem('project_name', projectName);


function DrumPad(props) {

  const [state, setState] = useState({ padStyle: inactiveStyle });
  const [mainContext, setContext] = useContext(Context);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    // returned function will be called on component unmount 
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [])

  function handleKeyPress(e) {
    if (e.keyCode === props.keyCode) {
      playSound();
    }
  }

  function activatePad() {
    if (mainContext.power) {
        setState({
          ...state,
          padStyle: activeStyle
        });
    }
  }
  function inactivatePad() {
    if (mainContext.power) {
        setState({
          ...state,
          padStyle: inactiveStyle
        });
    }
  }
  function playSound(e) {
    if(mainContext.power){
    const sound = document.getElementById(props.keyTrigger);
    const { displayClipName } = functionsToDispatch;
    sound.currentTime = 0;
    sound.play();
    activatePad();
    setTimeout(() => inactivatePad(), 100);
    setContext(displayClipName(props.clipId.replace(/-/g, ' ')))
    }
  }
  return (
    <div id={props.clipId}
      onClick={playSound}
      className="drum-pad"
      style={state.padStyle} >
      <audio className='clip' id={props.keyTrigger} src={props.clip}></audio>
      {props.keyTrigger}
    </div>
  )

}

function PadBank(props) {
  const [mainContext,] = useContext(Context);
  let padBank;
  mainContext.power ?
    padBank = mainContext.currentPadBank.map((drumObj, i, padBankArr) => {
      return (
        <DrumPad key={i}
          clipId={padBankArr[i].id}
          clip={padBankArr[i].url}
          keyTrigger={padBankArr[i].keyTrigger}
          keyCode={padBankArr[i].keyCode}
        />
      )
    }) :
    padBank = mainContext.currentPadBank.map((drumObj, i, padBankArr) => {
      return (
        <DrumPad key={i}
          clipId={padBankArr[i].id}
          clip="#"
          keyTrigger={padBankArr[i].keyTrigger}
          keyCode={padBankArr[i].keyCode}
        />
      )
    });
  return (
    <div className="pad-bank" >
      {padBank}
    </div>
  )
}

function App() {

  const [state, setState] = useContext(Context);
  function powerControl() {
    setState(functionsToDispatch.powerControl());
  }
  function selectBank() {

    setState(functionsToDispatch.selectBank());
  }
  function adjustVolume(e) {
    setState(functionsToDispatch.adjustVolume(e))
  }

  {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = state.sliderVal
    });
  }
  return (
    <div id="drum-machine" className="inner-container">
      <PadBank />

      <div className="logo">
        <div className="inner-logo ">{'Simple beat maker' + String.fromCharCode(160)}</div>
        <i className="inner-logo fa fa-free-code-camp" />
      </div>

      <div className="controls-container">

        <div className="control">
          <p>Power</p>
          <div onClick={powerControl} className="select">
            <div style={{ float: state.power ? "right" : "left" }} className="inner" />
          </div>
        </div>
        <p id="display">
          {state.display}
        </p>
        <div className="volume-slider">
          <input id="volume" type="range" min="0" max="1" step="0.01" value={state.sliderVal}  onChange={adjustVolume} />
        </div>
        <div className="control">
          <p>Bank</p>
          <div onClick={selectBank} className="select">
            <div style={{ float: state.currentPadBankId === 'Heater Kit' ? "right" : "left" }} className="inner" />
          </div>
        </div>
      </div>

    </div>
  )
}
export default function Root() {
  return (
    <Store>
      <App />
    </Store>
  );
}