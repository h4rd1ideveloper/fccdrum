import styled,  { css } from 'styled-components';
export const BASE = styled.div`
    ${
        props=>props._height&&css`
        height: ${props._height};
    `}
    width: 100%;
    ${
        props=>props._width&&css`
        width: ${props._width};
    `}
    ${
        props => props.justifyContent&&css`
        justify-content: ${props.justifyContent};
    `}
    align-items: center;
    ${
        props => props.alignItems&&css`
        align-items: ${props.alignItems};
    `}
    ${
        props => props.borderRadius&&css`
        border-radius: ${props.borderRadius};
    `}
    ${
        props => props.boxShadow&&css`
        border-radius: ${props.boxShadow};
    `}
    ${
        props => props && props.fontSize && css`
        font-size: ${props.fontSize};
    `}
`;
export const Column = styled(BASE)`
    display: flex;
    flex-direction: column;
`;
export const Row = styled(BASE)`
    display: flex;
    flex-direction: row;
`;
export const PadStyled = styled(Column)`
  transition: all 0.2s cubic-bezier(1, -0.06, 1, 1.54);
  border-radius: 5px;
  cursor: pointer;
  width: 32%;
  margin: 0 auto;
  margin-top: 0px;
  height: 30%;
  margin-top: 10px;
  font-family: cursive;
  box-shadow: rgba(0,0,0,0.05) 2px 4px 13px;
  ${props => props.toggleStyle === false ? css`
        background-color: #bdbdbd26;
  `: css`
        background-color:   ${props.style.inactive};
        transform: translate3d(-20px, 0px, -20px);
  `}
  ${props=>!props.power&&css`
        background-color: #bdbdbd08;   
  `}
`;
export const PadBank = styled(Row)`
    width: 20%;
    min-width: 375px;
    min-height: 200px;
    height: 400px;
    flex-wrap:wrap;
`;
export const DrumMachine = styled(Column)`
    perspective: 1000px;
    perspective-origin: 1000px;
    transform: translate3d(1px, 0px, 2px);
    width: 400px;
    min-width: max-content;
    background-color: rgba(0,0,0,0.24);
    --webkit-backdrop-filter: blur(59px);
    padding:2%;
    margin: 15vh auto 15vh auto;
    box-shadow: rgba(0,0,0,0.3) 5px 0px 13px;
    border-radius: 6px;
`;
export const Text = styled.p`
    word-wrap: break-word;
    word-break: break-word;
    letter-spacing: 0.02rem;
    transition: all 100ms easy-in-out;
    ${props => props && props.fontSize && css`
        font-size: ${props.fontSize};
    `}
`;
export const StyledInput = styled.input`
    min-width: 120px;
`;


export const Switch = styled(Row)`
    transition: all 0.4s ease-in-out;
    perspective: 100px;
    background-color: #c7c7c7;
    ${props=>props.isOpen&&props.isOpen === true?css`
        justify-content: flex-end;
       
    `:css`
        justify-content: flex-start;
        background-color: #848484d1;
    `}
    height: 21px;
    border-radius: 8px;
`;
export const SwitchIcon = styled.div`
    transform: translateZ(-5px);
    transition: all 0.2s cubic-bezier(1, -0.06, 1, 1.54);
    border-radius: 100%;
    width: 25px;
    height: 25px;
    background-color:#d4d4d4;
    box-shadow: grey 0px 0px 10px 2px ;
    ${props=>!props.isOpen&&!props.closeShadow&&css`
        width: 24px;
        height: 24px;
        background-color: #d4d4d4;
        margin-top: 1px;
        box-shadow: rgba(0,0,0,0) 0px 0px 0px 0px ;
    `}
`;
