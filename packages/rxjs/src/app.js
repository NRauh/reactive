import { fromEvent, BehaviorSubject, Subject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const ProcessStatus = {
  Running: 'Running',
  Complete: 'Complete',
};

const processes = new Subject();
// const processes = new BehaviorSubject([]);

// const addProcess = (process) => {
//   const newList = processes.value.concat(process);
//   processes.next(newList);
// };

const startButton = document.querySelector('#start-button');

fromEvent(startButton, 'click')
  .subscribe(() => {
    console.log('clicked');
    const process = {
      id: Date.now(),
      status: ProcessStatus.Running,
    };

    // processes.next(process);
    blackBoxProcess(process.id).subscribe(() => {});
  });

processes.subscribe((newProcess) => {
  console.log('need to render')
});

function blackBoxProcess(id) {
  return of([1, 2, 3]).pipe(
    tap(() => console.log('started process:', id)),
    delay(500),
    tap(() => console.log('finished process:', id)),
  );
}
