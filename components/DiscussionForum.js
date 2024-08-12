import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const DiscussionForum = ({ topicId }) => {
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

    useEffect(() => {
        fetchDiscussions();
    }, [topicId]);

    const fetchDiscussions = async () => {
        const res = await fetch(`/api/discussions?topicId=${topicId}`);
        const data = await res.json();
        if (data.success) {
            setDiscussions(data.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/discussions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newDiscussion, topic: topicId }),
        });
        const data = await res.json();
        if (data.success) {
            setDiscussions([...discussions, data.data]);
            setNewDiscussion({ title: '', content: '' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Discussion Forum</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Discussion Title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    />
                    <Textarea
                        placeholder="Discussion Content"
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    />
                    <Button type="submit">Start Discussion</Button>
                </form>
                <div className="mt-6">
                    <h3 className="font-semibold">Existing Discussions</h3>
                    <ul>
                        {discussions.map((discussion, index) => (
                            <li key={index} className="py-2">
                                <h4 className="font-bold">{discussion.title}</h4>
                                <p>{discussion.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default DiscussionForum;