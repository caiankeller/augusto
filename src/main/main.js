const { app, BrowserWindow, screen, Menu } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");

const projectFolder = path.join(os.homedir(), "Documents", "augusto"); // declaring the project folder
// TODO: uses the $projectfolder declared on node main file

// i am not sure this is the best way to do this
// let be honest, i am sure that is not the best way to do this
const createFolders = () => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        user: { language: "english" },
        library: [],
        dictionaries: {}
      };

      if (!fs.existsSync(projectFolder)) {
        fs.mkdirSync(projectFolder);
      }
      if (!fs.existsSync(path.join(projectFolder, "dictionaries"))) {
        fs.mkdirSync(path.join(projectFolder, "dictionaries"));
      }
      if (!fs.existsSync(path.join(projectFolder, "books"))) {
        fs.mkdirSync(path.join(projectFolder, "books"));
      }
      if (!fs.existsSync(path.join(projectFolder, "data.json"))) {
        fs.writeFileSync(
          path.join(projectFolder, "data.json"),
          JSON.stringify(data, null, 2)
        );
      }
      return resolve("Resolved");
    } catch (error) {
      return reject(error);
    }
  });
};


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const displayHeight = screen.getPrimaryDisplay().workAreaSize.height;
  // it sizes the height to $height - 20 if the usable display height is smaller than 900
  // look in the electron documentation for more information, os dock and menu bar interfares
  const height = displayHeight - 40;
  const width = 700;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    maxWidth: 960,
    minWidth: 400,
    icon: "../images/icon.jpg",
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    createFolders() // this must be completed before load server
    removeMenu();
    createWindow();
    require("./server/index");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const removeMenu = () => {
  const menu = Menu.getApplicationMenu();
  const items = menu.items.filter((item) => item === false); // it remove all menubar options, i dont think it's de best, but i dont have any use for it yet
  Menu.setApplicationMenu(Menu.buildFromTemplate(items));
};
