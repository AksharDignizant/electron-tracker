import {
  app,
  BrowserWindow,
  Menu,
  nativeImage,
  Notification,
  Tray,
  protocol,
} from "electron";
import isDev from "electron-is-dev";
import { existsSync } from "node:fs";
import path from "node:path";

const shouldDisableSandbox =
  process.platform === "linux" && process.env.ELECTRON_FORCE_SANDBOX !== "1";

if (shouldDisableSandbox) {
  app.commandLine.appendSwitch("no-sandbox");
  app.commandLine.appendSwitch("disable-gpu-sandbox");
}

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
}

let trayWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isClockedIn = false;
let clockedInAt: Date | null = null;

const trayIcon = isDev
  ? path.join(__dirname, "../public/logo.svg")
  : path.join(__dirname, "../next-out/logo.svg");
const exportDir = path.join(__dirname, "../next-out");

function interceptFileSchemeAssets() {
  if (isDev) return;

  protocol.interceptFileProtocol("file", (request, callback) => {
    try {
      const url = new URL(request.url);
      const decodedPath = decodeURIComponent(url.pathname);
      const normalizedPath =
        process.platform === "win32" && decodedPath.startsWith("/")
          ? decodedPath.slice(1)
          : decodedPath;

      if (normalizedPath.startsWith(exportDir)) {
        callback({ path: normalizedPath });
        return;
      }

      const relativePath = normalizedPath.replace(/^\/+/, "");
      if (!relativePath) {
        callback({ path: normalizedPath });
        return;
      }

      const candidatePath = path.join(exportDir, relativePath);
      if (existsSync(candidatePath)) {
        callback({ path: candidatePath });
        return;
      }
    } catch (error) {
      console.error("[electron] Failed to map asset path:", error);
    }

    const fallbackPath = request.url.replace("file://", "");
    callback({ path: fallbackPath });
  });
}

function formatTime(date: Date | null) {
  if (!date) return "—";
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getElapsedLabel() {
  if (!clockedInAt) return "";
  const diff = Date.now() - clockedInAt.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const segments = [];
  if (hours) segments.push(`${hours}h`);
  segments.push(`${minutes}m`);
  return segments.join(" ");
}

function notify(body: string) {
  if (!Notification.isSupported()) return;
  new Notification({ title: "Time Tracker", body }).show();
}

function updateTrayMenu() {
  if (!tray) return;
  const status = isClockedIn
    ? `Clocked in • ${formatTime(clockedInAt)} (${getElapsedLabel()})`
    : "Off duty";
  tray.setToolTip(`Tracker • ${status}`);
  const template = Menu.buildFromTemplate([
    { label: status, enabled: false },
    { type: "separator" },
    { label: "Clock In", enabled: !isClockedIn, click: clockIn },
    { label: "Clock Out", enabled: isClockedIn, click: clockOut },
    {
      label: "Open App",
      click: () => {
        void createWindow();
      },
    },
    { type: "separator" },
    {
      label:
        trayWindow && trayWindow.isVisible() ? "Hide Tracker" : "Show Tracker",
      click: toggleWindowVisibility,
    },
    { label: "Quit", role: "quit" },
  ]);
  tray.setContextMenu(template);
}

function clockIn() {
  if (isClockedIn) return;
  isClockedIn = true;
  clockedInAt = new Date();
  notify(`Clocked in at ${formatTime(clockedInAt)}`);
  updateTrayMenu();
}

function clockOut() {
  if (!isClockedIn) return;
  const clockedOutAt = new Date();
  const elapsed = getElapsedLabel();
  isClockedIn = false;
  clockedInAt = null;
  notify(
    `Clocked out at ${formatTime(clockedOutAt)} • ${elapsed || "0m"} worked`
  );
  updateTrayMenu();
}

function toggleWindowVisibility() {
  if (!trayWindow) {
    createTrayWindow();
    return;
  }
  if (trayWindow.isVisible()) trayWindow.hide();
  else trayWindow.show();
}

function createTray() {
  if (tray) return;
  tray = new Tray(nativeImage.createFromPath(trayIcon));
  tray.on("click", toggleWindowVisibility);
  updateTrayMenu();
}

async function createWindow() {
  if (mainWindow) {
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    minWidth: 720,
    minHeight: 540,
    show: false,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (isDev) {
    await mainWindow.loadURL("http://localhost:3000/");
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../next-out/index.html"));
  }

  return mainWindow;
}

async function createTrayWindow() {
  trayWindow = new BrowserWindow({
    width: 360,
    height: 670,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  trayWindow.on("blur", () => {
    trayWindow?.hide();
  });
  trayWindow.on("closed", () => {
    trayWindow = null;
  });

  if (isDev) {
    await trayWindow.loadURL("http://localhost:3000/tray");
  } else {
    await trayWindow.loadFile(
      path.join(__dirname, "../next-out/tray/index.html")
    );
  }
}

if (gotSingleInstanceLock) {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    } else {
      void createWindow();
    }

    if (trayWindow) {
      trayWindow.show();
    } else {
      void createTrayWindow();
    }
  });

  app.whenReady().then(() => {
    interceptFileSchemeAssets();
    createTrayWindow();
    createTray();
    createWindow();
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  tray?.destroy();
  tray = null;
});
