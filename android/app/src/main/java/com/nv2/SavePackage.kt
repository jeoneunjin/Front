package com.nv2

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class SavePackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*,*>> = emptyList()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(SaveModule(reactContext)).toMutableList()
}