
//点击后进入登陆页面
//等待实现，如果没有登录的话显示登录按键
$(document).ready(function() {


	$("#send_to_my_Study").click(sendLocaldatatoSite);
	function sendLocaldatatoSite(){
		var notes = JSON.parse(localStorage.mynotes);
		var auth_key = localStorage.loginAuthKey;

		$.each(notes, function(index, value) {
			$.post("http://127.0.0.1:8000/onlinelearning/post-user-text",{'authkey':auth_key,'content':value.content,'texturls':value.texturls,'notedate':value.notedate}, function(ret){
				$('#result').html(ret.result);
				window.location.reload();
			})
		});
		localStorage.removeItem('mynotes');
		initLocalStorage();


	}


	$("#btn_logout").click(() => {
		localStorage.clear();
		initLocalStorage();
		window.location.reload();
	});

	$('#login_from_chrome').click(() => {
		chrome.tabs.create({url: 'http://127.0.0.1:8000/onlinelearning/login-from-chrome'});
		//chrome.tabs.create({url: 'http://xs996486.xsrv.jp/for_test/index.cgi/validate/login-from-chrome'});
	});

	if(localStorage.loginState === "logged"){
		console.log("logged state");
		$("#login_from_chrome").hide();
		$("#send_to_my_Study").show();
		$("#btn_clear").show();
		$("#btn_logout").show();
		var loginNames = localStorage.loginName;
		console.log(loginNames);
		document.getElementById('nameTextMessage').innerHTML=loginNames;
	}
	else{
		console.log("i do not know");
		$("#send_to_my_Study").hide();
		$("#login_from_chrome").show();
		$("#btn_clear").hide();
		$("#btn_logout").hide();


	}
});


//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------


//经过实验其他的函数要放在这个前面，另外最好加上$(document).ready()方法
$(document).ready(function() {
	$("#btn_clear").click(clearLocalStorage);
	renderNotes();


	function renderNotes() {
	$("#wrapper").empty();// 先清空页面
	var notes = JSON.parse(localStorage.mynotes);
	$.each(notes, function(index, value) {
		var $div = $("<div>");
		var content = value.content;
		var $content = $("<span class='content'>" + content + "</span>");
		var $uuid = $("<span class='uuid'>" + index + "</span>");
		var $button = $("<button>delete</button>");
		$button.click(deleteCurrentNote);
		$div.append($content);
		$div.append($uuid);
		$div.append($button);
		$("#wrapper").append($div);
	});
}
	function clearLocalStorage() {
		localStorage.removeItem('mynotes');
		initLocalStorage();
		renderNotes();
	}

	function deleteCurrentNote() {
		var uuid = $(this).prev().text();
		var object = JSON.parse(localStorage.mynotes);
		delete object[uuid];
		localStorage.mynotes = JSON.stringify(object);
		renderNotes();
	}

});


