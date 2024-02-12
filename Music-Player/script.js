
	
const listOfSongs=[
	{"name":"Indru Netru Naalai - MassTamilan.com","artist":"Shankar Mahadevan, Aalap Raju - MassTamilan.com; ","src":"./assets/songs/Indru-Netru-Naalai.mp3"},
	{"name":"Please Purinjukko - MassTamilan","artist":"Sean Roldan, Aditi Rao Hydari - MassTamilan; ","src":"./assets/songs/songs.mp3"},
	{"name":"Ae Pulla - MassTamilan","artist":"A.R.Rahman, Sid Sriram - MassTamilan; ","src":"./assets/songs/Ae Pulla.mp3"},
	{"name":"Anbalane - MassTamilan","artist":"A.R.Rahman, Deva - MassTamilan; ","src":"./assets/songs/Anbalane.mp3"},
]



listOfSongs.map((item,ind)=>{
	let songItem=document.getElementById("song_container");
	let songDetail=document.createElement("div");
	songDetail.classList.add('item')
	songDetail.id=`item-${ind}`
	songDetail.innerHTML=`
		<div class="song">
			<img src="./assets/images/default.png" alt="default img" srcset="" width="20px">
			<p>${item.name}</p>
		</div>
		<img id="play-icon-${ind}" class="playpause" src="./assets/icons/pause.ico" alt="" width="20px">
	`
	songItem.appendChild(songDetail);
})



let songItem=document.getElementsByClassName("item")
let songList=document.getElementById("play-list")
let songContainer=document.getElementById("song_container")
let trackName = document.getElementById("track_name");
let trackAuthor = document.getElementById("track_author");
let trackProgress = document.getElementById("track_progress");
let trackCurrentTime = document.getElementById("track_current_time");
let trackDurationTime = document.getElementById("track_duration_time");
let playpauseBtn = document.getElementById("play_pause_box");
let nextSong = document.getElementById("next")
let previousSong = document.getElementById("previous")

songList.addEventListener("click",()=>{
	// console.log();
	if(songContainer.classList[0]==="add"){
		// console.log(songContainer.classList[0]);
		songContainer.classList.remove("add")
		songContainer.classList.add("remove")
	}else{
		// console.log(songContainer.classList[0]);
		songContainer.classList.remove("remove")
		songContainer.classList.add("add")
	}
})

let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');


trackProgress.addEventListener("change",seekTo);
nextSong.addEventListener("click",nextTrack);
previousSong.addEventListener("click",prevTrack);



function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = listOfSongs[track_index].src;
    curr_track.load();
    updateTimer = setInterval(seekUpdate, 1000);
}

function resetValues() {
    trackCurrentTime.textContent = "00:00";
    trackDurationTime.textContent = "00:00";
    trackProgress.value = 0;
}


function playpauseTrack(){
    if (!isPlaying){
        playTrack()
    }else{
        pauseTrack()
    }
}

function playTrack(){
    loadTrack(track_index);
    curr_track.play();
    isPlaying=true;
    playpauseBtn.innerHTML='<img src="./assets/icons/play.ico" alt="play" id="play_btn" srcset="" >'
	songItem[track_index].childNodes[3].id="pause-icon-"+track_index;
	songItem[track_index].childNodes[3].src="./assets/icons/play.ico";
	songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p><marquee behavior="" direction="">${songItem[track_index].childNodes[1].childNodes[3].textContent}</marquee></p>`
	trackName.innerText=listOfSongs[track_index].name.split("-")[0]
	trackAuthor.innerText=listOfSongs[track_index].artist.split("-")[0]
	
	
}

function pauseTrack(){
    curr_track.pause()
    isPlaying=false;
    playpauseBtn.innerHTML='<img src="./assets/icons/pause.ico" alt="pause" id="pause_btn" srcset="" >'
	songItem[track_index].childNodes[3].id="play-icon-"+track_index;
	songItem[track_index].childNodes[3].src="./assets/icons/pause.ico";
	songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[track_index].childNodes[1].childNodes[3].textContent}</p>`
}

function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < listOfSongs.length - 1){
		songItem[track_index].childNodes[3].id="play-icon-"+track_index;
		songItem[track_index].childNodes[3].src="./assets/icons/pause.ico";
		songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[track_index].childNodes[1].childNodes[3].textContent}</p>`
      	track_index += 1;}
    else {
		songItem[track_index].childNodes[3].id="play-icon-"+track_index;
		songItem[track_index].childNodes[3].src="./assets/icons/pause.ico";
		songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[track_index].childNodes[1].childNodes[3].textContent}</p>`
		track_index = 0
	};   
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
function prevTrack() {
	// Go back to the last track if the
	// current one is the first in the track list
	if (track_index > 0){	
		songItem[track_index].childNodes[3].id="play-icon-"+track_index;
		songItem[track_index].childNodes[3].src="./assets/icons/pause.ico";
		songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[track_index].childNodes[1].childNodes[3].textContent}</p>`
		track_index -= 1;
	}
	else {
		songItem[track_index].childNodes[3].id="play-icon-"+track_index;
		songItem[track_index].childNodes[3].src="./assets/icons/pause.ico";
		songItem[track_index].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[track_index].childNodes[1].childNodes[3].textContent}</p>`
		track_index = listOfSongs.length - 1;
	}
	// Load and play the new track
	loadTrack(track_index);
	playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    let seekto = curr_track.duration * (trackProgress.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      trackProgress.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      trackCurrentTime.textContent = currentMinutes + ":" + currentSeconds;
      trackDurationTime.textContent = durationMinutes + ":" + durationSeconds;
    }
}


// click desire song to play and icon also change and added marqueue tag if current song isplaying

for (let i=0;i<songItem.length;i++){
	songItem[i].addEventListener("click",()=>{
		for(let x=0;x<songItem.length;x++){
			
			if(songItem[x].childNodes[3].id===songItem[i].childNodes[3].id){
				// console.log(songItem[x].childNodes[1].childNodes[3].textContent);
				if(songItem[x].childNodes[3].id.includes("play-icon")){
					songItem[x].childNodes[1].childNodes[3].innerHTML=`<p><marquee behavior="" direction="">${songItem[x].childNodes[1].childNodes[3].textContent}</marquee></p>`
					songItem[i].childNodes[3].id="pause-icon-"+x;
					songItem[i].childNodes[3].src="./assets/icons/play.ico";
					track_index=i
					loadTrack(track_index)
					playTrack()
				}else if(songItem[x].childNodes[3].id.includes("pause-icon")){
					songItem[x].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[x].childNodes[1].childNodes[3].textContent}</p>`
					songItem[i].childNodes[3].id="play-icon-"+x;
					songItem[i].childNodes[3].src="./assets/icons/pause.ico";
					pauseTrack()
				}
			}else{
				songItem[x].childNodes[3].id="play-icon-"+x;
				songItem[x].childNodes[3].src="./assets/icons/pause.ico";
				songItem[x].childNodes[1].childNodes[3].innerHTML=`<p>${songItem[x].childNodes[1].childNodes[3].textContent}</p>`
			}
			
		}
	})
	
}


