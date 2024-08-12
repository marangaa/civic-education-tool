import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const civicTopics = [
    {
        title: 'Government Structure',
        content: 'Learn about the three branches of government: Executive, Legislative, and Judicial.',
    },
    {
        title: 'Voting Rights',
        content: 'Understand your voting rights and the importance of participating in elections.',
    },
    {
        title: 'Civil Liberties',
        content: 'Explore the fundamental rights and freedoms protected by the Constitution.',
    },
    {
        title: 'Policy Making Process',
        content: 'Discover how laws and policies are created, from proposal to implementation.',
    },
    {
        title: 'Local Government',
        content: 'Learn about the structure and functions of your local government.',
    },
];

const CivicEducationSection = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Civic Education</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    {civicTopics.map((topic, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{topic.title}</AccordionTrigger>
                            <AccordionContent>
                                <p>{topic.content}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default CivicEducationSection;