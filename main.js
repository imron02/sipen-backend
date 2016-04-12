var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var nomo = require('node-monkey').start();
mongoose = require('mongoose');

var expressApp = express();

// view engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'jade');

expressApp.use(cors());
expressApp.use(logger('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));

// Connect to the sipen MongoDB
// mongoose.connect('mongodb://localhost:27017/sipen');
mongoose.connection.on("open", function(ref) {
    return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err.message);
});

try {
    mongoose.connect('mongodb://localhost:27017/sipen');
} catch (err) {
    console.log(("Setting up failed to connect"), err.message);
}

// Router
var routes = require('./routes/router')(expressApp);

var server = expressApp.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// electron
// var app = require('app');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.
// var Menu = require("menu");

// // Report crashes to our server.
// require('crash-reporter').start();

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// var mainWindow = null;

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform != 'darwin') {
//     app.quit();
//   }
// });

// app.on('ready', function() {
//     var mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600
//     });
//     mainWindow.maximize();
//     mainWindow.loadUrl('http://localhost:3000');

//     // Open the DevTools.
//     mainWindow.webContents.openDevTools();

//      // Emitted when the window is closed.
//     mainWindow.on('closed', function() {
//         // Dereference the window object, usually you would store windows
//         // in an array if your app supports multi windows, this is the time
//         // when you should delete the corresponding element.
//         mainWindow = null;
//     });

//     // Create the Application's main menu
//     // var template = [{
//     //     label: "File",
//     //     submenu: [
//     //         // { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
//     //         // { type: "separator" },
//     //         { label: "Quit", accelerator: "Control+Q", click: function() { app.quit(); }}
//     //     ]}, {
//     //     label: "Help",
//     //     submenu: [
//     //         { label: "About Application"}
//     //     ]}
//     // ];

//     // Menu.setApplicationMenu(Menu.buildFromTemplate(template));
// });


module.exports = expressApp;
