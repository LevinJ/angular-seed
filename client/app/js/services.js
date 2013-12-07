'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies']).
  value('version', '0.2');

angular.module('myApp.services')
.factory('Auth', ['$http','$cookieStore','currentUserStorage',
    function($http, $cookieStore, currentUserStorage){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = currentUserStorage.get() || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
        _.extend(currentUser, user);
        currentUserStorage.put(currentUser);
    };

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined)
                role = currentUser.role;

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
//            .error(function(err){
//                console.log(err);
//                error(err);
//            });
        },
        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
}]);

angular.module('myApp.services')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});

/**
 * Services that persists and retrieves the current user/role from localStorage
 */
angular.module('myApp.services')
        .factory('currentUserStorage', function () {
	var STORAGE_ID = 'currentuser-login';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID));
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
