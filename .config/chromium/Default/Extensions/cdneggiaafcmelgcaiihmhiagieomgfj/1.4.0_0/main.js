var initialMarkdown = "";
var theValue;
var badConnection = false;
var localImage = false;
var onlineImage = false;
var localURL;
var onlineURL;
var spellcheck = true;
var sampleText = "### Welcome to Material Markdown!\n**Shortcuts**\n- Load Sample Page: Ctrl+P\n- Open File: Ctrl+O\n- Save File: Ctrl+S\n- Toggle Blockquote: Ctrl+'\n- Toggle Bold: Ctrl+B\n- Toggle Italic: Ctrl+I\n- Draw Link: Ctrl+K\n- Toggle Unordered List: Ctrl+L\n-----\n```\nvar test = 'hello from material markdown'\n```\n[Gitlab Repository](https://gitlab.com/bernardodsanderson/material-markdown)\n> This app uses the open source SimpleMDE markdown editor";

var simplemde = new SimpleMDE({ 
  element: document.getElementById("my-content"),
  spellChecker: spellcheck,
  toolbar: ["bold", "italic", "strikethrough", "|", "quote", "unordered-list", "ordered-list", "clean-block", "table", "|", "heading-1", "heading-2", "heading-3", "heading-smaller", "heading-bigger", "|", "code", "link",
    {
      name: "image",
      action: console.log('online image'),
      className: "fa fa-picture-o",
      title: "Online Image"
    },{
      name: "local",
      action: console.log('local image'),
      className: "fa fa-file-image-o",
      title: "Local Image"
    }, "horizontal-rule", "|", "side-by-side"],
  initialValue: initialMarkdown,
  status: false
});

simplemde.toggleSideBySide();
simplemde.toggleSideBySide();

// Menu
$('<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons" style="color: white;">more_vert</i></button>').appendTo('.editor-toolbar');

// Load Sample
function loadSample() {
  simplemde.value(sampleText);
}

// Load Backup
function loadBackup() {
  chrome.storage.local.get('value', function(items) {
     simplemde.value(items.value);
   });
}



// Hidden upper right menu
$('.mdl-menu li').on('click', function(){
  switch($(this)[0]) {
    case $('#open_file')[0]: // OPEN FILE
        openFile();
        break;
    case $('#save')[0]: // SAVE FILE
        saveFile();
        break;
    case $('#save_as')[0]: // SAVE AS FILE
        saveAsFile();
        break;
    case $('#load_sample')[0]: // LOAD SAMPLE
        loadSample();
        break;
    case $('#get_html')[0]: // DOWNLOAD HTML
        saveAsHTML();
        break;
    case $('#restore')[0]: // DOWNLOAD HTML
        loadBackup();
        break;
    case $('#spellcheck')[0]: // TOGGLE SPELLCHECK
        toggleSpellcheck();
        break;
    default:
        console.log('Nothing selected');
  }
});

// Spellcheck
function toggleSpellcheck() {
  spellcheck = !spellcheck;
}

var chosenFileEntry = null;

function openFile() {
  var accepts = [{
    mimeTypes: ['markdown/*'],
    extensions: ['md', 'txt']
  }];
  chrome.fileSystem.chooseEntry({accepts: accepts}, function (entry) {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    setEntry(entry, false);
    // chrome.fileSystem.retainEntry(entry);
    replaceDocContentsFromFileEntry();
    chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(entry)});
  });
}

function replaceDocContentsFromFile(file) {
  var reader = new FileReader();
  reader.onload = function() {
    simplemde.value(reader.result);
  };
  reader.readAsText(file);
}

function replaceDocContentsFromFileEntry() {
  fileEntry.file(replaceDocContentsFromFile);
}

function saveAsFile() {
  var config = {type: 'saveFile', suggestedName: 'my-file.md'};
  chrome.fileSystem.chooseEntry(config, function(writableFileEntry) {
    setEntry(writableFileEntry, true);
    chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(writableFileEntry)});
    writableFileEntry.createWriter(function(writer) {
      writer.write(new Blob([simplemde.value()], {type: 'text/plain'}));  
      activateToast();
    });
  });
}

// File Entry functions
var fileEntry;
var gotWritable = false;

function setEntry(anEntry, isWritable, name) {
  fileEntry = anEntry;
  gotWritable = isWritable;
}

function saveFile() {
  if (gotWritable) {
    saveToEntry();
  } else if (fileEntry) {
    chrome.fileSystem.getWritableEntry(fileEntry, function(entry) {
      if (chrome.runtime.lastError) {
        showError(chrome.runtime.lastError.message);
        return;
      }
      setEntry(entry, true);
      saveToEntry();
    });
  } else {
    saveAsFile();
  }
}

function loadFileEntry(_chosenEntry) {
  console.log(_chosenEntry);
  chosenEntry = _chosenEntry;
  chosenEntry.file(function(file) {
    readAsText(chosenEntry, function(result) {
      simplemde.value(result);
    });
  });
}

