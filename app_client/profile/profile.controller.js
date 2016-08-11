(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location','$routeParams', 'meanData','$window'];
  function profileCtrl($location, $routeParams, meanData, $window) {
    var vm = this;

    vm.user = {};
if($window.localStorage['sso']){
	alert($window.localStorage['sso']);
}
    meanData.getProfile($routeParams)
      .success(function(data) {
        //vm.user = data;
	//var json_res=data;
	//alert();
	var redirect_to=data.redirect_to;
	//alert(JSON.stringify(data));	
	window.location = redirect_to;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
