
document.addEventListener("DOMContentLoaded", ()=> {
    initialize()
   
    document.addEventListener("click", (e) => {
        const target = e.target.closest(".btn")
        if(target) {
            const buy = 1
            const id = e.target.parentElement.parentElement.parentElement.dataset.id
            const ticketsCount = e.target.previousElementSibling.firstElementChild.textContent
            let tickets = parseInt(ticketsCount)
            tickets = tickets - buy
            const ticket = e.target.previousElementSibling.firstElementChild
            ticket.textContent = tickets
            if(ticket.textContent <= 0) {
                ticket.textContent = 0
                const btn = e.target
                btn.textContent = 'SOLD OUT'
            }
        }       
    })

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
                <p class="tickets">Available Tickets: <span>${film.capacity - film.tickets_sold}</span></p>
                <button class="btn btn-buy">
                BUY TICKET</button>
            </div>    
        </article>
        `
        films.append(li)
    });
}

const initialize = () => {
    getFilms()
}
