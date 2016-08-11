(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

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
    return {
      getProfile : getProfile,
      googleCallback : googleCallback,
      getCourses : getCourses,
      getTags : getTags,
      toggleWishlist : toggleWishlist,
      isWishlisted : isWishlisted,
      getForumProfile : getForumProfile
    };
  }

})();
