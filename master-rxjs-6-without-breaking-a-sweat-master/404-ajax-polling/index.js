import { EMPTY, timer, map, catchError, mergeMap, switchMap, tap } from "rxjs";
import { ajax } from "rxjs/ajax";

const url = "http://localhost:8080/getJokes";

const result = document.getElementById("result");

const joke$ = timer(0, 1000).pipe(
  mergeMap(() => ajax.getJSON(url).pipe(catchError(() => EMPTY)))
);

// ajax({ url }).pipe(map((x) => x.response));

joke$.subscribe((joke) => {
  console.log(joke);
  const li = document.createElement("li");
  li.textContent = joke.value.joke;
  result.appendChild(li);
});
