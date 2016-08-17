angular.module('sbess', ['ionic', 'sbess.controllers'])
 .config(function(IonicModalNavServiceProvider) {
        IonicModalNavServiceProvider.setModalOptions({
             animation: "slide-in-up", //supports whatever Ionic supports
             focusFirstInput: false,
             backdropClickToClose: false,
             hardwareBackButtonClose: false
        });
    })
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
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/interests.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.initiallaunch_clubselector', {
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/initiallaunch/clubselector.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.initiallaunch_interests', {
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/initiallaunch/interests.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.initiallaunch_personalinfo', {
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/initiallaunch/personalinfo.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.personalinfo', {
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/personalinformation.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.clubpage', {
    params: {
      'clubId' : null
    },
    views: {
      'ionic-modal-nav@': {
        templateUrl: 'templates/clubpage.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.selectpref', {
    views: {
        'ionic-modal-nav@': {
          templateUrl: 'templates/selectpreferences.html',
          controller:'MainCtrl'
        }
    }
  })
  .state('app.clubselector', {
      views: {
        'ionic-modal-nav@': {
          templateUrl: 'templates/clubselector.html',
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
