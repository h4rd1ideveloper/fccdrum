import React, { useContext, useState, useEffect, useRef } from 'react';
import { Memorize } from '../lib';
import { Context, functionsToDispatch } from '../store/';
import { PadStyled, PadBank, DrumMachine, Text, Row as RowStyled, Column, Switch, SwitchIcon } from './styledComponents';
import { getColor } from '../store/dataBanks';
const { setTextColor, displayClipName } = functionsToDispatch;
function PadWrap({ children, ...props }) {
    return (
        <PadBank {...props} >
            {children}
        </PadBank>
    );
}
function UniPad({ children, ...props }) {
    return (
        <PadStyled {...props}>
            {children}
        </PadStyled>
    );
}
function DrumPad({...props}) {
    const audioRefElement = useRef(null);
    const [state, setState] = useState({ padStyle: false });
    const [mainContext, setContext] = useContext(Context);
    const {power, textColor} = mainContext;
    const {padStyle} = state;
    function initListernner() {
        return () => {
            document.addEventListener('keydown', handleKeyPress);
            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            }
        }
    }
    useEffect(initListernner(), [textColor])
    function handleKeyPress(e) {
        if (e.keyCode === props.keyCode) {
            playSound(e);
        }
    }
    function activatePad() {
        if (power) {
            setState({
                ...state,
                padStyle: true
            });
            document.getElementById('footer-text').style.color = textColor;
            document.getElementById('app-root').style.boxShadow = `${textColor} 0px 0px 22px -15px`;
        }
    }
    function inactivatePad() {
        if (power) {
            setState({
                ...state,
                padStyle: false
            })
            document.getElementById('footer-text').style.color = 'white';
            document.getElementById('app-root').style.boxShadow = `rgba(22,0,0,0.3) 0px 0px 22px -15px`;
        }
    }
    function playSound(e) {
        const { current: audioElement } = audioRefElement;
        const {power} = mainContext;
        if (power) {
            audioElement.currentTime = 0;
            audioElement.play().then(() => {
                activatePad();
                setTimeout(() => inactivatePad(), 100);
                setContext(displayClipName(props.clipId.replace(/-/g, ' ')))
            }).catch((e) => {
                activatePad();
                setTimeout(() => inactivatePad(), 100);
                document.getElementById('footer-text').style.color = 'white';
                setContext(displayClipName("Connection Fail"))
                console.log(new Error("Fail to load sound:",e))
            })

        }
    }
    function Element() {
        return () => (
            <UniPad  {...props}  id={props.clipId} style={props.stylePad}
                onClick={playSound}
                toggleStyle={padStyle || false} >
                <audio ref={audioRefElement} className='clip' id={props.keyTrigger} src={props.clip}></audio>
                {props.keyTrigger}
            </UniPad>
        )
    }
    return (
        Memorize({ fact: Element(), deps: [padStyle,power, textColor ] })
    )
}
/**
 * BankWrap container of pad
 * @description Display a container with map of context.currentPadBank  <PadWrap className="pad-bank" >{pads}</PadWrap>
 * @param Object props
 * @returns useMemo`deps:currentPadBank ()=> JSX.Element 
 */
export function BankWrap(props) {
    const [mainContext, setContext] = useContext(Context);
    const { power, currentPadBank } = mainContext;
    const stylePad = {
        inactive: getColor()
    }
    
    useEffect(()=>{
        const {inactive} = stylePad;
        setContext(setTextColor(inactive))
    }, [currentPadBank, power])

    let pads = currentPadBank.map((drumObj, i, padBankArr) => {
        return (
            <DrumPad key={i} stylePad={stylePad}
                clipId={padBankArr[i].id}
                clip={power ? padBankArr[i].url : "#"}
                keyTrigger={padBankArr[i].keyTrigger}
                keyCode={padBankArr[i].keyCode}
                justifyContent={'center'}
                power={power}
            />
        )
    });
    function Element() {
        return (
            () => <PadWrap className="pad-bank" >{pads}</PadWrap>
        )
    };

    return (
        Memorize({ fact: Element(), deps: [currentPadBank, power] })
    );
}
/**
 * Root Container
 * @description Display Wrap content 
 * @param JSX.Element children
 * @param Object ...props
 * @returns JSX.Element< {...props}> {children}
 */
export function DrumWrap({ children, ...props }) {
    return (
        <DrumMachine {...props}>
            {children}
        </DrumMachine>
    );
}
/**
 * Volume Controled pure component with Memo
 * @description Display input range 
 * @param Number volume
 * @param Function callback
 * @param Boolean power
 * @returns useMemo`deps:volume,power ()=> JSX.Element 
 */
export function Volume({ volume, callback, power }) {

    function Element() {
        return (
            () => (
                <div style={{ minWidth: ' max-content' }} >
                    <input id="volume" type="range" min="0" max="1" step="0.01"
                        value={volume} onChange={callback}
                    />
                </div>
            )
        )
    }
    return Memorize({ fact: Element(), deps: [volume,power] });
};
/**
 * Column Element 
 * @description Column extend BASE <styled.div>
 * @param JSX.Element children
 * @param Object ...props
 * @returns JSX.Element<{...props}>: {children}
 * @version 1.2.0
 */
export function Col({ children, ...props }) {
    function Element() {
        return (
            () =>
                <Column {...props} >
                    {children}
                </Column>
        );
    }
    //return Memorize({fact:Element(), deps:[]})
    return Element()();
}
/**
 * P Element 
 * @description P extend BASE  <styled.p>
 * @param String text
 * @param Object ...props
 * @returns useMemo`deps:text JSX.Element<{...props}>: {text}
 */
export function P({ text, ...props }) {
    function Element() {
        return (
            () =>
                <Text {...props} >
                    {text}
                </Text>
        );
    }
    return Memorize({ fact: Element(), deps: [text] })
}
/**
 * Switch Element 
 * @description switch exted Row extend BASE  <styled.div>
 * @param Boolean isOpen
 * @param Object ...props
 * @returns useMemo`deps:isOpen   JSX.Element<{isOpen, ...props}>: (<SwitchIcon isOpen={isOpen} />)
 */
export function Toggle({ isOpen,closeShadow, ...props }) {
   
    function Element() {
        return (
            () =>
                <Switch isOpen={isOpen} {...props}>
                    <SwitchIcon closeShadow={closeShadow} isOpen={isOpen} />
                </Switch>
        )
    }
    return Memorize({ fact: Element(), deps: [isOpen] });
}
/**
 * Row Element 
 * @description Row extend BASE  <styled.div>
 * @param String text
 * @param Object ...props
 * @returns useMemo` JSX.Element<{...props}>: {text}
 */
export function Row({ children, ...props }) {
    return (
        <RowStyled {...props}>
            {children}
        </RowStyled>
    )
}