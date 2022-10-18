const { app, BrowserWindow, screen } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')
require('./server/index')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit()
}
const augustoFolder = path.join(os.homedir(), 'Documents', 'AugustoTest')
const createWindow = () => {
  if (!fs.existsSync(augustoFolder)) {
    fs.mkdir(augustoFolder, (error) => {
      if (error) return false
      fs.copyFile(path.join(__dirname, '..', 'server', 'data.json'))
    })
  }

  const display = screen.getPrimaryDisplay().workAreaSize.height
  const height = display < 900 ? display - 20 : 900
  const width = 700
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    icon: '../images/icon.jpg',
    webPreferences: {
      nodeIntegration: true,
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// module.exports = { augustoFolder }