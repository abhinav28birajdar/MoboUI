"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Menu, X, Sparkles, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [user, setUser] = useState<any>(null);

  // Read active session on mount & subscribe to changes
  useEffect(() => {
    const checkUser = async () => {
      if (supabase && typeof supabase.auth !== 'undefined') {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      }
    };
    checkUser();

    let subscription: any = null;
    if (supabase && typeof supabase.auth !== 'undefined') {
      const { data } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null);
      });
      subscription = data.subscription;
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Smart Hide logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const routes = [
    { href: "/components", label: "Components" },
    { href: "/showcase", label: "Showcase" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 z-50 w-full h-20 bg-background/70 backdrop-blur-xl border-b border-border/40"
    >
      <div className="container h-full flex items-center justify-between px-6 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-display font-bold text-2xl tracking-tighter uppercase text-text-primary leading-none">
            MOBOUI<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          <div className="relative group w-56 xl:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search components, docs..."
              className="w-full bg-background border-2 border-border rounded-2xl py-2.5 pl-12 pr-5 text-xs font-medium text-text-primary placeholder:text-text-muted/60 focus:ring-2 focus:ring-primary/20 focus:border-primary/60 focus:outline-none transition-all duration-300 hover:border-border-hover"
            />
          </div>

          <nav className="flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "relative text-[11px] font-medium uppercase tracking-[0.1em] transition-all py-1 px-2",
                  pathname?.startsWith(route.href) ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                )}
              >
                {route.label}
                {pathname?.startsWith(route.href) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            className="h-10 px-4 text-xs font-semibold rounded-xl text-text-secondary hover:text-text-primary"
          >
            <Link href="/playground" className="flex items-center gap-2">
              Playground <Sparkles size={14} />
            </Link>
          </Button>

          {user ? (
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="h-10 px-4 text-xs font-semibold rounded-xl border-border hover:bg-surface text-text-primary flex items-center gap-2"
              >
                <Link href="/account">
                  <UserIcon size={14} />
                  Account
                </Link>
              </Button>
              <Button
                onClick={async () => {
                  if (supabase && typeof supabase.auth !== 'undefined') {
                    await supabase.auth.signOut();
                    window.location.assign('/');
                  }
                }}
                variant="ghost"
                className="h-10 px-4 text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all uppercase tracking-widest text-[10px]"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-8 flex flex-col gap-6"
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-2xl font-bold uppercase tracking-tighter",
                  pathname?.startsWith(route.href) ? "text-primary" : "text-text-muted"
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            
            <Link
              href="/playground"
              className={cn(
                "text-2xl font-bold uppercase tracking-tighter",
                pathname === "/playground" ? "text-primary" : "text-text-muted"
              )}
              onClick={() => setIsOpen(false)}
            >
              Playground
            </Link>

            {user ? (
              <>
                <Link
                  href="/account"
                  className={cn(
                    "text-2xl font-bold uppercase tracking-tighter",
                    pathname?.startsWith("/account") ? "text-primary" : "text-text-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
                <Button
                  onClick={async () => {
                    setIsOpen(false);
                    if (supabase && typeof supabase.auth !== 'undefined') {
                      await supabase.auth.signOut();
                      window.location.assign('/');
                    }
                  }}
                  variant="ghost"
                  className="w-full h-12 text-red-500 font-medium rounded-xl uppercase tracking-widest text-xs border border-red-200 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-xl uppercase tracking-widest text-xs hover:bg-primary/90 transition-all"
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}