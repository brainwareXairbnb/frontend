# iOS Google Auth Configuration

## Required Files

### 1. GoogleService-Info.plist
**Location**: `client/ios/App/App/GoogleService-Info.plist`

Download from Firebase Console → Project Settings → Your iOS App

**Bundle ID**: `com.brainx.app`

**To Add in Xcode:**
1. Open Xcode: `npm run cap:open:ios`
2. Right-click "App" folder → "Add Files to App"
3. Select `GoogleService-Info.plist`
4. Check "Copy items if needed"
5. Click "Add"

### 2. Info.plist Configuration
**Location**: `client/ios/App/App/Info.plist`

Add URL scheme (get REVERSED_CLIENT_ID from GoogleService-Info.plist):

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.googleusercontent.apps.YOUR-CLIENT-ID</string>
        </array>
    </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
    <string>googlegmail</string>
    <string>googlemail</string>
</array>
```

### 3. AppDelegate.swift
**Location**: `client/ios/App/App/AppDelegate.swift`

```swift
import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }
}
```

## Install CocoaPods

```bash
cd client/ios/App
pod install
```

## Configure URL Scheme in Xcode

1. Select your app target
2. Go to "Info" tab
3. Expand "URL Types"
4. Click "+" to add new
5. In "URL Schemes", paste your REVERSED_CLIENT_ID from GoogleService-Info.plist
   - Example: `com.googleusercontent.apps.123456789012-abc123def456`
6. Save

## Sync and Build

```bash
cd client
npm run cap:sync
npm run cap:open:ios
```

In Xcode, select device/simulator and click Run to test.

## Troubleshooting

If you get "Module not found" errors:
```bash
cd client/ios/App
pod deintegrate
pod install
cd ../../..
npm run cap:sync
```
