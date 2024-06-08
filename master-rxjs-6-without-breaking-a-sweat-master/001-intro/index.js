import { fromEvent, mergeMap, map, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btnAjax = document.getElementById('btnAjax');
const result = document.getElementById('result');

const url ='http://localhost:8080/getJokes';

ajax({ url, crossDomain: true }).subscribe(x=>console.log(x))

fromEvent(btnAjax, 'click')
  .pipe(
    tap(() => (result.innerHTML = '')),
    switchMap(() =>
      
      ajax({ url, crossDomain: true }).pipe(
        map((e) => e.response),
        map((e) => e.value),
        mergeMap((e) => e)
      )
    )
  )
  .subscribe((data) => {
    console.log(data);
    const li = document.createElement('li');
    li.textContent = data.joke;
    result.appendChild(li);
  });

/*






















*/

// if (module.hot) {
//   module.hot.dispose(function () {
//     location.reload();
//   });
// }
