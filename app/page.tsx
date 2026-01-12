"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import SignupModal from '@/components/SignupModal';
import {
    Mic,
    Brain,
    MessageSquare,
    Presentation as PresentationIcon,
    Sparkles as SparklesIcon,
    ArrowRight as ArrowRightIcon,
    CheckCircle2 as CheckCircle2Icon,
    Users as UsersIcon,
    Menu,
    X,
    BookOpen,
    Video,
    Heart,
    Target,
    TrendingUp,
    ShieldCheck,
    Lightbulb,
    AudioWaveform as AudioWaveformIcon,
    LayoutList as LayoutListIcon,
    MonitorPlay as MonitorPlayIcon,
    Megaphone as MegaphoneIcon,
    LogOut
} from 'lucide-react';

export default function Home() {
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
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
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background relative">
            <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
            <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />

            {/* 1. Navigation Bar (Sticky) */}
            <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8 mx-auto">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-2xl text-primary tracking-tight hover:opacity-90 transition-opacity">
                        <Image src="/logo.png" alt="SkillUp Logo" width={220} height={48} className="h-12 w-auto object-contain" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                        <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
                        <Link href="#offer" className="hover:text-primary transition-colors">What I Offer</Link>
                        <Link href="#course" className="hover:text-primary transition-colors">Course</Link>
                        <Link href="#about" className="hover:text-primary transition-colors">Why Me</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-foreground">
                                    Hi, {user.email?.split('@')[0]}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </button>
                                <button
                                    onClick={() => setIsSignupOpen(true)}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md ml-2"
                                >
                                    Book Class
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                    Log In
                                </Link>
                                <button
                                    onClick={() => setIsSignupOpen(true)}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md"
                                >
                                    Start Learning
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Placeholder */}
                    <button className="md:hidden p-2 text-muted-foreground">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            {/* 2. Hero Section */}
            <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl flex flex-col md:flex-row items-center gap-12">

                    <div className="flex-1 space-y-8 text-center md:text-left z-10">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            <SparklesIcon className="mr-2 h-4 w-4" />
                            <span>New Interactive Lessons Available</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-foreground">
                            Find Your Voice. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                Speak with Confidence.
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            From overcoming stage fright to delivering your first standing ovation—we guide you through the art of public speaking with simple, step-by-step lessons.
                        </p>


                    </div>

                    <div className="flex-1 w-full relative z-0">
                        {/* Abstract decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50"></div>

                        {/* Placeholder Image Container */}
                        {/* Video Container */}
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black group">
                            <video
                                className="w-full h-auto object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            >
                                {/*
                                    TODO: Add your video file to the 'public' folder.
                                    1. Create a folder named 'public' in the root directory if it doesn't exist.
                                    2. Add your video file (e.g., 'hero-video.mp4').
                                    3. Update the src below to match your filename.
                                */}
                                <source src="/hero-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Pain Point Section (Empathy) */}
            <section className="py-24 bg-secondary/30" id="fear">
                <div className="container px-4 md:px-8 mx-auto max-w-3xl text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Does the thought of speaking in public make your palms sweat?
                    </h2>
                    <div className="h-1 w-20 bg-accent rounded-full mx-auto"></div>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        You are not alone. Public speaking is one of the most common fears in the world. But it is also a skill that <span className="text-foreground font-semibold italic">anyone</span> can learn. Great speakers are made, not born.
                    </p>
                </div>
            </section>

            {/* 4. Services / Resources Section (NEW) */}
            <section className="py-24 bg-background" id="services">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Public Speaking Services</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Unlock your potential with our tailored programs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ServiceCard
                            icon={<UsersIcon className="h-10 w-10 text-primary" />}
                            title="Workshops & Courses"
                            description="Learn proven techniques for structuring speeches, telling stories, and engaging any audience."
                        />
                        <ServiceCard
                            icon={<Mic className="h-10 w-10 text-primary" />}
                            title="1-on-1 Coaching"
                            description="Personalized guidance to overcome fear, improve delivery, and refine your speaking style."
                        />
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => setIsSignupOpen(true)}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-md"
                        >
                            Sign Up for a Free Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. What I Offer (Detailed Breakdown) */}
            <section className="py-24 bg-muted/20" id="offer">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">What I Offer</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Training */}
                        <div className="bg-background p-8 rounded-3xl shadow-sm border border-border">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <PresentationIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Public Speaking Training</h3>
                            <ul className="space-y-3">
                                <ListItem text="Speak confidently in front of any audience" />
                                <ListItem text="Organize ideas clearly and logically" />
                                <ListItem text="Use voice, tone, and body language effectively" />
                                <ListItem text="Overcome stage fear and nervousness" />
                                <ListItem text="Deliver speeches that are engaging and memorable" />
                            </ul>
                        </div>

                        {/* Skills */}
                        <div className="bg-background p-8 rounded-3xl shadow-sm border border-border">
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Presentation Skills</h3>
                            <p className="text-sm text-muted-foreground mb-4">Perfect for school, college, or professional settings:</p>
                            <ul className="space-y-3">
                                <ListItem text="Structuring presentations that make sense" />
                                <ListItem text="Creating strong openings and conclusions" />
                                <ListItem text="Explaining ideas simply and clearly" />
                                <ListItem text="Handling questions with confidence" />
                            </ul>
                        </div>

                        {/* Voice Coaching */}
                        <div className="bg-background p-8 rounded-3xl shadow-sm border border-border">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Confidence & Communication</h3>
                            <p className="text-sm text-muted-foreground mb-4">Build skills that go beyond the stage:</p>
                            <ul className="space-y-3">
                                <ListItem text="Improve everyday communication" />
                                <ListItem text="Speak up in meetings or group discussions" />
                                <ListItem text="Develop leadership presence" />
                                <ListItem text="Express ideas clearly and respectfully" />
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Course Structure Section (NEW) */}
            <section className="py-24 bg-secondary/20" id="course">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-background px-3 py-1 text-sm font-medium text-primary shadow-sm mb-2">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>8-Week Program</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Course Structure</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A comprehensive 8-module journey to speaking mastery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ModuleCard
                            number="1"
                            title="Introduction to Public Speaking"
                            goal="Build mindset + basics"
                            lessons={[
                                "Myths vs Reality",
                                "Types of Speaking",
                                "Understanding Audience",
                                "Growth Mindset"
                            ]}
                            activity="Self-assessment check"
                            onActivityClick={() => setIsQuizOpen(true)}
                            icon={<PresentationIcon className="h-6 w-6" />}
                            colorClass="bg-orange-500"
                        />
                        <ModuleCard
                            number="2"
                            title="Building Confidence & Overcoming Fear"
                            goal="Confidence first"
                            lessons={[
                                "Psychology of Fear",
                                "Managing Nervousness",
                                "Confidence Routines",
                                "Reframing Fear"
                            ]}
                            activity="Anxiety triggers worksheet"
                            icon={<ShieldCheck className="h-6 w-6" />}
                            colorClass="bg-red-500"
                        />
                        <ModuleCard
                            number="3"
                            title="Body Language & Stage Presence"
                            goal="Look confident"
                            lessons={[
                                "Eye Contact",
                                "Hand Gestures",
                                "Posture & Movement",
                                "Facial Expressions"
                            ]}
                            activity="Mirror practice"
                            icon={<UsersIcon className="h-6 w-6" />}
                            colorClass="bg-rose-400"
                        />
                        <ModuleCard
                            number="4"
                            title="Voice Modulation & Speech Clarity"
                            goal="Strong, pleasant voice"
                            lessons={[
                                "Projection & Breath",
                                "Pace, Pauses, Emphasis",
                                "Pronunciation",
                                "Eliminating Fillers"
                            ]}
                            activity="Daily voice warm-ups"
                            icon={<AudioWaveformIcon className="h-6 w-6" />}
                            colorClass="bg-amber-700"
                        />
                        <ModuleCard
                            number="5"
                            title="Structuring an Effective Speech"
                            goal="What to say & how"
                            lessons={[
                                "Speech Structure",
                                "The Hook (First 30s)",
                                "Memorable Points",
                                "Ending with Impact"
                            ]}
                            activity="Write a 3-min speech"
                            icon={<LayoutListIcon className="h-6 w-6" />}
                            colorClass="bg-emerald-600"
                        />
                        <ModuleCard
                            number="6"
                            title="Storytelling & Content Development"
                            goal="Make it memorable"
                            lessons={[
                                "Why Stories Work",
                                "Story Frameworks",
                                "Personal Stories",
                                "Emotional Connection"
                            ]}
                            activity="Create personal story"
                            icon={<Mic className="h-6 w-6" />}
                            colorClass="bg-yellow-500"
                        />
                        <ModuleCard
                            number="7"
                            title="Audience Engagement & Visual Aids"
                            goal="Keep them hooked"
                            lessons={[
                                "Interactive Techniques",
                                "Using Slides Effectively",
                                "Props and Demos",
                                "Reading the Room"
                            ]}
                            activity="Slide design exercise"
                            icon={<MonitorPlayIcon className="h-6 w-6" />}
                            colorClass="bg-orange-600"
                        />
                        <ModuleCard
                            number="8"
                            title="Handling Q&A & Impromptu Speaking"
                            goal="Think on your feet"
                            lessons={[
                                "Q&A Strategies",
                                "Impromptu Frameworks",
                                "Handling Tough Questions",
                                "Closing Strong"
                            ]}
                            activity="Impromptu challenge"
                            icon={<MegaphoneIcon className="h-6 w-6" />}
                            colorClass="bg-coral-500" // using generic or closest
                        />
                    </div>
                </div>
            </section>

            {/* 7. Why Choose Me Section (was 6) */}
            <section className="py-24 bg-background" id="about">
                <div className="container px-4 md:px-8 mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">Why Choose Me</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <BenefitCard
                            icon={<Target className="h-6 w-6" />}
                            title="Practical Methods"
                            desc="Easy-to-understand techniques you can apply immediately."
                        />
                        <BenefitCard
                            icon={<Heart className="h-6 w-6" />}
                            title="Supportive Approach"
                            desc="A safe, encouraging environment to grow without pressure."
                        />
                        <BenefitCard
                            icon={<TrendingUp className="h-6 w-6" />}
                            title="Real-World Focus"
                            desc="Preparation for actual situations like meetings, toasts, and presentations."
                        />
                        <BenefitCard
                            icon={<SparklesIcon className="h-6 w-6" />}
                            title="Step-by-Step Growth"
                            desc="Incremental improvement that builds lasting confidence."
                        />
                    </div>
                    <p className="mt-12 text-xl font-medium text-primary">
                        "My goal is to help you feel confident, prepared, and proud of your voice."
                    </p>
                </div>
            </section>

            {/* 8. How It Works (was 7) */}
            <section className="py-24 bg-muted/30" id="process">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-muted-foreground">Your journey to confidence in 4 simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <Step
                            number="1"
                            title="Assessment"
                            desc="Understand your goals and current skill level."
                        />
                        <Step
                            number="2"
                            title="Training"
                            desc="Learn techniques through guided practice."
                        />
                        <Step
                            number="3"
                            title="Practice & Feedback"
                            desc="Improve with constructive feedback."
                        />
                        <Step
                            number="4"
                            title="Confidence Building"
                            desc="Apply skills in real situations."
                        />
                    </div>
                </div>
            </section>

            {/* 9. Target Audience (was 8) */}
            <section className="py-24 bg-background">
                <div className="container px-4 md:px-8 mx-auto max-w-4xl text-center bg-secondary/20 rounded-3xl p-12 border border-border">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Who This Is For</h2>
                    <div className="grid grid-cols-1 text-left md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                        <div className="flex items-center space-x-3">
                            <CheckCircle2Icon className="h-5 w-5 text-primary" />
                            <span>Students and young speakers</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle2Icon className="h-5 w-5 text-primary" />
                            <span>Professionals and leaders</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle2Icon className="h-5 w-5 text-primary" />
                            <span>Beginners with stage fear</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CheckCircle2Icon className="h-5 w-5 text-primary" />
                            <span>Anyone who wants to speak clearly</span>
                        </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                        No prior experience is required.
                    </p>
                </div>
            </section>

            {/* 10. Footer / Final CTA (was 9) */}
            <footer className="bg-foreground text-background py-20">
                <div className="container px-4 md:px-8 mx-auto max-w-screen-xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Get Started</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Your voice matters. With the right guidance, anyone can become a confident speaker.
                    </p>
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all text-lg px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 flex items-center justify-center mx-auto">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Contact us today
                    </button>
                    <p className="mt-4 text-sm text-gray-400">...to start your public speaking journey.</p>

                    <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Mic className="h-5 w-5" />
                            <span className="font-bold text-gray-200">SkillUp</span>
                        </div>
                        <p className="mt-4 md:mt-0">&copy; 2026 SkillUp Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Subcomponents

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-secondary/40 p-8 rounded-2xl border border-transparent hover:border-primary/20 transition-all text-center group">
            <div className="inline-flex items-center justify-center p-4 bg-background rounded-full mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    )
}

