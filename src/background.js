import match from './match';

let keys = {};
fetch('http://localhost:5500/model/keys.json').then(e => e.json()).then(e => keys = e);
chrome.webNavigation.onCommitted
    .addListener( details => 
        Object.keys(keys)
    .map(e => match(e, details.url))
    .filter(e => 
        e.state)
    .map(e => 
        chrome.tabs
        .executeScript(details.tabId, { code : `var REMOTE_CODE_EXECUTE = ${ JSON.stringify(e.children) }`}, _ => 
        chrome.tabs
        .executeScript(details.tabId, { code : keys[e.pattern] }))));