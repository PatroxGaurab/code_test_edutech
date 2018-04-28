(function() {
  
  angular
    .module('meanApp')
    .controller('schoolWorkshopCtrl', schoolWorkshopCtrl);
  schoolWorkshopCtrl.$inject = ['$scope'];
    function schoolWorkshopCtrl ($scope) {
      console.log('SchollWorkshop controller is running');

    }

})();

