// why is const a good choice for declaring an array type variable?
const playlist = [
  {
    id: 1,
    name: 'Sweet Dreams',
    artist: 'The Eurythmics',
    duration: 216,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=qeMFqkcPYcg'
  },
  {
    id: 2,
    name: 'Cry Me a River',
    artist: 'Justin Timberlake',
    duration: 290,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=DksSPZTZES0'
  },
  {
    id: 3,
    name: 'With a Little Help from my Friends',
    artist: 'Joe Cocker',
    duration: 289,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=a3LQ-FReO7Q'
  },
  {
    id: 4,
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 359,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 5,
    name: 'Somebody To Love',
    artist: 'Queen',
    duration: 309,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=kijpcUv-b8M'
  },
  {
    id: 6,
    name: 'Another One Bites the Dust',
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 7,
    name: 'Purple Rain',
    artist: 'Prince',
    duration: 477,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=TvnYmWpD_T8'
  }
]

// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

// create a copy of an object so we can see its state at a particular point in time.
const copy = (obj) => JSON.parse(JSON.stringify(obj));

function formatDuration(numSeconds) {
  const seconds = numSeconds % 60; // numSeconds - minutes * 60
  const minutes = Math.floor(numSeconds / 60) % 60;
  const hours = Math.floor(numSeconds / 3600);
  if (hours > 0) {
    return `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
  } else if (minutes > 0) {
    return `${minutes}:${zeroPad(seconds)}`
  } else {
    return `0:${zeroPad(seconds)}`
  }
}

function zeroPad(num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}

// ✅ Accessing Data in Arrays

// this function should return the first element
function retrieveFirst(playlist) {
  return playlist[0]
}

// // 👟👟👟 uncomment the lines below to test

// console.log('retrieveFirst', retrieveFirst(playlist))
// console.log('playlist after retrieveFirst', playlist)

function retrieveLast(playlist) {
  return playlist[playlist.length-1]
}

// console.log('retrieveLast', retrieveLast(playlist))
// console.log('playlist after retrieveLast', playlist)

// ✅ adding and removing values

function addSongToBeginningOfPlaylist(playlist, song) {
  playlist.unshift(song);
  // non-destructively: return [song, ...playlist]
  return playlist
}

// // 👟👟👟 uncomment the lines below to test

// console.log('addSongToBeginningOfPlaylist', addSongToBeginningOfPlaylist(playlist, {
//   name: "What'd I Say",
//   artist: 'Ray Charles',
//   duration: 255,
//   playCount: 0,
//   youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
// })) 
// console.log('playlist after addSongToBeginningOfPlaylist', playlist)

// 🚧 🚧 🚧 make sure to add an id to the song being added to the array!
// later on this will be handled for us by our database, but for the next few days
// it will be important that our songs have an id so we can interact with them
// in the browser
function addSongToEndOfPlaylist(playlist, song) {
  playlist.push(song);
  return playlist
  // non-destructively: [...playlist, song] || 
  // const newArray = playlist.slice()
  // newArray.push(song)
  // return newArray

  // or

  // return [...playlist, song]
}

// // 👟👟👟 uncomment the lines below to test

console.log('addSongToEndOfPlaylist', addSongToEndOfPlaylist(playlist, {
  name: "Georgia On My Mind",
  artist: 'Ray Charles',
  duration: 217,
  playCount: 0,
  youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
})) 
console.log('playlist after addSongToEndOfPlaylist', playlist)

function removeLastSongFromPlaylist(playlist) {
  return playlist.pop()
}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeLastSongFromPlaylist', removeLastSongFromPlaylist(playlist))
// console.log('playlist after removeLastSongFromPlaylist', playlist)

function removeFirstSongFromPlaylist(playlist) {
  return playlist.shift()
}

// // 👟👟👟 uncomment the lines below to test

// console.log('removeFirstSongFromPlaylist', removeFirstSongFromPlaylist(playlist))
// console.log('playlist after removeFirstSongFromPlaylist', playlist)

// ✅ Iteration

function getSongNames(playlist) {
  return playlist.map(song => song.name)
}

// // 👟👟👟 uncomment the lines below to test

// console.log('getSongNames', getSongNames(playlist)) 
// console.log('playlist after getSongNames', playlist)

// 🚧 🚧 🚧 use reduce to calculate the playlist duration!
function calculatePlaylistDuration(playlist) {

}

// // 👟👟👟 uncomment the lines below to test

// console.log('calculatePlaylistDuration',calculatePlaylistDuration(playlist))
// console.log('playlist after calculatePlaylistDuration', playlist)


function songsByArtist(playlist, artist) {
  return playlist.filter(song => artist === song.artist)
}

// // 👟👟👟 uncomment the lines below to test

// console.log('songsByArtist', songsByArtist(playlist, "Queen")) // uncomment this to test
// console.log('playlist after songsByArtist', playlist)

// what method of iteration should we use here?
function renameArtist(playlist, oldArtistName, newArtistName) {
  // destructive
  playlist.forEach(song => {
    if (song.artist === oldArtistName) {
      song.artist = newArtistName;
    }
  })
  return playlist
  // non - destructive
  // return playlist.map(song => {
  //   if (song.artist === oldArtistName) {
  //     return {
  //       ...song,
  //       artist: newArtistName
  //     }
  //   } else {
  //     return song;
  //   }
  // })
}

// // 👟👟👟 uncomment the lines below to test

// console.log('renameArtist', renameArtist(playlist, "Prince", "The Artist Formerly Known As Prince"))
// console.log('playlist after renameArtist', playlist)





