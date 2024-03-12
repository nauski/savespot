let shiftKeyPressed = false;
let ctrlKeyPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        shiftKeyPressed = true;
    } else if (event.key === 'Control') {
        ctrlKeyPressed = true;
    }
  console.log("testing");
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        shiftKeyPressed = false;
    } else if (event.key === 'Control') {
        ctrlKeyPressed = false;
    }
});

document.addEventListener('click', (event) => {
    if (shiftKeyPressed && ctrlKeyPressed && event.target.tagName === 'A') {
        console.log(`Activating custom download for: ${event.target.href}`);
        event.preventDefault();

        const downloadUrl = event.target.href;
        chrome.runtime.sendMessage({downloadUrl});
    }
});

