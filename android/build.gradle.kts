plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.google.services) apply false
    alias(libs.plugins.firebase.crashlytics) apply false
    alias(libs.plugins.react.native.root)
}

// Required by React Native auto-linked libraries that read from rootProject.ext
val buildToolsVersion by extra(libs.versions.build.tools.get())
val minSdkVersion by extra(libs.versions.min.sdk.get().toInt())
val compileSdkVersion by extra(libs.versions.compile.sdk.get().toInt())
val targetSdkVersion by extra(libs.versions.target.sdk.get().toInt())
val ndkVersion by extra(libs.versions.ndk.get())
val kotlinVersion by extra(libs.versions.kotlin.get())
