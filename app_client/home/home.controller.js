(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);
  homeCtrl.$inject = ['$scope'];
    function homeCtrl ($scope) {
      console.log('Home controller is running');

    }

})();

