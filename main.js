const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    center: true,
    resizable: true,
    fullscreen: false,
    icon: path.join(__dirname, 'public', 'logo.ico'),
    title: 'DevToolbox',
    webPreferences: {
      contextIsolation: true,
    }
  });

  win.setMenuBarVisibility(false);
  win.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
