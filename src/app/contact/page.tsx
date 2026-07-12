'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ShieldCheck, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send contact message.');
      }

      setSubmitted(true);
      toast.success('Your message has been received!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit contact message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="max-w-4xl mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8"
          >
            <MessageSquare size={14} className="text-primary" />
            SUPPORT & SALES
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-6 uppercase">
            GET IN <span className="text-primary neon-text-glow">CONTACT.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Need custom mobile modules, licensing details, or premium support? Send us a message.
          </p>
        </div>

        {/* Form Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          
          {/* Details side (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-neutral-900/35 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
              <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-white border-b border-white/5 pb-3">
                Help & Enquiries
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Direct Email</h4>
                    <p className="text-sm font-bold text-white mt-1">support@moboui.dev</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary flex-shrink-0">
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Knowledge Hub</h4>
                    <p className="text-sm font-medium text-neutral-400 mt-1">
                      Check out our guides on integration in the <Link href="/docs" className="text-primary hover:underline font-bold">Documentation</Link>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Headquarters</h4>
                    <p className="text-sm font-bold text-white mt-1">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] flex gap-3">
              <ShieldCheck size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-400 leading-normal font-medium uppercase tracking-wider">
                Form transmissions are filtered against spam vectors and processed by Resend mail infrastructure securely.
              </p>
            </div>
          </div>

          {/* Form side (3 cols) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="bg-neutral-900/40 border border-white/5 p-8 md:p-10 rounded-[3rem] space-y-6 shadow-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="cname" className="text-xs font-black uppercase tracking-widest text-neutral-400">Full Name</Label>
                      <Input
                        id="cname"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cemail" className="text-xs font-black uppercase tracking-widest text-neutral-400">Email Address</Label>
                      <Input
                        id="cemail"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="ctopic" className="text-xs font-black uppercase tracking-widest text-neutral-400">Topic of Interest</Label>
                    <select
                      id="ctopic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      disabled={loading}
                      className="bg-black border border-white/10 text-neutral-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-primary cursor-pointer h-12"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Pro Licensing">Pro Licensing & Enterprise</option>
                      <option value="Component Requests">Custom Component Request</option>
                      <option value="Bugs & Issues">Bug Report / Trouble</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cmessage" className="text-xs font-black uppercase tracking-widest text-neutral-400">Message Description</Label>
                    <Textarea
                      id="cmessage"
                      placeholder="Write your details or specifications here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={loading}
                      className="min-h-[150px] bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white p-4 font-medium"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 border-0 hover:scale-[1.01] transition-all"
                  >
                    {loading ? 'Transmitting message...' : 'Send Message'} <Send size={14} />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-900 border border-white/10 p-12 md:p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-primary/10 w-48 h-48 rounded-full blur-3xl" />
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                    <CheckCircle size={36} />
                  </div>
                  <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    Message <span className="text-primary">Sent!</span>
                  </h2>
                  <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-8 font-medium leading-relaxed">
                    Thank you. We have received your request and our design support crew will reply within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="h-12 px-8 rounded-2xl border-white/10 text-white hover:bg-white/5 uppercase text-xs font-black tracking-widest"
                  >
                    Send Another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
