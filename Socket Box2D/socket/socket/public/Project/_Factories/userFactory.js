
app.factory('userFactory', function () {

    var user = {name:'test'};

        
    return {
        getUser: function () {
            return user;
        },
        setUser: function (u) {
            user = u;
        }
    };


});