(function() {
  
  angular
    .module('meanApp')
    .controller('pricingCtrl', pricingCtrl);
  pricingCtrl.$inject = ['$scope'];
    function pricingCtrl ($scope) {
      console.log('Pricing controller is running');

    }

})();

