import React from 'react';
import { Button } from '@/components/ui/button';

const VotingSystem = ({ policy }) => {
    const handleVote = async (vote) => {
        const res = await fetch('/api/votes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ policyId: policy._id, vote }),
        });
        const data = await res.json();
        if (data.success) {
            // Update UI or fetch updated policy data
        } else {
            alert(data.message || 'Error casting vote');
        }
    };

    return (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Cast Your Vote:</h4>
            <div className="space-x-4">
                <Button onClick={() => handleVote('for')} variant="outline">Vote For</Button>
                <Button onClick={() => handleVote('against')} variant="outline">Vote Against</Button>
            </div>
            <p className="mt-2">Current votes: {policy.votes}</p>
        </div>
    );
};

export default VotingSystem;