const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['1.VaaVaathi','2.Vaa Vaathi','3.Unn Per Solla','4.Mudhal Kanave','5.Vaa Thalaiva','6.Adiyae Unna Paathida','7.Nenjil Maamazhai','8.Naani Koni',
        '9.Thalaivaa','10.Kanja Poo','11.Anandham Male','12.Arjunar Villu','13.Paathu Paathu','14.Santhosam Santhosam',
        '15.Oore Therinjikitten','16.Kandangi Kandangi','17.Ranjithame','18.Ennavale Ennavale','19.Vanna Nilavae','20.Irupathu Kodi',
        '21.Thodu Thodu Enave','22.Innisai Paadi Varum','23.Oru Chinna Thamarai','24.Karikalan Kala Pola','25.Naan Adicha Thaanga',
        '26.Onna Pola Oruthana','27.Aattam Pottu','28.Adhuva Idhuva','29.Ovvundraai Thirudugiraai','30.Yembuttu Irukkuthu Aasai',
        '31.Per Vachaalum Vaikkaama','32.Arabic Kuthu','33.Private Party','34.Dippam Dappam','35.Thee Thalapathy','36.Jimmiki Ponnu','37.Celebration Of Varisu','38.July Malargale','39.Ootha Ootha',
        '40.Vizhi Moodi Yosithaal','41.Vaarayo Vaarayo','42.Hasili Fisiliye','43.Amali Thumali','44.Ennamo Yeadho','45.Yaar Indha',
        '46.Enakkoru Sinegidhi','47.Ennavo Ennavo','48.June July Maathadhil','49.Mellinamae Mellinamae','50.Minnalai Pidithu','51.Sakkarai Nilave','52.Aluva Puzha','53.Malare Ninne',
        '54.Alaikaa Laikaa','55.Kaal Mulaitha Poovae','56.Engae Andha Vennila','57.Antartica','58.Oru Maalai','59.Mazhai Vara Pogudhe','60.Nooru Samigal','61.Vizhigalil Vizhigalil',
        '62.Annanoda Pattu','63.Devuda Devuda','64.Thuli Thuli Mazhaiyaai','65.Oru Naalaikkul','66.Ennai Thaalattum','67.Sil Sil Silala','68.Yaar Indha Devadhai','69.Vinmeen Vithaiyil',
        '70.Yaaro Ivan','71.Megamai Vanthu','72.Naan Ready Than Varava'
];// Keep track of song
let songIndex = 53;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

const volumeRange = document.getElementById('volume');
// const audio = document.getElementById('audio');

volumeRange.addEventListener('input', () => {
  audio.volume = volumeRange.value;
});


// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);


const songSelect = document.getElementById("song-select");

songSelect.addEventListener("change", () => {
  const selectedSong = songSelect.value;
  const selectedIndex = songs.indexOf(selectedSong);
  
  songIndex = selectedIndex;
  loadSong(selectedSong);
  playSong();
});

