(function () {

  angular
    .module('meanApp')
    .controller('footerCtrl', footerCtrl);

  footerCtrl.$inject = ['$location','authentication'];
  function footerCtrl($location, authentication) {
    var vm = this;
    vm.contactdata = {};

    vm.contact_msg = function(){
	//alert(vm.campuschampdata);
	authentication.sendContactMessage({"contactdata":vm.contactdata})
	.success(function(data) {
	//alert(JSON.stringify(data));	
		if(data.error==1){
			campuschampForm.email.$setValidity("required", false);
		}
		 vm.contactdata={};
		 $("#contact_success_div").show();
	})
	.error(function (e) {
	console.log(e);
	});
    }
  }

})();
