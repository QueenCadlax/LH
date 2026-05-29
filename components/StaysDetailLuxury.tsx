import React, { useState, useEffect } from 'react';
import { Stay } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Globe, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AreaDominationBadge } from './Shared';

interface StaysDetailLuxuryProps {
  stay: Stay;
  navigate?: (view: string, cat?: string, id?: string) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const GOLD = '#C9A24D';
const PANEL_BLACK = '#0B0B0B';
const BG_BLACK = '#000000';
const BORDER = '#2a2a2a';
const TEXT_MUTED = '#8B8B8B';
const TEXT_WHITE = '#FFFFFF';

export default React.memo(function StaysDetailLuxury({ 
  stay, 
  navigate,
  favorites = [],
  toggleFavorite
}: StaysDetailLuxuryProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (stay?.id) {
      setIsFavorited(favorites.includes(stay.id));
    }
  }, [stay?.id, favorites]);

  const price = stay?.pricePerNight || 7400;
  const images = [
    stay?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    stay?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    stay?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    stay?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
  ];

  const handleFavoriteToggle = () => {
    if (toggleFavorite && stay?.id) {
      toggleFavorite(stay.id);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in your property: ${stay?.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!stay) {
    return (
      <div style={{ paddingTop: 96, minHeight: '100vh', background: BG_BLACK }}>
        <div className="container mx-auto px-6">
          <button onClick={() => navigate?.('stays')} className="flex items-center gap-2 text-[#C9A24D] hover:text-amber-400 mb-6">
            <ArrowLeft size={20} /> Back to Stays
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Property not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* ============ BACK BUTTON ============ */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate?.('stays')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ============ FULL-WIDTH LUXURY HERO ============ */}
      <section className="relative" style={{ height: '68vh', minHeight: 520 }}>
        <img
          src={images[heroSlide]}
          alt={`${stay.name} hero`}
          className="w-full h-full object-cover transition-opacity duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'; }}
        />
        
        {/* Cinematic radial overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        
        {/* Vignette effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Subtle gold bottom accent */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: `linear-gradient(90deg, ${GOLD} 0%, transparent 50%)` }} />

        {/* Hero content: positioned at bottom-left */}
        <div className="absolute left-0 bottom-0 right-0 pb-20 px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                ✦ LUXURY RETREAT
              </div>
              <div className="flex items-start justify-between gap-4 mb-8">
                <h1 className="font-serif text-6xl md:text-7xl font-bold max-w-3xl leading-tight" style={{ letterSpacing: '0.02em' }}>
                  {stay.name}
                </h1>
              </div>
            </div>

            {/* Accommodation type & positioning statement */}
            <div className="mb-8 max-w-2xl">
              <div style={{ color: GOLD, fontSize: '12px', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {stay.type || 'Luxury Stay'} • Mpumalanga
              </div>
              <div style={{ color: TEXT_MUTED, fontSize: '16px', lineHeight: 1.7, maxWidth: 420 }}>
                {stay.description || 'A private escape offering unparalleled comfort and serenity in the heart of Mpumalanga.'}
              </div>
            </div>

            {/* Location & pricing */}
            <div className="flex flex-wrap items-center gap-8 mb-10">
              <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>
                {stay.location}
              </div>
              <div style={{ color: TEXT_MUTED, fontSize: '16px' }}>•</div>
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Starting from</div>
                <div style={{ fontSize: '22px', fontWeight: 700 }}>R{(price / 1000).toFixed(1)}k<span style={{ fontSize: '14px', color: TEXT_MUTED, fontWeight: 400 }}> /night</span></div>
              </div>
            </div>

            {/* Floating action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => window.location.href = `mailto:info@property.com?subject=Inquiry%20about%20${stay.name}`}
                className="px-5 py-3 rounded-full font-semibold transition hover:shadow-lg"
                style={{ background: GOLD, color: BG_BLACK, boxShadow: `0 8px 24px rgba(201,162,77,0.25)` }}
              >
                <MessageCircle size={16} className="inline mr-2" /> Enquire Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <MessageCircle size={16} className="inline mr-2" /> WhatsApp
              </button>
              <button
                className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                onClick={() => window.open(`https://www.google.com/maps?q=${stay.location}`, '_blank')}
              >
                <MapPin size={16} className="inline mr-2" /> Map
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
                onClick={handleFavoriteToggle}
              >
                <Heart size={16} className={isFavorited ? 'fill-red-500 text-red-500' : 'text-[#C9A24D]'} />
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
              >
                <Share2 size={16} className="text-[#C9A24D]" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero carousel nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </section>

      {/* ============ MAIN CONTENT (TWO-COLUMN LAYOUT) ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-6xl px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ===== LEFT COLUMN: GALLERY + DETAILS ===== */}
            <div className="lg:col-span-2 space-y-8">

              {/* GALLERY SECTION */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Gallery
                </div>
                <div className="relative rounded-lg overflow-hidden group" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    <img
                      src={images[galleryIdx]}
                      alt={`gallery-${galleryIdx}`}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>
                  
                  {/* Gallery dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIdx(i)}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: i === galleryIdx ? GOLD : 'rgba(255,255,255,0.3)',
                          border: `1px solid ${i === galleryIdx ? GOLD : 'rgba(255,255,255,0.2)'}`,
                        }}
                        className="transition-all cursor-pointer"
                      />
                    ))}
                  </div>

                  {/* Gallery nav */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setGalleryIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition opacity-0 group-hover:opacity-100 z-10"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setGalleryIdx((i) => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition opacity-0 group-hover:opacity-100 z-10"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  About
                </div>
                <div style={{ color: TEXT_MUTED, fontSize: '15px', lineHeight: 1.8 }}>
                  <p className="mb-4">
                    {stay.description || 'A serene luxury retreat nestled in the heart of Mpumalanga, offering an unparalleled escape for discerning travelers seeking authentic experiences combined with world-class comfort.'}
                  </p>
                  <p>
                    Perfect for intimate getaways, family reunions, or corporate retreats, this property combines elegant design with thoughtful amenities to create memorable moments.
                  </p>
                </div>
              </div>

              {/* AMENITIES & FEATURES */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Key Features
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Private Pool', 'River Views', 'Spa Facilities', '24/7 Concierge', 'Chef Services', 'Game Reserve Access', 'Wine Cellar', 'Private Dining'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
                      <span style={{ color: TEXT_MUTED, fontSize: '14px' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Location
                </div>
                <div style={{ color: TEXT_MUTED, fontSize: '15px', lineHeight: 1.8 }}>
                  <p className="mb-4">{stay.location}, Mpumalanga</p>
                  <p className="text-sm mb-6">
                    Situated along the scenic Lowveld, this property offers easy access to Kruger National Park, nature trails, and local attractions while maintaining complete privacy and tranquility.
                  </p>
                </div>

                {/* MAP SECTION */}
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: BORDER, height: 300 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNRrKfVCDonNTxeMX3HxZpbgV9wTUzYAE&q=${encodeURIComponent(stay.location + ', Mpumalanga')}`}
                  />
                </div>
              </div>
            </div>

            {/* ===== RIGHT COLUMN: SIDEBAR ===== */}
            <div className="lg:col-span-1">
              <div className="sticky top-24" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
                
                {/* PRICING */}
                <div className="mb-8 pb-8" style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                    From
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: 4 }}>
                    R{(price / 1000).toFixed(1)}k
                  </div>
                  <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>per night</div>
                </div>

                {/* BOOK BUTTON - Email CTA */}
                <button
                  onClick={() => window.location.href = `mailto:info@property.com?subject=Booking%20Inquiry%20for%20${stay.name}`}
                  className="w-full py-4 rounded-lg font-semibold transition mb-4 hover:shadow-lg"
                  style={{ background: GOLD, color: BG_BLACK, boxShadow: `0 8px 24px rgba(201,162,77,0.25)` }}
                >
                  Enquire Now
                </button>

                {/* CONTACT OPTIONS */}
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = `mailto:info@property.com?subject=Information%20Request%20for%20${stay.name}`}
                    className="w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 hover:bg-white/10"
                    style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                  >
                    <MessageCircle size={16} /> Email
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 hover:bg-white/10"
                    style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </button>
                </div>

                {/* DETAILS BOX */}
                <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <div className="space-y-4">
                    <div>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Type</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>{stay.type || 'Luxury Retreat'}</div>
                    </div>
                    <div>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Guests</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>Up to 8 guests</div>
                    </div>
                    <div>
                      <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Minimum Stay</div>
                      <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>2 nights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: PANEL_BLACK }}>
        <div className="container mx-auto max-w-6xl px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                About
              </div>
              <p style={{ color: TEXT_MUTED, fontSize: '13px', lineHeight: 1.6 }}>
                Curated luxury stays in Mpumalanga. Each property selected for exceptional quality and authentic experiences.
              </p>
            </div>
            <div>
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                Support
              </div>
              <div className="space-y-2">
                <div style={{ color: TEXT_MUTED, fontSize: '13px', cursor: 'pointer', hover: 'text-white' }}>Contact Us</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px', cursor: 'pointer', hover: 'text-white' }}>FAQ</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px', cursor: 'pointer', hover: 'text-white' }}>Terms & Conditions</div>
              </div>
            </div>
            <div>
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                Follow
              </div>
              <div className="flex gap-4">
                <a href="#" style={{ color: TEXT_MUTED, fontSize: '13px' }} className="hover:text-[#C9A24D]">Instagram</a>
                <a href="#" style={{ color: TEXT_MUTED, fontSize: '13px' }} className="hover:text-[#C9A24D]">Facebook</a>
              </div>
            </div>
          </div>
          <div className="border-t" style={{ borderColor: BORDER, marginTop: 12, paddingTop: 12 }}>
            <p style={{ color: TEXT_MUTED, fontSize: '12px', textAlign: 'center' }}>© 2026 LOWVELDHUB. All rights reserved. | Curated Luxury Stays in Mpumalanga</p>
          </div>
        </div>
      </div>
    </div>
  );
});
