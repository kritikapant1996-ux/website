import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Master the Art of <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Effective Communication
                        </span>
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Join thousands of students mastering Public Speaking, Business Strategy, and Child Pedagogy on the world's most advanced learning platform.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/register" className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105">
                            Start Learning <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/courses" className="flex items-center gap-2 bg-secondary hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all border border-white/10">
                            Browse Courses
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
}
