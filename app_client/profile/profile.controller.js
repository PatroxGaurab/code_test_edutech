(function() {
    angular.module('meanApp');
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','$routeParams', 'meanData', '$scope', '$http', 'Upload'];
  function profileCtrl($location, $routeParams, meanData, $scope, $http, Upload) {
    var vm = this;

    vm.user = {};
    vm.jsondata = {};
    meanData.getProfile($routeParams)
      .success(function(data) {
        vm.jsondata = data;
	//var json_res=data;
	//alert();
	//var redirect_to=data.redirect_to;
	alert(JSON.stringify(data));	
	//window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });

	    $scope.getCommitData = function() {
		IN.API.Profile("me").fields(
		        [ "id", "firstName", "lastName", "pictureUrl",
		                "publicProfileUrl", "headline", "summary", "location", "positions" ]).result(function(result) {
		    //set the model
		    $scope.$apply(function() {
		        $scope.jsondata = result.values[0];
		    });
		}).error(function(err) {
		    $scope.$apply(function() {
		        $scope.error = err;
		    });
		});
	    };

	    $scope.profileNameUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"name":vm.user.name} })
		      .success(function(data) {
			//vm.user = data;
			alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileHeadlineUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"headline":$scope.jsondata.headline} })
		      .success(function(data) {
			//vm.user = data;
			alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileLocationUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"location":$scope.jsondata.location.name} })
		      .success(function(data) {
			//vm.user = data;
			alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	    $scope.profileExperienceUpdate = function() {
		    meanData.updateProfile({ "updateParam" : {"experience":$scope.jsondata.positions.values} })
		      .success(function(data) {
			//vm.user = data;
			alert(JSON.stringify(data));
		      })
		      .error(function (e) {
			console.log(e);
		      });

	    };

	  $scope.addNewExperience = function() {
	    var newItemNo = $scope.jsondata.positions.values.length+1;
	    $scope.jsondata.positions.values.push({'id':newItemNo});
	//alert(newItemNo);
	  };

	  $scope.removeExperience = function() {
	    var lastItem = $scope.jsondata.positions.values.length-1;
	    $scope.jsondata.positions.values.splice(lastItem);
	  };

    $scope.uploadPic = function(file) {
	    meanData.uploadImage(file)
	      .success(function(data) {
		alert(JSON.stringify(data));	
		//window.location = redirect_to;
	      })
	      .error(function (e) {
		console.log(e);
	      });

    };


  }

})();
