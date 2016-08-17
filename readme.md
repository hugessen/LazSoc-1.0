# TODO:

- [x] Implement validation on the email within the initial launch modal to make sure it's a @mylaurier.ca email
- [x] Fix 'Subscribe' button on club page to actually work
- [ ] Pull clubs & interests from an API
- [ ] Minimize the number of calls made to the API
- [ ] Add in clubs & interest selector into the initial launch modal
- [x] Add in end date to events
- [x] Fix spacing on the newsfeed so that the last event is not hidden by the tabs
- [x] Fix social media buttons on event pages
- [ ] Fix social media follow buttons on club pages
- [ ] Establish standard for "Place" for each event, i.e. if it has room number it should say "P1005, Peters" for each event
- [ ] Ensure if no banner specified for event then no banner is displayed
- [ ] Swipe to go back a page
- [ ] "Select all" for club and interest selector pages
- [ ] Discount card page
- [ ] Make LazSoc subscription mandatory
- [ ] Cut off date for 'past' tab, i.e. show only the past 2 weeks (Do this on the API side)
- [ ] Add in checks to make sure that if they're in the preferences selector or initial launch tab, we notify them when they do stuff like leave the page when they change stuff and didn't save, or if they don't select anything, etc.
- [ ] Make preference saving and prefernce modal saving more robust so that even if the users internet is hugely lagging then we still load their latest preferences

# Suggestions to consider

- Calendar view of upcoming events
- Photo gallary for events
- My tickets area 
- My clubs area for the clubs you've bought premium membership for
- A way to show which events require a ticket vs which ones dont
- Include links to buy event tickets

# Notes
Currently, iOS will only be allowed to open twitter/facebook app. To allow more, *platforms/ios/LazSoc/LazSoc-Info.plist* needs to be updated to include the new URLs. More info [here](http://stackoverflow.com/questions/30987986/ios-9-not-opening-instagram-app-with-url-scheme) and [here](https://github.com/ohh2ahh/AppAvailability/issues/22). Current entry is:

    <key>LSApplicationQueriesSchemes</key>
	<array>
	    <string>fb</string>
	    <string>twitter</string>
	</array>


ngCordova Plugins:

- [cordovaNetwork](http://ngcordova.com/docs/plugins/network/)
- [cordovaCalendar](http://ngcordova.com/docs/plugins/calendar/)
- [cordovaWhiteList](http://docs.ionic.io/docs/cordova-whitelist)
- [cordovaInAppBrowser](http://ngcordova.com/docs/plugins/inAppBrowser/)
- [cordovaAppAvailability](https://github.com/ohh2ahh/AppAvailability)

So run:

    cordova plugin add cordova-plugin-calendar
    cordova plugin add cordova-plugin-network-information
    cordova plugin add cordova-plugin-whitelist
    cordova plugin add cordova-plugin-inappbrowser
    cordova plugin add cordova-plugin-appavailability
    cordova prepare


Keystore Password: np}&zz'h5a5[HcT-

Release building commands:

    cordova build --release android
    keytool -genkey -v -keystore lazsoc-release-key.keystore -alias lazsoc -keyalg RSA -keysize 2048 -validity 10000
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lazsoc-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk lazsoc
    /usr/local/opt/android-sdk/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk LazSoc.apk
