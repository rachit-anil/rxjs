import {
  fromEvent,
  from,
  of,
  filter,
  map,
  tap,
  scan,
  switchMap,
  delay,
} from "rxjs";

const btnClear = document.getElementById("btnClear");
const btnAjax = document.getElementById("btnAjax");
const btnInterval = document.getElementById("btnInterval");
const btnArray = document.getElementById("btnArray");

const result = document.getElementById("result");

btnClear.addEventListener("click", function () {
  result.textContent = "";
});

const url = "http://localhost:8080/getJokes";

// fromEvent(btnAjax,'click')
// .pipe(ajax.getJSON);

btnAjax.addEventListener("click", () => {
  fetch(url)
    .then((rsp) => rsp.json())
    .then((data) => ({ x: data.value.joke }))
    .then((obj) => {
      if (obj) {
        result.textContent = JSON.stringify(obj);
      }
    });
});

btnInterval.addEventListener("click", () => {
  let number = 0;
  let numbers = [];
  const handle = setInterval(() => {
    if (number < 7) {
      const obj = { x: number };
      numbers.push(obj);
      number++;
    } else {
      clearInterval(handle);
    }
    result.textContent = JSON.stringify(numbers);
  }, 1000);
});

// fromEvent(btnArray, "click")
//   .pipe(
//     map((n) => {
//       return { x: n };
//     }),
//     filter((x) => x < 7)
//   )
//   .subscribe((res) => {
//     result.textContent = JSON.stringify(res);
//   });

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//Observable stream is not cancelled when multiple clicks are pressed.
// btnArray.addEventListener("click", function () {
//   result.textContent = "initial value";
//   console.log("here");
//   from(numbers)
//     .pipe(
//       delay(1000),
//       map((n) => {
//         return { x: n };
//       }),
//       filter((obj) => obj.x < 7),
//       scan((prev, cur) => prev.concat(cur), [])
//     )
//     .subscribe((res) => {
//       console.log(res);
//       result.textContent = JSON.stringify(res);
//     });
// });

//Observables are cancelled when multiple clicks are pressed.
fromEvent(btnArray, "click")
  .pipe(
    switchMap(() =>
      from(numbers).pipe(
        delay(1000),
        map((n) => ({ x: n })),
        filter((obj) => obj.x < 7),
        scan((prev, cur) => prev.concat(cur), [])
      )
    )
  )
  .subscribe((data) => {
    console.log(data);
    result.textContent = JSON.stringify(data);
  });
