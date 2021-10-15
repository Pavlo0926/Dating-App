package com.pluzo.detector;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.nipunru.nsfwdetector.NSFWDetector;

import java.io.File;
import java.io.FileInputStream;

import kotlin.Unit;
import kotlin.jvm.functions.Function3;

public class ImageDetectorModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    ImageDetectorModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ImageDetector";
    }

    @ReactMethod
    public void check(String imagePath, Callback callback) {
        Bitmap bitmap = getBitmap(imagePath.replace("file:///", "/"));
        if (bitmap != null) {
            NSFWDetector.INSTANCE.isNSFW(bitmap, 0.7F, new Function3<Boolean, Float, Bitmap, Unit>() {
                @Override
                public Unit invoke(Boolean isNSFW, Float aFloat, Bitmap bitmap) {
                    callback.invoke(isNSFW ? "NSFW" : "SFW");
                    return null;
                }
            });
        } else {
            callback.invoke("Error");
        }
    }

    public Bitmap getBitmap(String path) {
        Bitmap bitmap=null;
        try {
            File f= new File(path);
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;
            bitmap = BitmapFactory.decodeStream(new FileInputStream(f), null, options);
        } catch (Exception e) {
            return null;
        }
        return bitmap ;
    }
}
