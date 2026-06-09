import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const CANDLE_IMG = 'https://cdn.poehali.dev/projects/d8eefeed-b445-4e8f-9ce3-0b16e048b503/files/85c88849-6b4e-499f-bcb2-2da6197de946.jpg';
const ARCHIVE_IMG = 'https://cdn.poehali.dev/projects/d8eefeed-b445-4e8f-9ce3-0b16e048b503/files/063d199b-ab89-4c51-8d5e-0e0fe2d86c9d.jpg';

type Section = 'home' | 'about' | 'contacts';

const Index = () => {
  const [active, setActive] = useState<Section>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nav = (s: Section) => { setActive(s); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (i: number) => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grain min-h-screen" style={{ background: 'var(--dark-bg)', color: 'var(--text-cream)' }}>

      {/* ── NAVIGATION ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: 'rgba(14,10,6,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,151,74,0.15)' }}
      >
        <button onClick={() => nav('home')} className="flex items-center gap-3">
          <span className="text-2xl">🕯️</span>
          <div>
            <div className="font-serif text-lg leading-tight" style={{ color: 'var(--gold)', letterSpacing: '0.05em' }}>Свеча памяти</div>
            <div className="text-xs tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>1941 — 2026</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {(['home', 'about', 'contacts'] as Section[]).map((s) => {
            const labels = { home: 'Главная', about: 'О проекте', contacts: 'Контакты' };
            return (
              <button key={s} onClick={() => nav(s)}
                className="text-xs transition-all duration-300"
                style={{
                  color: active === s ? 'var(--gold)' : 'var(--text-muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderBottom: active === s ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: '2px',
                }}>
                {labels[s]}
              </button>
            );
          })}
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--gold)' }}>
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-40 px-6 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(14,10,6,0.97)', borderBottom: '1px solid rgba(201,151,74,0.2)' }}>
          {(['home', 'about', 'contacts'] as Section[]).map((s) => {
            const labels = { home: 'Главная', about: 'О проекте', contacts: 'Контакты' };
            return (
              <button key={s} onClick={() => nav(s)}
                className="text-left text-sm py-2"
                style={{ color: active === s ? 'var(--gold)' : 'var(--text-cream)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {labels[s]}
              </button>
            );
          })}
        </div>
      )}

      {/* ─── HOME ─── */}
      {active === 'home' && (
        <main>
          {/* Hero */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url(${CANDLE_IMG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.18) saturate(0.6)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 60% 70% at 50% 60%, rgba(255,107,26,0.12) 0%, rgba(14,10,6,0.7) 70%, var(--dark-bg) 100%)'
            }} />

            {/* Flame orb */}
            <div className="relative z-10 mb-8 animate-glow-pulse" style={{
              width: 90, height: 140,
              borderRadius: '50% 50% 45% 45%',
              background: 'linear-gradient(180deg, var(--flame-3) 0%, var(--flame-2) 40%, var(--flame-1) 70%, rgba(255,107,26,0.3) 100%)',
              filter: 'blur(2px)',
            }}>
              <div className="animate-flicker absolute inset-0" style={{
                background: 'linear-gradient(180deg, white 0%, var(--flame-3) 30%, var(--flame-2) 60%, transparent 100%)',
                borderRadius: '50% 50% 45% 45%',
                filter: 'blur(1px)',
              }} />
            </div>

            <div className="relative z-10 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
              <p className="text-xs mb-4" style={{ color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                22 июня 1941 — 22 июня 2026
              </p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 leading-none" style={{ color: 'var(--text-cream)' }}>
                Свеча<br />
                <em style={{ color: 'var(--gold)' }}>Памяти</em>
              </h1>
              <div className="ornament-line my-6 max-w-xs mx-auto">
                <span style={{ color: 'var(--gold)' }}>✦</span>
              </div>
              <p className="font-serif text-xl md:text-2xl mb-1" style={{ color: 'var(--text-cream)', opacity: 0.85 }}>
                85 лет со дня начала
              </p>
              <p className="font-serif text-xl md:text-2xl" style={{ color: 'var(--text-cream)', opacity: 0.85 }}>
                Великой Отечественной войны
              </p>
            </div>

            <div className="relative z-10 mt-10 opacity-0 animate-fade-up delay-700" style={{ animationFillMode: 'forwards' }}>
              <p className="font-serif text-base md:text-lg italic max-w-xl mx-auto mb-8" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                «Никто не забыт — ничто не забыто»
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-gold" onClick={() => nav('about')}>О проекте</button>
                <button onClick={() => nav('contacts')}
                  className="text-xs px-8 py-3 transition-all duration-300"
                  style={{ border: '1px solid var(--gold-dim)', color: 'var(--gold)', background: 'transparent', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gold-dim)')}>
                  Передать материалы
                </button>
              </div>
            </div>

            {/* City skyline with blinking windows */}
            <div className="absolute bottom-0 left-0 right-0 z-10 opacity-0 animate-fade-in delay-900" style={{ animationFillMode: 'forwards' }}>
              <svg viewBox="0 0 1440 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice" style={{ display: 'block', width: '100%' }}>
                {/* Gradient fog at bottom */}
                <defs>
                  <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E0A06" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0E0A06" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A1208" />
                    <stop offset="100%" stopColor="#0A0704" />
                  </linearGradient>
                </defs>

                {/* ── Far background buildings (darkest) ── */}
                <rect x="0"    y="160" width="60"  height="120" fill="#0D0905" />
                <rect x="55"   y="140" width="45"  height="140" fill="#0D0905" />
                <rect x="95"   y="155" width="70"  height="125" fill="#0D0905" />
                <rect x="160"  y="130" width="50"  height="150" fill="#0D0905" />
                <rect x="205"  y="148" width="80"  height="132" fill="#0D0905" />
                <rect x="280"  y="135" width="55"  height="145" fill="#0D0905" />
                <rect x="330"  y="155" width="65"  height="125" fill="#0D0905" />
                <rect x="390"  y="125" width="45"  height="155" fill="#0D0905" />
                <rect x="430"  y="145" width="75"  height="135" fill="#0D0905" />
                <rect x="500"  y="130" width="55"  height="150" fill="#0D0905" />
                <rect x="550"  y="150" width="90"  height="130" fill="#0D0905" />
                <rect x="635"  y="120" width="50"  height="160" fill="#0D0905" />
                <rect x="680"  y="140" width="70"  height="140" fill="#0D0905" />
                <rect x="745"  y="130" width="55"  height="150" fill="#0D0905" />
                <rect x="795"  y="148" width="80"  height="132" fill="#0D0905" />
                <rect x="870"  y="135" width="60"  height="145" fill="#0D0905" />
                <rect x="925"  y="155" width="50"  height="125" fill="#0D0905" />
                <rect x="970"  y="125" width="75"  height="155" fill="#0D0905" />
                <rect x="1040" y="145" width="55"  height="135" fill="#0D0905" />
                <rect x="1090" y="130" width="85"  height="150" fill="#0D0905" />
                <rect x="1170" y="150" width="60"  height="130" fill="#0D0905" />
                <rect x="1225" y="125" width="50"  height="155" fill="#0D0905" />
                <rect x="1270" y="140" width="80"  height="140" fill="#0D0905" />
                <rect x="1345" y="130" width="95"  height="150" fill="#0D0905" />

                {/* ── Mid buildings ── */}
                {/* Building A — tall narrow */}
                <rect x="20"   y="110" width="38"  height="170" fill="url(#buildingGrad)" />
                <rect x="20"   y="100" width="38"  height="12"  fill="#1C1208" /> {/* roof detail */}
                {/* Windows A */}
                <rect x="27" y="118" width="8" height="10" className="win-3"  fill="#FFD98A" />
                <rect x="41" y="118" width="8" height="10" className="win-7"  fill="#FFC46B" />
                <rect x="27" y="134" width="8" height="10" className="win-12" fill="#FFD98A" />
                <rect x="41" y="134" width="8" height="10" className="win-1"  fill="#FFC46B" />
                <rect x="27" y="150" width="8" height="10" className="win-5"  fill="#FFD98A" />
                <rect x="41" y="150" width="8" height="10" className="win-9"  fill="#FFC46B" />
                <rect x="27" y="166" width="8" height="10" className="win-14" fill="#FFD98A" />
                <rect x="41" y="166" width="8" height="10" className="win-2"  fill="#FFC46B" />

                {/* Building B — wide blocky */}
                <rect x="80"  y="90"  width="90"  height="190" fill="url(#buildingGrad)" />
                <rect x="80"  y="82"  width="90"  height="10"  fill="#1C1208" />
                <rect x="112" y="78"  width="26"  height="14"  fill="#161008" /> {/* antenna base */}
                <rect x="123" y="55"  width="4"   height="25"  fill="#161008" /> {/* antenna */}
                {/* Windows B */}
                <rect x="88"  y="100" width="10" height="12" className="win-6"  fill="#FFD98A" />
                <rect x="104" y="100" width="10" height="12" className="win-11" fill="#FFC46B" />
                <rect x="120" y="100" width="10" height="12" className="win-4"  fill="#FFD98A" />
                <rect x="136" y="100" width="10" height="12" className="win-15" fill="#FFC46B" />
                <rect x="152" y="100" width="10" height="12" className="win-8"  fill="#FFD98A" />
                <rect x="88"  y="120" width="10" height="12" className="win-2"  fill="#FFC46B" />
                <rect x="104" y="120" width="10" height="12" className="win-9"  fill="#FFD98A" />
                <rect x="120" y="120" width="10" height="12" className="win-13" fill="#FFC46B" />
                <rect x="136" y="120" width="10" height="12" className="win-1"  fill="#FFD98A" />
                <rect x="152" y="120" width="10" height="12" className="win-7"  fill="#FFC46B" />
                <rect x="88"  y="140" width="10" height="12" className="win-16" fill="#FFD98A" />
                <rect x="104" y="140" width="10" height="12" className="win-5"  fill="#FFC46B" />
                <rect x="120" y="140" width="10" height="12" className="win-10" fill="#FFD98A" />
                <rect x="136" y="140" width="10" height="12" className="win-3"  fill="#FFC46B" />
                <rect x="152" y="140" width="10" height="12" className="win-18" fill="#FFD98A" />
                <rect x="88"  y="160" width="10" height="12" className="win-14" fill="#FFC46B" />
                <rect x="104" y="160" width="10" height="12" className="win-20" fill="#FFD98A" />
                <rect x="120" y="160" width="10" height="12" className="win-6"  fill="#FFC46B" />
                <rect x="136" y="160" width="10" height="12" className="win-17" fill="#FFD98A" />
                <rect x="152" y="160" width="10" height="12" className="win-11" fill="#FFC46B" />

                {/* Building C — medium */}
                <rect x="200" y="105" width="55"  height="175" fill="url(#buildingGrad)" />
                <rect x="200" y="97"  width="55"  height="10"  fill="#1C1208" />
                {/* Windows C */}
                <rect x="208" y="113" width="9" height="11" className="win-4"  fill="#FFD98A" />
                <rect x="223" y="113" width="9" height="11" className="win-19" fill="#FFC46B" />
                <rect x="238" y="113" width="9" height="11" className="win-8"  fill="#FFD98A" />
                <rect x="208" y="131" width="9" height="11" className="win-15" fill="#FFC46B" />
                <rect x="223" y="131" width="9" height="11" className="win-2"  fill="#FFD98A" />
                <rect x="238" y="131" width="9" height="11" className="win-12" fill="#FFC46B" />
                <rect x="208" y="149" width="9" height="11" className="win-7"  fill="#FFD98A" />
                <rect x="223" y="149" width="9" height="11" className="win-1"  fill="#FFC46B" />
                <rect x="238" y="149" width="9" height="11" className="win-16" fill="#FFD98A" />
                <rect x="208" y="167" width="9" height="11" className="win-10" fill="#FFC46B" />
                <rect x="223" y="167" width="9" height="11" className="win-5"  fill="#FFD98A" />
                <rect x="238" y="167" width="9" height="11" className="win-20" fill="#FFC46B" />

                {/* Building D — skyscraper center-left */}
                <rect x="290" y="60"  width="50"  height="220" fill="url(#buildingGrad)" />
                <rect x="298" y="50"  width="34"  height="12"  fill="#1C1208" />
                <rect x="313" y="30"  width="5"   height="22"  fill="#1A1008" />
                {/* Windows D */}
                <rect x="298" y="70"  width="9" height="11" className="win-3"  fill="#FFD98A" />
                <rect x="313" y="70"  width="9" height="11" className="win-18" fill="#FFC46B" />
                <rect x="328" y="70"  width="9" height="11" className="win-6"  fill="#FFD98A" />
                <rect x="298" y="88"  width="9" height="11" className="win-11" fill="#FFC46B" />
                <rect x="313" y="88"  width="9" height="11" className="win-2"  fill="#FFD98A" />
                <rect x="328" y="88"  width="9" height="11" className="win-14" fill="#FFC46B" />
                <rect x="298" y="106" width="9" height="11" className="win-7"  fill="#FFD98A" />
                <rect x="313" y="106" width="9" height="11" className="win-9"  fill="#FFC46B" />
                <rect x="328" y="106" width="9" height="11" className="win-19" fill="#FFD98A" />
                <rect x="298" y="124" width="9" height="11" className="win-4"  fill="#FFC46B" />
                <rect x="313" y="124" width="9" height="11" className="win-15" fill="#FFD98A" />
                <rect x="328" y="124" width="9" height="11" className="win-1"  fill="#FFC46B" />
                <rect x="298" y="142" width="9" height="11" className="win-12" fill="#FFD98A" />
                <rect x="313" y="142" width="9" height="11" className="win-5"  fill="#FFC46B" />
                <rect x="328" y="142" width="9" height="11" className="win-17" fill="#FFD98A" />
                <rect x="298" y="160" width="9" height="11" className="win-8"  fill="#FFC46B" />
                <rect x="313" y="160" width="9" height="11" className="win-20" fill="#FFD98A" />
                <rect x="328" y="160" width="9" height="11" className="win-10" fill="#FFC46B" />
                <rect x="298" y="178" width="9" height="11" className="win-16" fill="#FFD98A" />
                <rect x="313" y="178" width="9" height="11" className="win-13" fill="#FFC46B" />
                <rect x="328" y="178" width="9" height="11" className="win-3"  fill="#FFD98A" />

                {/* Building E — wide low */}
                <rect x="370" y="130" width="100" height="150" fill="url(#buildingGrad)" />
                <rect x="370" y="122" width="100" height="10"  fill="#1C1208" />
                {/* Windows E */}
                {[0,1,2,3,4].map(col => [0,1,2,3].map(row => (
                  <rect key={`e-${col}-${row}`}
                    x={380 + col * 18} y={135 + row * 18}
                    width="10" height="11"
                    className={`win-${((col * 4 + row) % 20) + 1}`}
                    fill="#FFD98A" />
                )))}

                {/* Building F — tall center */}
                <rect x="500" y="70"  width="65"  height="210" fill="url(#buildingGrad)" />
                <rect x="500" y="62"  width="65"  height="10"  fill="#1C1208" />
                <rect x="520" y="48"  width="25"  height="16"  fill="#161008" />
                <rect x="530" y="28"  width="5"   height="22"  fill="#161008" />
                {/* Windows F */}
                {[0,1,2].map(col => [0,1,2,3,4,5,6,7].map(row => (
                  <rect key={`f-${col}-${row}`}
                    x={510 + col * 18} y={78 + row * 18}
                    width="10" height="12"
                    className={`win-${((col * 8 + row + 3) % 20) + 1}`}
                    fill="#FFC46B" />
                )))}

                {/* Building G — stepped */}
                <rect x="600" y="110" width="40"  height="170" fill="url(#buildingGrad)" />
                <rect x="590" y="140" width="60"  height="140" fill="url(#buildingGrad)" />
                <rect x="600" y="102" width="40"  height="10"  fill="#1C1208" />
                {/* Windows G */}
                <rect x="607" y="118" width="8" height="10" className="win-5"  fill="#FFD98A" />
                <rect x="621" y="118" width="8" height="10" className="win-13" fill="#FFC46B" />
                <rect x="607" y="134" width="8" height="10" className="win-9"  fill="#FFD98A" />
                <rect x="621" y="134" width="8" height="10" className="win-2"  fill="#FFC46B" />
                <rect x="595" y="148" width="8" height="10" className="win-17" fill="#FFD98A" />
                <rect x="607" y="148" width="8" height="10" className="win-6"  fill="#FFC46B" />
                <rect x="621" y="148" width="8" height="10" className="win-11" fill="#FFD98A" />
                <rect x="635" y="148" width="8" height="10" className="win-4"  fill="#FFC46B" />
                <rect x="595" y="164" width="8" height="10" className="win-19" fill="#FFD98A" />
                <rect x="635" y="164" width="8" height="10" className="win-1"  fill="#FFC46B" />
                <rect x="595" y="180" width="8" height="10" className="win-14" fill="#FFD98A" />
                <rect x="635" y="180" width="8" height="10" className="win-8"  fill="#FFC46B" />

                {/* Building H — tall right-center */}
                <rect x="680" y="80"  width="55"  height="200" fill="url(#buildingGrad)" />
                <rect x="680" y="72"  width="55"  height="10"  fill="#1C1208" />
                {/* Windows H */}
                {[0,1,2].map(col => [0,1,2,3,4,5,6,7,8].map(row => (
                  <rect key={`h-${col}-${row}`}
                    x={689 + col * 16} y={88 + row * 17}
                    width="9" height="11"
                    className={`win-${((col * 9 + row + 7) % 20) + 1}`}
                    fill="#FFD98A" />
                )))}

                {/* Building I — medium right */}
                <rect x="770" y="100" width="70"  height="180" fill="url(#buildingGrad)" />
                <rect x="770" y="92"  width="70"  height="10"  fill="#1C1208" />
                {/* Windows I */}
                {[0,1,2,3].map(col => [0,1,2,3,4,5].map(row => (
                  <rect key={`i-${col}-${row}`}
                    x={779 + col * 15} y={108 + row * 18}
                    width="9" height="11"
                    className={`win-${((col * 6 + row + 11) % 20) + 1}`}
                    fill="#FFC46B" />
                )))}

                {/* Building J — wide tower right */}
                <rect x="875" y="65"  width="75"  height="215" fill="url(#buildingGrad)" />
                <rect x="875" y="57"  width="75"  height="10"  fill="#1C1208" />
                <rect x="902" y="43"  width="21"  height="16"  fill="#161008" />
                <rect x="910" y="22"  width="5"   height="23"  fill="#161008" />
                {/* Windows J */}
                {[0,1,2,3].map(col => [0,1,2,3,4,5,6,7,8,9].map(row => (
                  <rect key={`j-${col}-${row}`}
                    x={884 + col * 16} y={73 + row * 16}
                    width="9" height="10"
                    className={`win-${((col * 10 + row + 2) % 20) + 1}`}
                    fill="#FFD98A" />
                )))}

                {/* Building K — right side stack */}
                <rect x="985"  y="120" width="50"  height="160" fill="url(#buildingGrad)" />
                <rect x="985"  y="112" width="50"  height="10"  fill="#1C1208" />
                {/* Windows K */}
                {[0,1,2].map(col => [0,1,2,3,4].map(row => (
                  <rect key={`k-${col}-${row}`}
                    x={993 + col * 14} y={128 + row * 18}
                    width="9" height="11"
                    className={`win-${((col * 5 + row + 15) % 20) + 1}`}
                    fill="#FFC46B" />
                )))}

                {/* Building L — tall far right */}
                <rect x="1070" y="75"  width="60"  height="205" fill="url(#buildingGrad)" />
                <rect x="1070" y="67"  width="60"  height="10"  fill="#1C1208" />
                {/* Windows L */}
                {[0,1,2].map(col => [0,1,2,3,4,5,6,7].map(row => (
                  <rect key={`l-${col}-${row}`}
                    x={1079 + col * 17} y={83 + row * 18}
                    width="10" height="11"
                    className={`win-${((col * 8 + row + 4) % 20) + 1}`}
                    fill="#FFD98A" />
                )))}

                {/* Building M — right edge */}
                <rect x="1170" y="95"  width="80"  height="185" fill="url(#buildingGrad)" />
                <rect x="1170" y="87"  width="80"  height="10"  fill="#1C1208" />
                {/* Windows M */}
                {[0,1,2,3,4].map(col => [0,1,2,3,4,5].map(row => (
                  <rect key={`m-${col}-${row}`}
                    x={1179 + col * 14} y={103 + row * 18}
                    width="9" height="11"
                    className={`win-${((col * 6 + row + 9) % 20) + 1}`}
                    fill="#FFC46B" />
                )))}

                {/* Building N — far right tall */}
                <rect x="1285" y="85"  width="55"  height="195" fill="url(#buildingGrad)" />
                <rect x="1285" y="77"  width="55"  height="10"  fill="#1C1208" />
                {/* Windows N */}
                {[0,1,2].map(col => [0,1,2,3,4,5,6,7].map(row => (
                  <rect key={`n-${col}-${row}`}
                    x={1293 + col * 16} y={93 + row * 17}
                    width="9" height="11"
                    className={`win-${((col * 8 + row + 6) % 20) + 1}`}
                    fill="#FFD98A" />
                )))}

                {/* Building O — rightmost */}
                <rect x="1370" y="110" width="70"  height="170" fill="url(#buildingGrad)" />
                <rect x="1370" y="102" width="70"  height="10"  fill="#1C1208" />
                {/* Windows O */}
                {[0,1,2,3].map(col => [0,1,2,3,4].map(row => (
                  <rect key={`o-${col}-${row}`}
                    x={1379 + col * 14} y={118 + row * 18}
                    width="9" height="11"
                    className={`win-${((col * 5 + row + 13) % 20) + 1}`}
                    fill="#FFC46B" />
                )))}

                {/* Ground fog overlay */}
                <rect x="0" y="200" width="1440" height="80" fill="url(#skyFade)" />
              </svg>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in delay-1100" style={{ animationFillMode: 'forwards' }}>
              <div className="flex flex-col items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ letterSpacing: '0.2em', fontSize: '0.65rem', textTransform: 'uppercase' }}>прокрутите</span>
                <Icon name="ChevronDown" size={16} />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3" style={{ border: '1px solid rgba(201,151,74,0.2)' }}>
              {[
                { num: '85', label: 'лет назад', sub: 'началась война' },
                { num: '27М+', label: 'жизней', sub: 'унесла война' },
                { num: '1418', label: 'дней и ночей', sub: 'продолжалась борьба' },
              ].map((item, i) => (
                <div key={i} className="text-center py-12 px-8" style={{
                  background: 'rgba(201,151,74,0.03)',
                  borderRight: i < 2 ? '1px solid rgba(201,151,74,0.15)' : 'none'
                }}>
                  <div className="font-serif text-5xl md:text-6xl mb-2" style={{ color: 'var(--gold)' }}>{item.num}</div>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{item.label}</div>
                  <div className="font-serif text-sm italic" style={{ color: 'var(--text-cream)', opacity: 0.7 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Quote */}
          <section className="py-16 px-6" style={{ background: 'rgba(201,151,74,0.04)', borderTop: '1px solid rgba(201,151,74,0.12)', borderBottom: '1px solid rgba(201,151,74,0.12)' }}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-3xl mb-6" style={{ color: 'var(--gold)', opacity: 0.4 }}>"</div>
              <p className="font-serif text-2xl md:text-3xl italic leading-relaxed" style={{ color: 'var(--text-cream)' }}>
                Победа в Великой Отечественной войне — это подвиг,<br className="hidden md:block" />который никогда не будет забыт
              </p>
              <div className="ornament-line max-w-xs mx-auto mt-8">
                <span style={{ color: 'var(--gold)' }}>✦</span>
              </div>
            </div>
          </section>

          {/* Archive teaser */}
          <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <p className="text-xs mb-4" style={{ color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Архивные материалы</p>
                <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-cream)' }}>Сохрани<br />историю</h2>
                <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Каждая фотография, письмо, документ — это живая история. Передайте нам семейные архивы,
                  и они станут частью общей памяти о тех, кто защитил нашу Родину.
                </p>
                <button className="btn-gold" onClick={() => nav('about')}>Узнать подробнее</button>
              </div>
              <div className="flex-1 relative">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={ARCHIVE_IMG} alt="Архивные материалы" className="w-full h-full object-cover" style={{ filter: 'sepia(40%) brightness(0.8)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,10,6,0.4) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-4 left-4" style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '12px' }}>
                    <p className="font-serif text-sm italic" style={{ color: 'var(--text-cream)' }}>Архивные фотографии 1941–1945</p>
                  </div>
                </div>
                {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((pos, i) => (
                  <div key={i} className={`absolute w-6 h-6 ${pos}`} style={{ borderColor: 'var(--gold)', margin: '-1px' }} />
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ─── ABOUT ─── */}
      {active === 'about' && (
        <main className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <p className="text-xs mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>О проекте</p>
              <h1 className="font-serif text-5xl md:text-6xl mb-6" style={{ color: 'var(--text-cream)' }}>Свеча памяти</h1>
              <div className="ornament-line max-w-sm mb-10">
                <span style={{ color: 'var(--gold)' }}>✦</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="md:col-span-2 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-cream)', lineHeight: 1.9 }}>
                  Проект «Свеча памяти» посвящён 85-летию со дня начала Великой Отечественной войны.
                  22 июня 1941 года изменило судьбы миллионов людей. Наш долг — сохранить память
                  о каждом, кто встал на защиту Родины.
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  Мы собираем архивные материалы, фотографии, личные документы и воспоминания,
                  чтобы создать живую летопись тех трагических и героических лет. Каждый вклад —
                  это искра в общем пламени памяти.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                  Если у вас есть семейные архивы, фотографии военных лет, письма с фронта или
                  воспоминания ветеранов — передайте их нам. Вместе мы сохраним историю для
                  будущих поколений.
                </p>
              </div>
              <div className="opacity-0 animate-fade-up delay-300" style={{ animationFillMode: 'forwards' }}>
                <div className="p-6" style={{ border: '1px solid rgba(201,151,74,0.2)', background: 'rgba(201,151,74,0.03)' }}>
                  <div className="text-2xl mb-3">🕯️</div>
                  <div className="font-serif text-lg mb-2" style={{ color: 'var(--gold)' }}>22 июня 2026</div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    В день 85-летия все переданные материалы войдут в единую цифровую летопись
                  </p>
                </div>
              </div>
            </div>

            {/* Upload zone */}
            <div className="opacity-0 animate-fade-up delay-500" style={{ animationFillMode: 'forwards' }}>
              <h2 className="font-serif text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-cream)' }}>Передать материалы</h2>
              <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                Загрузите фотографии, документы или архивные материалы для включения в проект
              </p>

              <div
                className="upload-zone p-12 text-center mb-6 cursor-pointer"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
                <div className="text-4xl mb-4">📂</div>
                <p className="font-serif text-xl mb-2" style={{ color: 'var(--text-cream)' }}>Перетащите файлы сюда</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>или нажмите для выбора файлов</p>
                <p className="text-xs mt-3" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Фотографии, документы, PDF — до 50 МБ каждый</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mb-8">
                  <p className="text-xs mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Добавлено файлов: {uploadedFiles.length}
                  </p>
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3"
                      style={{ background: 'rgba(201,151,74,0.06)', border: '1px solid rgba(201,151,74,0.15)' }}>
                      <div className="flex items-center gap-3">
                        <Icon name="FileText" size={16} style={{ color: 'var(--gold)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-cream)' }}>{f.name}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{(f.size / 1024).toFixed(0)} КБ</span>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ color: 'var(--text-muted)' }}>
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                  <button className="btn-gold mt-4 w-full">Отправить материалы</button>
                </div>
              )}
            </div>

            {/* What we accept */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '📷', title: 'Фотографии', desc: 'Портреты, фронтовые снимки, семейные архивы' },
                { icon: '✉️', title: 'Письма', desc: 'Письма с фронта, воспоминания ветеранов' },
                { icon: '📜', title: 'Документы', desc: 'Наградные листы, военные билеты, справки' },
                { icon: '🎖️', title: 'Истории', desc: 'Личные рассказы о судьбах на войне' },
              ].map((item, i) => (
                <div key={i} className="p-5 text-center" style={{ border: '1px solid rgba(201,151,74,0.15)', background: 'rgba(201,151,74,0.02)' }}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-serif text-base mb-2" style={{ color: 'var(--gold)' }}>{item.title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Back to home button */}
            <div className="mt-16 pt-10 text-center" style={{ borderTop: '1px solid rgba(201,151,74,0.12)' }}>
              <button
                onClick={() => nav('home')}
                className="inline-flex items-center gap-3 transition-all duration-300 group"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Icon name="ArrowLeft" size={16} />
                <span className="font-serif italic text-base">Вернуться на главную</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ─── CONTACTS ─── */}
      {active === 'contacts' && (
        <main className="pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <p className="text-xs mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Связаться с нами</p>
              <h1 className="font-serif text-5xl md:text-6xl mb-6" style={{ color: 'var(--text-cream)' }}>Контакты</h1>
              <div className="ornament-line max-w-sm mb-10">
                <span style={{ color: 'var(--gold)' }}>✦</span>
              </div>
              <p className="text-sm leading-relaxed mb-12" style={{ color: 'var(--text-muted)' }}>
                Если у вас есть вопросы о проекте, вы хотите передать материалы или стать партнёром —
                напишите нам. Мы ответим в течение одного рабочего дня.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 opacity-0 animate-scale-in"
                style={{ animationFillMode: 'forwards', border: '1px solid rgba(201,151,74,0.2)', background: 'rgba(201,151,74,0.03)' }}>
                <div className="text-4xl mb-4">🕯️</div>
                <h2 className="font-serif text-3xl mb-3" style={{ color: 'var(--gold)' }}>Сообщение отправлено</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Мы свяжемся с вами в ближайшее время</p>
                <button className="btn-gold mt-8" onClick={() => setSubmitted(false)}>Написать ещё</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Ваше имя</label>
                    <input type="text" required value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{ background: 'rgba(201,151,74,0.05)', border: '1px solid rgba(201,151,74,0.25)', color: 'var(--text-cream)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,151,74,0.25)')} />
                  </div>
                  <div>
                    <label className="block text-xs mb-2" style={{ color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Электронная почта</label>
                    <input type="email" required value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="ivan@example.ru"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{ background: 'rgba(201,151,74,0.05)', border: '1px solid rgba(201,151,74,0.25)', color: 'var(--text-cream)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,151,74,0.25)')} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Сообщение</label>
                  <textarea required rows={6} value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Расскажите о цели обращения, имеющихся материалах..."
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                    style={{ background: 'rgba(201,151,74,0.05)', border: '1px solid rgba(201,151,74,0.25)', color: 'var(--text-cream)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(201,151,74,0.25)')} />
                </div>
                <button type="submit" className="btn-gold w-full py-4">Отправить сообщение</button>
              </form>
            )}

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'Mail', label: 'Почта', value: 'info@памятьпобеды.рф' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (800) 000-00-00' },
                { icon: 'MapPin', label: 'Адрес', value: 'Москва, Россия' },
              ].map((item, i) => (
                <div key={i} className="p-5 text-center" style={{ border: '1px solid rgba(201,151,74,0.15)', background: 'rgba(201,151,74,0.02)' }}>
                  <Icon name={item.icon as 'Mail'} size={20} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{item.label}</div>
                  <div className="font-serif text-sm" style={{ color: 'var(--text-cream)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Back to home button */}
            <div className="mt-16 pt-10 text-center" style={{ borderTop: '1px solid rgba(201,151,74,0.12)' }}>
              <button
                onClick={() => nav('home')}
                className="inline-flex items-center gap-3 transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Icon name="ArrowLeft" size={16} />
                <span className="font-serif italic text-base">Вернуться на главную</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: '1px solid rgba(201,151,74,0.12)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="ornament-line max-w-xs mx-auto mb-6">
            <span style={{ color: 'var(--gold)' }}>✦</span>
          </div>
          <p className="font-serif text-sm italic mb-2" style={{ color: 'var(--text-muted)' }}>
            «Память — это свеча, которую мы зажигаем в сердцах»
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5, letterSpacing: '0.15em' }}>
            © 2026 Свеча памяти · 1941–2026 · 85 лет
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;