import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use the latest compatible version
  appInfo: {
    name: 'MoboUI',
    version: '2.0.0',
  },
});
