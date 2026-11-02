import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryMegaMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path, categoryFilter) => {
    onClose();
    if (categoryFilter) {
      navigate(`${path}?category=${categoryFilter}`);
    } else {
      navigate(path);
    }
  };

  const categories = [
    {
      title: "Cookware & Hearth",
      icon: "skillet",
      color: "bg-[#EBF3EC] text-[#253D32]",
      filter: "cookware",
      items: [
        { name: "Cast Iron Dutch Ovens", tag: "5.5 Qt Sage Mist", isPopular: true },
        { name: "Tri-Ply Stainless Skillets", tag: "Induction Ready" },
        { name: "Stoneware Baking Dishes", tag: "Matte Cream" },
        { name: "Silicone & Beechwood Spoons", tag: "Heat Resistant" }
      ]
    },
    {
      title: "Knives & Prep Craft",
      icon: "flatware",
      color: "bg-[#FFF0EB] text-[#F08466]",
      filter: "prep",
      items: [
        { name: "67-Layer Damascus Santoku", tag: "VG-10 Core", isPopular: true },
        { name: "Hinoki Wood Cutting Boards", tag: "Antimicrobial" },
        { name: "Precision Herb & Poultry Shears", tag: "Japanese Steel" },
        { name: "Ceramic Honing Whetstone", tag: "1000/6000 Grit" }
      ]
    },
    {
      title: "Pantry & Dining Sets",
      icon: "table_bar",
      color: "bg-[#FEF9C3] text-[#A16207]",
      filter: "dining",
      items: [
        { name: "Borosilicate Airtight Spice Jars", tag: "12-Piece Set", isPopular: true },
        { name: "Artisan Ceramic Ramen Bowls", tag: "Set of 2" },
        { name: "Washed French Linen Aprons", tag: "Sage & Apricot" },
        { name: "Minimalist Matte Ochre Mugs", tag: "Stoneware" }
      ]
    }
  ];

  return (
    <div 
      className="absolute top-full left-0 right-0 z-50 pt-2"
      onMouseLeave={onClose}
    >
      {/* Mega Menu Card */}
      <div className="max-w-6xl mx-auto bg-[#FAF8F5] rounded-3xl shadow-[0_25px_60px_-10px_rgba(37,61,50,0.18)] border border-[#E8E2D5] p-6 sm:p-7 animate-fade-in-down backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Columns 1 to 3: Category Lists */}
          {categories.map((cat) => (
            <div key={cat.title} className="space-y-3.5">
              <div 
                onClick={() => handleNavigate('/catalog', cat.filter)}
                className="flex items-center gap-2.5 pb-2 border-b border-[#E8E2D5] cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#253D32] group-hover:text-[#365747] transition-colors leading-tight">
                    {cat.title}
                  </h4>
                  <span className="text-[10px] text-[#6F7570] font-medium uppercase tracking-wider">
                    Explore Collection →
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li 
                    key={item.name}
                    onClick={() => handleNavigate('/catalog', cat.filter)}
                    className="p-2 rounded-xl hover:bg-[#F5F2EB] cursor-pointer transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#253D32] group-hover:text-[#365747] transition-colors block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#8A958F] font-medium">
                        {item.tag}
                      </span>
                    </div>

                    {item.isPopular && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#FEF9C3] text-[#A16207]">
                        Bestseller
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Gen Z & MBA Innovation Feature Card */}
          <div className="bg-gradient-to-br from-[#EBF3EC] via-[#FAF8F5] to-[#FFF0EB] rounded-2xl p-4 sm:p-5 border border-[#D8E6DB] flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Background Blur Dot */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#F08466]/10 rounded-full blur-2xl"></div>
            
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#253D32] text-white text-[10px] font-bold tracking-wider uppercase">
                  ✨ SMART BUNDLE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#F08466] text-white text-[10px] font-bold tracking-wider uppercase">
                  SAVE 20%
                </span>
              </div>

              <h4 className="font-headline-sm text-base font-bold text-[#253D32] leading-snug">
                Kitchen Bundle Builder
              </h4>

              <p className="text-xs text-[#55635B] leading-relaxed">
                Curate 3 or more culinary essentials with our interactive bundle builder to unlock an automatic 20% tiered discount.
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-[#253D32]">
                <span className="flex items-center text-[#D97706]">★★★★★</span>
                <span>4.9/5 from 1,200+ cooks</span>
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <button
                onClick={() => handleNavigate('/chef-ai')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#253D32] hover:bg-[#1E2B24] text-white text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 group-hover:gap-3"
              >
                <span>Launch Bundle Builder</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner with Trending Tags */}
        <div className="mt-5 pt-4 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#6F7570] text-[11px] uppercase tracking-wider">
              Trending Now:
            </span>
            <button 
              onClick={() => handleNavigate('/catalog', 'cookware')}
              className="px-2.5 py-1 rounded-full bg-[#EBF3EC] text-[#253D32] hover:bg-[#D8E6DB] text-[11px] font-medium transition-colors"
            >
              🔥 #CastIronHeirloom
            </button>
            <button 
              onClick={() => handleNavigate('/catalog', 'prep')}
              className="px-2.5 py-1 rounded-full bg-[#FFF0EB] text-[#F08466] hover:bg-[#FDE8E1] text-[11px] font-medium transition-colors"
            >
              ✨ #DamascusSantoku
            </button>
            <button 
              onClick={() => handleNavigate('/catalog', 'pantry')}
              className="px-2.5 py-1 rounded-full bg-[#FEF9C3] text-[#A16207] hover:bg-[#FDE68A] text-[11px] font-medium transition-colors"
            >
              🌿 #ZeroPlasticPantry
            </button>
          </div>

          <button
            onClick={() => handleNavigate('/catalog')}
            className="font-bold text-[#253D32] hover:text-[#365747] flex items-center gap-1 transition-colors"
          >
            <span>View All Products in Catalog</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
}
