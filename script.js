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

function changeBackgroundColor() {
    const colors = ["#33FF57", "#3357FF", "#FF33A1", "#F3FF33", "#33FFF3", "#9266D4", "#b491e3"]; // Add more colors if needed
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Change color every 5 seconds
setInterval(changeBackgroundColor, 3000);
