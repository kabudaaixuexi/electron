module.exports = {
  build: {
    DisableF12: true,
    env: require('./prod.env'),
    hotPublishUrl:"",
    hotPublishConfigName: ""
  },
  dev: {
    env: require('./dev.env'),
    removeElectronJunk: true,
    chineseLog: false,
    port: 8091,
  },
  DllFolder: '',
  HotUpdateFolder: 'update',
  UseStartupChart: true,
  IsUseSysTitle: true,
  BuiltInServerPort: 25566
}