function readAsText(fileEntry, callback) {
  fileEntry.file(function(file) {
    var reader = new FileReader();

    // reader.onerror = errorHandler;
    reader.onload = function(e) {
      callback(e.target.result);
    };

    reader.readAsText(file);
  });
}

function loadInitialFile(launchData) {
  if (launchData && launchData.items && launchData.items[0]) {
    loadFileEntry(launchData.items[0].entry);
  } else {
    // see if the app retained access to an earlier file or directory
    chrome.storage.local.get('chosenFile', function(items) {
      if (items.chosenFile) {
        gotWritable = true;
        // if an entry was retained earlier, see if it can be restored
        chrome.fileSystem.isRestorable(items.chosenFile, function(bIsRestorable) {
          // the entry is still there, load the content
          console.info("Restoring " + items.chosenFile);
          chrome.fileSystem.restoreEntry(items.chosenFile, function(chosenEntry) {
            if (chosenEntry) {
              loadFileEntry(chosenEntry);
            }
          });
        });
      } else {
        gotWritable = false;
      }
    });
  }
}

loadInitialFile(launchData);

function saveToEntry() {
  if(gotWritable) {
    chosenEntry.createWriter(function(fileWriter) {
      var blob = new Blob([simplemde.value()], {type: 'text/plain'});
      fileWriter.write(blob);
      activateToast();
    });
  } else {
    fileEntry.createWriter(function(fileWriter) {
      var blob = new Blob([simplemde.value()], {type: 'text/plain'});
      fileWriter.write(blob);
      activateToast();
    });
  }
}

var exportHTML = false;

function saveAsHTML() {
  exportHTML = true;
  var HTMLcontent = simplemde.options.previewRender(simplemde.value());
  var config = {type: 'saveFile', suggestedName: 'my-file.html'};
  chrome.fileSystem.chooseEntry(config, function(writableFileEntry) {
    setEntry(writableFileEntry, true);
    writableFileEntry.createWriter(function(writer) {
      writer.write(new Blob([HTMLcontent], {type: 'text/plain'}));  
      activateToast();
    });
  });
  exportHTML = false;
}

// Keyboard commands
document.addEventListener('keydown', function(event) {
  if(event.ctrlKey && event.keyCode == 83) {
    saveFile();
  } else if (event.ctrlKey && event.keyCode == 79) {
    openFile();
  } else if (event.ctrlKey && event.keyCode == 80) {
    loadSample();
  }
}, true);

// Toast functionality
var snackbarContainer = document.querySelector('#demo-toast-example');
function activateToast() {
  'use strict';
  var data = {message: 'File Saved!'};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

var initialLoad = true;

// Auto save
simplemde.codemirror.on("change", function(){
  if (!initialLoad) {
   theValue = simplemde.value();
    saveChanges(); 
  }
  initialLoad = false;
});


function saveChanges() {
  // Save it using the Chrome extension storage API.
  chrome.storage.local.set({'value': theValue}, function() {
    // Notify that we saved.
    // console.log('Editor saved', theValue);
  });
}

// Context (right click) Menus
chrome.contextMenus.create({
  id: "open-file",
  title: "Open File",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-file",
  title: "Save",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-as-file",
  title: "Save As",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "save-html",
  title: "Get HTML",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "load-sample",
  title: "Load Sample Page",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.create({
  id: "restore",
  title: "Restore Backup",
  contexts: ["launcher", "all"]
}, function(){
  console.log(chrome.runtime.lastError);
});

chrome.contextMenus.onClicked.addListener(function(itemData) {
  if (itemData.menuItemId == "save-file") {
    saveFile();
  }
  if (itemData.menuItemId == "open-file") {
    openFile();
  }
  if (itemData.menuItemId == "save-as-file") {
    saveAsFile();
  }
  if (itemData.menuItemId == "load-sample") {
    loadSample();
  }
  if (itemData.menuItemId == "save-html") {
    saveAsHTML();
  }
  if (itemData.menuItemId == "restore") {
    loadBackup();
  }
});

// Local Image
$('a.fa.fa-file-image-o').on('click', function(){
  localImage = true;
  openDirectoryImage();
});

function openDirectoryImage(){
  // Within your app's code, somehow get a DirectoryEntry (or FileEntry):
  chrome.fileSystem.chooseEntry({}, function(fileEntry) {
    fileEntry.file(function(file) {
      var url = URL.createObjectURL(file);
      // url looks like "blob:chrome-extension%3A//[extensionid]/[uuid]"
      localURL = url;
      simplemde.drawImage();
      localImage = false;
    });
  });
}

// Online Image
var dialog = document.querySelector('dialog');

$('a.fa.fa-picture-o').on('click', function(){
  dialog.showModal();
});

dialog.querySelector('button.button-submit').addEventListener('click', function() {
  onlineImage = true;
  getOnlineBlob($('#online-image-url').val());
  dialog.close();
});

dialog.querySelector('button.close').addEventListener('click', function() {
  dialog.close();
});

function getOnlineBlob(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    onlineURL = window.URL.createObjectURL(this.response);
    simplemde.drawImage();
    onlineImage = false;
  };
  
  xhr.send();
}
