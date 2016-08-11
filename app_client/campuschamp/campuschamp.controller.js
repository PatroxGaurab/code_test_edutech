(function() {

  angular
    .module('meanApp')
    .controller('campuschampCtrl', campuschampCtrl);

  campuschampCtrl.$inject = ['$location','$routeParams', 'meanData','$scope', 'authentication'];
  function campuschampCtrl($location, $routeParams, meanData, $scope, authentication) {
    var vm = this;

    vm.campuschampdata = {};

    console.log("Inside campuschamp controller");

    $scope.campuschamps_apply = function(){
	//alert(vm.campuschampdata);
	authentication.applyCampuschamp({"campuschampdata":vm.campuschampdata})
	.success(function(data) {
	//alert(JSON.stringify(data));	
		if(data.error==1){
			campuschampForm.email.$setValidity("required", false);
		}
	})
	.error(function (e) {
	console.log(e);
	});
    }
  }

})();
