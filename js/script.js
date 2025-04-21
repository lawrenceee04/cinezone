const global = {
    currentPage: window.location.pathname,
};

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = 'e76d2381f0382657b3c2960253bbd771';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();
    return data;
}

// Display 20 most popular movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `

        <a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
                : `<img
            src="./images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>

      `;
        document.querySelector('#popular-movies').appendChild(div);
    });
}

//Display Movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);

    const div = document.createElement('div');

    div.innerHTML = `
            <div class="details-top">
          <div>

    ${
        movie.poster_path
            ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
            : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
    }

          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a
              href="${movie.homepage}"
              target="_blank"
              class="btn"
              >Visit Movie Homepage</a
            >
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $ ${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> $ ${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join(', ')}</div>
        </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
}

// Display 20 most popular tv shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `

        <a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
                : `<img
            src="./images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>

      `;
        document.querySelector('#popular-shows').appendChild(div);
    });
}

//Display Show Details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`tv/${showId}`);

    const div = document.createElement('div');

    div.innerHTML = `
            <div class="details-top">
          <div>

    ${
        show.poster_path
            ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.namae}"
  />`
            : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
    }

          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a
              href="${show.homepage}"
              target="_blank"
              class="btn"
              >Visit Show Homepage</a
            >
          </div>
        </div>
<div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.air_date}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => `${company.name}`).join(', ')}</div>
        </div>
    `;

    document.querySelector('#show-details').appendChild(div);
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        const hrefValue = link.getAttribute('href');

        //check for movie-details.html in pathname -> highlight Movies Link

        if (
            (global.currentPage.includes('index.html') || global.currentPage.includes('movie-details.html')) &&
            hrefValue.includes('index.html')
        ) {
            link.classList.add('active');
            return;
        }

        //check for tv-details.html in pathname to highlight TV Shows link

        if (
            (global.currentPage.includes('shows.html') || global.currentPage.includes('tv-details.html')) &&
            hrefValue.includes('shows.html')
        ) {
            link.classList.add('active');
            return;
        }

        if (global.currentPage.includes(hrefValue) && hrefValue !== '/') {
            link.classList.add('active');
        }
    });
}

// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            highlightActiveLink();
            break;
        case '/shows.html':
            displayPopularShows();
            highlightActiveLink();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            highlightActiveLink();
            break;
        case '/tv-details.html':
            displayShowDetails();
            highlightActiveLink();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
