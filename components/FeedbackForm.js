import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const FeedbackForm = ({ topicId }) => {
    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, [topicId]);

    const fetchFeedback = async () => {
        const res = await fetch(`/api/feedback?topicId=${topicId}`);
        const data = await res.json();
        if (data.success) {
            setFeedbackList(data.data);
        }
    };

    const handleSubmitFeedback = async () => {
        if (feedback.trim() !== '') {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: feedback, topicId }),
            });
            const data = await res.json();
            if (data.success) {
                setFeedbackList([...feedbackList, data.data]);
                setFeedback('');
            }
        }
    };

    const handleVote = async (id, vote) => {
        const res = await fetch('/api/feedback', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, vote }),
        });
        const data = await res.json();
        if (data.success) {
            setFeedbackList(feedbackList.map(item =>
                item._id === id ? data.data : item
            ));
        }
    };

    return (
        <div>
            <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback or concerns"
                className="mb-2"
            />
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
            <div className="mt-4">
                <h3 className="font-semibold">Previous Feedback:</h3>
                <ul>
                    {feedbackList.map((item) => (
                        <li key={item._id} className="mt-2 flex justify-between items-center">
                            <span>{item.content}</span>
                            <div>
                                <Button onClick={() => handleVote(item._id, 1)} variant="outline" size="sm">👍</Button>
                                <span className="mx-2">{item.votes}</span>
                                <Button onClick={() => handleVote(item._id, -1)} variant="outline" size="sm">👎</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeedbackForm;