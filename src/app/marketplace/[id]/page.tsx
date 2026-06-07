'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, ArrowLeft, ShieldCheck, ShoppingCart, UserCheck, Flame, Check, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/client';

interface Review {
  id: string;
  rating: number;
  review: string;
  reviewerName: string;
  reviewerAvatarUrl?: string;
  createdAt: string;
}

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  downloads: number;
  ratingAverage: number;
  ratingCount: number;
  isActive: boolean;
  imageUrl: string;
  frameworks: string[];
  category: string;
  features: string[];
  seller?: {
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  reviews: Review[];
}

export default function MarketplaceItemDetail() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Review state
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [user, setUser] = useState<any>(null);

  const id = params.id as string;

  useEffect(() => {
    // Read auth session
    const checkUser = async () => {
      if (supabase && typeof supabase.auth !== 'undefined') {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      }
    };
    checkUser();
  }, []);

  const fetchItemData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/marketplace/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch item details');
      }
      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load component details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItemData();
    }
  }, [id]);

  const handleAction = () => {
    if (!item) return;
    if (item.priceCents === 0) {
      // Free download process
      toast.success('Downloading component module packages...');
      setItem(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
    } else {
      // Trigger paid checkout modal
      setCheckoutOpen(true);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setCheckoutOpen(false);
      toast.success('Purchase complete! Premium bundle download starting...');
      setItem(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
      setCardNumber('');
      setCardExpiry('');
      setCardCvc('');
    }, 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be signed in to submit a review');
      router.push('/login');
      return;
    }

    setSubmittingReview(true);

    try {
      const res = await fetch(`/api/marketplace/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, review: reviewText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      toast.success('Review submitted successfully!');
      setReviewText('');

      // Refresh item state to load new reviews & updated average rating
      await fetchItemData();
    } catch (err: any) {
      toast.error(err.message || 'Could not post review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatPrice = (cents: number) => {
    if (cents === 0) return 'FREE';
    return `$${(cents / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 font-medium">Loading component details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-black mb-4 uppercase">Item Not Found</h2>
          <Button onClick={() => router.push('/marketplace')} className="bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-xl h-12 px-6">
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} />
            Back to Marketplace
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                {item.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase leading-[0.9] mb-4">
                {item.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 font-medium">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-white">{item.ratingAverage.toFixed(1)}</span>
                  <span>({item.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download size={16} className="text-neutral-500" />
                  <span className="font-bold text-white">{item.downloads}</span> downloads
                </div>
              </div>
            </div>

            {/* Banner Cover */}
            <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-950">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Description */}
            <div className="bg-neutral-900/35 border border-white/5 rounded-[2.5rem] p-10 space-y-6">
              <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight">Overview</h3>
              <p className="text-neutral-300 text-md leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Features list */}
            {item.features && item.features.length > 0 && (
              <div className="bg-neutral-900/35 border border-white/5 rounded-[2.5rem] p-10 space-y-6">
                <h3 className="text-xl font-heading font-black uppercase text-white tracking-tight">Included Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-300 font-medium text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-heading font-black uppercase text-white tracking-tight">Reviews</h3>

              {/* Leave Review Form */}
              <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <h4 className="text-md font-bold text-white uppercase tracking-wider">Leave a Review</h4>
                {user ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400 font-bold uppercase mr-2">Rating:</span>
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          className="text-neutral-500 hover:scale-110 transition-transform"
                        >
                          <Star
                            size={20}
                            className={starValue <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-700'}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      placeholder="Share your thoughts about this component..."
                      required
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors text-white font-medium min-h-[100px]"
                    />

                    <Button type="submit" disabled={submittingReview} className="bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-[10px] h-10 px-5 rounded-xl">
                      {submittingReview ? 'Submitting...' : 'Post Review'}
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-neutral-400 text-xs font-bold uppercase tracking-wide">
                    <AlertCircle size={16} className="text-primary" />
                    <span>Please <Link href="/login" className="text-primary hover:underline">sign in</Link> to review this product.</span>
                  </div>
                )}
              </div>

              {/* Reviews List */}
              {item.reviews.length === 0 ? (
                <p className="text-neutral-500 text-sm font-medium">No reviews posted yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {item.reviews.map((rev) => (
                    <div key={rev.id} className="p-6 bg-neutral-900/30 border border-white/5 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.reviewerAvatarUrl || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&fit=crop'}
                            alt={rev.reviewerName}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <p className="font-bold text-white text-sm">{rev.reviewerName}</p>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {[1, 2, 3, 4, 5].map((val) => (
                                <Star
                                  key={val}
                                  size={10}
                                  className={val <= rev.rating ? 'fill-yellow-500 text-yellow-500' : 'text-neutral-700'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed font-medium">
                        {rev.review}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky Purchase/Details Column */}
          <div className="space-y-8 lg:sticky lg:top-28">
            {/* Action Card */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-lg">
              <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Price</span>
                <span className="text-3xl font-black text-white">{formatPrice(item.priceCents)}</span>
              </div>

              {/* Framework Compat */}
              <div className="space-y-3">
                <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest block">Compatible Frameworks</span>
                <div className="flex flex-wrap gap-2">
                  {item.frameworks.map((fw) => (
                    <span key={fw} className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/5 text-[9px] font-black text-neutral-300 uppercase tracking-widest">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAction}
                className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {item.priceCents === 0 ? (
                  <>
                    <Download size={16} /> Download Free Code
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Purchase Component
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider justify-center">
                <ShieldCheck size={14} className="text-green-500" /> Secure checkout verified
              </div>
            </div>

            {/* Seller profile card */}
            {item.seller && (
              <div className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-6 flex items-center gap-4">
                <img
                  src={item.seller.avatarUrl || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&fit=crop'}
                  alt={item.seller.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-neutral-500 text-[8px] font-black uppercase tracking-widest block mb-0.5">Author</span>
                  <p className="font-bold text-white text-sm truncate">{item.seller.name}</p>
                  {item.seller.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[9px] text-primary font-black uppercase tracking-wider mt-0.5">
                      <UserCheck size={10} /> Verified Seller
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 bg-primary/10 w-24 h-24 rounded-full blur-2xl" />

              <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight mb-2">Checkout</h3>
              <p className="text-neutral-400 text-xs font-medium mb-6">
                You are purchasing <span className="text-white font-bold">{item.title}</span>.
              </p>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-2">CVC</label>
                      <input
                        type="password"
                        placeholder="123"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-black text-primary">{formatPrice(item.priceCents)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={paying}
                  className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2"
                >
                  {paying ? (
                    <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Check size={16} /> Pay & Download
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
