
angular.module('sbess', ['ionic', 'sbess.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MainCtrl'
  })


  .state('app.userinfo', {
      url: '/userinfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/clubselector.html',
          controller:'MainCtrl'
        }
      }
    })
    .state('app.launch', {
      url: '/launch',
      views: {
        'menuContent': {
          templateUrl: 'templates/launch.html',
          controller:'MainCtrl'
        }
      }
    })
    .state('app.newsfeed', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/newsfeed.html',
          controller: 'MainCtrl'
        }
      }
    })
    

  .state('app.event', {
    url: '/news/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/eventPage.html',
        controller: 'MainCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/news');
});
