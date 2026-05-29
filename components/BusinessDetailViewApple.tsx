import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Globe, Calendar } from 'lucide-react';

interface BusinessDetailViewProps {
  businessId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const BusinessDetailViewApple: React.FC<BusinessDetailViewProps> = ({ 
  businessId, 
  navigate, 
  businesses, 
  favorites = [], 
  toggleFavorite 
}) => {
  const business: Business | undefined = businesses.find(b => b.id === businessId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [businessId]);

  useEffect(() => {
    setIsFavorited(favorites.includes(businessId || ''));
  }, [businessId, favorites]);

  const images = [
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    business?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
  ];

  const handleFavoriteToggle = () => {
    if (toggleFavorite && businessId) {
      toggleFavorite(businessId);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hi! I'm interested in ${business?.name}`;
    window.open(`https://wa.me/27123456789?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-2xl mx-auto px-4">
          <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-black hover:text-gray-600 mb-6">
            <ArrowLeft size={20} /> Back
          </button>
          <p className="text-gray-500 text-lg">Business not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== IMAGE SLIDESHOW (Full width, minimal controls) ===== */}
      <section className="relative w-full" style={{ aspectRatio: '16 / 9', maxHeight: '70vh', overflow: 'hidden' }}>
        {/* Back button - overlay on image */}
        <button
          onClick={() => navigate('directory')}
          className="absolute top-6 left-6 z-50 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition"
        >
          <ArrowLeft size={20} className="text-black" />
        </button>

        {/* Main image with fade transition */}
        <div className="relative w-full h-full">
          <img
            src={images[slideIdx]}
            alt={`${business.name} ${slideIdx + 1}`}
            className="w-full h-full object-cover transition-opacity duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop';
            }}
          />
        </div>

        {/* Gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Image counter & indicators (bottom center) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`transition-all ${
                i === slideIdx ? 'bg-white w-8 h-2 rounded-full' : 'bg-white/50 w-2 h-2 rounded-full hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev/Next arrows - minimal style */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSlideIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition"
            >
              <ChevronLeft size={20} className="text-black" />
            </button>
            <button
              onClick={() => setSlideIdx((i) => (i + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition"
            >
              <ChevronRight size={20} className="text-black" />
            </button>
          </>
        )}
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header with title, rating, and action buttons */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-semibold text-black mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {business.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {business.rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-black">{business.rating.toFixed(1)}</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-600">({business.reviewCount || 0} reviews)</span>
                </div>
              )}
              <span className="text-gray-600 text-sm">•</span>
              <span className="text-gray-600">{business.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFavoriteToggle}
              className="p-3 rounded-full hover:bg-gray-100 transition"
            >
              <Heart
                size={24}
                className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition">
              <Share2 size={24} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Category and description */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="text-sm text-gray-600 mb-3">
            {business.category} • {business.subcategory || 'Service'}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            {business.description || `${business.name} is a premium ${business.category} offering exceptional services in ${business.location}.`}
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Details and info */}
          <div className="md:col-span-2 space-y-8">
            {/* Key details grid */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="text-lg text-black font-medium">{business.subcategory || business.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Location</div>
                  <div className="text-lg text-black font-medium">{business.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <div className="text-lg text-black font-medium">{business.isOpenNow ? '✓ Open Now' : 'Check Hours'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Verified</div>
                  <div className="text-lg text-black font-medium">{business.isVerified ? '✓ Yes' : 'Pending'}</div>
                </div>
              </div>
            </div>

            {/* Amenities / Features */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">What's offered</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Premium Service',
                  'Professional Staff',
                  'Quality Assured',
                  'Verified Listing',
                  'Direct Booking',
                  'Local Expertise',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-600">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About section */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {business.description || `${business.name} is a carefully curated business that meets LOWVELDHUB's standards for quality, professionalism, and customer service.`}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Located in {business.location}, this establishment is dedicated to providing exceptional experiences to all guests and clients. Every detail is crafted to ensure satisfaction and create memorable moments.
              </p>
            </div>
          </div>

          {/* Right: Booking panel (sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              {/* Price display (if available) */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Contact</div>
                <div className="text-3xl font-semibold text-black">{business.name}</div>
              </div>

              {/* Main CTA */}
              <button className="w-full bg-black text-white py-3 rounded-xl font-semibold mb-3 hover:bg-gray-800 transition">
                <Calendar size={18} className="inline mr-2" />
                Book Now
              </button>

              {/* Secondary CTAs */}
              <div className="space-y-2">
                {business.phone && (
                  <button
                    onClick={() => window.location.href = `tel:${business.phone}`}
                    className="w-full text-black border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Call
                  </button>
                )}
                <button
                  onClick={handleWhatsApp}
                  className="w-full text-black border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp
                </button>
                {business.website && (
                  <button
                    onClick={() => window.open(business.website, '_blank')}
                    className="w-full text-black border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <Globe size={18} /> Website
                  </button>
                )}
              </div>

              {/* Info box */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2 font-semibold">CURATED BY LOWVELDHUB</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  All businesses are verified and meet our quality standards for excellence and customer satisfaction.
                </p>
              </div>

              {/* Location link */}
              <button
                onClick={() => window.open(`https://www.google.com/maps?q=${business.location}`, '_blank')}
                className="w-full text-blue-600 py-3 rounded-xl font-semibold hover:text-blue-700 transition flex items-center justify-center gap-2 mt-4"
              >
                <MapPin size={18} /> View on Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAP SECTION ===== */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-black mb-6">Location</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 400 }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNRrKfVCDonNTxeMX3HxZpbgV9wTUzYAE&q=${encodeURIComponent(business.location + ', Mpumalanga')}`}
            />
          </div>
          <p className="text-gray-600 text-sm mt-4">{business.location}, Mpumalanga</p>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-black mb-3">Support</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Contact Us</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Help Center</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Safety</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-3">About</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-600 hover:text-black text-sm block">About LOWVELDHUB</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Careers</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Press</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-3">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Terms</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-black text-sm block">Cookies</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
            <p>© 2026 LOWVELDHUB. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailViewApple;
