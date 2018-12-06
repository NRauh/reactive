// need to make more functional
// use combine streams maybe?
import { fromEvent, BehaviorSubject, Subject, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

const ProcessStatus = {
  Running: 'Running',
  Complete: 'Complete',
};

const processes = new BehaviorSubject([]);

const addProcess = (process) => {
  const newList = processes.value.concat(process);
  processes.next(newList);
};

const removeProcess = (processId) => {
  console.log('hi', processes.value);
  const newList = processes.value.filter(process => process.id !== processId);
  processes.next(newList);
};


const startButton = document.querySelector('#start-button');

fromEvent(startButton, 'click')
  .subscribe(() => {
    console.log('clicked');
    const process = {
      id: Date.now(),
      status: ProcessStatus.Running,
    };

    addProcess(process);
    blackBoxProcess(process.id).subscribe(() => {
      processes.next(processes.value);
    });
  });


const Process = ({ id, status }) => {
  const processElem = document.createElement('div');
  processElem.classList.add('process');

  processElem.innerHTML = `<h2>Process: ${id} <small>(${status})</small></h2>`;

  console.log('on', status);
  if (status === ProcessStatus.Complete) {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove'

    fromEvent(removeButton, 'click').subscribe(() => {
      removeProcess(id);
    });

    processElem.appendChild(removeButton);
  }

  return processElem;
};

processes.subscribe((newProcessList) => {
  const processList = document.querySelector('.process-list');

  processList.innerHTML = '';

  newProcessList.forEach((process) => {
  //   console.log('hi', process);
    processList.appendChild(Process(process));
  });
});

function blackBoxProcess(id) {
  return of([1]).pipe(
    tap(() => console.log('started process:', id)),
    delay(500),
    tap(() => console.log('finished process:', id)),
  );
}
