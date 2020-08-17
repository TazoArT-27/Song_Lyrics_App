//getting id
const searchBtn = document.getElementById("searchBtn");
const searchSong = document.getElementById("searchSong");
const getLyricsBtn = document.getElementById("getLyricsBtn");
const results = document.getElementById("results");
const lyricsDiv = document.getElementById("lyricsDiv");

const getAPI = 'https://api.lyrics.ovh';

//Event Listeners
searchBtn.addEventListener("click", function(){
    const inputValue = searchSong.value;
    if(inputValue === ''){
        alert('Please enter a song name');
    }else{
        getSongs(inputValue);
        //console.log('nothing');
    }
})

results.addEventListener('click', e => {
    console.log(e.target);
    const clickedElement = e.target;
    
    if(clickedElement.tagName === "BUTTON"){
        const artist = clickedElement.getAttribute('data-artist');
        const songtitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songtitle);
    }

})


//Functions

//getSong Function
function getSongs(inputValue){
    fetch(`${getAPI}/suggest/${inputValue}`)
    .then(response => response.json())
    .then(data => showData(data))
    //.then(data => console.log(data))
    
}

function showData(data){
    
    results.innerHTML = 
            `${data.data.map(song=> 
           `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-3">
                    <img src="${song.album.cover}" alt="cover of ${song.album.title}">
                </div>
                <div class="col-md-6">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                </div>
            </div>
            ` ).slice(0, 10).join('')}
            `;
    
    
}

//getLyrics Function

function getLyrics(artist, songtitle){

    fetch(`${getAPI}/v1/${artist}/${songtitle}`)
    .then(response => response.json())
    //.then(data => console.log(data.lyrics))
    .then(data => showLyrics(data, artist, songtitle))
}

//showLyrics Function

function showLyrics(data, artist, songtitle){
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    results.innerHTML = `<div id='lyricsDiv' class="single-lyrics text-center">
                           <h2 class="text-success mb-4">${artist} - ${songtitle}</h2>
                           <span>${lyrics}</span>
                          </div>`;
}


