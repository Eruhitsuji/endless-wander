const path = require('node:path');
const { app, BrowserWindow, Menu, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#a7c7d0',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, '..', 'site', 'index.html'));
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.on('closed', () => { mainWindow = null; });
}

function configureAutoUpdates() {
  if (!app.isPackaged) return;

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('error', (error) => {
    console.error('Automatic update failed:', error);
  });

  autoUpdater.on('update-downloaded', async (info) => {
    const options = {
      type: 'info',
      buttons: ['今すぐ再起動', '後で'],
      defaultId: 0,
      cancelId: 1,
      title: '更新をダウンロードしました',
      message: `Endless Wander ${info.version} をインストールできます。`,
      detail: '再起動すると更新が適用されます。'
    };
    const result = mainWindow
      ? await dialog.showMessageBox(mainWindow, options)
      : await dialog.showMessageBox(options);

    if (result.response === 0) autoUpdater.quitAndInstall();
  });

  // Check shortly after the game opens. Updates download in the background.
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch((error) => {
      console.error('Could not check for updates:', error);
    });
  }, 5000);
}

app.whenReady().then(() => {
  createWindow();
  configureAutoUpdates();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
