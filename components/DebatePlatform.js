import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const DebatePlatform = ({ topicId }) => {
    const [debates, setDebates] = useState([]);
    const [newDebate, setNewDebate] = useState({ title: '', description: '' });
    const [selectedDebate, setSelectedDebate] = useState(null);
    const [newArgument, setNewArgument] = useState({ side: 'for', content: '' });

    useEffect(() => {
        fetchDebates();
    }, [topicId]);

    const fetchDebates = async () => {
        const res = await fetch(`/api/debates?topicId=${topicId}`);
        const data = await res.json();
        if (data.success) {
            setDebates(data.data);
        }
    };

    const handleSubmitDebate = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/debates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newDebate, topic: topicId }),
        });
        const data = await res.json();
        if (data.success) {
            setDebates([...debates, data.data]);
            setNewDebate({ title: '', description: '' });
        }
    };

    const handleSubmitArgument = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/debates', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ debateId: selectedDebate._id, argument: newArgument }),
        });
        const data = await res.json();
        if (data.success) {
            setSelectedDebate(data.data);
            setNewArgument({ side: 'for', content: '' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Debate Platform</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmitDebate} className="space-y-4">
                    <Input
                        placeholder="Debate Title"
                        value={newDebate.title}
                        onChange={(e) => setNewDebate({ ...newDebate, title: e.target.value })}
                    />
                    <Textarea
                        placeholder="Debate Description"
                        value={newDebate.description}
                        onChange={(e) => setNewDebate({ ...newDebate, description: e.target.value })}
                    />
                    <Button type="submit">Start Debate</Button>
                </form>
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Current Debates:</h3>
                    {debates.map((debate) => (
                        <div key={debate._id} className="mb-4 p-4 border rounded">
                            <h4 className="font-bold">{debate.title}</h4>
                            <p>{debate.description}</p>
                            <Button onClick={() => setSelectedDebate(debate)}>Join Debate</Button>
                        </div>
                    ))}
                </div>
                {selectedDebate && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Selected Debate: {selectedDebate.title}</h3>
                        <form onSubmit={handleSubmitArgument} className="space-y-4">
                            <Select
                                value={newArgument.side}
                                onChange={(e) => setNewArgument({ ...newArgument, side: e.target.value })}
                            >
                                <option value="for">For</option>
                                <option value="against">Against</option>
                            </Select>
                            <Textarea
                                placeholder="Your Argument"
                                value={newArgument.content}
                                onChange={(e) => setNewArgument({ ...newArgument, content: e.target.value })}
                            />
                            <Button type="submit">Submit Argument</Button>
                        </form>
                        <div className="mt-4">
                            <h4 className="font-semibold">Arguments:</h4>
                            {selectedDebate.arguments.map((arg, index) => (
                                <div key={index} className="mt-2">
                                    <p><strong>{arg.side}:</strong> {arg.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DebatePlatform;