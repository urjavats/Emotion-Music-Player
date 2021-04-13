let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let slider = document.querySelector("#dur");
let timer;
let index_no = 0;
let expression=0;
let playing_song = false;
// create audio element
// let track=document.createElement('audio');
let track = document.getElementById("audio");
let imgtag = document.querySelector("#emoji");
let imgsrc = imgtag.src;
let autoplay=1;
let neutral_track = [
  {
    path: "Happier X Bad liar X sunflower.mp3",

  },
  {
      path:"Bad Bunny feat. Drake - Mia ( Video Oficial ).mp3",
  },
  {
      path:"Bebe Rexha - Last Hurrah (Official Acoustic Video).mp3",
  }
];
let angry_track = [
  {
    path: "Daya - Insomnia.mp3",
  },
  {
      path:"Bekhayali (Kabir Singh) - (Raag.Fm).mp3",
  },
  {
      path:"Duniya -Luka Chuppi-(MP3Tau.Com) -320KBPS.mp3",
  }
];
let happy_track = [
  {
    path: "Post Malone - Better Now.mp3",
  },
  {
      path:"Ellie Goulding, Diplo, Swae Lee - Close To Me (Official Video).mp3",
  },
  {
      path:"Full Audio Tera Ban Jaunga Kabir Singh Shahid Kapoor, Kiara A Akhil Sachdeva, Tulsi Kumar.mp3",
  }
];
let sad_track = [
  {
    path: "Khalid - Talk (Official Video).mp3",
  },
  {
      path:"Hauli Hauli De De Pyaar De - Neha Kakkar  Garry Sandhu (DJJOhAL.Com).mp3",
  },
  {
      path:"Shawn Mendes, Camila Cabello - Señorita.mp3",
  }
];
const checkIndex = (index) => (index !== undefined ? index : index_no);
const checkExpr = (exp) => (exp !== undefined ? exp : expression);
function load_neutral(index_no) {
  clearInterval(timer);
  expression=checkExpr(1)
  range_slider();
  index_no=checkIndex(index_no);
  track.src = neutral_track[index_no].path;
  track.load();
  
  timer = setInterval(range_slider, 1000);
  justplay();
  // expression=1;
}
function load_angry(index_no) {
  clearInterval(timer);
  // let emotion="angry";
  expression=checkExpr(2);
  range_slider();
  index_no=checkIndex(index_no);
  track.src = angry_track[index_no].path;
  track.load();
  timer = setInterval(range_slider, 1000);
  justplay();
  // expression=2;
}
function load_happy(index_no) {
  clearInterval(timer);
  // let emotion="happy";
  expression=checkExpr(3);
  range_slider();
  index_no=checkIndex(index_no);
  track.src = happy_track[index_no].path;
  track.load();
  timer = setInterval(range_slider, 1000);
  justplay();
  // expression=3;
}
function load_sad(index_no) {
  clearInterval(timer);
  // let emotion="sad";
  expression=checkExpr(4);
  index_no=checkIndex(index_no);
  range_slider();
  track.src = sad_track[index_no].path;
  track.load();
  timer = setInterval(range_slider, 1000);
  // console.log("sucessfully loaded sad");
  justplay();
  // expression=4;
}
// const checkEmotion = () => {
//   let imgsrc = document.querySelector("#emoji").src;
//   if (imgsrc.includes("neutral.png")) {
//     load_neutral(0);
//   } else if (imgsrc.includes("angry.png")) {
//     load_angry(0);
//   } else if (imgsrc.includes("brain.png")) {
//     load_happy(0);
//   } else {
//     load_sad(0);
//     console.log("hi sad");
//   }
// };

function justplay() {
//   checkEmotion();
  if (playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

// play
function playsong() {
  track.play();
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause
function pausesong() {
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function reset_slider() {
  slider.value = 0;
}

function next_song(){
  expression=checkExpr(expression);
  if(index_no<2){
    index_no=checkIndex(index_no)+1;
   
    console.log(expression)
    if(expression==1){
      load_neutral(index_no)
    }
    else if(expression==2){
      load_angry(index_no)
    }
    else if(expression==3){
      load_happy(index_no)
    }
    else{
      load_sad(index_no)
    }
    playsong();

  }else{
    index_no=0;
    console.log(expression)
    if(expression==1){
      load_neutral(index_no)
    }
    else if(expression==2){
      load_angry(index_no)
    }
    else if(expression==3){
      load_happy(index_no)
    }
    else{
      load_sad(index_no)
    }
    playsong();

  }
}
function previous_song(){
  console.log(index_no);
  if(index_no>0){
    index_no=checkIndex(index_no)-1;
    console.log(index_no);
    console.log(expression);
    if(expression==1){
      load_neutral(index_no)
    }
    else if(expression==2){
      load_angry(index_no)
    }
    else if(expression==3){
      load_happy(index_no)
    }
    else{
      load_sad(index_no)
    }
    playsong();

  }
  else{
    index_no=2;
    console.log(index_no);
    console.log(expression);
    if(expression==1){
      load_neutral(index_no)
    }
    else if(expression==2){
      load_angry(index_no)
    }
    else if(expression==3){
      load_happy(index_no)
    }
    else{
      load_sad(index_no)
    }
    playsong();

  }
}

function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

//   function will run when the song is over
     if(track.ended){
     	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
         if(autoplay==1){
  	       index_no += 1;
           if(index_no<2){
             console.log(expression);
           if(expression==1){
  	       load_neutral(index_no);}
           else if(expression==2){
              load_happy(index_no);
           }
           else if(expression==3){
             load_angry(index_no);
           }
           else{
             load_sad(index_no);
           }
  	       playsong();
         }
        }
      }
}


