import { useMutation, useQuery } from "convex/react";
import { ElevenLabsClient } from "elevenlabs";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { api } from "../convex/_generated/api";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

const client = new ElevenLabsClient({ apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY });


type Conversation = {
    _id: string;
    groQuery: string;
    convoId: string;
    response?: string;
};

const Notify = () => {
    const [message, setMessage] = useState('')
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const conversationsData = useQuery(api.conversation.getConversation);
    const createConversation = useMutation(api.conversation.createConversation);

    // Sync local state with query result
    useEffect(() => {
        if (Array.isArray(conversationsData)) {
            setConversation(conversationsData);
        }
    }, [conversationsData]);

    const handleNotify = async () => {
        try {
            const response = await client.conversationalAi.twilioOutboundCall({
                agent_id: "agent_01jwwmjdzzecpbk0j5jd1348cx",
                agent_phone_number_id: "phnum_01jwxcr186fzbvzwbvtr1whty1",
                to_number: "+9196631 00122",
                conversation_initiation_client_data: {
                    dynamic_variables: {
                        "user_name": "Madhu",
                        "information": message
                    }
                }

            });
            console.log(response)
            const data = response?.callSid;
            console.log(data)
            await createConversation({
                groQuery: message,
                convoId: data as string,
                response: ""
            })
            toast.success("Conversation started successfully");
        } catch (error) {
            console.error('Failed to start conversation:', error);
            toast.error('Failed to start conversation. Please ensure microphone access is granted.');
        }
    }

    // const handleGetConversation = async () => {
    //     const conversation = await getConversation();
    //     console.log(conversation);
    //     setConversation(conversation)
    // }

    // useEffect(() => {
    //     handleGetConversation()
    // }, [])

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Notify User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message"
                                className="h-24"
                            />
                            <Button onClick={handleNotify}>Send</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50">
                    <CardHeader>
                        <CardTitle>Conversation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {conversation.length > 0 ? (
                            conversation.map((item) => (
                                <div key={item._id} className="mb-4 p-2 border-b last:border-b-0 space-y-3">
                                    <p className="font-semibold">Query: {item.groQuery}</p>
                                    <div>
                                        <label htmlFor="" className="font-semibold">Summary:</label>
                                        <p className="text-sm text-gray-700">{item.response || <span className="italic text-gray-400">No response yet</span>}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">No conversation history found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Notify