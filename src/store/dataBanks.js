import Heater1 from '../assets/sounds/Heater-1.mp3';
import Heater2 from '../assets/sounds/Heater-2.mp3';
import Heater3 from '../assets/sounds/Heater-3.mp3';
import Heater4 from '../assets/sounds/Heater-4_1.mp3';
import Heater6 from '../assets/sounds/Heater-6.mp3';
import Dsc_Oh from '../assets/sounds/Dsc_Oh.mp3';
import Kick_n_Hat from '../assets/sounds/Kick_n_Hat.mp3';
import RP4_KICK_1 from '../assets/sounds/RP4_KICK_1.mp3';
import Cev_H2 from '../assets/sounds/Cev_H2.mp3';
import Chord_1 from '../assets/sounds/Chord_2.mp3';
import Chord_3 from '../assets/sounds/Chord_3.mp3';
import Give_us_a_light from '../assets/sounds/Give_us_a_light.mp3';
import Dry_Ohh from '../assets/sounds/Dry_Ohh.mp3';
import Bld_H1 from '../assets/sounds/Bld_H1.mp3';
import punchy_kick_1 from '../assets/sounds/punchy_kick_1.mp3';
import side_stick_1 from '../assets/sounds/side_stick_1.mp3';
import Brk_Snr from '../assets/sounds/Brk_Snr.mp3';
const colors = [
  '#41658A', '#34F6F2', '#EEF8FF', '#78E3FD', '#37718E', '#254E70', '#C33C54', '#3C3C3C', '#FF5A5F'
]
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: Heater1
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: Heater2
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: Heater3
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: Heater4
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: Heater6
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: Dsc_Oh
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: Kick_n_Hat
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: RP4_KICK_1
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: Cev_H2
},
];
const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: Chord_1
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: Chord_1
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: Chord_3
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: Give_us_a_light
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: Dry_Ohh
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: Bld_H1
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: punchy_kick_1
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: side_stick_1
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: Brk_Snr
}];
const activeStyle = {
  backgroundColor: 'orange',
  height: 77,
  marginTop: 13,
  backdropFilter: 'blur(23px)',
}
const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  backdropFilter: 'blur(23px)',
}
function getColor(){
  return  colors[Math.floor(Math.random() * (colors.length-1) )];
}
export { bankOne, bankTwo, activeStyle, inactiveStyle, colors, getColor};
