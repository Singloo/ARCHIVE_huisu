package com.old_fasion;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
// import cn.reactnative.httpcache.HttpCachePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.kishanjvaghela.cardview.RNCardViewPackage;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
 
//on
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RNSharePackage(),
            new PickerPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new BlurViewPackage(),
            new RNCardViewPackage()
        
      );
    }
    //new
    // @Override
    // protected String getJSMainModuleName() {
    //   return "index.android";
    // }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
