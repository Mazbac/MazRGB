const path = require('node:path')
const { app, BrowserWindow, Menu, Tray } = require('electron')

const gotLock = app.requestSingleInstanceLock()

if (!gotLock) {
  app.quit()
} else {
  let mainWindow
  let tray
  let quitting = false

  const sendTrayAction = (action) => {
    if (!mainWindow || mainWindow.isDestroyed()) return
    mainWindow.webContents.send('mazrgb:tray-action', action)
  }

  const showMainWindow = () => {
    if (!mainWindow || mainWindow.isDestroyed()) return
    mainWindow.show()
    mainWindow.focus()
  }

  function createMainWindow() {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 820,
      minWidth: 900,
      minHeight: 640,
      title: 'MazRGB',
      backgroundColor: '#1a1b1e',
      icon: path.join(__dirname, '..', 'public', 'mazrgb-tray.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true,
      },
    })

    if (app.isPackaged) {
      mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
    } else {
      mainWindow.loadURL('http://127.0.0.1:5173')
    }

    mainWindow.on('close', (event) => {
      if (!quitting) {
        event.preventDefault()
        mainWindow.hide()
      }
    })
  }

  function createTray() {
    const iconPath = path.join(__dirname, '..', 'public', 'mazrgb-tray.png')
    tray = new Tray(iconPath)
    tray.setToolTip('MazRGB')
    tray.setContextMenu(
      Menu.buildFromTemplate([
        { label: 'Open MazRGB', click: showMainWindow },
        { type: 'separator' },
        {
          label: 'Aurora',
          click: () => sendTrayAction({ type: 'scene', sceneId: 'aurora' }),
        },
        {
          label: 'Focus',
          click: () => sendTrayAction({ type: 'scene', sceneId: 'focus' }),
        },
        {
          label: 'Ember',
          click: () => sendTrayAction({ type: 'scene', sceneId: 'ember' }),
        },
        { type: 'separator' },
        {
          label: 'Blackout',
          click: () => sendTrayAction({ type: 'blackout' }),
        },
        { label: 'Restore', click: () => sendTrayAction({ type: 'restore' }) },
        { type: 'separator' },
        {
          label: 'Quit',
          click: () => {
            quitting = true
            app.quit()
          },
        },
      ]),
    )

    tray.on('click', () => {
      if (!mainWindow || mainWindow.isDestroyed()) return
      if (mainWindow.isVisible()) mainWindow.hide()
      else showMainWindow()
    })
  }

  app.whenReady().then(() => {
    createMainWindow()
    createTray()
  })

  app.on('second-instance', () => {
    showMainWindow()
  })

  app.on('before-quit', () => {
    quitting = true
  })

  app.on('window-all-closed', () => {
    // Keep the app running in the system tray on Windows.
  })

  app.on('activate', () => {
    if (mainWindow && !mainWindow.isDestroyed()) showMainWindow()
    else createMainWindow()
  })
}
