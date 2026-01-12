import { Mic, Briefcase, Baby } from 'lucide-react';
import Link from 'next/link';

const tracks = [
    {
        id: 'public-speaking',
        title: 'Public Speaking',
        description: 'Conquer stage fright and articulate your ideas with confidence and clarity.',
        icon: Mic,
        color: 'text-purple-400',
        bg: 'bg-purple-900/20',
        border: 'border-purple-500/20'
    },
    {
        id: 'business',
        title: 'Business Studies',
        description: 'Master strategy, management, and entrepreneurship in the modern world.',
        icon: Briefcase,
        color: 'text-blue-400',
        bg: 'bg-blue-900/20',
        border: 'border-blue-500/20'
    },
    {
        id: 'pedagogy',
        title: 'Child Pedagogy',
        description: 'Understand child development and modern teaching methodologies.',
        icon: Baby,
        color: 'text-pink-400',
        bg: 'bg-pink-900/20',
        border: 'border-pink-500/20'
    }
];

export default function TrackPreview() {
    return (
        <section className="py-24 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Choose Your Path</h2>
                    <p className="text-muted-foreground">Select a specialized track to begin your journey.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {tracks.map((track) => (
                        <Link key={track.id} href={`/courses/${track.id}`} className={`group relative p-8 rounded-2xl border ${track.border} ${track.bg} hover:bg-opacity-30 transition-all hover:-translate-y-1`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${track.bg} ${track.color}`}>
                                <track.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{track.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                {track.description}
                            </p>
                            <div className={`text-sm font-medium ${track.color} flex items-center gap-2 group-hover:gap-3 transition-all`}>
                                Explore Track <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
