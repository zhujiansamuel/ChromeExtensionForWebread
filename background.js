
//初始化存储空间
//这个方法定义在common.js
//不太明白为什么有些定义要放在comment.js文件中
initLocalStorage();

//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------



// see http://developer.chrome.com/extensions/contextMenus.html for details
//createMenuProp对象
//其中"onclick"为方法？然后方法实现写在同名函数中？
var createMenuProp = {
	"title" : "Record it for learning",
	"contexts" : [ "selection" ],//contexts: ['page'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
	"onclick" : noteIt
};
//产生右键菜单"指向"对象createMenuProp
chrome.contextMenus.create(createMenuProp);


function noteIt(info, tab) {
	var uuid = Math.uuid(16);
	var notenow = new Date();
	var notelanguage = "ja";
	var note = new Note(info.selectionText,info.pageUrl,notenow,notelanguage);
	var object = JSON.parse(localStorage.mynotes);
	object[uuid] = note;
	localStorage.mynotes = JSON.stringify(object);
}


//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------


//监听来自content-script的消息
//思路：修改localStorage的记录
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	//console.log('收到来自content-script的消息：');
	//console.log(request, sender, sendResponse);
	localStorage.loginState = "logged";
	localStorage.loginName = JSON.parse(request.loginUsername).username;
	localStorage.loginAuthKey = JSON.parse(request.loginUsername).AuthenticationKey;

	//console.log(request.loginUsername);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));

});
