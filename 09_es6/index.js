// Important DOM Elements
const playlistElement = document.querySelector('#playlist');
const playlistDurationElement = document.querySelector('#totalDuration');
const songNameElement = document.querySelector('#song-name');
const artistNameElement = document.querySelector('#artist');
const playCountElement = document.querySelector('#play-count');
const playerElement = document.querySelector('#player-frame');
const artistReleases = document.querySelector('#releases');
const commentsListElement = document.querySelector('#comments');
// Interactive Elements
const newSongForm = document.querySelector('#newSong');
const editSongForm = document.querySelector('#editSong');
const songDeleteButton = document.querySelector('#deleteSong');
const artistNameSelect = document.querySelector('#filterByArtist');
const newCommentForm = document.querySelector('#newComment');
let currentSongId;

// Behavior
const init = async () => {
  // fetch songs for initial load
  const songs = await getSongs();
  loadSongsIntoSidebar(songs);
  loadArtistChoices(songs)
  displayTotalDuration(songs);
  
  // handle form submission for creating a new song
  newSongForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { nameInput, artistInput, durationInput, youtubeLinkInput } = event.target
    const songData = {
      name: nameInput.value,
      artist: artistInput.value,
      duration: durationInput.value,
      youtubeLink: youtubeLinkInput.value,
      playCount: 0
    }

    const savedSong = await createSong(songData)
    
    renderSong(savedSong);
    event.target.reset();
  })
  artistNameSelect.addEventListener('change', async (e) => {
    const artist = e.target.value
    // get all songs by the artist and load them into the sidebar
    const artistSongs = await getSongs(artist)
      
    loadSongsIntoSidebar(artistSongs)
    displayTotalDuration(artistSongs);
   
  })
  // Add Submit Handler for new Comment Form
  // pull data out of form and pass to createComment
  // after promise resolves, pass response to renderComment and reset the form
  newCommentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentData = {
      songId: event.target.dataset.songId,
      comment: event.target.commentInput.value,
    }
    const savedComment = await createComment(commentData)
      
    renderComment(savedComment)
    event.target.reset();
  })


  editSongForm.addEventListener('input', (e) => {
    triggerSongAutoSave()
  })
  editSongForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  songDeleteButton.addEventListener('click', async (e) => {
    await deleteSong(currentSongId)

    playlistElement.querySelector(`[data-id="${currentSongId}"]`).remove()
    const songs = await getSongs();
    loadSongsIntoSidebar(songs);
    loadArtistChoices(songs)
    displayTotalDuration(songs);
  })

  // debouncing:
  // - store the timeoutID for a queued song autosave
  // - clear the previous timeout for a queued song autosave
  // - queue up another autosave to happen after 300 milliseconds
  // without a change to any of the form inputs
  let queuedSongAutoSave;
  const triggerSongAutoSave = () => {
    window.clearTimeout(queuedSongAutoSave);
    queuedSongAutoSave = window.setTimeout(async () => {
      // pull data out of form into songData
      // pass to updateSong()
      // so we need the songId (currentSongId) and songData
      const songData = {
        name: document.getElementById('song-name').value,
        artist: document.getElementById('artist').value,
        playCount: parseInt(document.getElementById('play-count').value, 10)
      };
      const updatedSong = await updateSong(currentSongId, songData)
      renderSong(updatedSong);
    }, 300)
  }

  
}


document.addEventListener('DOMContentLoaded', init)

// Data

// accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided)
// const getSongs = (artist = "") => {
//   const url = artist ? `http://localhost:3000/songs?artist=${artist}` : 'http://localhost:3000/songs'
//   return fetch(url)
//     .then(response => response.json())
// }

const getSongs = async (artist = "") => {
  const url = artist ? `http://localhost:3000/songs?artist=${artist}` : 'http://localhost:3000/songs'
  const response = await fetch(url)
  return response.json()
}


// accept an object containing song data as an argument and post it to the database
const createSong = async (songData) => {
  const response = await fetch('http://localhost:3000/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
  return response.json()
}

// Add update and delete song functions
const updateSong = async (songId, songData) => {
  const response = await fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
  return response.json()
}

const deleteSong = async (songId) => {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'DELETE'
  })
}

// const searchArtists = (artist) => {
//   return fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURI(artist)}&fmt=json`)
//     .then(response => response.json())
//     .then(artistInfo => {
//       console.log('artistInfo', artistInfo)
//       const artistId = artistInfo.artists[0].id
//       return getInfoAboutArtist(artistId)
//     })
// }

