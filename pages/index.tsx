import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useState, type FormEvent } from 'react';

export default function StudioVisit() {
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

        @media (max-width: 700px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }

        .booking-shell {
          --shell-padding: clamp(20px, 4vw, 28px);
        }

        .booking-card {
          --card-padding: clamp(18px, 3.6vw, 26px);
        }

        .booking-form {
          --form-gap: 14px;
          --field-padding: 12px 14px;
          --button-padding: 14px 18px;
        }

        .booking-form input,
        .booking-form select,
        .booking-form textarea {
          color: var(--text);
          color-scheme: dark;
        }

        .booking-form input[type='date']::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.75;
        }

        @media (max-width: 600px) {
          .booking-shell {
            --shell-padding: 18px;
          }

          .booking-card {
            --card-padding: 18px;
          }

          .booking-form {
            --form-gap: 12px;
            --field-padding: 14px 16px;
            --button-padding: 16px;
          }

          .booking-submit {
            width: 100%;
          }
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
          </div>
        </header>

        <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
          <section className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr] gap-8 md:gap-8 items-center pt-6 md:pt-10 pb-6 md:pb-8">
            <div
              className="relative rounded-3xl booking-shell"
              style={{
                background:
                  'conic-gradient(from 180deg at 50% 50%, rgba(52,255,127,.12), rgba(18,200,255,.12), rgba(138,82,255,.12), rgba(255,49,247,.12), rgba(52,255,127,.12))',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.05), var(--shadow)',
                padding: 'var(--shell-padding, 24px)',
              }}
            >
              <div
                className="rounded-2xl relative booking-card"
                style={{
                  background: '#07070c',
                  padding: 'var(--card-padding, 22px)',
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
                  className="booking-form"
                  action="https://script.google.com/macros/s/AKfycbw-UMcSZutiwMKTJ7Tu5S0LhrE3gHZO-ZLX3ePt-5zFpdsGoPToU6HaNoVt5opRW6lGcA/exec"
                  method="POST"
                  id="solana-form"
                  onSubmit={handleSubmit}
                  style={{ display: 'grid', gap: 'var(--form-gap, 14px)' }}
                >
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                      padding: 'var(--field-padding, 12px 14px)',
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
                    className="booking-submit"
                    style={{
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontWeight: 800,
                      letterSpacing: '.4px',
                      padding: 'var(--button-padding, 14px 18px)',
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

