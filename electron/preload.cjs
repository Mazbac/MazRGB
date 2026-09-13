const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mazrgb', {
  onTrayAction(listener) {
    const handler = (_event, action) => listener(action)
    ipcRenderer.on('mazrgb:tray-action', handler)

    return () => {
      ipcRenderer.removeListener('mazrgb:tray-action', handler)
    }
  },
})
