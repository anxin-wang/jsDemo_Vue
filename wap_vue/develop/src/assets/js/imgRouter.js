var Routers = function(url){
    alert(11111)
    let _self = this
    if(url != null && url != ""){
        //获取完整路径 为: http://localhost:6981/InspectionData/TEST.html
        var fullPath=window.document.location.href;

        //获取主机地址之后的路径 为: /InspectionData/TEST.html
        var pathName=window.document.location.pathname;

        //获取主机地址之后的路径长度 为: /InspectionData/TEST.html的长度为25
        var pos=fullPath.indexOf(pathName);

        //获取主机地址 为: http://localhost:6981
        var localhostPath=fullPath.substring(0,pos);
        if(url.indexOf("./") > -1){
            var l = url.substr(1, url.length);
            var host = window.location.host;
            if(host != 'localhost:8080'){
                return localhostPath + l;
            }else{
                return 'https://www.jianguolicai.cn' + l;
            }

        }else{
            return url;
        }
    }else {
        return require('../../assets/images/goods_bg.gif');
    }
}



export {Routers}