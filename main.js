const { app, BrowserWindow, Menu } = require("electron");
const { autoUpdater } = require("electron-updater");

let mainWindow;
let splashWindow;

function createWindow() {
  // --- Splash screen ---
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    center: true,
  });

  splashWindow.loadFile("splash.html");

  // --- Fenêtre principale ---
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: true, // mettre false si tu veux sans bordure
    autoHideMenuBar: true,
  });

  // Pas de menu
  Menu.setApplicationMenu(null);

  // Charge ton app React
  mainWindow.loadURL("https://wagoo.app");

  // Affiche la fenêtre principale après un délai
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      if (splashWindow) splashWindow.close();
      mainWindow.maximize();
      mainWindow.show();
    }, 3000); // splash visible 3 sec
  });
}

// --- Auto-updater ---
function initAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    console.log("✅ Mise à jour disponible !");
  });

  autoUpdater.on("update-downloaded", () => {
    console.log("📦 Mise à jour téléchargée, installation...");
    autoUpdater.quitAndInstall();
  });
}

// --- Cycle de vie de l’app ---
app.whenReady().then(() => {
  createWindow();
  initAutoUpdater();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
