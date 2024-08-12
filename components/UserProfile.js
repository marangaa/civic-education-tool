import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (data.success) {
            setUser(data.data);
        }
    };

    if (!user) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p>Reputation: {user.reputation}</p>
                    <div className="mt-2">
                        <h4 className="font-semibold">Badges:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {user.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary">{badge}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserProfile;