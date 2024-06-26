import {
  fromEvent,
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  from,
  take,
} from "rxjs";
import { ajax } from "rxjs/ajax";

const searchInput = document.getElementById("search");
const result = document.getElementById("result");

fromEvent(searchInput, "input")
  .pipe(
    map((e) => e.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => (result.innerHTML = "")),
    filter((user) => !!user),
    switchMap((user) =>
      ajax
        .getJSON(`https://api.github.com/search/users?q=${user}`)
        .pipe(catchError((err) => EMPTY))
    ),
    tap((x) => console.log(x)),
    map((rsp) => rsp.items),
    mergeMap((users) => users)
  )
  .subscribe((user) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap" crossOrigin="anonymous">
        <div class="card-body">
          <h5 class="card-title">${user.login}</h5>
          <a href="${user.html_url}" class="btn btn-primary">GitHub profile</a>
        </div>
      </div>`;
    result.appendChild(div);
  });

of([1, 2, 3, 4, 5])
  .pipe(mergeMap((x) => x))
  .subscribe((x) => console.log(x));

//
//

//
//

//
//

//
//

//
//

//
//

//
//

//
//
// My implementation
// const searchInput = document.getElementById("search");
// const result = document.getElementById("result");

// fromEvent(searchInput, "input")
//   .pipe(
//     map((e) => e.target.value),
//     debounceTime(1000),
//     distinctUntilChanged(),
//     filter((user) => !!user),
//     switchMap((user) =>
//       ajax
//         .getJSON(`https://api.github.com/search/users?q=${user}`)
//         .pipe(map((data) => data.items.map((item) => item.avatar_url)))
//     ),
//     switchMap((data) => data)
//   )
//   .subscribe((avatarUrl) => {
//     const div = document.createElement("div");
//     div.innerHTML = `
//     <div class="card" style="width: 18rem;">
//       <img class="card-img-top" src="${avatarUrl}" alt="Card image cap" crossOrigin="anonymous">
//     </div>`;
//     result.appendChild(div);
//   });
