(function () {

  angular
    .module('meanApp')
    .controller('footerCtrl', footerCtrl);

  footerCtrl.$inject = ['$location','authentication'];
  function footerCtrl($location, authentication) {
    var vm = this;


  }

})();
