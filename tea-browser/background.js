const ASPREDICTEDURL = "https://aspredicted.org/create.php"

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.query({ currentWindow: true, active: true}, (tabs) => {
        if(tabs[0].url === ASPREDICTEDURL) {
            // chrome.tabs.executeScript(null, {file: '/js/dependentVariable.js'});
        }
    })
})