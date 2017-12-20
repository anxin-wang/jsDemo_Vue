export default{
  iframeResize () {//子页面撑开父元素高度
    var iframe = parent.document.getElementById("iframe");
    if (iframe) {
      var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
      if (iframeWin.document.body) {

        if(iframeWin.document.documentElement.scrollHeight >= 1710 || iframeWin.document.body.scrollHeight >= 1710){
          if(iframeWin.document.documentElement.scrollHeight >= iframeWin.document.body.scrollHeight){

            if(iframeWin.document.body.scrollHeight < 1710){
              iframe.height = 1710;
            }else{
              iframe.height = iframeWin.document.body.scrollHeight;
            }
          }else{
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
          }
        }else{
          iframe.height = 1710;
        }
      }
    }
  },
  baseProts: function(){ //获取域名
    let host = window.location.host;
    let prot = window.location.protocol;
    let baseUrl = prot+"//"+host;
    return baseUrl;
  }
}
