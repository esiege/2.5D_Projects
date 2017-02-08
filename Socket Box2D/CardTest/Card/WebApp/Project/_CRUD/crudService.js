
app.service('crudService', function ($http, userService) {
    
    var logSuccess = false;
    
    return {
        post: function (url, data, success, failure, headers) {

            if (!headers['removeBase']) {
                var baseHeaders = angular.copy($http.defaults.headers.post);
                for (var h in headers) {
                    baseHeaders[h] = headers[h];
                }
                headers = baseHeaders;  
            } else {
	            delete headers['removeBase'];
            }

            if (headers['authorization']) {
	            if (userService.getToken())
		            headers['authorization'] = "Bearer " + userService.getToken();
	            else
		            delete headers['authorization'];
            }

            $http({
                method: 'POST',
                url: app.userConfigs.apiPath + url,
                headers: headers,
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            }).then(function (status) {

                if (logSuccess) {
                    console.log("post - success");
                    console.log(status);
                }
                
                if (success)
                    success(status);

            }, function (status) {
                console.log("post - failure");
                console.log(status);
                
                if (failure)
                    failure(status);
            });
        },
        get: function (url, success, failure, headers) {
            
            if (!headers)
                headers = $http.defaults.headers.common;
            
            if (headers['authorization']) {
                if (userService.getToken())
                    headers['authorization'] = "Bearer " + userService.getToken();
                else
                    delete headers['authorization'];
            }

            $http({
                method: 'GET',
                url: app.userConfigs.apiPath + url,
                headers: headers, 

            }).then(function (status) {

                if (logSuccess) {
                    console.log("get - success");
                    console.log(status);
                }
                
                if (success)
                    success(status);

            }, function (status) {
                console.log("get - failure");
                console.log(status);
                
                if (failure)
                    failure(status);
            });
        }
    }

});
