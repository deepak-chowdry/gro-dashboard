import { ElevenLabsClient } from "elevenlabs";
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

const client = new ElevenLabsClient({ apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY });

const Notify = () => {

    const [message, setMessage] = useState('')
    // const ResolutionSkeleton = () => (
    //     <Card>
    //         <CardHeader>
    //             <Skeleton className="h-6 w-24" />
    //         </CardHeader>
    //         <CardContent>
    //             <div className="space-y-6">
    //                 <Skeleton className="h-24 w-full" />
    //                 <Skeleton className="h-10 w-full md:w-48" />
    //                 <Skeleton className="h-10 w-20" />
    //             </div>
    //         </CardContent>
    //     </Card>
    // );

    const handleNotify = async () => {
        try {
            const response = await client.conversationalAi.twilioOutboundCall({
                agent_id: "agent_01jwwmjdzzecpbk0j5jd1348cx",
                agent_phone_number_id: "phnum_01jwxcr186fzbvzwbvtr1whty1",
                to_number: "+9197311 82312",
                conversation_initiation_client_data: {
                    dynamic_variables: {
                        "user_name": "Angelo",
                        "information": "The provided email address is not valid, can you provide a new one?"
                    }
                }

            });
            console.log(response)
        } catch (error) {
            console.error('Failed to start conversation:', error);
            alert('Failed to start conversation. Please ensure microphone access is granted.');
        }
    }

    return (
        <div className="space-y-6">
            {/* <ResolutionSkeleton /> */}
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

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Notify