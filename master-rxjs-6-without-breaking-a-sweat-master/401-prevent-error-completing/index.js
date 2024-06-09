import {
  fromEvent,
  throwError,
  of,
  mergeMap,
  tap,
  catchError,
  map,
} from "rxjs";

const btnStart = document.getElementById("btnStart");
const btnClear = document.getElementById("btnClear");
const result = document.getElementById("result");

fromEvent(btnStart, "click")
  .pipe(
    mergeMap(() =>
      throwError(() => new Error("Something bad happened")).pipe(
        catchError(() => of("Catching Error"))
      )
    ),
    tap({ next: console.log, error: console.warn })
  )
  .subscribe({
    next: (item) => (result.textContent = item),
    error: (error) => (result.textContent = `Error: ${error.message}`),
    complete: () => {
      console.log("Complete");
      result.textContent = "Complete";
    },
  });

fromEvent(btnClear, "click").subscribe(() => (result.textContent = ""));

// .pipe(
//   catchError((err) => of("The catchError operator"))
// )

// const apiCall$ = throwError(() => new Error("API request failed"));

// apiCall$
//   .pipe(
//     map((data) => {
//       // This map function won't be executed because the observable errors
//       return data;
//     }),
//     catchError((error) => {
//       // Handle the error and return a fallback value
//       console.error("Caught error:", error);
//       return of("Fallback value");
//     })
//   )
//   .subscribe({
//     next: (value) => console.log("Received value:", value),
//     error: (err) => console.log("Error:", err),
//     complete: () => console.log("Complete"),
//   });
