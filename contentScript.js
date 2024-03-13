let shiftKeyPressed = false;
let ctrlKeyPressed = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        shiftKeyPressed = true;
    } else if (event.key === 'Control') {
        ctrlKeyPressed = true;
    }
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
        event.preventDefault();

        const downloadUrl = event.target.href;
	chrome.storage.local.get(['downloadFolder'], (result) => {
	  if (result.downloadFolder) {
	      chrome.runtime.sendMessage({downloadUrl});
            } else {
                alert("Custom download destination is not set. Please set it in the extension's options.");
            }
        });
      
    }
});

