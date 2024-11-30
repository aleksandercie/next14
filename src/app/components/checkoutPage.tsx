'use client';

import { Button } from '@/components/ui/button';
import { convertToSubcurrency } from '@/utils';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { Spinner } from './spinner';

export function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError && submitError.message) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-sucess?amount=${amount}`
      }
    });
    if (error && error.message) {
      setErrorMessage(error.message);

      return;
    } else {
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <p className="text-red-500 my-4">{errorMessage}</p>}
      <div className="flex justify-end w-full">
        <Button
          className="mt-4 disabled:animate-pulse disabled:opacity-50"
          disabled={!stripe || loading}
        >
          {!loading ? `Pay $${amount}` : 'Processing...'}
        </Button>
      </div>
    </form>
  );
}
