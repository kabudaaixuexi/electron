import {
    BrowserWindow,
    ipcMain,
    Menu,
    nativeImage,
    MenuItem,
    MenuItemConstructorOptions
  } from 'electron';
  import { join } from 'path';
//   import csh from '@/lib/assets/icon/csh.png';
  
  export default class Menus {
    constructor() {}
    /**
     * 监听
     */
    on() {
      ipcMain.on('menu-show-head', (event, menutype) => {
        const template: Array<MenuItemConstructorOptions | MenuItem> = [
          {
            label: '自定义1',
            icon: nativeImage.createFromPath(join(__dirname, `../${testIcon}`)),
            click: () => {
              event.sender.send('menu-back', 'menu-item-1');
            }
          },
          { label: '自定义2', type: 'checkbox', checked: true }
        ];
        const menu = Menu.buildFromTemplate(template);
        menu.popup({
          window: BrowserWindow.fromWebContents(event.sender)
        });
      });
  
      ipcMain.on('menu-show-desk', (event, menutype) => {
        const template: Array<MenuItemConstructorOptions | MenuItem> = [
          {
            label: '复原桌面',
            // icon: nativeImage.createFromPath(join(__dirname, `../${csh}`)),
            click: () => {
              event.sender.send('menu-back', 'desk-1');
            }
          },
          {
            label: '保存当前桌面',
            // icon: nativeImage.createFromPath(join(__dirname, `../${csh}`)),
            click: () => {
              event.sender.send('menu-back', 'desk-2');
            }
          }
        ];
        const menu = Menu.buildFromTemplate(template);
        menu.popup({
          window: BrowserWindow.fromWebContents(event.sender)
        });
      });
    }
  }
  