# ----------------------------
# React Native / Hermes
# ----------------------------
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# ----------------------------
# Android Components
# ----------------------------
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver

# ----------------------------
# OkHttp (used by Axios/React Native)
# ----------------------------
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep class okio.** { *; }

# ----------------------------
# DTOs
# ----------------------------
-keep class com.mk.rnshowcase.data.dto.** { *; }

# ----------------------------
# Logs — strip verbose/debug in release
# ----------------------------
-keepattributes SourceFile,LineNumberTable

-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int wtf(...);
}
