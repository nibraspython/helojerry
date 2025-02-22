let songs = JSON.parse(localStorage.getItem("songs")) || [];
let currentSongIndex = 0;
const audio = document.getElementById("audio");

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("song-list")) {
        loadSongs();
        playSong(currentSongIndex);
    }
});

function loadSongs() {
    let songList = document.getElementById("song-list");
    songList.innerHTML = "";

    songs.forEach((song, index) => {
        let songDiv = document.createElement("div");
        songDiv.classList.add("song-item");
        songDiv.innerHTML = `<img src="${song.image}" alt=""><p>${song.name} - ${song.artist}</p>`;
        songDiv.onclick = () => playSong(index);
        songList.appendChild(songDiv);
    });
}

function playSong(index) {
    currentSongIndex = index;
    let song = songs[index];

    document.getElementById("song-title").textContent = song.name;
    document.getElementById("song-artist").textContent = song.artist;
    document.getElementById("song-image").src = song.image;
    audio.src = song.url;
    audio.play();
}

function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

audio.onended = () => nextSong();

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// Admin Functions
function addSong() {
    let name = document.getElementById("song-name").value;
    let artist = document.getElementById("artist-name").value;
    let url = document.getElementById("song-url").value;
    let image = document.getElementById("image-url").value;

    let newSong = { name, artist, url, image };
    songs.push(newSong);
    localStorage.setItem("songs", JSON.stringify(songs));
    loadSongs();
}

// Load admin song list
if (document.getElementById("admin-song-list")) {
    loadAdminSongs();
}

function loadAdminSongs() {
    let list = document.getElementById("admin-song-list");
    list.innerHTML = "";
    
    songs.forEach((song, index) => {
        list.innerHTML += `<p>${song.name} - ${song.artist} <button onclick="deleteSong(${index})">Delete</button></p>`;
    });
}

function deleteSong(index) {
    songs.splice(index, 1);
    localStorage.setItem("songs", JSON.stringify(songs));
    loadSongs();
    loadAdminSongs();
}

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let randomColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = randomColor;
}


// Change color every 5 seconds
setInterval(random_bg_color, 3000);
