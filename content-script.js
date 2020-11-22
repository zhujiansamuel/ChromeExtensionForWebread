//接受来自页面的消息,并发送给background
window.addEventListener(
    'message',
    function(event) {
        // We only accept messages from ourselves
        if (event.source != window) return;
        if (event.data.type && event.data.type == 'FROM_PAGE') {
            console.log('Content-script received: ' + event.data.text);
            //发送消息
            sendMessageToBackground(event.data.text);
        }
    },
    false
);



//向background发送消息的函数
function sendMessageToBackground(message) {
    console.log(message);
    chrome.runtime.sendMessage({loginUsername: message}, function(response) {
        console.log('收到来自后台的回复：' + response);
    });
}


//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------




//接受来自background的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
    if(request.cmd == 'update_font_size') {
        var ele = document.createElement('style');
        ele.innerHTML = `* {font-size: ${request.size}px !important;}`;
        document.head.appendChild(ele);
    }
    else {
        console.log(JSON.stringify(request));
        sendResponse('我收到你的消息了：'+JSON.stringify(request));
    }
});


//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------