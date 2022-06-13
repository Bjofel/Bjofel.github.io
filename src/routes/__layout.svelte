<script>
  	import "../app.css";
	import { audioData } from '$lib/stores/audioData.js';
	import { trackIndex} from "$lib/stores/stores"
  	import { theme, THEMES } from "$lib/stores/theme";
	import { onMount } from 'svelte';
  	import TrackHeading from '$lib/components/TrackHeading.svelte';
	import ProgressBarTime from '$lib/components/ProgressBarTime.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import VolumeSlider from '$lib/components/VolumeSlider.svelte';

  // Code snippet taken from Svelte "https://svelte.dev/repl/b0a901d9a15347bd95466150485e4a78?version=3.31.0"
		// Get Audio track
		$trackIndex = 3;

	let audioFile;

	//  runs after component has been rendered to DOM
	onMount(()=>{
		audioFile = new Audio(audioData[$trackIndex].url);
		audioFile.onloadedmetadata = () => {
		totalTrackTime = audioFile.duration;
		updateTime();
	}
	})

	let trackTitle = audioData[$trackIndex].name;

	// Changes song, title and duration

	const loadTrack = () => {
		audioFile = new Audio(audioData[$trackIndex].url);
		audioFile.onloadedmetadata = () => {
			totalTrackTime = audioFile.duration;
			updateTime();
		}
		trackTitle = audioData[$trackIndex].name;
	}	
	
	// Track Duration and Progress Bar
	let totalTrackTime;
	$: console.log(totalTrackTime)

	//  default Variable values
	let totalTimeDisplay = "loading...";
	let currTimeDisplay = "0:00:00";
	let progress = 0;
	let trackTimer;
	
	//  Updates time
	function updateTime() {
		progress = audioFile.currentTime * (100 / totalTrackTime);
		
		let currHrs = Math.floor((audioFile.currentTime / 60) / 60);
		let currMins = Math.floor(audioFile.currentTime / 60);
		let currSecs = Math.floor(audioFile.currentTime - currMins * 60);
		
		let durHrs = Math.floor( (totalTrackTime / 60) / 60 );
		let durMins = Math.floor( (totalTrackTime / 60) % 60 );
		let durSecs =  Math.floor(totalTrackTime - (durHrs*60*60) - (durMins * 60));
		
		// @ts-ignore
		// @ts-ignore
		if(currSecs < 10) currSecs = `0${currSecs}`;
		// @ts-ignore
		if(durSecs < 10) durSecs = `0${durSecs}`;
		// @ts-ignore
		if(currMins < 10) currMins = `0${currMins}`;
		// @ts-ignore
		if(durMins < 10) durMins = `0${durMins}`;
		
		currTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
		totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;
		
		if (audioFile.ended) {
			toggleTimeRunning();
		}
	}
	
	const toggleTimeRunning = () => {
		if (audioFile.ended) {
			isPlaying = false;
			clearInterval(trackTimer);
			console.log(`Ended = ${audioFile.ended}`);	
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	}
	

	// Controls
	let isPlaying = false;
	$: console.log(`isPlaying = ${isPlaying}`)
	
	const playPauseAudio = () => {
		if (audioFile.paused) {
			toggleTimeRunning()
			audioFile.play();
			isPlaying = true;
		} else {
			toggleTimeRunning()
			audioFile.pause();
			isPlaying = false;
		}	 	
	}
	
	const rewindAudio = () => audioFile.currentTime -= 10;
	const forwardAudio = () => audioFile.currentTime += 10;
	
	// Volume Slider
	let vol = 50;
	const adjustVol = () => audioFile.volume = vol / 100; 

	// loads neww track when Load button has been pressed and plays it
	function newSong() {
		audioFile.pause();
		loadTrack();
		playPauseAudio()

	}

</script>

<svelte:head>
  
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
</svelte:head>

<main>
  <div class="h-screen drawer w-full">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300 border-b-2 border-blue-500" id="topBar">
        <div class="flex-none lg:hidden">
        </div>

        <div class="grid-item">
			<p id="title"> Musify</p>
        </div>

		<button class="bg-transparent hover:bg-blue-500 text-primary-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" on:click={newSong}>
			Load Button
		  </button>
        <div class="flex-none hidden lg:block grid-item">
          <ul class="menu menu-horizontal">
            
            <li><a href="https://github.com/wilvik05/wilvik05.github.io">
                <i class="fa fa-github-square" style="font-size:36px" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->

      
      <slot />
    </div>
    
</main>


<footer class="px-10 py-1 border-t-2 bg-base-300 text-base-content border-blue-500 shadow-black">
  <section  class="">
		
		<TrackHeading {trackTitle} />

		
		<ProgressBarTime {currTimeDisplay}
										 {totalTimeDisplay}
										 {progress} />
		
		<Controls {isPlaying} 
							on:rewind={rewindAudio}
							on:playPause={playPauseAudio}
							on:forward={forwardAudio} />
		
		<VolumeSlider bind:vol
									on:input={adjustVol} />	
	</section>
	
		<!-- <PlayList on:click={handleTrack} /> -->
</footer>

<style>
  footer {
    position: absolute;
	overflow: hidden;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #topBar {
	display: inline-grid;
	justify-content: space-between;
	grid-template-columns: auto auto auto;
	

  }

  .grid-item {
       
	   font-size: 20px;
	   text-align: center;
	   box-sizing: border-box;
	   align-items: center;
	   justify-content: center;
   
   }

  #title {
	  font-family: "oswald";
	  left: 20px;
	  margin-left: 20px;
	  text-align: center;
  }
  
</style>
