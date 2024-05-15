chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "downloadToCustomFolder",
        title: "Download to Custom",
        contexts: ["link"],
    });
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.downloadUrl) {
      chrome.storage.local.get(['downloadFolder'], (result) => {
      const downloadFolder = result.downloadFolder || '';
      const ticketIdFolder = message.ticketId ? `${message.ticketId}/` : ''; // Create ticket ID subfolder
      const filename = new URL(message.downloadUrl).pathname.split('/').pop();
      const downloadFilename = `${downloadFolder}/${ticketIdFolder}${filename}`; // Full path with ticket
	  chrome.downloads.download({
	      url: message.downloadUrl,
	      filename: downloadFilename,
	      conflictAction: 'uniquify',
	      saveAs: false
	  });
      });
  }
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "downloadToCustomFolder") {
      chrome.storage.local.get(['downloadFolder'], (result) => {
	  const userDefinedSubfolder = result.downloadFolder ? result.downloadFolder + '/' : '';
	  const filename = new URL(message.downloadUrl).pathname.split('/').pop();
	  const downloadFilename = userDefinedSubfolder + filename;
	  chrome.downloads.download({
	      url: message.downloadUrl,
	      filename: downloadFilename,
	      conflictAction: 'uniquify',
	      saveAs: false
	  });
      });
    }
});

