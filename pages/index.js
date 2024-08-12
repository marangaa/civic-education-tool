import { useSession, signIn, signOut } from 'next-auth/react';
import CivicEducationTool from '../components/CivicEducationTool';
import SignOutButton from '../components/SignOutButton'; // Import the SignOutButton component
import { Button } from '@/components/ui/button';
import {useRouter} from "next/router";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold mb-6">Welcome to the Civic Education Platform</h1>
                    <p className="mb-4">Please sign in to access the platform.</p>
                    <Button onClick={() => signIn()} className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Civic Education Platform</h1>
                    <div className="flex items-center space-x-4">
                        <span>Signed in as {session.user.name}</span>
                        <SignOutButton /> {/* Use the updated SignOutButton component */}
                    </div>
                </div>
            </nav>
            <main className="container mx-auto mt-8">
                <CivicEducationTool />
            </main>
        </div>
    );
}
