<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">


<script>
  import { audioData } from '$lib/stores/audioData.js'
  import { trackIndex} from "$lib/stores/stores.js"

  // Gets the index on click of respective song to its index value
  function songIndexer(param) {
     let index = audioData.indexOf(param)
    $trackIndex = index
  }


</script>
<div>
  <div id="headerContainer">
    <h2 id=selectionTitle>Our Music Collection</h2>
  </div>
  <div id="libContainer">
    <ul>
        {#each audioData as { name, url }, i}
            <li  on:click={() => songIndexer(audioData[i])}>
              <div id="songContainer">
                <p id="infoContainer"> {i + 1}: {audioData[i].name}</p>
                <p id="NAME">{audioData[i].group} - {audioData[i].lenght}</p>
              </div>
            </li>
        {/each}
    </ul>
  </div>
</div>


<style>

  #headerContainer {
    background-color: #142c3d;
    width: 20vw;

  }

  #selectionTitle {
    font-size: 20px;
    font-family: "oswald";
    margin-left: 20px;
    border-right: #3b82f6;
    border-style: solid;
  
  }

  #libContainer {
      display: flex;
      justify-content: start;
      overflow-y: scroll;
      height: 65vh;
      background-color: #142c3d;
      width: 20vw;
      border-right: #3b82f6;
      border-style: solid;


  }

  #songContainer {
    margin-top: 20px;
    margin-left: 20px;
    font-family: "oswald";
    
    
} 

  #infoContainer {
    font-size: 20px;
    
  }

  li:active, li:hover {
  border-radius: 5px;
  background-color: #1A374D;
  cursor: pointer;
}   

#NAME {
  color: #5C527F;

}
::-webkit-scrollbar {
        position: absolute;
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(4, 21, 98, 0);
    }
    
    
@media (max-width: 700px){ 

  #libContainer {
      height: 55vh;
      width: 100vw;
      background-color: rgba(4, 21, 98, 0);
      border-style: none;


  }
  #headerContainer {
    background-color: rgba(4, 21, 98, 0);
    width: 100vw;

  }
  #selectionTitle {
    border-style: none;
  }

}

@media (min-height: 1000px) and (min-width: 700px) {
  #libContainer {
      height: 90vh;


  }
}
</style>