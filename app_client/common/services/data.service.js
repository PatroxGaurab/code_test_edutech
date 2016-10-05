(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication','Upload','$timeout'];
  function meanData ($http, authentication,Upload,$timeout) {

    var getProfile = function (routeParams) {
	if(routeParams.sso && routeParams.sig){
	      return $http.get('/api/forum/profile?sso='+routeParams.sso+'&sig='+routeParams.sig, {
		headers: {
		  Authorization: 'Bearer '+ authentication.getToken()
		}
	      });
	}else{
      return $http.get('/api/profile?sso='+routeParams.sso+'&sig='+routeParams.sig, {
		headers: {
		  Authorization: 'Bearer '+ authentication.getToken()
		}
		});
	}
    };
    var googleCallback = function (routeParams) {
      return $http.get('/api/auth/google?code='+routeParams.code
      );
    };
    var getCourses = function (params) {
	var config = {
	 params: params,
	 headers : {'Accept' : 'application/json'}
	};
      return $http.get('/api/courses',config);
    };
    var getTags = function () {
	var config = {
	 headers : {'Accept' : 'application/json'}
	};
      return $http.get('/api/tags',config);
    };
    var toggleWishlist = function (params) {
	var config = {
	 params: params,
	 headers : {'Accept' : 'application/json',
		     Authorization: 'Bearer '+ authentication.getToken()}
	};
      return $http.get('/api/wishlist/toggle',config);
    };
    var isWishlisted = function (params) {
	var config = {
	 params: params,
	 headers : {'Accept' : 'application/json',
		     Authorization: 'Bearer '+ authentication.getToken()}
	};
      return $http.get('/api/wishlist/check',config);
    };
    var getForumProfile = function (routeParams) {
	if(routeParams.sso && routeParams.sig){
	      return $http.get('/api/forum/profile?sso='+routeParams.sso+'&sig='+routeParams.sig, {
		headers: {
		  Authorization: 'Bearer '+ authentication.getToken()
		}
	      });
	}
    };

    var isUsernameUnique = function (username) {
      return $http.get('/api/username?username='+username, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var saveUsername = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/username/save', config, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var isEmailUnique = function (setemail) {
      return $http.get('/api/email?setemail='+setemail, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var saveEmail = function (setemail) {
	var config = {
	 params: {setemail : setemail},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/email/save', config, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getPublicProfile = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.get('/api/profile/public', config);
    };


    var updateProfile = function (profileParams) {
      return $http.post('/api/profile', profileParams, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var isEmailVerified = function (routeParams) {
      return $http.get('/api/email/isverified', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var uploadImage = function (file,jsondata,modal) {
      file.upload = Upload.upload({
        url: 'api/upload/profilepic',
        data: {file: file},
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });

	    file.upload.then(function (response) {
	      $timeout(function () {
		jsondata.profilepic = response.data.data;
		jsondata.successmsg=true;
		//return response.data;
	      });
	    }, function (response) {
	      //if (response.status > 0)
		//$scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {

	      // Math.min is to fix IE which reports 200% sometimes
	      //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
    };
    var connectToUser = function (username) {
	var config = {
	 params: {username : username},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/profile/public/connect', config,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
	}
        });
    };

    var acceptConnect = function (userId) {
	var config = {
	 params: {userId : userId},
	 headers : {'Accept' : 'application/json'}
	};
      return $http.post('/api/profile/public/acceptconnect', config,{
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
	}
        });
    };

    var getConnectionRequests = function (routeParams) {
      return $http.get('/api/get/connectionrequests', {
		headers: {
		  Authorization: 'Bearer '+ authentication.getToken()
		}
		});
    };

    var getConnections = function (routeParams) {
      return $http.get('/api/get/connections', {
		headers: {
		  Authorization: 'Bearer '+ authentication.getToken()
		}
		});
    };

    var resendMail = function () {
      return $http.get('/api/email/resend', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile,
      isUsernameUnique : isUsernameUnique,
      saveUsername : saveUsername,
      googleCallback : googleCallback,
      getCourses : getCourses,
      getTags : getTags,
      toggleWishlist : toggleWishlist,
      isWishlisted : isWishlisted,
      getForumProfile : getForumProfile,
      isEmailUnique : isEmailUnique,
      saveEmail : saveEmail,
      getPublicProfile : getPublicProfile,
      updateProfile : updateProfile,
      isEmailVerified : isEmailVerified,
      uploadImage : uploadImage,
      connectToUser : connectToUser,
      acceptConnect : acceptConnect,
      getConnectionRequests : getConnectionRequests,
      getConnections : getConnections,
      resendMail : resendMail
    };
  }

})();
