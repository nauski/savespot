chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "downloadToCustomFolder",
        title: "Download to Custom",
        contexts: ["link"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "downloadToCustomFolder") {
        chrome.storage.local.get(['downloadFolder'], (result) => {
            const userDefinedSubfolder = result.downloadFolder || '';
	    console.log("userDefinedSubfolder: ", userDefinedSubfolder);

            const filename = new URL(info.linkUrl).pathname.split('/').pop();
	    console.log("filename: ", filename);

            const downloadFilename = userDefinedSubfolder ? `${userDefinedSubfolder}/${filename}` : filename;
	    console.log("downloadFilename: ", downloadFilename);

            chrome.downloads.download({
                url: info.linkUrl,
                filename: downloadFilename,
                conflictAction: 'uniquify',
                saveAs: false
            });
        });
    }
});

