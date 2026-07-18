import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  MessageSquare, 
  Bot, 
  User, 
  Lightbulb, 
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PromptChatbotProps {
  setCurrentPage: (page: any) => void;
}

export default function PromptChatbot({ setCurrentPage }: PromptChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `สวัสดีค่ะ! ยินดีต้อนรับสู่ **ที่ปรึกษาคิดพร้อมท์อัจฉริยะ (EZgen Prompt Advisor)** 🤖✨

หน้านี้สร้างขึ้นมาพิเศษเพื่อช่วยคุณคิดและปรับปรุงคำสั่ง (Prompt) ในการเจนนภาพโฆษณาและแคปชันให้สวยงาม ดึงดูดสายตา และขายดีที่สุดค่ะ!

**คุณสามารถปรึกษาฉันได้ทุกเรื่อง เช่น:**
1. 💡 *ช่วยคิดพร้อมท์แนวภาพสำหรับสินค้าเฉพาะทางของคุณ (เช่น สกินแคร์, อาหาร, แฟชั่น, คาเฟ่)*
2. 🎨 *แนะนำสไตล์ภาพ มุมกล้อง หรือโทนแสงที่เหมาะกับตัวตนแบรนด์ของคุณ*
3. 📝 *ปรับแต่งคำอธิบายภาษาไทยให้เป็นพร้อมท์ภาษาอังกฤษระดับโปรสำหรับไปเจนรูปภาพ*

ต้องการให้ช่วยคิดพร้อมท์สำหรับสินค้าอะไรเป็นพิเศษวันนี้ไหมคะ? สามารถเลือกหัวข้อแนะนำด้านล่าง หรือพิมพ์บอกรายละเอียดได้เลยค่ะ!`,
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickStarters = [
    {
      label: "🧴 เจนภาพสกินแคร์/เซรั่ม",
      query: "ช่วยออกแบบพร้อมท์ภาษาอังกฤษสวยๆ สำหรับเจนภาพขวดเซรั่มบำรุงผิวคู่กับกลีบกุหลาบและหยดน้ำ มีแสงธรรมชาติส่องเข้ามา สไตล์มินิมอลพรีเมียมค่ะ"
    },
    {
      label: "☕ โปรโมทร้านกาแฟ/เบเกอรี่",
      query: "อยากได้พร้อมท์รูปภาพแก้วกาแฟลาเต้อาร์ตอุ่นๆ วางบนโต๊ะไม้ในคาเฟ่โทนอบอุ่น สไตล์ Cinematic มีควันลอยขึ้นมาจางๆ"
    },
    {
      label: "👟 รองเท้าแฟชั่นสไตล์โมเดิร์น",
      query: "ขอพร้อมท์สำหรับเจนรูปภาพรองเท้าผ้าใบสตรีทแฟชั่น วางบนพื้นคอนกรีตที่มีแสงไฟนีออนสีม่วงและฟ้าสะท้อน สไตล์ Cyberpunk"
    },
    {
      label: "🥐 คอนเทนต์ขายครัวซองต์อบใหม่",
      query: "ช่วยคิดไอเดียพร้อมท์โฆษณาและภาพประกอบสำหรับโปรโมท ครัวซองต์เนยสดอบใหม่ หอมกรุ่น แสงสีทองอบอุ่นดูน่ากินมากๆ"
    }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Keep only last 10 messages to avoid token bloat and stay within limits
      const contextMessages = [...messages, newUserMessage].slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/ai/consult-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: contextMessages })
      });

      if (!response.ok) {
        throw new Error('ระบบเซิร์ฟเวอร์ขัดข้องชั่วคราว');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.content || 'ขออภัยค่ะ ระบบไม่สามารถประมวลผลคำตอบได้ในขณะนี้',
        timestamp: new Date()
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: `❌ ขออภัยด้วยนะคะ เกิดข้อผิดพลาดทางเทคนิค: ${error.message || 'กรุณาลองใหม่อีกครั้งในภายหลังค่ะ'}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (window.confirm('คุณต้องการรีเซ็ตการสนทนาทั้งหมดใช่หรือไม่?')) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `สวัสดีค่ะ! ฉันยินดีต้อนรับคุณกลับเข้าสู่ที่ปรึกษาคิดพร้อมท์อัจฉริยะ (EZgen Prompt Advisor) อีกครั้งค่ะ 🤖✨\n\nวันนี้คุณต้องการให้ฉันช่วยปรับปรุงพร้อมท์โฆษณา หรือคิดไอเดียสไตล์ภาพโฆษณาสินค้าแบบไหนดีคะ? พิมพ์ถามได้เลยนะ!`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Helper to extract copyable blocks or raw text
  const formatMessageText = (text: string) => {
    // Simple markdown helper for bold and code blocks
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let formatted = line;
      
      // Match bold markdown **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-extrabold text-slate-900">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const hasBold = parts.length > 0;
      const content = hasBold ? parts : line;

      // Render line
      return (
        <p key={idx} className="min-h-[1.25rem] mb-1 leading-relaxed">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 font-sans text-gray-800" id="prompt-chatbot-view">
      
      {/* Title Header with Modern Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-[#5c3df5] rounded-xl"><Bot className="w-5 h-5 sm:w-6 sm:h-6" /></span>
            <span>ที่ปรึกษาคิดพร้อมท์อัจฉริยะ (EZgen Prompt Advisor)</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            ผู้ช่วยระดับแชมป์เปี้ยนในการขัดเกลาคำสั่งและสไตล์ภาพโฆษณาให้โดดเด่น เหนือคู่แข่งในตลาด
          </p>
        </div>
        
        {/* Reset Session button */}
        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold shadow-xs transition-all w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ล้างการแชท</span>
        </button>
      </div>

      {/* Main Grid: Left Column is chat, Right Column is prompt writing guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Chat Area (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150/70 shadow-xs flex flex-col h-[620px] overflow-hidden">
          
          {/* Active Partner Top Bar */}
          <div className="bg-slate-900 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5c3df5] to-indigo-500 p-2.5 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>EZgen Prompt Advisor</span>
                  <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-400/20 text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300 font-medium">คุยปรึกษาได้ทันที ฟรีค่าธรรมเนียม</p>
              </div>
            </div>

            {/* Quick action back to editor */}
            <button
              onClick={() => setCurrentPage('editor')}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] sm:text-xs font-bold transition-all"
            >
              <span>ไปสร้างสื่อด้วย AI</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-3 max-w-[85%] ${isAssistant ? 'self-start' : 'self-end flex-row-reverse ml-auto'}`}
                >
                  {/* Avatar Icon */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isAssistant 
                      ? 'bg-gradient-to-tr from-[#5c3df5] to-indigo-500 text-white' 
                      : 'bg-indigo-100 text-[#5c3df5]'
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble Container */}
                  <div className="space-y-1 w-full">
                    <div className={`p-3.5 sm:p-4 rounded-2xl relative border shadow-2xs text-xs ${
                      isAssistant 
                        ? 'bg-white border-gray-150 text-gray-800 rounded-tl-none' 
                        : 'bg-gradient-to-br from-[#5c3df5] to-indigo-700 border-indigo-600 text-white rounded-tr-none'
                    }`}>
                      
                      {/* Copy Helper for Assistant */}
                      {isAssistant && msg.id !== 'welcome' && (
                        <button
                          onClick={() => handleCopyText(msg.content, msg.id)}
                          title="คัดลอกคำแนะนำพร้อมท์นี้"
                          className="absolute right-3 top-3 p-1.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 rounded-lg text-gray-500 transition-all focus:outline-none"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {/* Message Text formatted */}
                      <div className="space-y-1.5 break-words leading-relaxed whitespace-pre-wrap">
                        {isAssistant ? formatMessageText(msg.content) : msg.content}
                      </div>

                    </div>
                    
                    {/* Timestamp display */}
                    <p className={`text-[9px] text-gray-400 font-semibold px-1 ${!isAssistant && 'text-right'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 max-w-[85%] self-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5c3df5] to-indigo-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-150 p-4 rounded-2xl rounded-tl-none shadow-2xs text-xs text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="font-semibold text-gray-400">EZgen กำลังคิดพร้อมท์อัจฉริยะให้คุณ...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick starters suggestion carousel */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-white shrink-0">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">💡 แนะนำหัวข้อเริ่มต้นถาม AI:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickStarters.map((starter, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(starter.query)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-gray-200 hover:border-indigo-200 text-[11px] font-semibold text-gray-700 transition-all flex items-center justify-between gap-2"
                  >
                    <span>{starter.label}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat input box */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="พิมพ์ถามสไตล์ภาพโฆษณา หรือปรึกษาพร้อมท์ที่นี่..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 font-medium transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 py-3 bg-gradient-to-r from-[#5c3df5] to-indigo-700 hover:brightness-105 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ส่ง</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Prompt Writing Guidelines & Tips (Span 4) */}
        <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
          
          {/* Blueprint prompt formula card */}
          <div className="bg-white p-5 rounded-3xl border border-gray-150/70 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-100 text-amber-700 rounded-lg"><Lightbulb className="w-4 h-4" /></span>
              <h3 className="font-extrabold text-sm text-slate-900">สูตรลับ พร้อมท์คุณภาพสูง</h3>
            </div>
            
            <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
              AI สร้างรูปภาพจะทำงานได้ยอดเยี่ยมที่สุด เมื่อใส่โครงสร้างพร้อมท์ครบถ้วนตามหลักด้านล่างนี้:
            </p>

            <div className="space-y-3.5 pt-1">
              
              {/* Formula Item 1 */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider block">Step 1: ตัววัตถุหลัก (Subject)</span>
                <p className="text-[11px] font-bold text-slate-800 leading-normal">
                  ระบุสินค้าให้ละเอียดที่สุด เช่น "ขวดเซรั่มสีชากระจกใสมีฝาหยด" หรือ "แก้วกาแฟลาเต้เซรามิกสีขาว"
                </p>
              </div>

              {/* Formula Item 2 */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider block">Step 2: สภาพแวดล้อม & พื้นหลัง (Background)</span>
                <p className="text-[11px] font-bold text-slate-800 leading-normal">
                  ฉากประกอบสินค้า เช่น "วางอยู่บนหินอ่อนสีขาว ตกแต่งด้วยดอกคาโมมายล์และใบไม้เขียว มีหยดน้ำเกาะ"
                </p>
              </div>

              {/* Formula Item 3 */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider block">Step 3: แสงสว่าง & สไตล์ (Lighting & Style)</span>
                <p className="text-[11px] font-bold text-slate-800 leading-normal">
                  เช่น "Studio Lighting, Soft dramatic sunlight, Minimalist, Elegant mood, 8k resolution, photorealistic"
                </p>
              </div>

            </div>
          </div>

          {/* Quick tips & shortcuts card */}
          <div className="bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-950 p-5 rounded-3xl text-white space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5c3df5]/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-2 relative z-10">
              <span className="p-1 bg-white/10 text-amber-300 rounded-lg"><Zap className="w-4 h-4" /></span>
              <h3 className="font-bold text-xs sm:text-sm text-white">วิธีนำพร้อมท์ไปใช้งานต่อ</h3>
            </div>

            <ul className="text-[11px] text-slate-300 space-y-2.5 leading-relaxed font-semibold pl-1 list-disc list-inside relative z-10">
              <li>กดปุ่ม **คัดลอก (Copy)** ด้านขวาของคำแนะนำที่ระบบแชทบอทตอบกลับให้</li>
              <li>เปิดหน้าเมนู **"สร้างสื่อด้วย AI"** หรือคลิกที่ปุ่มด่วนด้านล่าง</li>
              <li>นำข้อความพร้อมท์ภาษาอังกฤษที่ได้ไปวางในช่องข้อมูลผลิตภัณฑ์เพื่อรับภาพที่สมจริงสุดๆ!</li>
            </ul>

            <button
              onClick={() => setCurrentPage('editor')}
              className="w-full py-2.5 bg-gradient-to-r from-[#5c3df5] to-indigo-700 hover:brightness-105 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-[#5c3df5]/20 flex items-center justify-center gap-1.5 relative z-10"
            >
              <span>ลองวางพร้อมท์โฆษณาเลย</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
