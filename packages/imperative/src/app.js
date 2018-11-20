const startButton = document.querySelector('#start-button');

const ProcessState = {
  Running: 'Running',
  Complete: 'Complete',
};
let processes = [];

const Process = ({ id, status }) => {
  const processElem = document.createElement('div');
  processElem.classList.add('process');

  processElem.innerHTML = `<h2>Process: ${id} <small>(${status})</small></h2>`;

  if (status === ProcessState.Complete) {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove'

    removeButton.addEventListener('click', () => {
      processes = processes.filter(process => process.id !== id);
      renderProcessList();
    });

    processElem.appendChild(removeButton);
  }

  return processElem;
};

const renderProcessList = () => {
  const processList = document.querySelector('.process-list');

  processList.innerHTML = '';

  processes.forEach((process) => {
    processList.appendChild(Process(process));
  });
};

startButton.addEventListener('click', () => {
  const process = {
    id: Date.now(),
    status: ProcessState.Running,
  };
  processes.push(process);

  renderProcessList();

  blackBoxProcess(process.id).then(() => {
    process.status = ProcessState.Complete;
    renderProcessList();
  });
});

function blackBoxProcess(id) {
  return new Promise(resolve => {
    console.log('process started:', id);

    setTimeout(() => {
      console.log('process finished:', id);
      resolve();
    }, 2000);
  });
}
