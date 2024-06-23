import React, { useState } from 'react';
import OpenAI from 'openai';
import './Chat.css';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    setMessages([...messages, { text: input, user: 'user' }]);
    const response = await fetchMessage(input);
    setMessages([...messages, { text: response, user: 'bot' }]);
    setInput('');
  };

  const fetchMessage = async (input) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log('API response:', response.data);
    return response.data.choices[0].message.content.trim();
  };

  return (
    <div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default Chat;