import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState, type FormEvent } from 'react';

export default function StudioVisit() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const defaultSuccessMessage = 'Response recorded';

    setIsSubmitting(true);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
      });

      if (response.type === 'opaque') {
        alert(defaultSuccessMessage);
        form.reset();
        return;
      }

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') ?? '';
      let message: string | undefined;

      if (contentType.includes('application/json')) {
        const json = await response.json();
        message =
          json && typeof json === 'object' && 'message' in json
            ? (json as { message?: string }).message
            : undefined;
      } else {
        const text = await response.text();
        message = text ? text.trim() : undefined;
      }

      alert(message || defaultSuccessMessage);
      form.reset();
    } catch (error) {
      console.error('Failed to submit Solana Studios form', error);
      alert('Something went wrong submitting the form — please DM @gettles on X.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGalleryOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setGalleryIndex(prev => (prev - 1 + 12) % 12);
      } else if (e.key === 'ArrowRight') {
        setGalleryIndex(prev => (prev + 1) % 12);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen]);

  useEffect(() => {
    function animateCounter(el: HTMLElement) {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const hasDecimals = target % 1 !== 0;

      function frame(now: number) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        el.textContent =
          suffix === 'm'
            ? (hasDecimals && value < 10 ? value.toFixed(1) : Math.round(value).toString()) + 'm'
            : Math.round(value).toLocaleString();
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (typeof window === 'undefined') return;

    const counters = Array.from(document.querySelectorAll<HTMLElement>('.statNum'));
    if ('IntersectionObserver' in window && counters.length) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target as HTMLElement);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach(el => io.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }, []);

  const founders = [
    {
      name: 'Bangerz',
      roleTitle: 'Director of Content',
      roleSubtitle: 'X & YouTube',
      desc: 'cringe & choas ceo, best at dressing like a popsicle (best ever)',
      image: '/bangerz headshot.png',
      links: [
        { label: 'X', url: 'https://x.com/bangerz' },
        { label: 'YouTube', url: 'https://www.youtube.com/@bangerztech' },
        { label: 'Gib.Meme', url: 'https://gib.meme/' },
      ],
    },
    {
      name: 'Jake',
      roleTitle: 'Director of Content',
      roleSubtitle: 'TikTok & IG',
      desc: 'loves long walks on the streets in soho, certified plant daddy',
      image: '/jake headshot.png',
      links: [
        { label: 'TikTok', url: 'https://www.tiktok.com/@jakeclaynyc' },
        { label: 'Instagram', url: 'https://www.instagram.com/jakeclaynyc/' },
        { label: 'X', url: 'https://x.com/JakeClayChain' },
      ],
    },
    {
      name: 'Macy',
      roleTitle: 'Director of Culture',
      roleSubtitle: 'Partnerships & Creative Direction',
      desc: 'og solana art goat, vibe curatoooor, writes a great joke',
      image: '/macy head shot2.png',
      links: [
        { label: 'Gettles.co', url: 'https://www.gettles.co/' },
        { label: 'X', url: 'https://x.com/gettles' },
        { label: 'Instagram', url: 'https://www.instagram.com/gettles/' },
      ],
    },
  ];

  const talent = [
    {
      name: 'Liv',
      image: '/liv.jpg',
      role: 'X Content',
      link: 'https://x.com/degentalks',
      followers: '25k followers',
    },
    {
      name: 'Fleury',
      image: '/fleury.png',
      role: 'X Content',
      link: 'https://x.com/FleuryNFT',
      followers: '18k followers',
    },
    {
      name: 'Alan',
      image: '/alan.png',
      role: 'Instagram Content',
      link: 'https://www.instagram.com/alanking/',
      followers: '110k followers',
    },
    {
      name: 'Iqram',
      image: '/iqram.jpg',
      role: 'JellyJelly Founder',
      link: 'https://x.com/iqramband',
      followers: '11k followers',
    },
  ];

  return (
    <>
      <Head>
        <title>Solana Studios — Visitor Interest Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        :root {
          --bg: #08080c;
          --card: #0f0f18;
          --text: #e8faff;
          --muted: #a6c6d1;
          --neon-pink: #ff31f7;
          --neon-green: #34ff7f;
          --teal: #16ffe3;
          --purple: #8a52ff;
          --cyan: #12c8ff;
          --grass: #38e47a;
          --shadow: 0 0 30px rgba(255, 49, 247, 0.35), 0 0 12px rgba(22, 255, 227, 0.25);
        }

        body {
          font-family: 'Quicksand', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
            'Apple Color Emoji', 'Segoe UI Emoji';
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 24px !important;
          }
        }

        @media (max-width: 1100px) {
          .polaroids-grid {
            grid-template-columns: repeat(8, 1fr) !important;
          }

          .founders-grid {
            grid-template-columns: repeat(8, 1fr) !important;
          }
        }

        @media (max-width: 700px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }

          .polaroids-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }

          .founders-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }

          .talent-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        .statsWrap {
          padding: 18px 24px 8px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        @media (max-width: 1100px) {
          .stats {
            grid-template-columns: repeat(8, 1fr);
          }
        }

        @media (max-width: 700px) {
          .stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .statCard {
          grid-column: span 4;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: 20px;
          isolation: isolate;
          background: radial-gradient(120% 140% at -10% -20%, rgba(22, 255, 227, 0.18), transparent 60%),
            radial-gradient(120% 140% at 120% -20%, rgba(255, 49, 247, 0.18), transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: var(--shadow);
        }

        .statHead {
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #b7d6df;
          margin-bottom: 6px;
        }

        .statNum {
          font-weight: 900;
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1;
          margin: 4px 0 4px;
          background: linear-gradient(90deg, var(--teal), var(--purple));
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 0 22px rgba(18, 200, 255, 0.25);
        }

        .statSub {
          color: var(--muted);
        }

        .pulse {
          position: absolute;
          inset: -30%;
          z-index: -1;
          filter: blur(30px);
          opacity: 0.35;
          background: conic-gradient(
            from 0deg,
            var(--teal),
            var(--purple),
            var(--neon-pink),
            var(--grass),
            var(--teal)
          );
          animation: spin 12s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          color: 'var(--text)',
          background:
            'radial-gradient(1200px 800px at 10% -10%, rgba(138,82,255,.25), transparent 60%), radial-gradient(1200px 800px at 110% 10%, rgba(18,200,255,.18), transparent 60%), linear-gradient(180deg, #06060a, #0a0a12 40%, #090912)',
        }}
      >
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backdropFilter: 'saturate(140%) blur(8px)',
            background: 'linear-gradient(180deg, rgba(8,8,12,.9), rgba(8,8,12,.6))',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <div className="flex items-center gap-2 md:gap-4 px-4 md:px-6 max-w-[1200px] mx-auto py-3">
            <Image
              src="/SOLANA STUDIOS (1).png"
              alt="Solana Studios logo"
              width={48}
              height={48}
              style={{ filter: 'drop-shadow(0 0 12px rgba(255,49,247,.35))' }}
              className="object-contain flex-shrink-0"
            />
            <div className="hidden sm:block text-xs md:text-sm font-bold tracking-wide flex-shrink-0">
              Solana Studios — Content Studio @ Solana HQ
            </div>
            <div
              className="ml-auto flex-shrink-0"
              style={{
                padding: '6px 10px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '.75rem',
                color: '#0b0b11',
                background: 'linear-gradient(135deg, var(--teal), var(--purple), var(--grass))',
                boxShadow: 'var(--shadow)',
              }}
            >
              <span className="hidden sm:inline">Now Booking Visits</span>
              <span className="sm:hidden">Booking</span>
            </div>
          </div>
        </header>

        <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <section className="statsWrap" aria-label="Social reach">
            <div className="stats">
              <article className="statCard">
                <div className="pulse"></div>
                <div className="statHead">Total Reach</div>
                <div className="statNum" data-target="40" data-suffix="m">
                  0
                </div>
                <div className="statSub">impressions</div>
              </article>

              <article className="statCard">
                <div className="pulse"></div>
                <div className="statHead">Video</div>
                <div className="statNum" data-target="22" data-suffix="m">
                  0
                </div>
                <div className="statSub">views</div>
              </article>

              <article className="statCard">
                <div className="pulse"></div>
                <div className="statHead">Community</div>
                <div className="statNum" data-target="1.8" data-suffix="m">
                  0
                </div>
                <div className="statSub">followers</div>
              </article>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr] gap-8 md:gap-8 items-center pt-6 md:pt-10 pb-6 md:pb-8">
            <div
              className="relative p-4 md:p-6 rounded-3xl"
              style={{
                background:
                  'conic-gradient(from 180deg at 50% 50%, rgba(52,255,127,.12), rgba(18,200,255,.12), rgba(138,82,255,.12), rgba(255,49,247,.12), rgba(52,255,127,.12))',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.05), var(--shadow)',
              }}
            >
              <div
                className="rounded-2xl p-4 md:p-6 relative"
                style={{
                  background: '#07070c',
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(28px, 3.2vw, 44px)',
                    lineHeight: 1.08,
                    margin: '0 0 10px',
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, var(--teal), var(--cyan), var(--purple))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 24px rgba(18,200,255,.25)',
                  }}
                >
                  Come make magic with us ✨
                </h1>
                <div
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    textShadow: '0 0 14px rgba(255,49,247,.45), 0 0 40px rgba(255,49,247,.25)',
                  }}
                >
                  Visit Interest @ Solana HQ
                </div>
                <p style={{ color: 'var(--muted)', margin: '6px 0 18px' }}>
                  We're a creator-first content studio, fulfilling dreams in neon pink & touch-grass-green! We'd love to host you, New York! Please fill out this interest form & we'll reply asap with available times, details, and more info on how to visit.
                </p>

                <form
                  action="https://script.google.com/macros/s/AKfycbw-UMcSZutiwMKTJ7Tu5S0LhrE3gHZO-ZLX3ePt-5zFpdsGoPToU6HaNoVt5opRW6lGcA/exec"
                  method="POST"
                  id="solana-form"
                  onSubmit={handleSubmit}
                  style={{ display: 'grid', gap: 14 }}
                >
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  />
                  <input
                    type="date"
                    name="date"
                    placeholder="Preferred date"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  />
                  <select
                    name="timewindow"
                    required
                    defaultValue=""
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  >
                    <option value="" disabled>
                      Time window
                    </option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                  <input
                    type="url"
                    name="primarylink"
                    placeholder="Primary link (X/IG/site)"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  />
                  <input
                    type="text"
                    name="wallet"
                    placeholder="Solana wallet (optional)"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                    }}
                  />
                  <textarea
                    name="message"
                    placeholder="What do you want to make?"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,.08)',
                      background: 'rgba(255,255,255,.02)',
                      color: 'var(--text)',
                      outline: 'none',
                      transition: '.2s border, .2s box-shadow',
                      minHeight: 110,
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 14,
                      color: '#b7d6df',
                    }}
                  >
                    <input type="checkbox" name="understand" value="1" required style={{ margin: 0 }} />
                    I understand this is an interest form and not a confirmed booking.
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontWeight: 800,
                      letterSpacing: '.4px',
                      padding: '14px 18px',
                      borderRadius: 14,
                      border: 'none',
                      color: '#06060b',
                      background: 'linear-gradient(90deg, var(--neon-pink), #ff7bfd, var(--teal))',
                      filter: 'drop-shadow(0 0 18px rgba(255,49,247,.45))',
                      transition: 'opacity .2s',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit interest'}
                  </button>
                </form>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/SOLANA STUDIOS (1).png"
                alt="Solana Studios logo large"
                width={560}
                height={560}
                style={{ width: '100%', maxWidth: 560, height: 'auto' }}
                className="object-contain"
              />
            </div>
          </section>

          <section className="py-8 md:py-11 px-4 md:px-6">
            <h2 className="mb-2 text-center text-xl md:text-2xl lg:text-3xl" style={{ fontSize: 'clamp(22px,2.4vw,30px)' }}>
              Solana Loves Creators!
            </h2>
            <p className="text-center text-sm md:text-base text-[var(--muted)] mb-5">New York, New York</p>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 12 }, (_, i) => {
                const imageIndex = (i % 5) + 2;
                const rotations = [-2.5, 1.5, -3.5, 2, -1.8, 3.2, -2.2, 1.8, -3, 2.5, -1.5, 3.5];
                return (
                  <article
                    key={i}
                    className="relative cursor-pointer transition-transform hover:scale-105"
                    style={{
                      transform: `rotate(${rotations[i % rotations.length]}deg)`,
                      aspectRatio: '3/4',
                    }}
                    onClick={() => {
                      setGalleryIndex(i);
                      setGalleryOpen(true);
                    }}
                  >
                    <div
                      className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 z-10 w-2 h-2 md:w-[18px] md:h-[18px] rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #ffb6ff, #ff2bf7 60%, #8a52ff)',
                        boxShadow: '0 2px 4px rgba(255,49,247,.55)',
                      }}
                    />
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={`/polaroid${imageIndex}.png`}
                        alt={`Polaroid ${imageIndex}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 20vw"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {galleryOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setGalleryOpen(false)}
            >
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold z-10 hover:opacity-70"
                onClick={() => setGalleryOpen(false)}
                aria-label="Close gallery"
              >
                ×
              </button>
              <button
                className="absolute left-4 text-white text-4xl font-bold z-10 hover:opacity-70 disabled:opacity-30"
                onClick={e => {
                  e.stopPropagation();
                  setGalleryIndex(prev => (prev - 1 + 12) % 12);
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={e => e.stopPropagation()}>
                <Image
                  src={`/polaroid${(galleryIndex % 5) + 2}.png`}
                  alt={`Gallery image ${galleryIndex + 1}`}
                  width={800}
                  height={1067}
                  className="object-contain max-h-[90vh] w-auto"
                  style={{ aspectRatio: '3/4' }}
                />
              </div>
              <button
                className="absolute right-4 text-white text-4xl font-bold z-10 hover:opacity-70 disabled:opacity-30"
                onClick={e => {
                  e.stopPropagation();
                  setGalleryIndex(prev => (prev + 1) % 12);
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          )}

          <section className="py-8 md:py-11 px-4 md:px-6">
            <h2 className="mb-5 text-xl md:text-2xl lg:text-3xl" style={{ fontSize: 'clamp(22px,2.4vw,30px)' }}>
              Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-6">
              {founders.map((founder, idx) => (
                <div
                  key={idx}
                  className="lg:col-span-4 md:col-span-2 col-span-1"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))',
                    border: '1px solid rgba(255,255,255,.06)',
                    borderRadius: 18,
                    padding: 18,
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-wrap sm:flex-nowrap">
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid rgba(255,255,255,.3)',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={88}
                        height={88}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-base md:text-lg">{founder.name}</h3>
                      <div className="text-sm md:text-base mb-2 md:mb-3" style={{ color: 'var(--muted)', fontWeight: 700 }}>
                        <div>{founder.roleTitle}</div>
                        <div>{founder.roleSubtitle}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base mt-3 md:mt-4 mb-3 md:mb-4">{founder.desc}</p>
                  <div className="flex flex-wrap gap-2 md:gap-2 mt-3 md:mt-3">
                    {founder.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '.8rem',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg, rgba(22,255,227,.18), rgba(138,82,255,.18))',
                          border: '1px solid rgba(22,255,227,.35)',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          transition: 'all .2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(90deg, rgba(22,255,227,.28), rgba(138,82,255,.28))';
                          e.currentTarget.style.borderColor = 'rgba(22,255,227,.55)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'linear-gradient(90deg, rgba(22,255,227,.18), rgba(138,82,255,.18))';
                          e.currentTarget.style.borderColor = 'rgba(22,255,227,.35)';
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8 md:py-11 px-4 md:px-6">
            <h2 className="mb-5 text-xl md:text-2xl lg:text-3xl" style={{ fontSize: 'clamp(22px,2.4vw,30px)' }}>
              Talent
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-4 max-w-full lg:max-w-[1200px] mx-auto">
              {talent.map((guest, i) => (
                <a
                  key={i}
                  href={guest.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[120px] rounded-2xl flex items-center gap-2 md:gap-3 no-underline transition-all cursor-pointer p-3 md:p-3"
                  style={{
                    border: '2px solid rgba(22,255,227,.35)',
                    color: '#b9eff5',
                    background: 'rgba(22,255,227,.06)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(22,255,227,.12)';
                    e.currentTarget.style.borderColor = 'rgba(22,255,227,.55)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(22,255,227,.06)';
                    e.currentTarget.style.borderColor = 'rgba(22,255,227,.35)';
                  }}
                >
                  <Image
                    src={guest.image}
                    alt={guest.name}
                    width={64}
                    height={64}
                    className="rounded-full flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-cover"
                    style={{
                      border: '2px solid rgba(22,255,227,.3)',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-sm lg:text-base font-bold mb-1 truncate">{guest.name}</div>
                    <div className="text-xs md:text-xs lg:text-sm mb-0.5 truncate" style={{ color: '#a0e0e5' }}>
                      {guest.role}
                    </div>
                    <div className="text-[10px] md:text-[11px] lg:text-xs truncate" style={{ color: '#8dd0d5' }}>
                      {guest.followers}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex justify-center mt-8 md:mt-10">
              <button
                type="button"
                className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base lg:text-lg font-extrabold tracking-wide rounded-2xl border-none transition-opacity"
                style={{
                  cursor: 'pointer',
                  color: '#06060b',
                  background: 'linear-gradient(90deg, var(--neon-pink), #ff7bfd, var(--teal))',
                  filter: 'drop-shadow(0 0 18px rgba(255,49,247,.45))',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                & you! apply now →
              </button>
            </div>
          </section>
        </main>

        <footer className="py-8 md:py-9 px-4 md:px-6 pb-12 md:pb-15 text-center" style={{ color: '#b2d9e3' }}>
          <div className="flex gap-3 md:gap-3 justify-center flex-wrap">
            <a
              href="https://x.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255,255,255,.1)',
                padding: '8px 12px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,.04)',
                color: '#b2d9e3',
                textDecoration: 'none',
                transition: 'all .2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
              }}
            >
              @SolanaStudios
            </a>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255,255,255,.1)',
                padding: '8px 12px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,.04)',
              }}
            >
              #SolanaStudios
            </span>
            <a
              href="https://solana.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(255,255,255,.1)',
                padding: '8px 12px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,.04)',
                color: '#b2d9e3',
                textDecoration: 'none',
                transition: 'all .2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
              }}
            >
              Solana HQ
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

