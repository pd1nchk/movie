//Inint views
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); 


const movie_container = document.getElementById('movie-container');
const movie_poster = document.getElementById('movie_poster');
const movie_label = document.getElementById('movie_label');
const movie_description = document.getElementById('movie_description');


initViews();

let ticketPrice = +movieSelect.value;
let selectedIndex = -1;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  price = +movieSelect.value;
  total.innerText = selectedSeatsCount * price;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function removeDataFromLocalStarage() {
  localStorage.removeItem('selectedMovieIndex');
  localStorage.removeItem('selectedMoviePrice');
  localStorage.removeItem('selectedSeats')
}

function setTorData() {
  movie_poster.src = "img/tor_ragnarok.jpg";
  movie_label.innerHTML = 'Tor raganrok';
  movie_description.innerHTML = 'Thor: Ragnarok is a 2017 superhero film, based on the Marvel Comics superhero of the\nsame name. The film is a sequel to Thor, Thor: The Dark World, Avengers: Age of Ultron, and Doctor\nStrange. It is the seventeenth film in the Marvel Cinematic Universe, and the fifth installment of\nPhase Three. The film was released on October 24, 2017 internationally and on November 3, 2017 in\n the United States.\nThe film is directed by Taika Waititi and stars Chris Hemsworth as Thor, Tom Hiddleston as Loki,\nCate Blanchett as Hela, Idris Elba as Heimdall, Jeff Goldblum as the Grandmaster, Tessa Thompson as\nValkyrie, Karl Urban as Skurge, with Mark Ruffalo as Bruce Banner/Hulk, and Anthony Hopkins as Odin.';
}

function setSpiderManData() {
  movie_poster.src = "img/spined_man_poset.jpeg";
  movie_label.innerHTML = 'Spider-Man: No way home';
  movie_description.innerHTML = 'Spider-Man: No Way Home is a 2021 superhero film, based on the Marvel Comics superhero\nof the same name. The film is a sequel to Spider-Man: Homecoming and Spider-Man: Far From Home, as\nwell as a crossover/sequel to the Spider-Man trilogy and The Amazing Spider-Man duology. It is the\ntwenty-seventh film in the Marvel Cinematic Universe, and the ninth installment of Phase Four. The\nfilm was released on December 17, 2021.\nThe film is directed by Jon Watts and stars Tom Holland as Peter Parker/Spider-Man, Zendaya as\nMichelle Jones, Benedict Cumberbatch as Stephen Strange/Doctor Strange, Jacob Batalon as Ned Leeds,\nJon Favreau as Happy Hogan, Jamie Foxx as Max Dillon/Electro, Willem Dafoe as Norman Osborn/Green\nGoblin, Alfred Molina as Otto Octavius/Doctor Octopus, Benedict Wong as Wong, Tony Revolori as Flash\nThompson, Marisa Tomei as May Parker, Andrew Garfield as Peter Parker/Spider-Man, and Tobey Maguire\nas Peter Parker/Spider-Man.';
}

function setVenomData() {
  movie_poster.src = "img/venon_poster.jpg";
  movie_label.innerHTML = 'Venom';
  movie_description.innerHTML = 'Venom, also known as the Lethal Protector, is an extraterrestrial symbiote that is\nbonded to a human named Eddie Brock. After being transported from its universe to another as a\nresult of a spell cast by Doctor Strange, it learned about the Avengers, Spider-Man and Thanos\nbefore it, along with Brock, were returned back to their universe.';
}




function initViews() {
  const movie_type = sessionStorage.getItem('FILM_TYPE');
  const is_drop_down = sessionStorage.getItem('FROM_DROM_DOWN');
  removeDataFromLocalStarage();
  switch (movie_type) {
    case "1":
      setTorData();
      if (is_drop_down == "0")
        document.getElementById('movie').style.visibility = 'hidden';
      break;

    case "2":
      setSpiderManData();
      if (is_drop_down == "0")
        document.getElementById('movie').style.visibility = 'hidden';
      break;


    case "3":
      setVenomData();
      if (is_drop_down == "0")
        document.getElementById('movie').style.visibility = 'hidden';
      break;

    case "4":
      if (movieSelect == undefined || movieSelect.index == undefined) {
        movieSelect.selectedIndex = 0;
        setTorData()
      }
      document.getElementById('movie').style.visibility = 'visible';
      break;

  }
  populateUI();
}




// Get data from localstorage and populate UI
function populateUI() {
  const movie_type = sessionStorage.getItem('FILM_TYPE');

  if (movie_type == "4") {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  } else {
    let index = '0';
    if (movie_type == "1") {
      price = 9;
      index = '0';
    }

    if (movie_type == "2") {
      price = 12;
      index = '1';
    }

    if (movie_type == "3") {
      price = 13;
      index = '2';
    }
    movieSelect.selectedIndex = index;
    updateSelectedCount();

  }
}





// Movie select event
movieSelect.addEventListener('change', e => {
  if (selectedIndex != -1 && selectedIndex != e.target.selectedIndex)
    removeDataFromLocalStarage();
    
  if (e.target.selectedIndex == '0')
    sessionStorage.setItem('FILM_TYPE', '1');

  if (e.target.selectedIndex == '1')
    sessionStorage.setItem('FILM_TYPE', '2');

  if (e.target.selectedIndex == '2')
    sessionStorage.setItem('FILM_TYPE', '3');

  selectedIndex = e.target.selectedIndex;
  sessionStorage.setItem('FROM_DROM_DOWN', '1');
  initViews();
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

