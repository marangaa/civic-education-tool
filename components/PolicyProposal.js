import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const PolicyProposal = () => {
    const [policies, setPolicies] = useState([]);
    const [newPolicy, setNewPolicy] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        const res = await fetch('/api/policies');
        const data = await res.json();
        if (data.success) {
            setPolicies(data.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/policies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPolicy),
        });
        const data = await res.json();
        if (data.success) {
            setPolicies([...policies, data.data]);
            setNewPolicy({ title: '', description: '' });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Policy Proposals</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Policy Title"
                        value={newPolicy.title}
                        onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                    />
                    <Textarea
                        placeholder="Policy Description"
                        value={newPolicy.description}
                        onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                    />
                    <Button type="submit">Propose Policy</Button>
                </form>
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Current Proposals:</h3>
                    {policies.map((policy) => (
                        <div key={policy._id} className="mb-4 p-4 border rounded">
                            <h4 className="font-bold">{policy.title}</h4>
                            <p>{policy.description}</p>
                            <p className="text-sm text-gray-500">Status: {policy.status}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PolicyProposal;