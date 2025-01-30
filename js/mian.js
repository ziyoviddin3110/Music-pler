const mainImgs = document.querySelector(".mainImgs");
const nemeMusic = document.querySelector(".nemeMusic");
const audio = document.querySelector("audio");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const play = document.querySelector(".play");
const fa_bars = document.querySelector(".fa-bars");
const fa_arrow_right = document.querySelector(".fa-arrow-right");
const modal_content = document.querySelector(".modal_content");
const body = document.querySelector("body");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const input = document.querySelector("input");
const muzic_time = document.querySelector(".muzic-time");

const music = ["139891619.out", "Gokyuzu___Cever", "Mustang", "535630060"];

var index = [0];
music.map((item,index)=>{
  modal_content.innerHTML += ` <h3 onclick=chenchMadal(${index})> ${item}</h3>
                `;
})
const changeMusic = (id) => {
  mainImgs.setAttribute("src", `./imgs/${music[index]}.jpg`);
  audio.setAttribute("src", `./musics/${music[index]}.mp3`);
  nemeMusic.textContent = music[index];
  audio.play();

  
  
};
changeMusic();

const chenchMadal = (index)=>{
  mainImgs.setAttribute("src", `./imgs/${music[index]}.jpg`);
  audio.setAttribute("src", `./musics/${music[index]}.mp3`);
  nemeMusic.textContent = music[index];
  audio.play();
  modal_content.classList.remove("active");
  body.classList.add("plaing");

}

prev.addEventListener("click", () => {
  prevBtn()
});
const prevBtn = ()=>{
  index--;
  if (index < 0) {
    index = music.length - 1;
  }

  audio.play();
  body.classList.add("plaing");
  changeMusic();
}
play.addEventListener("click", () => {
playBtn()
});
const playBtn = ()=>{
  if (body.classList.contains("plaing")) {
    audio.pause();
    body.classList.remove("plaing");
  } else {
    audio.play();
    body.classList.add("plaing");
  }
}
next.addEventListener("click", () => {
  nextMusic();
});
const nextMusic = () => {
  index++;

  if (index > music.length - 1) {
    index = 0;
  }
  changeMusic();
  body.classList.add("plaing");
};

fa_bars.addEventListener("click", () => {
  modal_content.classList.toggle("active");
});
fa_arrow_right.addEventListener("click", () => {
  modal_content.classList.remove("active");
});


// const getTime= (time)=>{
//   var minut =Math.floor(time/60)>10 ? "0"+Math.floor(time/60):Math.floor(time/60)
//   var sekund =Math.floor(time%60)>10 ?"0"+Math.floor(time%60):Math.floor(time%60)
//   return`${minut}:${sekund}`
// }

const progress = (e) => {
  var width = (e.srcElement.currentTime * 100) / e.srcElement.duration;
  box2.style = `width:${Math.floor(width)}%`;

  const duration = e.srcElement.duration;
  const currentTime = e.target.currentTime;


    // if(duration){
    //   startTime.textContent=getTime(currentTime)
    //   endTime.textContent=getTime(duration)
    // }


  const durMin =
    Math.floor(duration / 60) < 10
      ? "0" + Math.floor(duration / 60)
      : Math.floor(duration / 60);
  const durSec =
    Math.floor(duration % 60) < 10
      ? "0" + Math.floor(duration % 60)
      : Math.floor(duration % 60);

  const curTime =
    Math.floor(currentTime / 60) < 10
      ? "0" + Math.floor(currentTime / 60)
      : Math.floor(currentTime / 60);
  const curSec =
    Math.floor(currentTime % 60) < 10
      ? "0" + Math.floor(currentTime % 60)
      : Math.floor(currentTime % 60);

  startTime.textContent = `${curTime}:${curSec}`;

  if (durMin) {
    endTime.textContent = `${durMin}:${durSec}`;
  } else {
    endTime.textContent = "00:00";
  }
};

audio.addEventListener("timeupdate", progress);
audio.addEventListener("ended", () => {
  nextMusic();
});

box1.addEventListener("click", (e) => {
  var allWidth = box1.clientWidth;
  var pointWith = e.offsetX;
  curTime = (pointWith * audio.duration) / allWidth;
  audio.currentTime = curTime;
});

const ovozvelu = ()=>{
  input.addEventListener("input", () => {
    var ovoz = input.value;
  
    audio.volume = ovoz / 100;
  });
}

ovozvelu()

document.addEventListener("keypress",(e)=>{
  // console.log(e);
  
  if(e.key == "Enter" || e.key == " "){
    
    playBtn()

  }
  
})
document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowRight") { 
    nextMusic();
  }
});

document.addEventListener("keydown", (e) => {
  // console.log(e); 

  if (e.key === "ArrowLeft") { 
    prevBtn()
  }
});



const audio1 = document.querySelector("audio");
const volumeSlider = document.querySelector("input");

audio.volume = 0.8;
volumeSlider.value = audio.volume * 100; 

const updateVolumeUI = () => {
  volumeSlider.value = audio.volume * 100; 
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + 0.1);
      updateVolumeUI();
    }
  }
  if (e.key === "ArrowDown") {
    if (audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - 0.1);
      updateVolumeUI();
    }
  }
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

audio.addEventListener("volumechange", updateVolumeUI);
