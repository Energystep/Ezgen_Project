import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit2, 
  Sparkles, 
  Search, 
  Tag, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  details: string;
  image: string;
  category: string;
}

interface MyProductsProps {
  setCurrentPage: (page: Page) => void;
  onSelectProductToCreate: (prod: { name: string; details: string; image: string; price: string; unit: string }) => void;
}

export default function MyProducts({ setCurrentPage, onSelectProductToCreate }: MyProductsProps) {
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      name: 'น้ำพริกปลาร้าผัด สูตรคุณแม่ 🌶️',
      price: '59.-',
      unit: 'กระปุก',
      category: 'อาหารและเครื่องดื่ม',
      details: 'รสชาติจัดจ้าน หอมกลิ่นปลาร้าแท้ ทำจากวัตถุดิบคุณภาพ สดใหม่ สะอาด ไม่ใส่สารกันบูด เก็บได้นาน',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prod-2',
      name: 'ชาเขียวมัทฉะเกียวโตพรีเมียม 🍵',
      price: '350.-',
      unit: 'ซอง',
      category: 'อาหารและเครื่องดื่ม',
      details: 'ผงมัทฉะออร์แกนิกแท้ 100% นำเข้าจากเกียวโต สีเขียวมรกตสวยตามธรรมชาติ ไม่ผสมสีหรือน้ำตาล รสชาติกลมกล่อม มีรสอูมามิลุ่มลึก',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prod-3',
      name: 'ครัวซองต์เนยสดฝรั่งเศส 🥐',
      price: '45.-',
      unit: 'ชิ้น',
      category: 'เบเกอรี',
      details: 'อบสดใหม่ทุกวัน ใช้เนยแท้นำเข้าจากฝรั่งเศส 100% เนื้อแป้งเป็นชั้นบางกรอบนอก นุ่มฉ่ำเนยด้านใน',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New product inputs
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('ชิ้น');
  const [newDetails, setNewDetails] = useState('');
  const [newCategory, setNewCategory] = useState('สินค้าทั่วไป');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const item: ProductItem = {
      id: 'prod-' + Date.now(),
      name: newName,
      price: newPrice || '0.-',
      unit: newUnit,
      category: newCategory,
      details: newDetails,
      image: newImage
    };

    setProducts(prev => [item, ...prev]);
    // reset
    setNewName('');
    setNewPrice('');
    setNewDetails('');
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('ยืนยันลบสินค้านี้ออกจากแคตตาล็อก?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <div className="relative flex-grow max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อสินค้า หรือรายละเอียด..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-100 hover:brightness-105 transition-all text-xs flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มสินค้าใหม่</span>
        </button>
      </div>

      {/* Add form overlay */}
      {showAddForm && (
        <form onSubmit={handleAddProduct} className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-lg space-y-4 max-w-xl">
          <h3 className="text-sm font-bold text-gray-900 flex items-center">
            <Package className="w-4 h-4 mr-1 text-indigo-600" />
            เพิ่มข้อมูลสินค้าใหม่เข้าระบบ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">ชื่อสินค้า</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="เช่น คุกกี้ช็อกโกแลตชิพพรีเมียม 🍪"
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">หมวดหมู่</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              >
                <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
                <option value="เบเกอรี">เบเกอรี</option>
                <option value="ความงามและแฟชั่น">ความงามและแฟชั่น</option>
                <option value="สินค้าทั่วไป">สินค้าทั่วไป</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">ราคา (เช่น 89.-)</label>
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="89.-"
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">หน่วยเรียก (เช่น ชิ้น, กล่อง)</label>
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="กล่อง"
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">รายละเอียดสินค้า</label>
            <textarea
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              rows={3}
              placeholder="บอกสรรพคุณ ส่วนผสม เพื่อให้ AI นำไปเขียนสโลแกนได้โดนใจ..."
              className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-gray-700 resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">ลิงก์รูปภาพตัวอย่าง (Unsplash / พิมพ์ URL)</label>
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-gray-600 font-mono"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white rounded-xl text-xs"
            >
              บันทึกสินค้า
            </button>
          </div>
        </form>
      )}

      {/* Grid of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div 
            key={p.id} 
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  ราคา {p.price} / {p.unit}
                </span>
              </div>

              {/* Text content */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{p.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{p.details}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-between gap-2 mt-3">
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="ลบออกจากแคตตาล็อก"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectProductToCreate({
                  name: p.name,
                  details: p.details,
                  image: p.image,
                  price: p.price,
                  unit: p.unit
                })}
                className="flex-grow py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-100 hover:brightness-105 transition-all flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>สร้างสื่อโฆษณาด้วย AI</span>
                <ArrowRight className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 space-y-2">
            <span className="text-4xl">📦</span>
            <p className="text-sm font-semibold">ไม่พบรายการสินค้าที่ระบุ</p>
          </div>
        )}
      </div>

    </div>
  );
}
