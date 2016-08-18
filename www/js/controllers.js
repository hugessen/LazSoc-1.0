angular.module('sbess.controllers', ['ionic','sbess.services','ngCordova','sbess.utils', 'IonicModalNav'])
.controller('NavCtrl', ['$scope', '$location','$stateParams', function($scope, $location, $stateParams) {  
}])

.controller('MainCtrl', ['$scope', '$location','$stateParams','WebAPI', '$ionicModal', '$timeout','$cordovaCalendar','$ionicPopup','$localstorage','$http','ConnectivityMonitor', '$ionicPlatform', '$ionicHistory', '$state','$ionicScrollDelegate', '$ionicSideMenuDelegate', 'IonicModalNavService', function($scope, $location, $stateParams, WebAPI, $ionicModal, $timeout,$cordovaCalendar,$ionicPopup,$localstorage,$http,ConnectivityMonitor, $ionicPlatform, $ionicHistory, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, IonicModalNavService) {
/*
* Initial Launch
* Checks if the user has registered. If not, prompts them for their personal info, then gets them to 
* The initial launch html pages are kept seperate ON PURPOSE. This allows for very east customization of those pages without having to jump through countless hoops.
*/
  $scope.personalData = {
    isRegistered: false,
    firstName: '',
    lastName: '',
    laurierID: '',
    subscribed: false
  };
  $scope.isInitialLaunch = false;

  function isEmptyObject(obj){
    return JSON.stringify(obj) == '{}' || obj == null;
  }

  $scope.openInitialLaunch = function(){
    IonicModalNavService.show('app.initiallaunch_personalinfo');
  }

  $scope.validatePersonalInfo = function(silently) {
    if(silently == null) {
      silently = false;
    }
    $scope.personalData.isRegistered = false;
    if ($scope.personalData.firstName === '' || $scope.personalData.lastName === '' || $scope.personalData.laurierID === '') {
      if (!silently) {
        $ionicPopup.alert({
          title: 'Please enter all fields to continue'
        });
      }
    } else {
      var laurierID = $scope.personalData.laurierID;
      isValidID = laurierID.length == 21 && laurierID.substring(8) === '@mylaurier.ca' && !isNaN(laurierID.substring(4,8));
      if (isValidID){
        $scope.personalData.isRegistered = true;
      } else {
        if(!silently) {
          $ionicPopup.alert({
            title: 'Please enter a valid MyLaurier E-Mail.'
          });
        }
      }
    }
    return $scope.personalData.isRegistered;
  }

  $scope.checkPersonalData = function(silently) {
    if(silently == null) {
      silently = false;
    }
    //$localstorage.setObject('sbess-app-personalData', {})
    if (isEmptyObject($localstorage.getObject('sbess-app-personalData'))) { 
      $scope.isInitialLaunch = true;
      $scope.openInitialLaunch();
    } else {
        $scope.personalData = $localstorage.getObject('sbess-app-personalData');
        var result = $scope.validatePersonalInfo(silently);
        if(!result) {
          $scope.isInitialLaunch = true;
          $scope.openInitialLaunch();
        }
    }
  }


  $scope.checkPersonalData(true);

  $scope.initialLaunchNextStep = function(){
    var state = $ionicHistory.currentView();
    var stateName = state.stateName;
    if (stateName == 'app.initiallaunch_personalinfo') {
      var result = $scope.validatePersonalInfo(false);
      if(result) {
        $scope.savePrefs('personalData', true);
        console.log('Valid personal info, moving to club selector');
        IonicModalNavService.go('app.initiallaunch_clubselector');
      }
    } else if (stateName == 'app.initiallaunch_clubselector') {
      $scope.savePrefs('clubs', true);
      console.log('Moving to interest selector');
      IonicModalNavService.go('app.initiallaunch_interests');
    } else if (stateName == 'app.initiallaunch_interests') {
      $scope.savePrefs('categories', true);
      console.log('Finished initial launch.');
      IonicModalNavService.hide();
      $state.go('app.newsfeed');
    }
  }

$scope.initialLaunchGoBack = function(data) {
  IonicModalNavService.goBack(data);
}
$scope.openPreferenceModal = function() {
  IonicModalNavService.show('app.selectpref');
}
/*$scope.$on('refreshAll', function(ev, args){
  $scope.reloadFeed();
  $scope.prefOptions = WebAPI.getPrefOptions();
});*/
$scope.preferencesClose = function() {
  IonicModalNavService.hide();
  $state.go('app.viewpreferences');
  //IonicModalNavService.destroy();
}
$scope.preferencesSavePersonalData = function() {
  var result = $scope.validatePersonalInfo();
  if(result) {
    $scope.savePrefs('personalData');
  }
}

IonicModalNavService.onBack(function(data) {
  if(data.reload) {
    try {
      $scope.clubs = WebAPI.getAllClubs();
      $scope.$apply();
    } catch (err) {
      console.log("Error caught in apply()");
      console.log(err);
    }    
  }
});

$scope.preferencesGoBack = function() {
  var state = $ionicHistory.currentView();
  var stateName = state.stateName;
  var data = null;
  if (stateName == 'app.selectpref') {
    // app.selectpref should never occur as a statename because of the fact that it should call modal close, not back
    // but if it does, just call the close function instead
    $scope.preferencesClose();
  } else if (stateName == 'app.personalinfo') {

  } else if (stateName == 'app.clubpage_modal') {
    data = {
      reload: true
    };
  } else if (stateName == 'app.interests') {

  } else if (stateName == 'app.clubselector') {

  }

  IonicModalNavService.goBack(data);
}
$scope.preferencesChangePage = function(type) {
  IonicModalNavService.go(type);
}

/*
* Clubs
* This section pulls all the clubs from the API, and provides functionality to add it as a preferred club
*/
  $scope.clubs = WebAPI.getAllClubs();
  $scope.toggle = function(id){
    for(var x = 0; x < $scope.clubs.length; x++) {
      if($scope.clubs[x].id == id) {
        $scope.clubs[x].selected = ! $scope.clubs[x].selected; 
      }
    }
    //$ionicHistory.clearCache();
  }
        
  $scope.currClub = WebAPI.getClub($stateParams.clubId);
  $scope.getCurrClubSocialLinkCount = function() {
    console.log
    if($scope.currClub) {
      var result = 0;
      var resultArr = [];
      if($scope.currClub.social) {
        if($scope.currClub.social.facebook) {
          result += 1;
          resultArr.push({
            type: 'facebook',
            link: $scope.currClub.social.facebook,
            color: '#3b5998',
            icon: 'ion-social-facebook'
          });
        }
        if($scope.currClub.social.twitter) {
          result += 1;
          resultArr.push({
            type: 'twitter',
            link: $scope.currClub.social.twitter,
            color: '#00aced',
            icon: 'ion-social-twitter'
          });

        }
        if($scope.currClub.social.instagram) {
          result += 1;
          resultArr.push({
            type: 'instagram',
            link: $scope.currClub.social.instagram,
            color: '#c42da5',
            icon: 'ion-social-instagram'
          });

        }
        if($scope.currClub.social.youtube) {
          result += 1;
          resultArr.push({
            type: 'youtube',
            link: $scope.currClub.social.youtube,
            color: '#bb0000',
            icon: 'ion-social-youtube'
          });
        }
        if($scope.currClub.social.snapchat) {
          result += 1;
          resultArr.push({
            type: 'snapchat',
            link: $scope.currClub.social.snapchat,
            color: '#eeee00',
            icon: 'ion-social-snapchat'
          });
        }
        if($scope.currClub.social.linkedin) {
          result += 1;
          resultArr.push({
            type: 'linkedin',
            link: $scope.currClub.social.linkedin,
            color: '#007bb6',
            icon: 'ion-social-linkedin'
          });
        }
      }
      if ($scope.currClub.website) {
        result += 1;
        resultArr.push({
          type: 'website',
          link: $scope.currClub.website,
          color: '#13db3d',
          icon: 'ion-ios-world-outline'
        });
      }
      $scope.currClubSocialLinks = resultArr;
      $scope.currClubSocialCount = result;
    }
  }
  $scope.getCurrClubEventCount = function () {
    if($scope.currClub) {
      var result = 0;
      for(var x = 0; x < $scope.events.length; x++) {
        if ($scope.events[x].club.slug == $scope.currClub.slug) {
          result += 1;
        }
      }
      $scope.currClubEventCount = result;
    }
  }
  $scope.getClubSubCount = function() {
    var result = 0;
    for(var x = 0; x < $scope.clubs.length; x++) {
      if(! $scope.clubs[x].removed && $scope.clubs[x].selected) {
        result += 1;
      }
    }
    return result;
  }
  $scope.clubSubCount = $scope.getClubSubCount();

  //The app accesses the club description pages through URL routing. We do that here
  $scope.navigateToClubModal = function(clubID){
    IonicModalNavService.go('app.clubpage_modal', { clubId: clubID });
  }  
  $scope.navigateToClubPage = function(clubID) {
    $state.go('app.clubpage', { clubId: clubID });
  }

/*
* Newsfeed
* Here we determine which events will populate our newsfeed based on the user's interests. 
* Allows the user to refresh by pulling down
*/
$scope.filterBy = "custom";
$scope.filterByTime = "thisweek";
$scope.connectionNotifier = false; // So that the 'no network connection' popup only appears once
$scope.reloadFeed = function() {
    WebAPI.getAllEvents().then(function(APIresult){
      console.log("Got events");
        $scope.events = APIresult.data;
        $scope.getCurrClubEventCount(); // Call this function to get curr club event count when events load
        $scope.getCurrClubSocialLinkCount(); // Call this function to get social link count when events load to make the page more resnponsive
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show
        $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
    }, function(error){
        $ionicPopup.alert({
          title:"Oh snap!",
          template: "For some reason we couldn't get your custom newsfeed, please check your internet connection and try again."
        });
    });
    
}
//$scope.dummyEvents = WebAPI.dummyEvents;
  $scope.reloadFeed();
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     // handle event
     if (data.stateId == 'app.newsfeed') {
        $scope.reloadFeed();
     }
  }); 
  
  $scope.doRefresh = function() {
    if(ConnectivityMonitor.isOnline()){  
        $scope.reloadFeed();
    }
    else{
        $ionicPopup.alert({
          title:"Oh snap!",
          template: "You're not connected. \n Try again later though!"
        });
    }
    $scope.$broadcast('scroll.refreshComplete');
  };
  ConnectivityMonitor.startWatching();
  
  $scope.setNewsfeedType = function(tabData) {
    $ionicScrollDelegate.scrollTop();
    $scope.filterBy = tabData;
    $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
  }
  $scope.setNewsfeedTimeperiod = function (timeperiod) {
    $ionicScrollDelegate.scrollTop();
    $scope.filterByTime = timeperiod;
    $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
  }

$scope.rightNewsfeedSwipe = function() {
  if($scope.filterByTime == 'past') {

  } else if ($scope.filterByTime == 'thisweek') {
    $scope.setNewsfeedTimeperiod('past');
    $ionicSideMenuDelegate.canDragContent(true);
  } else if ($scope.filterByTime == 'nextweek') {
    $scope.setNewsfeedTimeperiod('thisweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'upcoming') {
    $scope.setNewsfeedTimeperiod('nextweek');
    $ionicSideMenuDelegate.canDragContent(false);
  }
  console.log("right swipe");
}

$scope.leftNewsfeedSwipe = function() {
  if($scope.filterByTime == 'past') {
    $scope.setNewsfeedTimeperiod('thisweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'thisweek') {
    $scope.setNewsfeedTimeperiod('nextweek');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'nextweek') {
    $scope.setNewsfeedTimeperiod('upcoming');
    $ionicSideMenuDelegate.canDragContent(false);
  } else if ($scope.filterByTime == 'upcoming') {

  }

  console.log("left swipe");
}

/*
* Social Media
* The app utilizies social media to share events, clubs, etc as well as linking to partner social media handles. This gives the functionality to share items through various social media platforms. 
*/ 
$scope.openSocialLink = function(type, link) {
  if (type == 'facebook') {
      window.open($scope.currClub.social.facebook, '_system');
  } else if (type == 'linkedin'){
      window.open($scope.currClub.social.linkedin, '_system');
  } else if (type == 'twitter'){
      window.open($scope.currClub.social.twitter, '_system');
  } else if (type == 'youtube'){
      window.open($scope.currClub.social.youtube, '_system');
  } else if (type == 'snapchat') {
    window.open("http://www.snapchat.com/add/" + $scope.currClub.social.snapchat, '_system');
  } else if (type == 'instagram') {
    window.open($scope.currClub.social.instagram, '_system');
  } else if (type == 'website') {
    window.open($scope.currClub.website, '_system');
  }
}
$scope.openFbEvent = function(){
    window.open($scope.currEvent.facebookEvent, '_system');
}
/*
* Sample usage:
* oldOpenSocialLink('https://www.facebook.com/events/1090875194312444/', 'fb://events/1090875194312444', 'fb://', 'com.facebook.katana');
* This function is not used because applinks are undocumented and can be changed by the developer without any notice or update
*/
$scope.oldOpenSocialLink = function(httplink, applink, iOSScheme, androidScheme) {
  var scheme = null;
  if (ionic.Platform.isAndroid()) {
    scheme = androidScheme;
  } else if (ionic.Platform.isIOS()) {
    scheme = iOSScheme;
  }
  if(scheme) {
    appAvailability.check(
      scheme,
      function() {
        // They have the app
        window.open(applink, '_system');
        console.log("Opening app link");
      },
      function() {
        // They don't have the app
        window.open(httplink, '_system');
        console.log(httplink);
        console.log("Opening http link, with scheme");
      }
    );
  } else {
    // If platform not Android or iOS or scheme is not inputted, open the httplink in browser
    window.open(httplink, '_system');
    console.log("Opening http link, no scheme");
  }
}
  
/*
* Events
* App accesses events through URL routing. Gives functionality to add events and their info to calendar through Cordova
*/
  $scope.loadEvent = function(id){
    $state.go('app.event', { eventId: id });
  }
  WebAPI.getAllEvents().then(function(APIresult){
    console.log("Got events");
    $scope.currEvent = APIresult.data[$stateParams.eventId];
  })
  //Adding events to the calendar
  $scope.addToCalendar = function() {
    try {
      var notes = $scope.currEvent.desc;
      var endDate = $scope.currEvent.endDate;
      $cordovaCalendar.createEventInteractively({
        title: $scope.currEvent.title,
        location: $scope.currEvent.location,
        notes: notes,
        startDate: new Date($scope.currEvent.startDate),
        endDate: new Date($scope.currEvent.endDate)
      }).then(function(result) {
          
      }, function(err) {
        console.log(err);
        $ionicPopup.alert({
          title:"First one!",
          template: ""+err//"There was an error while trying to add " + $scope.currEvent.title + " to your calendar. Please try again!"
        });
        // error
      });
    } catch (err) {
      console.log(err);
      $ionicPopup.alert({
        title:"Second one!",
        template: ""+err//"There was an error while trying to add " + $scope.currEvent.title + " to your calendar. Please try again!"
      });
    }
  }
  
/*
* Preferences and Interest Selector
* Here we manage all the user's club and categorical preferences, save them in JSON, and use them to customize their feed
*/
  $scope.prefOptions = WebAPI.getPrefOptions(); //Returns an array of categorical preferences

  $scope.getPrefCount = function() {
    var result = 0;
    for(var x = 0; x < $scope.prefOptions.length; x++) {
      if ($scope.prefOptions[x].selected) {
        result += 1;
      }
    }
    return result;
  }
  $scope.prefCount = $scope.getPrefCount();

  $scope.togglePrefs = function(id){
      for(var x = 0; x < $scope.prefOptions.length; x++) {
      if($scope.prefOptions[x].id == id) {
        $scope.prefOptions[x].selected = ! $scope.prefOptions[x].selected; 
      }
    }
    //$ionicHistory.clearCache();
  }
  $scope.debug = function(){
      $ionicPopup.alert({
          title:"Debugging!",
      });
  }

  /*
  * Applying filters for newsfeed
  * Here the newsfeed is generated based upon the filters the user selected. This applies both time and interest/club filters at once.
  */
  $scope.applyFilters = function(newsfeed) {
    var source = [];
    var result = [];
    if($scope.filterBy == 'custom') {
      source = $scope.customFeed;
    } else { // All
      source = $scope.events;
    }
    var curr = new Date();
    if ($scope.filterByTime == 'thisweek') {
      var today = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      var one_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time >= today && event_start_time <= one_week) {
          result.push(source[x]);
        }
      }
    } else if ($scope.filterByTime == 'nextweek') {
      var one_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      var two_weeks = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time >= one_week && event_start_time <= two_weeks) {
          result.push(source[x]);
        }
      }
    } else if ($scope.filterByTime == 'past') {
      var today = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      console.log(today);
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time < today) {
          result.push(source[x]);
        }
      }
    } else { // Upcoming
      var two_week = new Date(curr.setDate(curr.getDate() - curr.getDay() + 14));
      for(var x = 0; x < source.length; x++) {
        var event_start_time = new Date(source[x].startDate);
        if(event_start_time > two_weeks ) {
          result.push(source[x]);
        }
      }
    }
    return result;
  }

  $scope.goToPrefPage = function() {
    $state.go('app.viewpreferences');
  }

  //Activated when user presses Save. Commits all preferences and stores them in JSON
  $scope.savePrefs = function(prefType, silently){
    if(silently == null) {
      silently = false;
    }

    if(prefType == "personalData") {
      $localstorage.setObject('sbess-app-personalData', $scope.personalData);
      console.log('Saving personal data');
    } else if (prefType == "clubs"){ // If we're on the club selector
      $scope.saveClubPreferences();
      console.log("Saving clubs");
    } else if (prefType =="categories"){ //If we're on the category selector
      $scope.saveInterests();
      console.log("Saving preferences");
    } else if (prefType == 'all') { // If we're on the preference page selector
      $scope.saveClubPreferences();
      $scope.saveInterests();
      console.log("Saving preferences and clubs");
    }
    if (!silently) {
      $ionicPopup.alert({
       title: 'Preferences Updated',
      });      
    }
  }

  $scope.saveInterests = function () { 
    var to_save = $scope.prefOptions;
    for(var x = 0; x < to_save.length; x++) {
      if(to_save[x].hasOwnProperty('$$hashKey')) {
        delete to_save[x]['$$hashKey'];
      }
    }
    $localstorage.setObject('sbess-app-prefs', to_save);
  }

  $scope.saveClubPreferences = function() {
    var to_save = $scope.clubs;
    for(var x = 0; x < to_save.length; x++) {
      delete to_save[x]['$$hashKey'];
    }
    $localstorage.setObject('sbess-app-clubPrefs', to_save);
    WebAPI.getAllEvents().then(function(APIresult){
      console.log("Got events");
        $scope.events = APIresult.data;
        $scope.customFeed = WebAPI.getCustomFeed(APIresult.data); //A big, long function that determines which events to show
        $scope.filteredFeed = $scope.applyFilters($scope.customFeed);
      }, function(error){
        if(!silently) {
          $ionicPopup.alert({
            title:"Oh snap!",
            template: "For some reason we couldn't get your new custom newsfeed after saving your preferences, please check your internet connection and try again."
          });
        }
      });
  }

}])


.controller('cssCtrl', ['$scope',function($scope){
  $scope.customCss.push(
    { href : 'css/ionic.app.css', type: 'text/css' },
    { href : 'css/style.css', type : 'text/css' });
    if(ionic.Platform.isAndroid()) {
      $scope.customCss.push({ href : 'css/android.css', type : 'text/css' });
    }
}])