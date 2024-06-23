import OpenAI from "openai"
import express from 'express'
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const router = express.Router()

// Declare threads here
let threads = {}

router.post('/', async (req, res) => {
    console.log("Received request body:", req.body);
    const threadId = req.body.threadId
    const messages = req.body.messages
    const assistantId = "asst_pFlmB7yz7RiemEAndGcT6OA1"
  
    try {
      let openAiThread = threads[threadId];
      if (!openAiThread) {
        openAiThread = await openai.beta.threads.create();
        console.log("New thread created with ID: ", openAiThread.id, "\n");
        threads[threadId] = openAiThread.id;
      }
  
      if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error("No messages provided");
      }
  
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || typeof lastMessage.message !== 'string') {
        throw new Error("Invalid message format");
      }
  
      await openai.beta.threads.messages.create(threads[threadId], {
        role: "user",
        content: lastMessage.message
      });
  
      const run = await openai.beta.threads.runs.createAndPoll(threads[threadId], {
        assistant_id: assistantId
      });
  
      console.log(run);
      return res.json({run});
    } catch (error) {
      console.error("Error in chat route:", error);
      if (error.message === "No messages provided" || error.message === "Invalid message format") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

router.get('/last-message/:threadId', async (req, res) => {
  const threadId = req.params.threadId;
  
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    const lastMessage = messages.data[0]; // The most recent message
    
    if (lastMessage) {
      res.json({ message: lastMessage.content[0].text.value });
    } else {
      res.status(404).json({ error: "No messages found in the thread" });
    }
  } catch (error) {
    console.error("Error fetching last message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router