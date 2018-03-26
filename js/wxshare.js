var shareData = {
  title: '诺诺日记-重温匠心之路',
  desc: '我正在闯关答题，快来和我一起瓜分5万元！',
  link: window.location.href,
  imgUrl: 'http://' + window.location.host + window
    .location
    .pathname
    .split('/index.html')[0] + '/img/sannuo-samll.jpg'
};
getWxConfig();
//获取微信配置参数
function getWxConfig() {
  var successCb = function (data) {
    var wxConfig = JSON.parse(data);
    wx.config({
      debug: true,
      appId: wxConfig.appId,
      timestamp: wxConfig.timestamp,
      nonceStr: wxConfig.noncestr,
      signature: wxConfig.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
    wx.ready(function () {
      initWxShare();
    });
  };
  var errorCb = function (data) {};
  var upData = JSON.stringify({url: window.location.href});
  var config = {
    url: GETBASEINFO,
    type: 'POST',
    data: {
      url: window.location.href
    },
    success: successCb,
    error: errorCb
  };
  getAjax(config);
}

//绑定微信功能
function initWxShare() {
  wx.onMenuShareTimeline({title: shareData.desc, imgUrl: shareData.imgUrl, link: shareData.link});
  wx.onMenuShareAppMessage(shareData);
}
