// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti_object = new JSConfetti();

function init() {
  changeImg();
  changeSound();
}

function changeImg(){
  let select_img = document.getElementById("horn-select");

  select_img.addEventListener('change', (event) => {
    let new_img = document.querySelector("img");
    let new_img_name = event.target.value;
    new_img.src=`assets/images/${new_img_name}.svg`;
    document.querySelector("audio").src=`assets/audio/${new_img_name}.mp3`;
  });
}

function changeSound(){
  let play_button = document.querySelector("button");
  let vol_img = document.querySelector("img[src='assets/icons/volume-level-2.svg']");
  let vol_ctrl = document.querySelector("div>input");
  let sound = document.querySelector("audio");

  vol_ctrl.addEventListener('change',(event)=>{
    let sound_level = event.target.value;
    sound.volume = sound_level/100;
  
    if (sound_level==0){
      vol_img.src="assets/icons/volume-level-0.svg";
    }
    else if (sound_level>=1 && sound_level<33){
      vol_img.src="assets/icons/volume-level-1.svg";
    }
    else if (sound_level>=33 && sound_level<67){
      vol_img.src="assets/icons/volume-level-2.svg";
    }
    else {
      vol_img.src="assets/icons/volume-level-3.svg";
    }
    }
  )

  play_button.addEventListener('click',()=>{
    if(sound.src.indexOf("party-horn")!=-1){
      jsConfetti_object.addConfetti({
        emojis: ['🦄','🌈', '✨', '💫', '🌸'],
        confettiRadius:80,
      });
    }
    sound.play();
  })
}



