
const saveButton = document.getElementById('save');

    chrome.storage.local.get(['downloadFolder'], (result) => {
      if (result.downloadFolder) {
	  currentFolder.value = result.downloadFolder;
      }
  });
    saveButton.addEventListener('click', () => {
    const downloadFolder = document.getElementById('downloadFolder').value;
    const saveButton = document.getElementById('save');

  try {
    chrome.storage.local.set({downloadFolder}, () => {
    saveButton.style.borderColor = 'green';
    chrome.storage.local.get(['downloadFolder'], (result) => {
      if (result.downloadFolder) {
	  currentFolder.value = result.downloadFolder;
      }
  });
    setTimeout(() => window.close(), 2000);});
  } catch (error){
    saveButton.style.borderColor = 'red';
  }
}) 

chrome.storage.local.get(['downloadFolder'], (result) => {
  if (result.downloadFolder) {
    currentFolder.value = result.downloadFolder;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getTicketId" }, (response) => {
        if (response && response.ticketId) {
          currentFolder.value += `/${response.ticketId}`;
        }
      });
    });
  }
});
