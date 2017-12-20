import { Toast } from 'mint-ui'

export const screenHeight  = window.screen.height

/*
* 信息提示
* */
export const toastInfo = (name) => {
    Toast({
        message: name,
        position: 'bottom',
        duration: 1000
    });
}

/*
* 添加图片路径
* */
export const notImgShow = (url) => {
    if(url != null && url != ''){
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
            if(localhostPath != 'http://localhost:8080'){
                return localhostPath + l;
            }else{
                return 'http://develop.jianguolicai.cn' + l;
            }

        }else{
            return url;
        }
    }else {
        return require('../assets/images/goods_bg.gif')
    }
}
