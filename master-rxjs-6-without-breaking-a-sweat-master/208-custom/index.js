import { interval, Observable, map, switchMap, of, mergeMap } from "rxjs";

const btnStart = document.getElementById("btnStart");
const result = document.getElementById("result");

//Solution 3:
function time(ms) {
  // Create an observable using Observable.create (or new Observable)
  return new Observable((subscriber) => {
    // subscriber.next('Hello')
    const handle = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
      subscriber.next(new Date().toLocaleTimeString());
    }, ms);

    // Cleanup logic when the observable is unsubscribed
    return () => clearInterval(handle);
  });
}

btnStart.addEventListener("click", () => {
  const subscription = time(1000).subscribe((time) => {
    result.textContent = time;
  });

  setTimeout(() => subscription.unsubscribe(), 5000);
});

// Solution 2
// function time(ms) {
//   return interval(ms).pipe(map(() => new Date().toLocaleTimeString()));
// }

// time(1000).subscribe((res) => {
//   console.log(res);
//   result.textContent = res;
// });

// Solution 1

// interval(1000)
//   .pipe(
//     switchMap(() => {
//       return of(new Date().toLocaleTimeString());
//     })
//   )
//   .subscribe((res) => {
//     console.log(res);
//     result.textContent = res;
//   });
