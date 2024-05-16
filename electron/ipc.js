import { ipcMain } from 'electron'
export default function () {
    ipcMain.handle('login', async() => {
        let code =Math.floor(Math.random()*10000 - 1000) +10000;
        return code;
    })
}