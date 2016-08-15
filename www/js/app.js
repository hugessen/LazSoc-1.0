angular.module('sbess', ['ionic', 'sbess.controllers'])
.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      $cordovaStatusbar.style(1);
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'NavCtrl'
  })
  .state('app.viewpreferences', {
    url: '/viewpreferences',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewpreferences.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.interests', {
    url: '/interests',
    views: {
      'menuContent': {
        templateUrl: 'templates/interests.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.clubpage', {
    url: '/clubs/:clubId',
    views: {
      'menuContent': {
        templateUrl: 'templates/clubpage.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.clubselector', {
      url: '/clubselector',
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
