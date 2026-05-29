import React, { useState, useMemo, useCallback } from 'react';
import NightlifeCard from './NightlifeCard';
import { nightlifeVenues } from '../data/nightlifeSeeds';
import { NightlifeVenue, MPUMALANGA_AREAS, Category, CategorySubcategories } from '../types';
import { SectionTitle } from './Shared';
import { Search } from 'lucide-react';

const nightlifeFilters = [
  'Live Music',
  'DJ Nights',
  'VIP Section',
  'Dress Code',
  'Late Night',
  'Outdoor Terrace',
  'Craft Cocktails',
  'Happy Hour',
  'Ladies Night',
  'Live Performances',
  'Ticketed Events',
  'Parking Available',
  'Security On-Site',
];

// Memoize suggestions at module level to avoid re-calculation
const getNightlifeSuggestions = () => {
  const names = nightlifeVenues.map(v => v.name);
  const subcats = nightlifeVenues.map(v => v.subcategory);
  const genres = nightlifeVenues.flatMap(v => v.genres || []);
  return Array.from(new Set([...names, ...subcats, ...genres]));
};
const nightlifeSuggestions = getNightlifeSuggestions();

const NightlifePage: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState<any>({ areas: [], subcategories: [], attributes: {}, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState('');

  // Use pre-cached suggestions for faster rendering
  const allSuggestions = nightlifeSuggestions;

  const filtered = useMemo(() => {
    return nightlifeVenues.filter((v) => {
      // Area
      if (filters.areas && filters.areas.length) {
        const area = typeof v.location === 'string' ? v.location : v.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      // Subcategory
      if (filters.subcategories && filters.subcategories.length) {
        if (!filters.subcategories.includes(v.subcategory)) return false;
      }
      // Attributes (tags/filters)
      if (filters.attributes) {
        for (const attr of Object.keys(filters.attributes)) {
          if (filters.attributes[attr] && !(v.tags || []).includes(attr)) return false;
        }
      }
      // Verified
      if (filters.verified && !v.verified) return false;
      // Search term
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = v.name.toLowerCase().includes(q);
        const inSubcat = v.subcategory.toLowerCase().includes(q);
        const inGenres = (v.genres || []).some(g => g.toLowerCase().includes(q));
        if (!(inName || inSubcat || inGenres)) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  const handleView = useCallback((id: string) => navigate('nightlife-detail', undefined, id), [navigate]);
  const handleContact = useCallback((v: NightlifeVenue) => {
    if (v.contactOptions?.whatsapp) window.open(`https://wa.me/${v.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (v.contactOptions?.call) window.location.href = `tel:${v.contactOptions.call}`;
  }, []);

  return (
    <div className="pt-0 pb-12 min-h-screen bg-gradient-to-b from-black via-black to-black/95">
      {/* Minimal Hero Section */}
      <section className="relative py-12 overflow-hidden mb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1514432324607-2e467f4af445?auto=format&fit=crop&q=80&w=1600" 
            alt="Nightlife" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-serif text-white uppercase tracking-tight mb-4">
              Nightlife & Entertainment
            </h1>
            {/* Divider */}
            <div className="h-0.5 w-24 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 rounded-full mb-6"></div>

            {/* Short Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 font-light mb-6">
              Where Mpumalanga comes alive after dark.
            </p>

            {/* Badges - Inline */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gold-300 font-light">
                Verified • Curated • Exceptional
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Action Area - Search + Filters */}
      <div className="container mx-auto px-6 mb-12">
        {/* Search Bar */}
        <div className="mb-6 max-w-4xl mx-auto">
          <div className="bg-black/70 backdrop-blur-sm rounded-full p-4 border border-gold-500/20 flex items-center gap-3">
            <Search className="text-gold-400 flex-shrink-0" size={20} />
            <input 
              value={searchTerm} 
              onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }} 
              onFocus={() => setSuggestionsOpen(true)} 
              placeholder="Search businesses, places, or experiences..." 
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-base"
            />
          </div>
          {suggestionsOpen && searchTerm.length > 0 && (
            <div className="mt-4 max-w-4xl mx-auto bg-black/80 border border-white/10 rounded-lg p-4 z-40">
              <div className="text-sm text-gray-300 mb-3">Suggestions</div>
              <div className="flex flex-wrap gap-2">
                {allSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 8).map(s => (
                  <button key={s} onClick={() => { setSearchTerm(s); setSuggestionsOpen(false); }} className="px-3 py-1 rounded-full bg-black/60 text-gray-200 hover:bg-gold-500/20">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-3 flex-wrap justify-center mb-6">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Filter:</span>
          <button className="px-4 py-2 bg-gold-500/10 border border-gold-500/40 text-gold-300 rounded-full text-sm font-medium hover:border-gold-500 hover:bg-gold-500/20 transition">All</button>
          <button className="px-4 py-2 bg-black/60 border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-gold-500 transition">Featured</button>
          <button className="px-4 py-2 bg-black/60 border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-gold-500 transition">Nearby</button>
          <button className="px-4 py-2 bg-black/60 border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-gold-500 transition">Top Rated</button>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Featured Section */}
        <div className="mb-12">
          <SectionTitle title="Featured Nightlife & Entertainment Venues" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {nightlifeVenues.filter(v => v.tier === 'Platinum' || v.tier === 'Elite').slice(0, 6).map(v => (
              <NightlifeCard key={v.id} venue={v} onView={handleView} onContact={handleContact} />
            ))}
          </div>
        </div>

        {/* Primary Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <button 
                onClick={() => { setAreaOpen(!areaOpen); setSubcategoryOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.areas && filters.areas.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Location: {filters.areas && filters.areas.length ? filters.areas[0] : 'All Areas'}
              </button>
              {areaOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  <input 
                    placeholder="Search city or town" 
                    value={areaQuery} 
                    onChange={(e)=>setAreaQuery(e.target.value)} 
                    className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2" 
                  />
                  <div className="max-h-40 overflow-auto">
                    {MPUMALANGA_AREAS.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase())).map(a => (
                      <button 
                        key={a} 
                        onClick={() => { setFilters({...filters, areas: [a]}); setAreaOpen(false); setAreaQuery(''); }} 
                        className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setSubcategoryOpen(!subcategoryOpen); setAreaOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.subcategories && filters.subcategories.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Venue: {filters.subcategories && filters.subcategories.length ? filters.subcategories[0] : 'All Venues'}
              </button>
              {subcategoryOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  {(CategorySubcategories[Category.NightlifeAndEntertainment] || []).map(t => (
                    <button 
                      key={t} 
                      onClick={() => { setFilters({...filters, subcategories: [t]}); setSubcategoryOpen(false); }} 
                      className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200 text-sm"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1" />

            <button 
              onClick={() => setMoreOpen(true)} 
              className="px-4 py-2 rounded-full shadow-sm bg-black/60 text-gray-200 hover:bg-black/80"
            >
              More Filters
            </button>
            <button 
              onClick={() => setFilters({...filters, areas: [], subcategories: [], attributes: {}, verified: false})} 
              className="px-3 py-2 rounded-full text-sm text-gray-300 hover:text-gray-100"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(v => (
                <NightlifeCard key={v.id} venue={v} onView={handleView} onContact={handleContact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No nightlife venues found for your selection.</p>
              <p className="text-gray-500">Explore the Lowveld's top entertainment spots or adjust your filters.</p>
            </div>
          )}
        </div>

        {/* More Filters Drawer */}
        {moreOpen && (
          <div className="fixed inset-0 z-50 flex items-end">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMoreOpen(false)} />
            <div className="relative w-full max-h-[70vh] bg-black/95 border-t border-white/10 rounded-t-2xl p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-100 font-semibold">More Filters</h3>
                <button onClick={() => setMoreOpen(false)} className="text-gray-300">Close</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Venue Features</label>
                  <div className="flex flex-wrap gap-2">
                    {nightlifeFilters.map(attr => (
                      <button 
                        key={attr} 
                        onClick={() => {
                          const newAttrs = {...filters.attributes, [attr]: !filters.attributes[attr]};
                          setFilters({...filters, attributes: newAttrs});
                        }} 
                        className={`px-3 py-1 rounded-full text-sm ${filters.attributes[attr] ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
                      >
                        {attr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Venue Category</label>
                  <div className="flex flex-wrap gap-2">
                    {(CategorySubcategories[Category.NightlifeAndEntertainment] || []).map(sub => (
                      <button 
                        key={sub} 
                        onClick={() => {
                          const arr = Array.isArray(filters.subcategories) ? [...filters.subcategories] : [];
                          const idx = arr.indexOf(sub);
                          if (idx === -1) arr.push(sub); else arr.splice(idx, 1);
                          setFilters({...filters, subcategories: arr});
                        }} 
                        className={`px-3 py-1 rounded-full text-sm ${Array.isArray(filters.subcategories) && filters.subcategories.includes(sub) ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => { setFilters({areas: [], subcategories: [], attributes: {}, verified: false}); setMoreOpen(false); }} 
                    className="px-4 py-2 rounded bg-black/40 text-gray-300 hover:bg-black/60"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => { setMoreOpen(false); }} 
                    className="px-4 py-2 rounded bg-gold-500 text-black hover:bg-gold-400"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NightlifePage;
