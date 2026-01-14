import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function RegisterPage() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-primary hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 bg-secondary/30 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/10">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-gray-400 bg-background/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-gray-400 bg-background/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-white/20 rounded-md shadow-sm placeholder-gray-400 bg-background/50 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