function ListItem({ text }: { text: string }) {
    return (
        <li className="flex items-start space-x-3 text-muted-foreground">
            <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{text}</span>
        </li>
    )
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors">
            <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
        </div>
    )
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-6 shadow-md">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
        </div>
    )
}

function ModuleCard({ number, title, goal, lessons, activity, onActivityClick, icon, colorClass }: { number: string, title: string, goal: string, lessons: string[], activity: string, onActivityClick?: () => void, icon?: React.ReactNode, colorClass?: string }) {
    return (
        <div className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50 group flex flex-col h-full relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${colorClass || 'bg-primary/10 text-primary'} text-white shadow-sm`}>
                    {icon || <span className="font-bold text-lg">{number}</span>}
                </div>
                <div>
                    <div className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-1 uppercase tracking-wider">
                        Module {number}
                    </div>
                </div>
            </div>

            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">{goal}</p>

            <div className="flex-grow space-y-3 mb-6">
                {/* Lessons hidden as per request */}
            </div>

            <div className="mt-auto pt-4 border-t border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">Activity</p>
                <button
                    onClick={onActivityClick}
                    className={`flex items-center text-sm font-medium text-foreground bg-secondary/50 p-2 rounded-lg w-full transition-colors ${onActivityClick ? 'hover:bg-primary/20 cursor-pointer active:scale-95' : 'cursor-default'}`}
                >
                    <SparklesIcon className={`w-4 h-4 mr-2 ${onActivityClick ? 'text-primary' : 'text-accent'}`} />
                    {activity}
                </button>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------------
// INTERACTIVE QUIZ COMPONENT
// ----------------------------------------------------------------------------

function QuizModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [currentStep, setCurrentStep] = useState(0); // 0 = start, 1-10 = questions, 11 = result
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "1. When you think about public speaking, which mindset do you have?",
            options: [
                { text: "A) I believe good speakers are born with talent.", score: 0 },
                { text: "B) I believe it is a learnable skill that improves with practice.", score: 1 }
            ]
        },
        {
            q: "2. How do you typically stand when speaking to a group?",
            options: [
                { text: "A) I slouch or lean against something to feel more comfortable.", score: 0 },
                { text: "B) I stand straight with feet shoulder-width apart and relaxed shoulders.", score: 1 }
            ]
        },
        {
            q: "3. What is your primary goal regarding \"fear\" during a speech?",
            options: [
                { text: "A) To feel completely fearless before I start.", score: 0 },
                { text: "B) To be prepared and steady, even if I feel nervous.", score: 1 }
            ]
        },
        {
            q: "4. Where do your eyes go when you are talking to an audience?",
            options: [
                { text: "A) I mostly look at the floor, the ceiling, or my notes.", score: 0 },
                { text: "B) I shift my gaze every 3–5 seconds to connect with different people.", score: 1 }
            ]
        },
        {
            q: "5. If you were to outline a basic speech, what order would you use?",
            options: [
                { text: "A) Introduction, then Body, then Conclusion.", score: 1 },
                { text: "B) I usually just start talking and see where it goes.", score: 0 }
            ]
        },
        {
            q: "6. What is the most effective way to make a speech memorable?",
            options: [
                { text: "A) Making the speech as long as possible.", score: 0 },
                { text: "B) Including a short story with a situation, challenge, and outcome.", score: 1 }
            ]
        },
        {
            q: "7. How do you handle your hands while speaking?",
            options: [
                { text: "A) I keep them in my pockets or fidget with a pen.", score: 0 },
                { text: "B) I keep them above my waist and use them to emphasize points.", score: 1 }
            ]
        },
        {
            q: "8. When practicing at home, what is a \"Performance Mode\" technique?",
            options: [
                { text: "A) Sitting down and reading the script silently.", score: 0 },
                { text: "B) Standing up, speaking louder/slower, and using gestures.", score: 1 }
            ]
        },
        {
            q: "9. What should you do if you realize you've made a mistake during a speech?",
            options: [
                { text: "A) Stop and apologize, or feel like the speech is a failure.", score: 0 },
                { text: "B) Keep going; mistakes are part of growth and don't mean failure.", score: 1 }
            ]
        },
        {
            q: "10. How should you prepare your voice before a presentation?",
            options: [
                { text: "A) I don't do anything; I just start speaking.", score: 0 },
                { text: "B) I do warm-ups like humming, tongue twisters, or belly breathing.", score: 1 }
            ]
        },
    ];

    const handleAnswer = (points: number) => {
        setScore(score + points);
        setCurrentStep(currentStep + 1);
    };

    const resetQuiz = () => {
        setScore(0);
        setCurrentStep(0);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl p-6 md:p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                </button>

                {currentStep === 0 && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                            <Brain className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold">Public Speaking Self-Assessment</h2>
                        <p className="text-muted-foreground">
                            Discover your current public speaking style and get personalized feedback.
                            This quick 10-question quiz will help you identify your strengths and growth areas.
                        </p>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg hover:bg-primary/90 transition-all w-full"
                        >
                            Start Quiz
                        </button>
                    </div>
                )}

                {currentStep > 0 && currentStep <= 10 && (
                    <div className="space-y-6 animate-in hover:none">
                        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            <span>Question {currentStep} of 10</span>
                            <span>Score: {score}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-relaxed mb-4">
                            {questions[currentStep - 1].q}
                        </h3>
                        <div className="space-y-3">
                            {questions[currentStep - 1].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.score)}
                                    className="w-full text-left p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all font-medium"
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentStep > 10 && (
                    <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-3xl font-bold text-primary">Assessment Complete!</h2>

                        <div className="p-6 bg-secondary/30 rounded-2xl border border-primary/20">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Your Score is</p>
                            <p className="text-5xl font-extrabold text-foreground mb-4">{score} / 10</p>

                            <div className="text-lg leading-relaxed">
                                {score >= 8 ? (
                                    <div className="space-y-2">
                                        <p className="font-bold text-green-600 dark:text-green-400">Advanced / Intermediate (8-10)</p>
                                        <p className="text-muted-foreground text-base">
                                            You have a strong grasp of public speaking foundations! You are ready to focus on persuasion, debate, and leadership.
                                        </p>
                                    </div>
                                ) : score >= 5 ? (
                                    <div className="space-y-2">
                                        <p className="font-bold text-yellow-600 dark:text-yellow-400">Intermediate (5-7)</p>
                                        <p className="text-muted-foreground text-base">
                                            You understand the basics but could improve your structure and storytelling to be more memorable.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <p className="font-bold text-orange-600 dark:text-orange-400">Beginner (0-4)</p>
                                        <p className="text-muted-foreground text-base">
                                            You are at the perfect starting point! Focus on building confidence, posture, and eye contact.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={resetQuiz}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg hover:bg-primary/90 transition-all w-full"
                        >
                            Close & Continue Learning
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
