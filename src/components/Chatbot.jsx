import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Mic, Volume2, VolumeX, X, Loader2 } from 'lucide-react';
import './Chatbot.css';

// Initial assistant message
const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Namaste! Main Diwakar Sir Home Tutors ka AI Assistant hoon. Aapko apne bachhe ke liye Patna me expert home tutor dhoondhne me help karunga.\n\nMujhe bas 4 details bata dijiye:\n1. Student ki Class\n2. Subject\n3. Preferred Learning Timing\n4. Patna me aapka Area (locality)\n\nInme se kisi bhi detail se shuru karein!'
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Read Groq API key directly from environment variables
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Recognition (Speech-to-Text)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'hi-IN'; // Best for Hinglish / Hindi speech recognition
      
      rec.onstart = () => {
        setIsListening(true);
        // Stop any current bot speaking when user starts talking
        stopSpeaking();
      };
      
      rec.onend = () => {
        setIsListening(false);
      };
      
      rec.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };
      
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          handleSendMessage(transcript);
        }
      };
      
      recognitionRef.current = rec;
    }
    
    if (window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }

  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Clean TTS speaking on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Text-to-Speech (TTS) implementation
  const speakText = (text) => {
    if (isMuted || !synthRef.current) return;
    
    stopSpeaking();
    
    // Clean code system tags before reading out loud
    const textToSpeak = text.replace(/\[SHOW_CONNECT_BUTTON\]/g, '').trim();
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Find a friendly Indian voice (Hindi or Indian English)
    const voices = synthRef.current.getVoices();
    const targetVoice = voices.find(v => v.lang.startsWith('hi-IN') || v.lang.startsWith('en-IN')) || voices[0];
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech-to-Text Microphone toggle
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Aapke browser me voice input support nahi hai. Please Google Chrome use karein.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  // Call Groq API completions
  const queryGroqAPI = async (chatHistory) => {
    if (!apiKey) {
      throw new Error('API_KEY_MISSING');
    }

    const systemPrompt = `You are the strict AI Tuition Assistant for 'Diwakar Sir Home Tutors'. Your ONLY job is to politely greet parents in a friendly, empathetic Hinglish (Hindi + English) tone and collect 4 clean pieces of information: Class, Subject, Preferred Timing, and Area in Patna.

CRITICAL RULES:
1. Do NOT chat about topics other than home tuitions. If the user asks about anything else, say: 'Ma'am/Sir, main aapki sirf home tuition se related help kar sakta hoon.'
2. Do NOT invent or give any tutor numbers, names, or pricing your own.
3. Once you get all the 4 details (Class, Subject, Preferred Timing, and Area in Patna), summarize them beautifully and tell them to click the button below to connect with Diwakar Sir. Stop generating text after that.
4. [SYSTEM NOTE: If you have successfully collected all 4 pieces of information and are presenting the final summary, please append the exact tag [SHOW_CONNECT_BUTTON] at the very end of your response so the system can display the direct WhatsApp contact button to the parent.]`;

    // Map message format
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        // Clean system tag before sending back to LLM to prevent loop
        content: msg.content.replace(/\[SHOW_CONNECT_BUTTON\]/g, '').trim()
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.1, // Set temperature very low to prevent hallucinations
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Groq API Error:', errData);
      throw new Error(errData.error?.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  // Send message handler
  const handleSendMessage = async (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text) return;
    
    setInputText('');
    stopSpeaking();
    
    // Add user message
    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const aiReply = await queryGroqAPI(updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      
      // Auto speak response
      speakText(aiReply);
    } catch (err) {
      console.error(err);
      let errMsg = 'Sorry, service me kuch error aa gaya hai. Please thodi der baad check karein.';
      
      if (err.message === 'API_KEY_MISSING') {
        errMsg = 'Groq API Key (VITE_GROQ_API_KEY) set nahi hai environment me. Please check karein.';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // WhatsApp redirection link builder
  const buildWhatsAppLink = (messageContent) => {
    const cleanContent = messageContent.replace(/\[SHOW_CONNECT_BUTTON\]/g, '').trim();
    const baseMsg = `Hello Diwakar Sir, I want to book a home tutor demo. Here are the details from the AI assistant:\n\n${cleanContent}`;
    return `https://wa.me/917301455882?text=${encodeURIComponent(baseMsg)}`;
  };

  const handleChipClick = (text) => {
    handleSendMessage(text);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button 
        className="chatbot-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        {!isOpen && <span className="chatbot-trigger-pulse"></span>}
      </button>

      {/* Main Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="chatbot-title-container">
                <span className="chatbot-title">Diwakar Sir Tutors</span>
                <span className="chatbot-status">AI Assistant Online</span>
              </div>
            </div>

            <div className="chatbot-header-actions">
              {/* TTS Mute Toggle */}
              <button 
                className="chatbot-header-btn"
                onClick={() => {
                  const muted = !isMuted;
                  setIsMuted(muted);
                  if (muted) stopSpeaking();
                }}
                title={isMuted ? "Unmute Voice Responses" : "Mute Voice Responses"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              


              {/* Close Button */}
              <button 
                className="chatbot-header-btn"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">

            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              const hasConnectButton = msg.content.includes('[SHOW_CONNECT_BUTTON]');
              const cleanText = msg.content.replace(/\[SHOW_CONNECT_BUTTON\]/g, '').trim();

              return (
                <div key={index} className={`chatbot-message-wrapper ${msg.role}`}>
                  <div className={`chatbot-msg-avatar ${msg.role}`}>
                    {isAssistant ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    ) : (
                      <span style={{ fontSize: '10px', fontWeight: 'bold' }}>ME</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="chatbot-bubble">
                      {cleanText}
                      
                      {/* Audio soundwave displayed while reading this bubble */}
                      {isAssistant && isSpeaking && index === messages.length - 1 && (
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Speaking...</span>
                          <div className="soundwave">
                            <span className="soundwave-bar"></span>
                            <span className="soundwave-bar"></span>
                            <span className="soundwave-bar"></span>
                            <span className="soundwave-bar"></span>
                          </div>
                        </div>
                      )}
                      
                      {/* Render WhatsApp connection button when requirements are met */}
                      {hasConnectButton && (
                        <div>
                          <a 
                            href={buildWhatsAppLink(msg.content)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="chatbot-whatsapp-btn"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.438 2.5 1.171 3.466L6.71 18.067l2.748-.72c.924.593 2.014.946 3.185.947h.003c3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.58-5.766-5.768-5.766zm3.411 8.21c-.14.394-.716.718-1.07.766-.307.042-.705.074-2.146-.522-1.843-.761-3.033-2.633-3.125-2.756-.092-.123-.815-.972-.815-1.854s.46-.131.624-.3c.164-.168.358-.21.478-.21.12 0 .239.001.343.006.111.005.257-.043.404.312.164.394.562 1.371.611 1.47.05.099.082.214.016.345-.065.13-.1.282-.198.396-.098.115-.216.25-.308.344-.102.103-.21.214-.09.421.12.206.533.88 1.144 1.425.787.701 1.447.918 1.653 1.02.206.103.327.087.45-.054.123-.14.522-.607.662-.813.14-.206.281-.172.472-.102.191.07.121.05.772.375.65.326 1.083.488 1.165.627.083.14.083.41-.057.804zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            <span>WhatsApp Connect</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="chatbot-message-wrapper assistant">
                <div className="chatbot-msg-avatar assistant">
                  <Loader2 size={14} className="animate-spin" />
                </div>
                <div className="chatbot-bubble">
                  <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Start Suggestions for Parents */}
          {messages.length === 1 && (
            <div className="chatbot-quick-replies">
              <button className="chatbot-chip" onClick={() => handleChipClick("Class 8 ke liye tutor chahiye")}>
                Class 8 Tutor
              </button>
              <button className="chatbot-chip" onClick={() => handleChipClick("Home tuition subjects kya hain?")}>
                Home Tuition Subjects
              </button>
              <button className="chatbot-chip" onClick={() => handleChipClick("Kankarbagh me classes available hain?")}>
                Kankarbagh Patna
              </button>
            </div>
          )}

          {/* Input Panel */}
          <div className="chatbot-input-area">
            
            {/* Microphone Button (Speech-to-Text) */}
            <button 
              className={`chatbot-action-btn chatbot-mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              title={isListening ? "Listening... click to stop" : "Start Speaking (Voice Input)"}
            >
              <Mic size={18} />
              {isListening && <span className="chatbot-mic-pulse"></span>}
            </button>
            
            <div className="chatbot-input-wrapper">
              <input 
                type="text"
                className="chatbot-input"
                placeholder={isListening ? "Listening..." : "Type your message..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                disabled={isListening}
              />
            </div>

            {/* Send Button */}
            <button 
              className="chatbot-action-btn chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isListening || isLoading}
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
