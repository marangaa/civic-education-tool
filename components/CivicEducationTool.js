import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopicList from './TopicList';
import PolicyProposal from './PolicyProposal';
import VotingSystem from './VotingSystem';
import DiscussionForum from './DiscussionForum';
import DebatePlatform from './DebatePlatform';
import CivicEducationSection from './CivicEducationSection';
import UserProfile from './UserProfile';

const CivicEducationTool = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Civic Education and Engagement Platform</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Tabs defaultValue="topics">
                        <TabsList>
                            <TabsTrigger value="topics">Topics</TabsTrigger>
                            <TabsTrigger value="policies">Policies</TabsTrigger>
                            <TabsTrigger value="discussions">Discussions</TabsTrigger>
                            <TabsTrigger value="debates">Debates</TabsTrigger>
                            <TabsTrigger value="education">Civic Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="topics">
                            <TopicList onSelectTopic={setSelectedTopic} />
                        </TabsContent>
                        <TabsContent value="policies">
                            <PolicyProposal onSelectPolicy={setSelectedPolicy} />
                            {selectedPolicy && <VotingSystem policy={selectedPolicy} />}
                        </TabsContent>
                        <TabsContent value="discussions">
                            {selectedTopic ? (
                                <DiscussionForum topicId={selectedTopic._id} />
                            ) : (
                                <p>Please select a topic to view discussions.</p>
                            )}
                        </TabsContent>
                        <TabsContent value="debates">
                            {selectedTopic ? (
                                <DebatePlatform topicId={selectedTopic._id} />
                            ) : (
                                <p>Please select a topic to view debates.</p>
                            )}
                        </TabsContent>
                        <TabsContent value="education">
                            <CivicEducationSection />
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    <UserProfile />
                </div>
            </div>
        </div>
    );
};

export default CivicEducationTool;