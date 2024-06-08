import { interval, filter, take, EMPTY, NEVER, throwError } from "rxjs";

const btnStart = document.getElementById("btnStart");
const result = document.getElementById("result");
const error = throwError({ error: "Someting unexpected" });

const empty$ = EMPTY;
const never$ = NEVER;

const data$ = interval(1000).pipe(take(2));

btnStart.addEventListener("click", () => {
  data$.forEach((x) => console.log(x));
});

/*

// The oberserver way
const observer = {
  next: () => {
    console.log("value emitted");
  },
  error: () => {
    console.log("Encountered Error");
  },
  complete: () => {
    console.log("Stream Terminated");
  },
};


  // const stream$ = interval(1000).pipe(
  //   // take(3),
  //   filter((e) => e % 2 === 0)
  // );

  // const observer = {
  //   next: function (e) {
  //     result.textContent = e;
  //   },
  // };

  // const subscription = empty$.subscribe(observer);

  // setTimeout(() => subscription.unsubscribe(), 5000);























*/
