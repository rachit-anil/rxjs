import { from } from "rxjs";

const btnStart = document.getElementById("btnStart");
const result = document.getElementById("result");
const liElements = document.querySelectorAll("li");

btnStart.addEventListener("click", () => {
  // from([1, 2, 3]).subscribe(e => console.log(e));

  console.log("start");

  from(liElements).subscribe((el) => {
    console.log(el);
    el.textContent = "using from()";
  });

  const p = new Promise((resolve) => setTimeout(() => resolve(42), 2000));

  from(p).subscribe((e) => {
    result.textContent = e;
    console.log(e);
  });
  console.log("end");
});
