(function() {
  
  angular
    .module('meanApp')
    .controller('forumprofileCtrl', forumprofileCtrl);

  forumprofileCtrl.$inject = ['$location','$routeParams', 'meanData'];
  function forumprofileCtrl($location, $routeParams, meanData) {
    var vm = this;

    vm.user = {};

    meanData.getForumProfile($routeParams)
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
