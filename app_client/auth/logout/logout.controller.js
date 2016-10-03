(function () {

  angular
  .module('meanApp')
  .controller('logoutCtrl', logoutCtrl);

  logoutCtrl.$inject = ['$location', 'authentication'];
  function logoutCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

      authentication
        .logout();
      $location.path('profile');

  }

})();
