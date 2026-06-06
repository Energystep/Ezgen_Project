import React, { useState } from 'react';
import { Page, BlogArticle } from '../types';
import { BookOpen, Search, Mail, Sparkles, Eye, User, Clock, ArrowRight, Heart, Share2, Award, Gem } from 'lucide-react';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // High-value, luxury marketing academy articles for SME
  const articles: BlogArticle[] = [
    {
      id: 'art-1',
      title: '5 เทคนิคจัดทิศทางภาพแบนเนอร์และจิตวิทยาคู่สีทอง-น้ำเงิน เพิ่มมูลค่าสินค้า 10 เท่า',
      summary: 'เจาะลึกจิตวิทยาการใช้อารมณ์สีของสินค้าพรีเมียม เพื่อให้ลูกค้าสะดุดตาตั้งแต่เสี้ยววินาทีแรกที่เห็นฟีด พร้อมวิธีจัดวาง Layout แบบสัดส่วนทองคำทองคำ (Golden Ratio)',
      content: 'ในการปั้นแบรนด์พรีเมียม จิตวิทยาเป็นสิ่งสำคัญที่สุด คู่สีทองกะรัตตัดกับน้ำเงินมิดไนท์บลู นำเสนอระดับคุณภาพและความน่าเชื่อถือสูงสุด ทฤษฎีนี้ถูกใช้อย่างกว้างขวางในกลุ่มแบรนด์อัญมณี นาฬิกา และโรงแรมหรูระดับเจ็ดดาว...',
      category: 'ดีไซน์พรีเมียม',
      reads: 4210,
      date: '2026-06-05',
      image: '✨',
      author: 'ดร. นลิน พิพัทธวัฒน์ (โค้ชแบรนดิ้งชื่อดัง)',
      featured: true
    },
    {
      id: 'art-2',
      title: 'สูตรลับเขียนคำพาดหัวโฆษณาฉบับหรูหรา นุ่มนวลแต่เร้าอารมณ์ความครอบครอง',
      summary: 'ทำอย่างไรให้สโลแกนดูไม่เน้นขายประชดกระชันจนเกินไป แต่สามารถสื่อถึงรสนิยมและความเอ็กซ์คลูซีฟในราคาที่ดีที่สุด สอนสร้าง Word Choice ระดับสากลด้วยเครื่องมือ AI บูติก',
      content: 'แบรนด์หรูไม่ป่าวประกาศว่า "ถูกที่สุด" หรือ "ลดแหลกแจกแถม" แต่พวกเขาใช้คำที่พ่วงความหวงแหน เช่น "แด่สมาชิกคนสำคัญเพียงเสี้ยววินาที" หรือ "ความพรีเมียมเหนือกาลเวลา" เพื่อเร้าให้เกิดความรู้สึกพิเศษ...',
      category: 'แคปชันเงินล้าน',
      reads: 2890,
      date: '2026-06-03',
      image: '✍️',
      author: 'กิตติพงษ์ ยอดสุนทร (Copywriting Lead)',
      featured: false
    },
    {
      id: 'art-3',
      title: 'เจาะลึกการจัดสรรรอบยิงแอดพรีเมียมใน TikTok และวิธีการคัดกรองลูกค้าระดับกำลังซื้อสูง',
      summary: 'ถอดสูตรคำนวณงบประมาณ ROI พร้อมวิธีหลีกเลี่ยงกระแสน้ำฟอกย้อมทราฟฟิกราคาถูก เพื่อปักหมุดเจาะกลุ่มเป้าหมายคนทำงานระดับผู้บริหารโดยเฉพาะ ประสิทธิภาพสูงสุด',
      content: 'หลายคนคิดว่าผู้บริหารระดับสูงไม่เสพ TikTok แต่ข้อมูลเชิงลึกในระยะหลังกลับพบว่า ยอด CTR โฆษณาระดับคุณภาพจากแบรนด์อสังหาริมทรัพย์และเครื่องใช้ไฟฟ้าระดับบนพุ่งสูงขึ้นอย่างก้าวกระโดด...',
      category: 'ยิงแอดพรีเมียม',
      reads: 3510,
      date: '2026-06-01',
      image: '📊',
      author: 'ณัฐพงษ์ เลิศอนันต์กุล (Media Buyer)',
      featured: false
    },
    {
      id: 'art-4',
      title: 'สร้างสรรค์วิดีโอสตอรี่บน Instagram อย่างไรให้ดู Luxury เรียบหรู แต่ยังคงสีสันสดใสชวนหลงใหล',
      summary: 'การผสานความสดใสและความหรูหราเข้าด้วยกัน การคัดสรรเฉดสีเนออนแบบพาสเทลเพื่อปลุกเร้าอารมณ์วัยรุ่นมีสไตล์ คู่งานโฆษณาที่หยุดตาและกระตุ้นการตัดสินใจซื้อในทันที',
      content: 'เฉดสีสดใสไม่จำเป็นต้องดูขัดหูขัดตากับระดับความเรียบหรู ความสมดุลสามารถปรับแต่งได้ด้วยทฤษฎีการควบคุม Dynamic Range บนแบนเนอร์ ใช้ประโยชน์จากพื้นที่ว่างให้คุ้มค่าที่สุด...',
      category: 'ดีไซน์พรีเมียม',
      reads: 1980,
      date: '2026-05-28',
      image: '📸',
      author: 'พชรพล สุคนธรส (Creative Director)',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'บทความทั้งหมด' },
    { id: 'ดีไซน์พรีเมียม', label: 'ดีไซน์พรีเมียม' },
    { id: 'แคปชันเงินล้าน', label: 'แคปชันเงินล้าน' },
    { id: 'ยิงแอดพรีเมียม', label: 'ยิงแอดพรีเมียม & ROI' },
  ];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(art => art.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubmitted(true);
    setEmailInput('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans" id="blog-academy-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page intro block / Luxury feel */}
        <div className="text-center space-y-3 max-w-3xl mx-auto" id="academy-introduction">
          <span className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full flex items-center w-fit mx-auto animate-pulse">
            <Gem className="w-3.5 h-3.5 mr-1 text-amber-600" />
            Ezgen Academy & Exclusive Knowledge
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-amber-950 to-stone-900 bg-clip-text text-transparent">
            แหล่งความรู้และการยกระดับธุรกิจระดับโกลด์
          </h1>
          <p className="text-sm text-gray-400">
            คัดสรรกรณีศึกษา ถอดรหัสลับแบนเนอร์ปัง และเทคนิคปิดการขายจากผู้เชี่ยวชาญการทำการตลาดระดับประเทศ
          </p>
        </div>

        {/* Featured Special Article (บทความเด่นประจำสัปดาห์) */}
        {featuredArticle && (
          <div 
            className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 hover:border-amber-200 transition-all group"
            id="featured-blog-card"
          >
            {/* Left Visual element represent */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-amber-950 via-indigo-950 to-stone-900 p-8 flex flex-col justify-between text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  บทความเด่นสัปดาห์นี้
                </span>
                <span className="font-semibold text-xs text-amber-200">
                  {featuredArticle.reads.toLocaleString()} อ่านสะสม
                </span>
              </div>

              <div className="my-10 text-center z-10">
                <span className="text-7xl filter drop-shadow-lg inline-block animate-bounce">{featuredArticle.image}</span>
              </div>

              <div className="space-y-1.5 z-10">
                <p className="text-[10px] text-amber-300 font-mono">EXCLUSIVE INSIGHT BY ADSTUDIO</p>
                <p className="text-xs text-indigo-200">เขียนโดย: {featuredArticle.author}</p>
              </div>
            </div>

            {/* Right Information content */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {featuredArticle.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-amber-700 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4 text-gray-300" />
                  <span>เผยแพร่: {featuredArticle.date}</span>
                </div>

                <button 
                  onClick={() => alert(`คุณได้รับสิทธิ์เข้าอ่านบทความฉบับพิเศษแบบเจาะลึกฟรี! ${featuredArticle.title}`)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-amber-800 transition-all inline-flex items-center space-x-1.5 shadow"
                >
                  <span>เริ่มศึกษาแบบเจาะลึก</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Toolbar & Filter Tabs */}
        <div className="bg-white p-5 border border-gray-150 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4" id="blog-search-toolbar">
          
          {/* Categories Tab selectors */}
          <div className="flex overflow-x-auto space-x-1.5 no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  activeCategory === cat.id 
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-100' 
                    : 'bg-slate-50 text-gray-500 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar inside Blog */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเทคนิคทำเงินจากปฏิทิน..."
              className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 pl-9 pr-4 rounded-xl focus:outline-none focus:border-amber-600 focus:ring-0 text-gray-700"
            />
          </div>

        </div>

        {/* Article Grid show */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="article-grid">
          {filteredArticles.map((art) => (
            <div 
              key={art.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-amber-200 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => alert(`เริ่มเปิดบทเรียนเรื่อง: ${art.title}`)}
            >
              <div>
                {/* Simulated Thumbnail */}
                <div className="aspect-video bg-gradient-to-tr from-slate-900 to-indigo-950 p-6 flex items-center justify-center text-5xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_75%)]"></div>
                  <span className="filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{art.image}</span>
                  <span className="absolute top-3 left-3 text-[9px] bg-white/20 text-white px-2 py-0.5 rounded border border-white/15">
                    {art.category}
                  </span>
                </div>

                {/* Info blocks */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Author & Footer info in card */}
              <div className="p-5 pt-3 border-t border-gray-50 flex justify-between items-center bg-white text-[10px] text-gray-400">
                <span className="truncate max-w-[140px] font-medium text-gray-650">✍️ {art.author}</span>
                <span className="flex items-center shrink-0">
                  <Eye className="w-3.5 h-3.5 mr-0.5" />
                  {art.reads.toLocaleString()} วิว
                </span>
              </div>

            </div>
          ))}

          {filteredArticles.length === 0 && (
            <p className="text-center col-span-3 py-10 text-xs text-gray-400">
              ไม่พบบทความวิจัยการทำการตลาดที่ตรงกับความสนใจของคุณในขณะนี้ โปรดลองล้างคำค้นหา
            </p>
          )}
        </div>

        {/* Elegant Gold Newsletter Subscription Capture Leads Box (Newsletter Box) */}
        <div 
          className="bg-gradient-to-tr from-slate-900 via-amber-950 to-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-amber-500/20"
          id="academy-newsletter"
        >
          {/* Radial visual glow background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(217,119,6,0.15),transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <span className="text-[10px] font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full uppercase">
              👑 SME VIP MEMBERS CLUB
            </span>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                รับฟรี! ชุดเทมเพลตพรีเมียมและสัญญาลักษณ์สวยงามทางอีเมลทุกวันจันทร์
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                ไม่พลาดเทรนด์สโลแกนโฆษณาฉบับลวงตา ทำคะแนนความสำเร็จเพื่อปั๊มยอดให้แอดคุณยืนหยัดขึ้นเป็นที่หนึ่ง
              </p>
            </div>

            {/* Simulated Email Form input fields */}
            {emailSubmitted ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-semibold">
                🎉 ยอดเยี่ยม! สมัครสมาชิกและอุดสมองความหอมเรียบร้อยแล้ว เราจะทยอยส่งข้อมูลความรู้ถึงทางเข้าจดหมายคุณ
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" id="newsletter-inputs">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="กรอกอีเมลของคุณเพื่อเชื่อมต่อความรู้เสรี..."
                  className="bg-white/10 text-white text-xs py-3 px-4 rounded-xl focus:outline-none focus:border-amber-500 placeholder-gray-500 border border-white/10 flex-grow"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow"
                >
                  <Mail className="w-4 h-4" />
                  <span>รับสิทธิ์เข้า VIP ฟรี</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-gray-500">
              *ข้อมูลส่วนตัวของคุณได้รับการปกป้อง 100% สามารถยกเลิกการสมัครสมาชิกได้ทันทีในคลิกเดียว
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
