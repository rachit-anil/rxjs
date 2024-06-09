import {
  fromEvent,
  interval,
  switchMap,
  take,
  retry,
  retryWhen,
  delay,
  catchError,
  mergeMap,
  timer,
  throwError,
  of,
} from "rxjs";
import { ajax } from "rxjs/ajax";

const btnStart = document.getElementById("btnStart");
const result = document.getElementById("result");

// fromEvent(btnStart, "click")
//   .pipe(
//     switchMap(() =>
//       ajax.getJSON("http://localhost:8080/getJoke").pipe(
//         // retry(3)

//         retryWhen((err) => interval(2000).pipe(take(3)))
//       )
//     )
//   )
//   .subscribe({
//     next: (item) => (result.textContent = item.value.joke),
//     error: (error) => (result.textContent = `Error: ${error.message}`),
//     complete: () => (result.textContent = "Complete"),
//   });

// ajax
//   .getJSON("http://localhost:8080/getJokes")
//   .pipe(
//     retryWhen((errors) =>
//       errors.pipe(
//         switchMap((error, i) => {
//           console.log(i);
//           // if (i >= 5) {
//           //   return throwError(() => new Error("Retries exceeded"));
//           // }
//           const backoffTime = Math.pow(2, i) * 1000; // Exponential backoff
//           console.error(`Retrying in ${backoffTime / 1000} seconds...`);
//           return timer(backoffTime);
//         })
//       )
//     ),
//     catchError((error) => {
//       console.error("Final error:", error);
//       return of("Fallback value");
//     })
//   )
//   .subscribe({
//     next: (data) => (result.textContent = data.value.joke),
//     error: (error) => console.error("Error:", error),
//     complete: () => console.log("Complete"),
//   });

// ajax.getJSON('http://localhost:8080/getJoke').

// Exponential backoff
fromEvent(btnStart, "click")
  .pipe(
    switchMap(() => {
      return ajax.getJSON("http://localhost:8080/getJoke").pipe(
        retryWhen((error) => {
          return error.pipe(
            switchMap((error, i) => {
              if (i > 1) return throwError({ error: "Something went wrong" });
              const backoffTime = Math.pow(2, i) * 1000;
              console.error(`Retry in ${backoffTime / 1000} seconds`);
              return timer(backoffTime);
            })
          );
        })
      );
    }),
    catchError((error) =>
      of({ value: { joke: "API failed. Try to laugh on this joke !" } })
    )
  )
  .subscribe({
    next: (data) => (result.textContent = data.value.joke),
    error: (error) => console.error("Error:", error),
    complete: () => console.log("Complete"),
  });
