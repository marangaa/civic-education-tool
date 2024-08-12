import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false }); // Sign out without automatic redirect
            await router.push('/auth/signin'); // Manually redirect to the sign-in page
        } catch (error) {
            console.error('Sign out error:', error); // Handle any errors
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Sign Out
        </button>
    );
}
