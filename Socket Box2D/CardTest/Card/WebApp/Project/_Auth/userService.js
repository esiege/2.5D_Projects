
app.service('userService', function () {

    var user = { name: 'test' };
    var token;


	return {
		user: user,
		authModel: function() {
			return {
				id: user.id,
				username: user.username,
				password: "testtest",
                email: "blah@blah.com",
                grant_type:"password"
			};
		},
		setUser: function (u) {
			user = u;
		},
		updateUser: function (u) {
			for (var attr in u)
			{
				user[attr] = u[attr];
			}
        },
        setToken: function (t) {
            token = t;
            user.token = t.access_token;
        },
        getToken: function() {
            return user.token;
        }
	};


});