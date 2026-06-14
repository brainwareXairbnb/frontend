package com.brainx.app;

import android.app.Dialog;
import android.os.Build;
import android.os.Bundle;
import android.os.Message;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowInsetsController;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.WebViewClient;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Switch from launch theme to main theme before super.onCreate
        setTheme(R.style.AppTheme_NoActionBar);

        super.onCreate(savedInstanceState);

        // Configure system bars
        configureSystemBars();
        
        // Configure WebView settings for Razorpay payments
        WebView webView = this.bridge.getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);
            settings.setSupportMultipleWindows(true);
            settings.setDomStorageEnabled(true);
            
            // Enable cookies and third-party cookies (essential for 3D Secure bank redirects)
            CookieManager cookieManager = CookieManager.getInstance();
            cookieManager.setAcceptCookie(true);
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                cookieManager.setAcceptThirdPartyCookies(webView, true);
            }
            
            // Set custom WebChromeClient extending BridgeWebChromeClient to handle popups (onCreateWindow)
            webView.setWebChromeClient(new BridgeWebChromeClient(this.bridge) {
                @Override
                public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                    WebView newWebView = new WebView(MainActivity.this);
                    WebSettings newSettings = newWebView.getSettings();
                    newSettings.setJavaScriptEnabled(true);
                    newSettings.setJavaScriptCanOpenWindowsAutomatically(true);
                    newSettings.setSupportMultipleWindows(true);
                    newSettings.setDomStorageEnabled(true);
                    
                    // Enable cookies for the new webview
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                        CookieManager.getInstance().setAcceptThirdPartyCookies(newWebView, true);
                    }
                    
                    final Dialog dialog = new Dialog(MainActivity.this, android.R.style.Theme_Black_NoTitleBar_Fullscreen);
                    dialog.setContentView(newWebView);
                    dialog.show();
                    
                    newWebView.setWebChromeClient(new WebChromeClient() {
                        @Override
                        public void onCloseWindow(WebView window) {
                            dialog.dismiss();
                        }
                    });
                    
                    newWebView.setWebViewClient(new WebViewClient() {
                        @Override
                        public boolean shouldOverrideUrlLoading(WebView view, String url) {
                            if (url.startsWith("upi://") || url.startsWith("whatsapp://") || url.startsWith("phonepe://") || url.startsWith("paytmmp://")) {
                                try {
                                    android.content.Intent intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
                                    startActivity(intent);
                                    return true;
                                } catch (Exception e) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    });
                    
                    WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                    transport.setWebView(newWebView);
                    resultMsg.sendToTarget();
                    return true;
                }
            });
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        // Re-apply status bar configuration when activity resumes
        configureSystemBars();
    }

    private void configureSystemBars() {
        final Window window = getWindow();

        // Enable drawing system bars backgrounds
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // Clear translucent flags
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);

        // Set white colors for status bar and navigation bar
        window.setStatusBarColor(0xFFFFFFFF); // Pure white
        window.setNavigationBarColor(0xFFFFFFFF); // Pure white

        // Don't draw content behind system bars
        WindowCompat.setDecorFitsSystemWindows(window, true);

        // Use WindowInsetsControllerCompat for better compatibility, posted to ensure the view is attached
        window.getDecorView().post(new Runnable() {
            @Override
            public void run() {
                WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(window, window.getDecorView());
                if (insetsController != null) {
                    // Set light appearance for both status bar and navigation bar (dark icons/text)
                    insetsController.setAppearanceLightStatusBars(true);
                    insetsController.setAppearanceLightNavigationBars(true);
                }
            }
        });
    }
}
