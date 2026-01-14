"use client";

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function NavBar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // setUser(null) handled by subscription
    };

    return (
        <nav className="border-b border-white/10 bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            EdMastery
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/tracks/public-speaking" className="hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Public Speaking
                            </Link>
                            <Link href="/tracks/business" className="hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Business
                            </Link>
                            <Link href="/tracks/pedagogy" className="hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Pedagogy
                            </Link>
                        </div>
                    </div>
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <UserIcon size={16} />
                                    </div>
                                    <span className="hidden sm:inline-block">{user.email?.split('@')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
