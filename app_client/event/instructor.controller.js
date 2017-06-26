(function() {
  
  angular
    .module('meanApp')
    .controller('instructorCtrl', instructorCtrl);
  instructorCtrl.$inject = ['$scope'];
    function instructorCtrl ($scope) {
      console.log('Instructor controller is running');

    }

})();

