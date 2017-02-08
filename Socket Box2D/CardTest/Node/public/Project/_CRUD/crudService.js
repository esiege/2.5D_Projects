
app.service('crudService', function ($http, userService) {
    
    var logSuccess = false;
    
    return {
        post: function (url, data, success, failure) {

            var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            
            if (userService.getToken())
                headers['Authorization'] = "Bearer " + userService.getToken();

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
        get: function (url, success, failure) {

			//var headers = $http.defaults.headers.common;
			
			var headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
            
            if (userService.getToken())
                headers['Authorization'] = "Bearer " + userService.getToken();

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
