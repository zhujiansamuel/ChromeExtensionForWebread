function Note(content,texturls) {
    this.content = content;
    this.texturls = texturls;
}

//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
function initLocalStorage() {
    if (null == localStorage.appName) {
        localStorage.appName = "kynote";
    }
    if (null == localStorage.mynotes) {
        // localStorage doesn't support Array or Object!
        localStorage.mynotes = JSON.stringify({});
    }
    if (null == localStorage.loginState){
        localStorage.loginState = "not";
    }
    if (null == localStorage.loginName){
        localStorage.loginName = "aaaaa";
    }
    if (null == localStorage.loginAuthKey){
        localStorage.loginAuthKey = "bbbb";
    }
}

