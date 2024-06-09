import {
  fromEvent,
  range,
  interval,
  take,
  scan,
  map,
  mergeMap,
  concatMap,
  switchMap,
  of,
  delay,
  from,
  timer,
  concat,
  reduce,
  tap,
  race,
  toArray,
} from "rxjs";
import { ajax } from "rxjs/ajax";

const btnStart = document.getElementById("btnStart");

//Making Sequentials calls (without cancellation) with switchMap
// Can not be done
//introduce delay wi

//
//
//
//
//
//
//
//all values emitted instantly after 1 second
// not exactly what I was looking for.
// of(1, 2, 3)
//   .pipe(delay(1000))
//   .subscribe((val) => console.log(val));
//
//
//
//
//
//
////
//
//
//
//
//
//
//introduce delay of 1 sec when subscribing from of/from observable
// of(1, 2, 3)
//   .pipe(concatMap((value) => of(value).pipe(delay(1000))))
//   .subscribe((val) => console.log(val));

//
//
//
//
//
//
//
//
//
//parallel calls
// userIds$.pipe().subscribe({
//   next: (user) => console.log(user),
//   error: (err) => console.error("Error: ", err),
//   complete: () => console.log("Complete"),
// });

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
// userIds$
//   .pipe(
//     concatMap((value) => timer(2000).pipe(concatMap(() => of(value)))),
//     switchMap((id) =>
//       ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`)
//     )
//   )
//   .subscribe({
//     next: (user) => console.log(user),
//     error: (err) => console.error("Error: ", err),
//     complete: () => console.log("Complete"),
//   });

//
//
//
//
//
// Only the latest id call passes through.
//Rest of them gets cancelled.
// const userIds$ = of(1, 2, 3);

// userIds$
//   .pipe(
//     switchMap((id) =>
//       ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`)
//     )
//   )
//   .subscribe({
//     next: (user) => console.log(user),
//     error: (err) => console.error("Error: ", err),
//     complete: () => console.log("Complete"),
//   });

//Original implementation
// function createSecondObservable(click) {
//   // return range(1, 5)
//   //   .pipe(map(i => `Click ${click} event ${i}`));

//   return interval(1000).pipe(
//     map((i) => `Click ${click} event ${i}`)
//     // take(5)
//   );
// }

// fromEvent(btnStart, "click")
//   .pipe(
//     scan((previous) => previous + 1, 0),
//     mergeMap((click) => createSecondObservable(click))
//     // concatMap(click => createSecondObservable(click)),
//     // switchMap((click) => createSecondObservable(click))
//   )
//   .subscribe({
//     next: console.log,
//     complete: () => console.log("complete"),
//   });

//
//
//
//
// Sequential Calls
// 1) https://jsonplaceholder.typicode.com/users/1
// 2) https://jsonplaceholder.typicode.com/posts/1

// const apis$ = from([
//   `https://jsonplaceholder.typicode.com/users/1`,
//   `https://jsonplaceholder.typicode.com/posts/1`,
// ]);

// apis$
//   .pipe(mergeMap((url) => ajax.getJSON(url)))
//   .subscribe((data) => console.log(data));
//
///
//
//
//
//
//
//
//

// Nested Calls // call posts only when users is successful
// const apis$ = from([
//   `https://jsonplaceholder.typicode.com/users/1`,
//   `https://jsonplaceholder.typicode.com/posts/1`,
// ]);

// apis$
//   .pipe(concatMap((url) => ajax.getJSON(url)))
//   .subscribe((data) => console.log(data));

// // Sequential, Nested Calls, consolidated results
// const ids = [1, 2, 3, 4, 5, 6];
// from(ids)
//   .pipe(
//     concatMap((id) =>
//       ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
//         switchMap((user) =>
//           ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
//             map((post) => {
//               return { user, post };
//             })
//           )
//         )
//       )
//     )
//   )
//   .subscribe((res) => console.log(res));

//
//
//
////
//
//
////
//
//
////
//

// Parallel users call, Subsequent post call , consolidated results
//order of calls will not matter here.

// const ids = [1, 2, 3, 4, 5, 6];
// from(ids)
//   .pipe(
//     mergeMap((id) =>
//       ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
//         switchMap((user) =>
//           ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
//             map((post) => {
//               return { user, post };
//             })
//           )
//         )
//       )
//     )
//   )
//   .subscribe((res) => console.log(res));

//
////
//
//
////
//
//
////
//
//Race Condition API call :
// So sometimes we will get user1 and sometimes user2
// const observable1 = ajax.getJSON(
//   `https://jsonplaceholder.typicode.com/users/1`
// );
// const observable2 = ajax.getJSON(
//   `https://jsonplaceholder.typicode.com/users/2`
// );

// race(observable1, observable2).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Complete"),
// });

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
//Polling

// interval(1000)
//   .pipe(
//     switchMap(() =>
//       ajax.getJSON(`https://jsonplaceholder.typicode.com/users/1`)
//     )
//   )
//   .subscribe((x) => console.log(x));

//
////
//
//
//
// Nested Calls with retries
// Array of API URLs

// Function to fetch user data
// Function to fetch user data
// const fetchUser = (userId) =>
//   ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${userId}`);

// // Function to fetch posts for a user
// const fetchPosts = (userId) =>
//   ajax.getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

// from([1, 2, 3])
//   .pipe(
//     concatMap((userId) =>
//       fetchUser(userId).pipe(
//         switchMap((user) =>
//           fetchPosts(user.id).pipe(map((posts) => ({ user, posts })))
//         )
//       )
//     )
//   )
//   .subscribe({
//     next: (result) => console.log(result),
//     error: (err) => console.error("Error: ", err),
//     complete: () => console.log("Complete"),
//   });

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
// Concurrency Limit

const ids = [1, 2, 3, 4, 5, 6];
from(ids)
  .pipe(
    mergeMap(
      (id) =>
        ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
          switchMap((user) =>
            ajax
              .getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
              .pipe(
                map((post) => {
                  return { user, post };
                })
              )
          )
        ),
      2
    )
  )
  .subscribe((res) => console.log(res));
