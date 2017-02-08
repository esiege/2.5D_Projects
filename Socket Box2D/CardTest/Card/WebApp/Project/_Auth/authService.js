
app.service('authService', function (crudService, userService) {
    
    return {
        register: function (success, failure) {
            crudService.post("Account/register", userService.authModel(), function (status) {
                //register success
                
                console.log("Registration Success!");
                if (success) success(status);
            }, function (status) {
                //register failure
                
                console.log(status);
                if (failure) failure(status);
            }, { 'Content-Type': 'application/x-www-form-urlencoded', 'authorization' : true });
        },
        login: function (success, failure) {
            crudService.post("auth", userService.authModel(), function (status) {
                //login success
                userService.setToken(status.data.access_token);
                
                console.log(status);
                if (success) success(status);
            }, function (status) {
                //login failure
                
                console.log(status);
                if (failure) failure(status);
            }, { 'Content-Type': 'application/x-www-form-urlencoded', 'authorization' : true });
        }
    };
    



});
