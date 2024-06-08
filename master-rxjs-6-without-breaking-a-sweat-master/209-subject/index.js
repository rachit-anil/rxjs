import { Subject, Subscription, BehaviorSubject, ReplaySubject } from "rxjs";

const btnStart = document.getElementById("btnStart");
const result = document.getElementById("result");

btnStart.addEventListener("click", () => {
  const subject = new ReplaySubject();

  subject.next("RxJS");
  subject.next("is");
  subject.next("cool!");
  subject.subscribe((e) => console.log(e));
});

// Replay Subject Example
// const subject = new ReplaySubject(2);

// subject.next("RxJS");
// subject.next("is");
// subject.next("cool!");
// subject.subscribe((e) => console.log(e));
