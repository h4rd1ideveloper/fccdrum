import React, { useContext, useEffect } from 'react';
import { Store, functionsToDispatch, Context } from './store';
import { Volume, DrumWrap, BankWrap, Col, P, Row, Toggle } from './components';
function App() {

  const [state, setState] = useContext(Context);
  const { display, power, currentPadBankId, sliderVal } = state;
  function powerControl() {
    setState(functionsToDispatch.powerControl());
  }
  function selectBank() {
    setState(functionsToDispatch.selectBank());
  }
  function adjustVolume(e) {
    if(power){
    setState(functionsToDispatch.adjustVolume(e))
  }
  }
  useEffect(() => {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = sliderVal
    });
  }, [sliderVal])

  return (
    <DrumWrap id="app-root">
      <BankWrap />
      <Col boxShadow={'#00000003 0px 10px 22px 0px'} borderRadius={'49px'} >
        <Row justifyContent={'space-around'} _width={'70%'} >
          <P text={'Power'} />
          <Toggle _width={'40px'} isOpen={power} onClick={powerControl} />
        </Row>
        <Row  justifyContent={'space-around'}  _width={'70%'}>
          <P text={'Bank'} />
          <Toggle _width={'40px'} closeShadow isOpen={Boolean(currentPadBankId === 'Heater Kit')} onClick={selectBank} />
        </Row>
        <P text={display} />
        <Volume style={{ minWidth: ' 120px', width: 'auto' }} callback={adjustVolume} power={power} />
        <P id="footer-text" text={'Simple beat maker' + String.fromCharCode(160)} />
      </Col>
    </DrumWrap>
  )
}

export default function Root() {
  return (
    <Store>
      <App />
    </Store>
  );
}