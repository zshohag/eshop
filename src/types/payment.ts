// types/payment.ts

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'stripe' | 'paypal' | 'google_pay';
  icon: string;
  description: string;
  enabled: boolean;
}

export interface PaymentFormData {
  amount: number;
  currency: string;
  customerId?: string;
  orderId?: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentData extends PaymentFormData {
  paymentMethodId?: string;
  clientSecret?: string;
}

export interface PayPalPaymentData extends PaymentFormData {
  orderID?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
  redirectUrl?: string;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface BillingDetails {
  name: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface PaymentError {
  type: string;
  code?: string;
  message: string;
  decline_code?: string;
}

export interface GooglePayConfig {
  environment: 'TEST' | 'PRODUCTION';
  apiVersion: number;
  apiVersionMinor: number;
  //allowedPaymentMethods: any[];
  merchantInfo: {
    merchantName: string;
    merchantId: string;
  };
}

export type PaymentStatus = 
  | 'idle' 
  | 'processing' 
  | 'succeeded' 
  | 'failed' 
  | 'requires_authentication';

export interface PaymentState {
  status: PaymentStatus;
  error: PaymentError | null;
  isLoading: boolean;
  selectedMethod: PaymentMethod['type'] | null;
}