'use client';

import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { paymentApi } from './api';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if script already exists or Razorpay is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already available on window');
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="razorpay"]');
    if (existingScript) {
      console.log('Razorpay script already in DOM');
      setIsLoaded(true);
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    // Add timeout to detect loading issues
    const timeoutId = setTimeout(() => {
      if (!window.Razorpay) {
        console.error('Razorpay script load timeout');
        const isNative = Capacitor.isNativePlatform();
        toast.error('Payment system loading failed', {
          description: isNative
            ? 'Unable to initialize payment gateway. Please check your internet connection and restart the app.'
            : 'Unable to load payment gateway. Please refresh the page.',
        });
      }
    }, 10000); // 10 second timeout

    script.onload = () => {
      clearTimeout(timeoutId);
      console.log('Razorpay SDK loaded successfully', {
        razorpayAvailable: !!window.Razorpay,
        platform: Capacitor.getPlatform(),
      });
      setIsLoaded(true);
    };

    script.onerror = (error) => {
      clearTimeout(timeoutId);
      console.error('Failed to load Razorpay SDK', error);
      const isNative = Capacitor.isNativePlatform();
      toast.error('Payment system unavailable', {
        description: isNative
          ? 'Unable to load payment gateway. Please check your internet connection and restart the app.'
          : 'Unable to load payment gateway. Please try again later.',
      });
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      // Don't remove script on cleanup to avoid re-downloading
      // It will be reused across component remounts
    };
  }, []);

  const openPayment = async (
    bookingIdOrOrderId: string,
    userInfo: { name: string; email: string; phone: string },
    onSuccess: (response: any) => void,
    onFailure?: (error: any) => void,
    isDirectOrder: boolean = false
  ) => {
    const isNative = Capacitor.isNativePlatform();

    // Enhanced checks for native platform
    if (!isLoaded || !window.Razorpay) {
      console.error('Razorpay SDK not loaded. isLoaded:', isLoaded, 'window.Razorpay:', !!window.Razorpay);
      toast.error('Payment system not ready', {
        description: isNative
          ? 'Payment system is still loading. Please wait a moment and try again.'
          : 'Please wait a moment and try again.',
      });
      return;
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpayKeyId) {
      console.error('NEXT_PUBLIC_RAZORPAY_KEY_ID not configured');
      toast.error('Payment configuration error', {
        description: 'Razorpay key not configured. Please contact support.',
      });
      return;
    }

    // Log platform info for debugging
    console.log('Opening payment on platform:', {
      isNative,
      platform: Capacitor.getPlatform(),
      razorpayLoaded: !!window.Razorpay,
    });

    try {
      setIsLoading(true);

      let order: any;
      let booking: any;

      if (isDirectOrder) {
        // Order already created, just use the orderId
        order = {
          id: bookingIdOrOrderId,
          amount: 0, // Will be fetched from Razorpay
          currency: 'INR'
        };
      } else {
        // Create order on backend
        const orderResponse: any = await paymentApi.createOrder(bookingIdOrOrderId);

        if (!orderResponse || !orderResponse.order) {
          throw new Error('Failed to create payment order');
        }

        order = orderResponse.order;
        booking = orderResponse.booking;
      }

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'BrainX',
        description: `Booking payment for ${booking?.listing?.title || 'Room'}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            if (!isDirectOrder) {
              // Verify payment on backend for booking payments
              await paymentApi.verifyPayment(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature
              );

              toast.success('Payment successful!', {
                description: 'Your booking has been confirmed.',
              });
            }

            // Call onSuccess with response for custom verification
            onSuccess(response);
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed', {
              description: error?.response?.data?.error || 'Please contact support if amount was deducted.',
            });
            if (onFailure) onFailure(error);
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: '#FF385C',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            toast.info('Payment cancelled', {
              description: 'You can retry payment anytime from your bookings.',
            });
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      // Enhanced error handling for native platforms
      razorpayInstance.on('payment.failed', (response: any) => {
        console.error('Razorpay payment failed:', response.error);
        toast.error('Payment failed', {
          description: response.error.description || 'Payment could not be processed. Please try again.',
        });
        if (onFailure) onFailure(response.error);
      });

      razorpayInstance.open();

      console.log('Razorpay checkout opened successfully');
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      toast.error('Payment failed', {
        description: error?.response?.data?.error || error.message || 'Unable to initiate payment.',
      });
      if (onFailure) onFailure(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoaded,
    isLoading,
    openPayment,
  };
}
