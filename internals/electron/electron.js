const path = require("path");

const { app, BrowserWindow, screen } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  //get height of the screen
  const getHeight = screen.getPrimaryDisplay().workAreaSize.height;
  //set height to $height - 50 if the height is less than 900
  var height = getHeight < 900 ? getHeight - 50 : 900;
  //set width to 400 if the height is less than 900
  var width = getHeight < 900 ? 400 : 500;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    resizable: false,
  });

  //set python flask online
  var python = require("child_process").spawn("python3", ["../server/main.py"]);
  python.stdout.on("data", function (data) {
    console.log("data: ", data.toString("utf8"));
  });
  python.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`); // when error
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
