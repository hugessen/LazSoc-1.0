angular.module('sbess.controllers', [])

.controller('MainCtrl', ['$scope', '$ionicModal', '$timeout',function($scope, $ionicModal, $timeout) {

  
  $ionicModal.fromTemplateUrl('templates/userinfo.html', {
    scope:$scope,
    animation: 'slide-in-up'   
    
  }) 
  .then(function(modal) {
    $scope.userInfoModal = modal;
  })
  
  $scope.openUserInfoModal = function() {
    $scope.userInfoModal.show();
  }
  $scope.closeUserInfoModal = function() {
    $scope.userInfoModal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.userInfoModal.remove();
  });
  $scope.richard = "Richard";
}])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
