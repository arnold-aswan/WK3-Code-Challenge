
document.addEventListener("DOMContentLoaded", ()=> {
    getFilms()
})

const getFilms = ()=> {
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => renderFilms(data))
}

const renderFilms = (films)=> {
    films.forEach(film => {
        const films = document.querySelector('.film-list')
        const li = document.createElement("li")
        li.dataset.id = film.id
        li.classList.add = 'film'

        li.innerHTML = `
        <article class="film-card">
             <div class="poster">
                <img src="${film.poster}" alt="">
            </div>
            <div class="film-body">
                <h3 class="filmTitle">${film.title}</h3>
                 <p class="film-description">${film.description}</p>
                 <p class="film-runtime">RUNTIME: ${film.runtime}</p>
                 <p class="film-showtime">SHOWTIME: ${film.showtime}</p>
            </div>
            <div class="film-footer">
                <p class="tickets">Available Tickets: ${film.capacity - film.tickets_sold}</p>
                <button class="btn btn-buy">Buy Ticket</button>
            </div>    
        </article>
        `
        films.append(li)
    });
}

