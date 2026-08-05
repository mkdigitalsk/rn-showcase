import com.google.firebase.appdistribution.gradle.firebaseAppDistribution
import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.react.native)
    alias(libs.plugins.google.services)
    alias(libs.plugins.firebase.crashlytics)
    alias(libs.plugins.firebase.distribution)
}

apply(from = "../../node_modules/react-native-vector-icons/fonts.gradle")

react {
    autolinkLibrariesWithApp()
    if (project.hasProperty("bundleDebugJs")) {
        debuggableVariants.set(listOf("debugOptimized"))
    }
}

val keystorePropertiesFile = project.file("keystore.properties")
val keystoreProperties = Properties()

if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(keystorePropertiesFile.inputStream())
}

val localPropertiesFile = rootProject.file("local.properties")
val localProperties = Properties()

if (localPropertiesFile.exists()) {
    localProperties.load(localPropertiesFile.inputStream())
}

val hasSigningProperties = keystoreProperties.isNotEmpty()

android {
    ndkVersion = libs.versions.ndk.get()
    buildToolsVersion = libs.versions.build.tools.get()
    compileSdk = libs.versions.compile.sdk.get().toInt()

    namespace = "sk.mkdigital.rnshowcase"

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    defaultConfig {
        applicationId = "sk.mkdigital.rnshowcase"
        minSdk = libs.versions.min.sdk.get().toInt()
        targetSdk = libs.versions.target.sdk.get().toInt()
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
        if (hasSigningProperties) {
            create("release") {
                storeFile = file(keystoreProperties["storeFile"] as String)
                storePassword = keystoreProperties["storePassword"] as String
                keyAlias = keystoreProperties["keyAlias"] as String
                keyPassword = keystoreProperties["keyPassword"] as String
            }
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
            signingConfig = signingConfigs.getByName("debug")

            firebaseAppDistribution {
                appId = "1:398615081925:android:0fcfefbdaf1112fb5611ac"
                artifactType = "APK"
                groups = localProperties["fb.test.group"]?.toString() ?: "testers"
            }
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            isDebuggable = false

            val extraProguardFiles = fileTree("$projectDir/proguard") {
                include("*.pro")
            }.files.toTypedArray()

            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                *extraProguardFiles
            )

            if (hasSigningProperties) {
                signingConfig = signingConfigs.getByName("release")
            }

            firebaseAppDistribution {
                appId = "1:398615081925:android:d7c6a6e6061a32fa5611ac"
                artifactType = "APK"
                groups = localProperties["fb.test.group"]?.toString() ?: "testers"
            }
        }
    }
}

dependencies {
    implementation("com.facebook.react:react-android")

    val hermesEnabled: String by project
    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation("org.webkit:android-jsc:+")
    }
}
