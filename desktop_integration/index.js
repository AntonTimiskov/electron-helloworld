var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

var webserver = require('./server');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var _progress = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  var atomScreen = require('screen');
  var size = atomScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ width: size.width, height: size.height });

  setTimeout( onInit, 1100 );
  
  var progress = 0;
  _progress = setInterval(function(){
    mainWindow.setProgressBar(progress);
    progress += 0.1;
  }, 100);

});

function onInit (){
  clearInterval(_progress);
  mainWindow.setProgressBar(-1);

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    webserver.close();
  });
}
