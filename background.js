chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "downloadToCustomFolder",
    title: "Download to XYZ",
    contexts: ["link"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "downloadToCustomFolder") {
    chrome.downloads.download({
      url: info.linkUrl,
      // Note: The filename parameter cannot specify a different directory to save the file.
      // filename: "YourPredefinedFolder/YourFile.ext",
      conflictAction: 'uniquify',
      saveAs: true // This will prompt the user for the location, respecting the browser's download settings.
    });
  }
});
