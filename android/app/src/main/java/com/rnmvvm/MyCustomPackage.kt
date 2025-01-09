package com.rnmvvm

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyCustomPackage : ReactPackage {
    override fun createNativeModules(reactApplicationContext: ReactApplicationContext): List<NativeModule> =
        listOf(MyCustomModule(reactApplicationContext))

    override fun createViewManagers(reactApplicationContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
