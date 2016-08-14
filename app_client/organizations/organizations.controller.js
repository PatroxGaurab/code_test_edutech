(function() {
  
  angular
    .module('meanApp')
    .controller('organizationsCtrl', organizationsCtrl);
  organizationsCtrl.$inject = ['$location','$routeParams', 'meanData','$scope', 'authentication'];
    function organizationsCtrl ($location, $routeParams, meanData, $scope, authentication) {
    var vm = this;

    vm.organizationdata = {};

      console.log('Organizations controller is running');
	    $scope.organizations_apply = function(){
		//alert(vm.campuschampdata);
		authentication.applyOrganization({"organizationdata":vm.organizationdata})
		.success(function(data) {
		//alert(JSON.stringify(data));	
			if(data.error==1){
				organizationForm.email.$setValidity("required", false);
				 $("#organization_error_div").show();
			}else{
				//vm.campuschampdata={};
				 $("#organization_success_div").show();
			}
		})
		.error(function (e) {
		console.log(e);
		});
	    }
    }

})();

