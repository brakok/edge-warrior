
var NetworkHelper = {
	serialize: function(obj){
		var str = JSON.stringify(obj);
		var buf = new ArrayBuffer(str.length*2);
		var bufView = new Uint16Array(buf);
		for (var i=0, strLen=str.length; i<strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	},
	deserialize: function(buffer){
		return JSON.parse(String.fromCharCode.apply(null, new Uint16Array(buffer)));
	}
};