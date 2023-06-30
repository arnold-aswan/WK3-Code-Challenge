1. see first movies details :
  get request:
    - poster
    - title
    - runtime
    - showtime
    - available tickets {derived by subtracting no of tickets sold from capacity}

2. menu of all movies on left side of page    

<article>
   <div.poster>
    img <poster>
  </div> 
  <div.film-body>
    <h3>{film.title}</h3>
    <p>{film.description}</p>
    <p>{film.runtime}</p>
    <p>{film.showtime}</p>
  </div> 
  <div.film-footer>
    <p>available tickets:</p>
  </div>
</article>  