let shiftKeyPressed = false;
let ctrlKeyPressed = false;

function extractTicketNumber(subject) {
    const match = subject.match(/OXTN#(\d+)/);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}
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

        const ticketIdElement = document.querySelector('h1').textContent;
        const ticketId = ticketIdElement ? ticketIdElement.textContent.trim() : '';
        
        const strippedId = extractTicketNumber(ticketId);

    chrome.storage.local.get(['downloadFolder'], (result) => {
      if (result.downloadFolder) {
	      chrome.runtime.sendMessage({downloadUrl, strippedId});
            } else {
                alert("Custom download destination is not set. Please set it in the extension's options.");
            }
        });
      
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTicketId") {
    const ticketIdElement = document.querySelector('your_ticket_id_element_selector');
    const ticketId = ticketIdElement ? ticketIdElement.textContent.trim() : '';
    sendResponse({ ticketId });
  }
});
