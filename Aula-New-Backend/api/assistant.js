import OpenAI from "openai"
import express from 'express'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
  
})
const router = express.Router()

router.post('/chat', async (req, res) => {
    threads = {}
    const threadId = req.body.threadId
    const messages  = req.body.messages
    const assistantId = "asst_vAB6iUNHYPQecCVZIu5pnB0n"
    
    try {
        let openAiThread = threads[threadId];
        if (!openAiThread) {
            const openAiThread = await openai.beta.threads.create();
            console.log("New thread created with ID: ", openAiThread.id, "\n");
            threads[threadId] = openAiThread.id;
        }
        await openai.beta.threads.messages.create(threads[threadId], {
            role: "user",
            content: messages[messages.length - 1].message
        });

        const run = await openai.beta.threads.runs.createAndPoll(threads[threadId], {
            assistant_id: assistantId
        });
        console.log(run);
        return res.json({run});

    }catch (error) {
        console.error("Error creating thread:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

export default router