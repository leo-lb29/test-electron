const { app, BrowserWindow, Menu, screen } = require('electron');

let win;
let splash;

function createWindow() {
  // Splash screen
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    center: true,
  });
  splash.loadFile('splash.html'); // page HTML simple avec loader




  win = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    frame: true,           // mettre false si tu veux sans bordure
    autoHideMenuBar: true, // cache la barre de menu
  });



  Menu.setApplicationMenu(null);

  win.loadURL('http://localhost:3000'); // charge l'URL de ton app React

  // Quand la fenêtre principale est prête
  win.once('ready-to-show', () => {
    // Garde le splash 3 secondes
    setTimeout(() => {
      if (splash) splash.close();
    win.maximize(); // maximise la fenêtre
    win.show();     // affiche
    }, 5000); // 3000 ms = 3 secondes
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

