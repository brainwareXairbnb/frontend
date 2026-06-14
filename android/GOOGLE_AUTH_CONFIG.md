# Android Google Auth Configuration

## Required Files

### 1. google-services.json
**Location**: `client/android/app/google-services.json`

Download from Firebase Console → Project Settings → Your Android App

**Package Name**: `com.brainx.app`

### 2. build.gradle (Project Level)
**Location**: `client/android/build.gradle`

```gradle
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.7.3'
        classpath 'com.google.gms:google-services:4.4.0'  // ADD THIS
    }
}
```

### 3. build.gradle (App Level)
**Location**: `client/android/app/build.gradle`

Add at top:
```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'  // ADD THIS
```

Add in dependencies:
```gradle
dependencies {
    // ... existing dependencies ...

    // Firebase
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-auth'
    implementation 'com.google.android.gms:play-services-auth:20.7.0'
}
```

### 4. MainActivity.java
**Location**: `client/android/app/src/main/java/com/brainx/app/MainActivity.java`

```java
package com.brainx.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(GoogleAuth.class);
  }
}
```

## Get SHA-1 Fingerprint

Debug (for development):
```bash
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Production (for release):
```bash
keytool -list -v -keystore /path/to/your/release.keystore -alias your_alias
```

Add SHA-1 to Firebase Console → Project Settings → Your Android App → Add fingerprint

## Sync and Build

```bash
cd client
npm run cap:sync
npm run cap:open:android
```

In Android Studio, click Run to test on device.
