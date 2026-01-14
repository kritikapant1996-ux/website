import NavBar from '@/components/NavBar';

export default function CoursesPage() {
    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-4xl font-bold mb-8">All Courses</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Placeholder items */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-secondary/20 border border-white/10 rounded-xl p-6 h-64 flex items-center justify-center">
                            <span className="text-muted-foreground">Course Placeholder {i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
