(function() {
  
  angular
    .module('meanApp')
    .controller('blogCtrl', blogCtrl);
  blogCtrl.$inject = ['$scope'];
    function blogCtrl ($scope) {
      console.log('Blog controller is running');

    }

})();

