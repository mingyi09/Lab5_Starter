// explore.js

const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");

window.addEventListener('DOMContentLoaded', init);


let voices = [];
const talkFace = document.querySelector("img");

function init() {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  talkContent();
}

function populateVoiceList(){
  voices = synth.getVoices();
  
  const selectedInd = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i=0; i<voices.length; i++){
    const newOption = document.createElement('option');
    newOption.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      newOption.textContent += ' -— DEFAULT';
    }

    newOption.setAttribute('data-lang', voices[i].lang);
    newOption.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(newOption);
  } 
  voiceSelect.selectedIndex = selectedInd;
}

function talkContent(){
  let content = document.querySelector("textarea");
  const talkButton = document.querySelector("button");
  

  talkButton.addEventListener('click',()=>{
    let utterThis = new SpeechSynthesisUtterance(content.value);
    const selectedOption = voiceSelect[voiceSelect.selectedIndex].getAttribute('data-name');
    
    for (let i=0; i<voices.length;i++){
      if (voices[i].name == selectedOption){
        utterThis.voice = voices[i];
        break;
      }
    }

    synth.speak(utterThis);
    if (window.speechSynthesis.speaking){
      talkFace.src="assets/images/smiling-open.png";
    }

    const interval = setInterval(function(){
      if (!window.speechSynthesis.speaking){
        talkFace.src="assets/images/smiling.png";
        clearInterval(interval);
      }
    },500);
  }) 
}