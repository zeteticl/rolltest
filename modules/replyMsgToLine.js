var https = require('https');	
function replyMsgToLine(rplyToken, rplyVal, options, rplypath) {
	let rplyObj = {
	replyToken: rplyToken,
	messages: [
		{
	type: rplyVal.type,
	text: rplyVal.text
		}
	]
	
	}
	let rplyJson = JSON.stringify(rplyObj); 
	var request = https.request(options, function(response) {
//	console.log('Status: ' + response.statusCode);
//	console.log('Headers: ' + JSON.stringify(response.headers));
	response.setEncoding('utf8');
	response.on('data', function(body) {
//		console.log(body); 
	});
	});
	request.on('error', function(e) {
	console.log('Request error: ' + e.message);
	})
	request.end(rplyJson);
}


module.exports = {
	replyMsgToLine:replyMsgToLine
};

