import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/topics');
            if (!response.ok) {
                if (response.status === 401) {
                    // Redirect to sign-in if unauthorized
                    signIn();
                }
                throw new Error('Failed to fetch topics');
            }
            const data = await response.json();
            setTopics(data.data);
        } catch (err) {
            setError('Failed to load topics. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTopic = async () => {
        if (newTopic.trim() === '') return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTopic }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Redirect to sign-in if unauthorized
                    signIn();
                }
                throw new Error('Failed to add topic');
            }

            const addedTopic = await response.json();
            setTopics([...topics, addedTopic.data]);
            setNewTopic('');
        } catch (err) {
            setError('Failed to add topic. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTopic = (topic) => {
        // Implement topic selection logic here
        console.log('Selected topic:', topic);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                <Input
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Enter new topic"
                    disabled={isLoading}
                />
                <Button onClick={handleAddTopic} disabled={isLoading}>Add Topic</Button>
            </div>
            {topics.length > 0 ? (
                <ul>
                    {topics.map(topic => (
                        <li key={topic._id} className="mb-2">
                            <Button
                                variant="outline"
                                onClick={() => handleSelectTopic(topic)}
                            >
                                {topic.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No topics available.</p>
            )}
        </div>
    );
};

export default TopicList;
