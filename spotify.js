// SPOTIFY
const spotify_key = '5b30e73596c74f8283b3063f15c7bcba'
const spotify_secret = 'e739b14bd8634b76900326e6d1fa145e'
//endpoint per prendere il token
const spotify_token_endpoint = 'https://accounts.spotify.com/api/token'
//playlist
const spotify_endpoint = 
'https://api.spotify.com/v1/playlists/2gC2uLxTamvDEJ12hJLOl9?si=4d87c6251703402d&limit=9'


// Dichiara variabile token
let token;
let audio = new Audio();
let playlist = [];

// All'apertura della pagina, richiediamo il token
fetch(spotify_token_endpoint, {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(spotify_key + ':' + spotify_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);



function onTokenResponse(response)
{
  return response.json();
}


function onTokenJson(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;


  // Esegui la richiesta
  fetch(spotify_endpoint,
    {
    headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonSpotify);
}



function onResponse(response){
    console.log('Risposta ricevuta');
//    console.log(response.json());
    return response.json();
}


let numberOfcanzoni = 9;
    

function onJsonSpotify(json) {
    console.log('JSON ricevuto');
    document.querySelector('#results').classList.remove('hidden');
    document.querySelector('#results').classList.add('container');          
    const canzoni = json.tracks.items;
    for(let i = 0; i < numberOfcanzoni; i++){
      const spotify_container = document.createElement('div')
      spotify_container.classList.add('spotify-container');
      const img = document.createElement('img');
      img.classList.add('spotify-image');
      img.src = canzoni[i].track.album.images[2].url;
      const info_canzone = document.createElement('a');
      info_canzone.classList.add('info-canzone')
      info_canzone.textContent = canzoni[i].track.name + " : " + canzoni[i].track.artists[0].name;
      info_canzone.link = canzoni[i].track.preview_url;
      info_canzone.addEventListener('click', play);
      
      spotify_container.appendChild(img);
      spotify_container.appendChild(info_canzone);
      document.querySelector('#results').appendChild(spotify_container);
      
    }
    document.querySelector('#results').classList.add('hidden');
    
}



function play(event){
  let link = event.currentTarget.link

  audio.src = link
  audio.play()
}