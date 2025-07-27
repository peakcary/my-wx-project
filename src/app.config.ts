export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/game/game',
    'pages/game24/game24',
    'pages/constellation/constellation',
    'pages/bloodtype/bloodtype',
    'pages/tarot/tarot'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#2c3e50',
    navigationBarTitleText: '智力游戏大全',
    navigationBarTextStyle: 'white',
    backgroundColor: '#34495e'
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 10000
  },
  debug: false
})
