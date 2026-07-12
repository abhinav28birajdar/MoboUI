"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sparkles, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { NotificationsPopover } from "@/components/shared/notifications-popover";

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

  // Smart Hide logic on scroll
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
      className="fixed top-0 z-50 w-full h-20 bg-bg-base/70 backdrop-blur-xl border-b border-border-subtle"
    >
      <div className="container h-full flex items-center justify-between px-6 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-display font-black text-2xl tracking-tighter uppercase text-text-primary leading-none">
            MOBOUI<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          <div className="relative group w-56 xl:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search components, docs..."
              className="w-full bg-bg-surface border border-border-subtle rounded-[8px] py-2 pl-10 pr-4 text-xs font-medium text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent-glow focus:outline-none transition-all duration-300 hover:border-border-default"
            />
          </div>

          <nav className="flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "relative text-xs font-bold uppercase tracking-[0.1em] transition-all py-1 px-2",
                  pathname?.startsWith(route.href) ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {route.label}
                {pathname?.startsWith(route.href) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/playground" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-2 text-text-primary">
              Playground <Sparkles size={14} className="text-fuchsia-600" />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <NotificationsPopover />
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Link href="/dashboard">
                  <UserIcon size={14} />
                  Dashboard
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
                size="sm"
                className="text-error hover:text-error"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant="default"
              size="sm"
              className="uppercase tracking-widest text-[10px]"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
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
            className="lg:hidden absolute top-20 left-0 w-full bg-bg-base border-b border-border-subtle p-8 flex flex-col gap-6 z-50 shadow-2xl"
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-xl font-display font-black uppercase tracking-tighter",
                  pathname?.startsWith(route.href) ? "text-accent" : "text-text-secondary"
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            
            <Link
              href="/playground"
              className={cn(
                "text-xl font-display font-black uppercase tracking-tighter",
                pathname === "/playground" ? "text-accent" : "text-text-secondary"
              )}
              onClick={() => setIsOpen(false)}
            >
              Playground
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-xl font-display font-black uppercase tracking-tighter",
                    pathname?.startsWith("/dashboard") ? "text-accent" : "text-text-secondary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  onClick={async () => {
                    setIsOpen(false);
                    if (supabase && typeof supabase.auth !== 'undefined') {
                      await supabase.auth.signOut();
                      window.location.assign('/');
                    }
                  }}
                  variant="destructive"
                  size="sm"
                  className="w-full text-xs"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="default"
                size="sm"
                className="w-full text-xs"
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