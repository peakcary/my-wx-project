export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/game/game'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#2c3e50',
    navigationBarTitleText: '数独小游戏',
    navigationBarTextStyle: 'white',
    backgroundColor: '#34495e'
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 10000
  },
  debug: false
})
