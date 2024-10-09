import { app, BrowserWindow } from "electron";
import path from "path"
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a new BrowserWindow when `app` is ready
const createWindow = () => {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        },
    });

    // Load the Vite server in development or the index.html in production
    app.isPackaged
        ? mainWindow.loadFile(path.join(__dirname,'..', 'dist', "index.html")) // Prod
        : mainWindow.loadURL(`http://127.0.0.1:5173`); // Dev
};

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Create a new window when the app is activated (macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Create the main window when the app is ready
app.whenReady().then(createWindow);
