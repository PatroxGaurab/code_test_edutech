(function() {
  
  angular
    .module('meanApp')
    .controller('usernameCtrl', ['$location','$scope','authentication','$routeParams','meanData',usernameCtrl]);

    function usernameCtrl ($location,$scope,authentication,$routeParams, meanData) {

	$("#username_input").focus();
	var vm = this;
  $scope.$watch("username", function(newValue, oldValue) {
	  if(newValue.length>2){	
		  $scope.usernameLength = true;
		  $scope.checking = true;
	    meanData.isUsernameUnique($scope.username)
	      .success(function(data) {
		//alert(JSON.stringify($scope.username));

			$scope.usernameExists = !data.is_unique;

	      })
	      .error(function (e) {
		console.log(e);
	      })
	      .finally(function() {
		  $scope.checking = false;
	      });
	  }else{
		$scope.usernameLength = false;
	  }
    //return true;
  });

    vm.onSubmit = function () {
      meanData
        .saveUsername($scope.username)
        .error(function(err){
          alert(err);
        })
        .then(function(){

	    meanData.getProfile($routeParams)
	      .success(function(data) {
		if(data.email.substring(0,8)=="yettoset"){
			$location.path('setemail');	
		}else {
			$location.path('profile');	
		}
	      })
	      .error(function (e) {
		console.log(e);
	      });
        });
    };
	$("#username_input").focus();
      	console.log('Username controller is running');

    }

})();

