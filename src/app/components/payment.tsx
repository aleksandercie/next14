'use client';
import { convertToSubcurrency } from '@/utils';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutPage } from './checkoutPage';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export function Payment() {
  const amount = 10.99;
  return (
    <div className="border p-4 rounded-md">
      Payment{' '}
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'usd'
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}
