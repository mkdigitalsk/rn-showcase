package com.rnmvvm

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyCustomModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "MyCustomModule"

    @ReactMethod
    fun sayHello(name: String, promise: Promise) {
        promise.resolve("Hello $name from Kotlin")
        println("Hello, $name")
    }

    @ReactMethod
    fun returnValueTest(number: Int, promise: Promise) {
        promise.resolve(number + 1)
    }
}
