import { app, BrowserWindow, Menu, MenuItem } from "electron";
import path from "path";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const windows = new Set();

export const createWindow = () => {
  let x, y;
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    const [currentWindowX, currentWindowY] = currentWindow.getPosition();
    x = currentWindowX + 24;
    y = currentWindowY + 24;
  }
  let newWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 812,
    x,
    y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    newWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    newWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  newWindow.webContents.openDevTools();

  newWindow.webContents.on("did-finish-load", () => {
    if (!newWindow) {
      throw new Error('"newWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      newWindow.minimize();
    } else {
      newWindow.show();
      newWindow.focus();
    }
  });
  newWindow.on("closed", () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);
  return newWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  const menu = Menu.getApplicationMenu();

  if (menu) {
    const windowMenu = menu.items.find((item) => item.label === "Window");
    if (windowMenu) {
      windowMenu.submenu.append(
        new MenuItem({
          label: "New Window",
          accelerator: "CmdOrCtrl+N",
          click: createWindow,
        })
      );
      Menu.setApplicationMenu(menu);
    }
  }
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
