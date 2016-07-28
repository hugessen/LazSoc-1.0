ngCordova Plugins:

- [cordovaNetwork](http://ngcordova.com/docs/plugins/network/)
- [cordovaCalendar](http://ngcordova.com/docs/plugins/calendar/)
- [cordovaWhiteList](http://docs.ionic.io/docs/cordova-whitelist)

So run:

    cordova plugin add cordova-plugin-calendar
    cordova plugin add cordova-plugin-network-information
    cordova plugin add cordova-plugin-whitelist


Keystore Password: np}&zz'h5a5[HcT-

Release building commands:

    cordova build --release android
    keytool -genkey -v -keystore lazsoc-release-key.keystore -alias lazsoc -keyalg RSA -keysize 2048 -validity 10000
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lazsoc-release-key.keystore android-release-unsigned.apk lazsoc
    /usr/local/opt/android-sdk/build-tools/23.0.3/zipalign -v 4 android-release-unsigned.apk LazSoc.apk