const searchArtists = async (artist) => {
  const searchResultsResponse = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURI(artist)}&fmt=json`);
  // const artistInfo = await searchResultsResponse.json();
  // console.log('artistInfo', artistInfo)
  const { artists } = await searchResultsResponse.json();
  const artistId = artists[0].id;

  return getInfoAboutArtist(artistId);
}

// const getInfoAboutArtist = (artistId) => {
//   return fetch(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
//     .then(response => response.json())
//     .then(data => {
//       console.log('artistData', data)
//       return data.releases.map(r => `${r.title} (${r.date})`)
//     })
// }

const getInfoAboutArtist = async (artistId) => {
  const response = await fetch(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
  const data = await response.json();
    
  // console.log('artistData', data)
  return data.releases.map(r => `${r.title} (${r.date})`)    
}
 


const getComments = async (song) => {
  const response = await fetch(`http://localhost:3000/comments?songId=${song.id}`);
  return response.json();
}
// add in createComment
const createComment = async (commentData) => {
  const response = await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  });
  return response.json();
}

// 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
// add in updateComment(commentId, commentData) and
// deleteComment(commentId)
const updateComment = async (commentId, commentData) => {
  const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })  
  return response.json();
}

const deleteComment = (commentId) => {
  return fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'DELETE'
  })  
}

// Display

const renderSong = (song) => {
  const existingLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  const li = existingLi || document.createElement('li');
  li.dataset.id = song.id;
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  li.addEventListener('click', (e) => {
    loadSongIntoPlayer(song);
  })
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = song.duration;
  if (!existingLi) {
    playlistElement.append(li);
  }
  return li;
}

const loadSongsIntoSidebar = (songs) => {
  playlistElement.innerHTML = "";
  songs.forEach(renderSong)
  loadSongIntoPlayer(songs[0])
}

const displayTotalDuration = (songs) => {
  playlistDurationElement.textContent = calculateDuration(songs);
}

const removeSongFromPlaylist = (songId) => {
  document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
  return songToRemove;
}

const loadSongIntoPlayer = (song) => {
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  const selectedLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  selectedLi.classList.add('bg-gray-100')
  songNameElement.value = song.name;
  artistNameElement.value = song.artist;
  playCountElement.value = song.playCount;
  playerElement.src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  searchArtists(song.artist)
    .then(populateReleases)
  
  // store the id of currently loaded song in 
  // currentSongId, so that we'll be able to 
  // use it within any PATCH or DELETE requests
  // as both of those require the id of the 
  // record being updated or removed.
  // This will also be used when creating a new
  // comment associated with the song that is 
  // loaded into the player.
  
  currentSongId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  commentsListElement.innerHTML = "";
  getComments(song)
    .then(renderComments)
    // .then(comments => renderComments(comments))
}

const loadArtistChoices = (playlist) => {
  artistNameSelect.innerHTML = `<option value="">Filter by artist</option>`;
  const artists = playlist.reduce((artistsArray, song) => {
    if (artistsArray.indexOf(song.artist) === -1) {
      artistsArray.push(song.artist);
    }
    return artistsArray
  }, []);
  artists.forEach(artist => {
    const option = document.createElement('option');
    option.value = artist;
    option.textContent = artist;
    artistNameSelect.append(option);
  });
}

const populateReleases = (releases) => {
  artistReleases.innerHTML = "";
  const list = releases.forEach(release => {
    const li = document.createElement('li');
    li.textContent = release;
    artistReleases.append(li)
  })
}

// define a function renderComment for 
// rendering a single comment from a 
// peristed record passed as an argument
const renderComment = (record) => {
  // console.log(record);
  const { id, comment } = record;
  const p = document.createElement('p');
  p.className = "flex justify-between";
  p.innerHTML = `
  <input class="w-5/6" />
  <button><i class="fas fa-trash-alt"></i></button>
  `
  const input = p.querySelector('input');
  const deleteBtn = p.querySelector('button');
  input.value = comment;
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // add event listeners for updating or deleting a comment
  input.addEventListener('input', (e) => {
    updateComment(id, {comment: e.target.value})
  })
  deleteBtn.addEventListener('click', (e) => {
    deleteComment(id)
      .then(() => p.remove())
  })
  commentsListElement.append(p);
}

// define a function renderComments for
// clearing out the comments and fill in the
// div with the retrieved comments from the API
// passing them to renderComment 
const renderComments = (comments) => {
  commentsListElement.innerHTML = "";
  comments.forEach(renderComment)
}

// helper functions
const formatDuration = (duration) => {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

const formattedDurationToSeconds = (formattedDuration) => {
  const [seconds, minutes, hours] = formattedDuration.split(':').map(num => parseInt(num)).reverse();
  return seconds + (minutes ? minutes * 60 : 0) + (hours ? hours * 3600 : 0);
}

const extractVideoID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

const calculateDuration = (songs) => {
  const totalDuration = songs.reduce((total, song) => {
    return total + formattedDurationToSeconds(song.duration)
  }, 0)
  return formatDuration(totalDuration)
}