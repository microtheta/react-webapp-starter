'use strict';


var Q = require("q");

var ajax = function(method, url, data, abortPromise) {

	return Q.Promise(function(resolve, reject) {
		var requet =  jQuery.ajax({
			url: url,
			method: method,
			data: data,
			success: function(data) {
				resolve(data);
			},
			error: function(err) {
				reject(err.responseJSON);
			}
		});

		if(abortPromise && abortPromise) {
			abortPromise.then(function() {
				requet.abort();
			});
		}

	});

};

var getAjax = function(url, data, abortPromise) {
	return ajax('GET', url, data, abortPromise);
};

var postAjax = function(url, data, abortPromise) {
	return ajax('POST', url, data, abortPromise);
};


module.exports = {
	ajax,
	get: getAjax,
	post: postAjax
};
