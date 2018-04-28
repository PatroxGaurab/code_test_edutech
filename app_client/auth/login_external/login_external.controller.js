(function() {
  
  angular
    .module('meanApp')
    .controller('login_externalCtrl', ['$location','$scope','authentication','$routeParams','meanData','$window',login_externalCtrl]);

    function login_externalCtrl ($location,$scope,authentication,$routeParams, meanData, $window) {


	var vm = this;

	var googleUser = {};
if($routeParams.sso){
	$window.localStorage['sso'] = $routeParams.sso;
	$window.localStorage['sig'] = $routeParams.sig;
}
    authentication.googleCallback($routeParams)
      .success(function(data) {
        //vm.user = data;
	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));
	if(!data.username){
		$location.path('username');	
	}else if(data.userEmail.substring(0,8)=="yettoset"){
		$location.path('setemail');	
	}else {
		$location.path('profile');	
	}
	//window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          //alert(vm.credentials);
        })
        .then(function(data){
           	$location.path('profile');
	 
        });
    };
		  //vm.attachSignin = function() {
			      /*authentication
				.login_external(googleUser)
				.error(function(err){
				  alert(err);
				})
				.then(function(){
				  //$location.path('profile');
				});*/
				//$location.path('/api/login_external');
		 // }
/*	    gapi.load('auth2', function(){
	      // Retrieve the singleton for the GoogleAuth library and set up the client.
	      auth2 = gapi.auth2.init({
		client_id: '351684979720-masb6r4fokcqk13eo4qlko24qr8sbvlu.apps.googleusercontent.com',
		cookiepolicy: 'single_host_origin',
		// Request scopes in addition to 'profile' and 'email'
		//scope: 'additional_scope'
	      });
		var GoogleAuth  = gapi.auth2.getAuthInstance();
		  vm.attachSignin = function() {
                        GoogleAuth.signIn().then(function(response){//request to sign in
			    var user_ggl_name=response.getBasicProfile().getName();
			    var user_ggl_email=response.getBasicProfile().getEmail();
                            console.log(user_ggl_name +" " + user_ggl_email);
			      authentication
				.login_external(googleUser)
				.error(function(err){
				  alert(err);
				})
				.then(function(){
				  //$location.path('profile');
				});
                        });
		  }

	    });
*/
      	console.log('External controller is running');

    }

})();
