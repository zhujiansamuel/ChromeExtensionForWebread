function Note(content,texturls,notedate) {
    this.content = content;
    this.texturls = texturls;
    this.notedate = notedate;
}

//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
function initLocalStorage() {
    if (null == localStorage.appName) {
        localStorage.appName = "LyDL note";
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

