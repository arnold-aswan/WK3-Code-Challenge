
document.addEventListener("DOMContentLoaded", ()=> {
    initialize()
   
    // Buy Tickets & SOld OUT Function
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".btn-buy")
        if(target) {
            const buy = 1
            const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
            const ticketsCount = e.target.parentElement.previousElementSibling.firstElementChild.textContent
            // console.log(ticketsCount);
            let tickets = parseInt(ticketsCount)
            tickets = tickets - buy
            const ticket = e.target.parentElement.previousElementSibling.firstElementChild
            // console.log(ticket);
            ticket.textContent = tickets
            if(ticket.textContent <= 0) {
                ticket.textContent = 0
                const soldOutFilm = e.target.parentElement.parentElement.parentElement.parentElement
                // console.log(soldOutFilm);
                soldOutFilm.classList.add('sold-out')
                target.textContent = 'SOLD OUT'
            }
        }       
    })

    // Delete Film
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".btn-delete")
        const id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        if(target) {
            deleteFilm(id)
            initialize()
        }
    })

    // Replace film on the right side
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".poster")
        const id = e.target.parentElement.parentElement.dataset.id
        if(target) {
            getSelectedFilm(id)
        } 
    })
})

// Fetch All Fims
const getFilms = ()=> {
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => renderFilms(data))
}

// Render all FIlms
const renderFilms = (films)=> {
    films.forEach(film => {
        const films = document.querySelector('.film-list')
        const li = document.createElement("li")
        li.dataset.id = film.id
        li.className = 'film'

        li.innerHTML = `
        <article class="film-card">
            <div class="poster">
                <img src="${film.poster}" alt="">
            </div>
            <div class="film-body">
                <h3 class="filmTitle">${film.title}</h3>
                 <p class="film-description"></p>
                 <p class="film-runtime">RUNTIME: ${film.runtime}</p>
                 <p class="film-showtime">SHOWTIME: ${film.showtime}</p>
            </div>
            <div class="film-footer">
                <p class="tickets">Available Tickets: <span>${film.capacity - film.tickets_sold}</span></p>
                <div class="buttons">
                    <button class="btn btn-buy">BUY TICKET</button>
                    <button class="btn btn-delete">DELETE</button>
                </div>    
            </div>    
        </article>
        `
        films.append(li)
    });
}

// Get selected Film
const getSelectedFilm = (id =1)=> {
    fetch(`http://localhost:3000/films/${id}`)
    .then(res => res.json())
    .then(data => renderSelectedFilm(data)) //=> one object
}

// Render selected film on the right 
const renderSelectedFilm = (films)=> {
    // console.log(films);
    const aside = document.querySelector(".selected")

    aside.innerHTML = `
    <article class="film1-card">
            <div class="poster">
                <img src="${films.poster}" alt="">
            </div>
            <div class="film-body">
                <h3 class="filmTitle">${films.title}</h3>
                 <p class="film-description">${films.description}</p>
                 <p class="film-runtime">RUNTIME: ${films.runtime}</p>
                 <p class="film-showtime">SHOWTIME: ${films.showtime}</p>
            </div>   
        </article>
    `
}

// Delete request 
const deleteFilm = (id)=> {
    fetch(`http://localhost:3000/films/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(res => res.json())
    .then(data => data)
}

const initialize = ()=> {
    getFilms()
    getSelectedFilm()
}
