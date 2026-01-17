"use client";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";

// 🔹 import your existing modal
// import SignupModal from "@/components/SignupModal";

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10">
        <div className="w-full px-8 h-16">
          <div className="flex h-full items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SkillUp World"
                width={320}
                height={95}
                priority
                className="
                  h-10 w-auto object-contain
                  mix-blend-lighten
                  opacity-95
                  brightness-110
                "
              />
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {[
                ["#services", "Services"],
                ["#offer", "What I Offer"],
                ["#course", "Course"],
                ["#about", "Why Me"],
              ].map(([href, label]) => (
                <Link
                  key={label}
                  href={href}
                  className="
                    text-slate-400
                    transition-all duration-300 ease-in-out
                    hover:text-cyan-400
                    hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]
                  "
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* AUTH */}
            <div className="hidden md:flex items-center gap-4">
              {!user && (
                <>
                  {/* Log In → still goes to /login */}
                  <Link
                    href="/login"
                    className="
                      text-sm text-slate-400
                      transition-all duration-300 ease-in-out
                      hover:text-cyan-400
                      hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]
                    "
                  >
                    Log In
                  </Link>

                  {/* Start Learning → opens modal */}
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="
                      bg-cyan-500 hover:bg-cyan-400
                      text-slate-900
                      px-4 py-2
                      rounded-full
                      text-sm font-semibold
                      transition-all duration-300 ease-in-out
                      hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
                    "
                  >
                    Start Learning
                  </button>
                </>
              )}
            </div>

            {/* MOBILE */}
            <button className="md:hidden text-slate-300">
              <Menu className="h-6 w-6" />
            </button>

          </div>
        </div>
      </nav>

      {/* SIGNUP / ONBOARDING MODAL */}
      {/* 
      <SignupModal
        open={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      */}
    </>
  );
}
