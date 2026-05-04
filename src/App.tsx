/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Award,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

// --- Components ---

const FeatureCard = ({icon, title, description, delay = 0}: FeatureCardProps) => (
  <motion.div
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    transition={{duration: 0.6, delay}}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
    id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="w-14 h-14 bg-school-navy/5 rounded-xl flex items-center justify-center text-school-navy mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-school-navy">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const navItems: NavItem[] = [
    {label: 'Home', href: '#home'},
    {label: 'Academics', href: '#academics'},
    {label: 'Admissions', href: '#admissions'},
    {label: 'Gallery', href: '#gallery'},
    {label: 'Contact', href: '#contact'},
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-school-gold selection:text-school-navy" id="top">
      {/* --- News Ticker --- */}
      <div className="ticker-wrap z-50">
        <div className="ticker">
          <div className="ticker-item"><AlertCircle size={14} /> Admissions are now open for academic session 2024-25</div>
          <div className="ticker-item"><Clock size={14} /> School Timings: 7:30 AM to 1:30 PM</div>
          <div className="ticker-item"><Award size={14} /> Annual Sports Month starts from October 15th</div>
          <div className="ticker-item"><AlertCircle size={14} /> Parent-Teacher Meeting scheduled for next Saturday</div>
          {/* Duplicate for infinite effect if needed, but animation handles loop */}
          <div className="ticker-item"><AlertCircle size={14} /> Admissions are now open for academic session 2024-25</div>
          <div className="ticker-item"><Clock size={14} /> School Timings: 7:30 AM to 1:30 PM</div>
        </div>
      </div>

      {/* --- Navigation --- */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
        id="main-nav"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-school-navy rounded-lg flex items-center justify-center text-school-gold shadow-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-school-navy leading-none">MC GIRLS HIGH</h1>
              <span className="text-[10px] tracking-widest text-slate-500 uppercase font-bold">Saudabad Mian Channu</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link text-school-navy">
                {item.label}
              </a>
            ))}
            <a href="#admissions" className="btn-primary text-sm">
              Apply Now
            </a>
          </nav>

          <button
            className="md:hidden text-school-navy p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-school-navy py-2 border-b border-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#admissions"
                className="btn-primary w-full text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative h-[85vh] flex items-center overflow-hidden" id="home">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1523050853063-bd401b51e4c1?auto=format&fit=crop&q=80&w=2070"
              alt="School Campus"
              className="w-full h-full object-cover grayscale-[20%] brightness-[40%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-school-navy/80 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{opacity: 0, x: -50}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.8}}
              className="max-w-2xl text-white"
            >
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-school-gold/20 border border-school-gold/30 rounded-full text-school-gold text-xs font-bold uppercase tracking-widest leading-none">
                <Users size={12} /> Empowering Future Leaders
              </div>
              
              <h2 className="urdu text-4xl md:text-6xl mb-4 leading-tight">
                گورنمنٹ ایم سی گرلز ہائی سکول سعود آباد میاں چنوں
              </h2>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
                Govt. MC Girls High School Saudabad Mian Channu
              </h1>
              
              <p className="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed">
                Dedicated to providing quality education and fostering an environment of excellence for the young women of Mian Channu since 1984.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#admissions" className="btn-gold flex items-center gap-2 group">
                  Admission Inquiry <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#academics" className="px-6 py-2 border border-white/50 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                  Explore Academics
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10 hidden md:block">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                {[
                  {label: 'Students', value: '1,200+'},
                  {label: 'Qualified Staff', value: '45+'},
                  {label: 'Academic Labs', value: '04'},
                  {label: 'Years of Legacy', value: '40'},
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5 + i * 0.1}}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-school-gold mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-slate-300 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Principal's Message & Info --- */}
        <section className="py-24 bg-white" id="info">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa1563db9603?auto=format&fit=crop&q=80&w=2070"
                  alt="Principal"
                  className="rounded-3xl shadow-2xl relative z-10 aspect-[4/5] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-school-gold rounded-full -z-0 opacity-20 blur-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-school-navy rounded-2xl -z-0 opacity-10" />
                
                <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur shadow-lg p-6 rounded-2xl z-20">
                  <h4 className="text-xl font-bold text-school-navy mb-1">Mst. Naveeda Kousar</h4>
                  <p className="text-sm text-slate-500 font-medium italic">Principal, Govt. MC Girls High School</p>
                </div>
              </motion.div>

              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-school-gold-dark font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Leadership Message</span>
                  <h2 className="text-4xl font-bold text-school-navy mb-6 leading-tight">Nurturing Minds, Building Character</h2>
                  <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">
                    "At Govt. MC Girls High School, we believe that education is the most powerful weapon which you can use to change the world. Our mission is to provide an inclusive and inspiring learning environment where every girl can flourish academically and personally."
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    We focus not just on curriculum but on holistic development, character building, and preparing our students to face the challenges of the modern world with confidence and integrity.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h5 className="font-bold text-school-navy mb-2 flex items-center gap-2"><BookOpen size={18} className="text-school-gold" /> Vision</h5>
                    <p className="text-sm text-slate-500">To be a leading institution of girls' education, producing empowered citizens of Pakistan.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h5 className="font-bold text-school-navy mb-2 flex items-center gap-2"><MapPin size={18} className="text-school-gold" /> Excellence</h5>
                    <p className="text-sm text-slate-500">Consistently achieving top results in Board exams with numerous position holders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Facilities Section --- */}
        <section className="py-24 bg-slate-50/50" id="academics">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-school-gold-dark font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Our Facilities</span>
              <h2 className="text-4xl font-bold text-school-navy mb-4">A World-Class Learning Environment</h2>
              <p className="text-slate-500">We provide the best resources to ensure our students have everything they need for a modern education.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8" id="facilities-grid">
              <FeatureCard
                icon={<BookOpen size={28} />}
                title="Grand Library"
                description="Over 5,000 books covering literature, science, and history, providing a peaceful hub for knowledge seekers."
                delay={0.1}
              />
              <FeatureCard
                icon={<Clock size={28} />}
                title="Science Labs"
                description="Fully equipped modern laboratories for Physics, Chemistry, and Biology to encourage practical learning."
                delay={0.2}
              />
              <FeatureCard
                icon={<Users size={28} />}
                title="IT Center"
                description="High-speed internet and latest computers helping our girls bridge the digital divide."
                delay={0.3}
              />
              <FeatureCard
                icon={<Award size={28} />}
                title="Auditorium"
                description="A spacious hall for seminars, debates, and annual functions with state-of-the-art audio-visual systems."
                delay={0.4}
              />
              <FeatureCard
                icon={<Calendar size={28} />}
                title="Sports Grounds"
                description="Dedicated area for volleyball, badminton, and athletics to ensure physical fitness."
                delay={0.5}
              />
              <FeatureCard
                icon={<GraduationCap size={28} />}
                title="Guidance Cell"
                description="Regular career counseling and psychological support for our students' mental wellbeing."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* --- Admissions Form --- */}
        <section className="py-24 bg-school-navy text-white relative overflow-hidden" id="admissions">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-school-gold rounded-full filter blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-[80px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif leading-tight">Start Your Journey With Us</h2>
                <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                  We are now accepting applications for Class VI to Class X. Join a community that values your ambition and supports your growth.
                </p>
                
                <div className="space-y-6">
                  {[
                    'Merit-based admission process',
                    'Special scholarships for deserving students',
                    'Interactive classroom environments',
                    'Digital literacy integrated curriculum'
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-school-gold/20 flex items-center justify-center text-school-gold">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-slate-200 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3 text-school-gold">
                    <Phone size={20} /> Admission Helpline
                  </h4>
                  <div className="space-y-2">
                    <p className="text-slate-300">Call us for immediate assistance:</p>
                    <a href="tel:+923000000000" className="text-2xl font-bold hover:text-school-gold transition-colors">+92 300 0000000</a>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-slate-800"
              >
                <h3 className="text-2xl font-bold mb-8 text-school-navy">Inquiry Form</h3>
                
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-school-navy mb-2">Message Sent!</h4>
                    <p className="text-slate-500">Thank you for your inquiry. Our admission office will contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Name</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-navy focus:border-transparent outline-none transition-all"
                          placeholder="e.g. Fatima Ali"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Father's Name</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-navy focus:border-transparent outline-none transition-all"
                          placeholder="e.g. Muhammad Ali"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Class for Admission</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-navy focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                        <option>Class VI</option>
                        <option>Class VII</option>
                        <option>Class VIII</option>
                        <option>Class IX</option>
                        <option>Class X</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Number</label>
                        <input
                          required
                          type="tel"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-navy focus:border-transparent outline-none transition-all"
                          placeholder="+92 XXX XXXXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-school-navy focus:border-transparent outline-none transition-all"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <button
                      disabled={formStatus === 'submitting'}
                      className="w-full btn-primary py-4 text-center flex items-center justify-center gap-2 group"
                    >
                      {formStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Inquiry <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 font-medium">
                      By submitting, you agree to our privacy policy regarding admission data usage.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Location Section --- */}
        <section className="py-24 bg-white" id="gallery">
          <div className="container mx-auto px-4 text-center">
             <div className="mb-16">
              <span className="text-school-gold-dark font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Visit Us</span>
              <h2 className="text-4xl font-bold text-school-navy mb-4">Our Campus Location</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Saudabad is a peaceful residential hub in Mian Channu, providing a safe and focused environment for education.</p>
            </div>
            
            <div className="w-full h-[400px] bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200 relative">
              {/* Replace with real Google Map iframe if needed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <MapPin size={48} className="mb-4 opacity-50" />
                <p className="font-bold text-lg">Saudabad Block, Mian Channu, Punjab, Pakistan</p>
                <span className="text-sm">Click to expand map</span>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110123.456789!2d72.35!3d30.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI3JzAwLjAiTiA3MsKwMjEnMDAuMCJF!5e0!3m2!1sen!2spk!4v1634567890123!5m2!1sen!2spk" 
                className="w-full h-full border-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-white pt-20 pb-10" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-school-gold rounded-lg flex items-center justify-center text-school-navy shadow-lg font-bold">
                  MC
                </div>
                <h1 className="text-xl font-bold tracking-tight">Govt. MC Girls High School</h1>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Empowering the generation of tomorrow through academic excellence, moral guidance, and holistic development. A cornerstone of education in Mian Channu since 1984.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <button key={social} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-school-gold hover:text-school-navy transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-school-gold uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                   <li key={item.label}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight size={14} className="text-school-gold" /> {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-school-gold uppercase text-xs tracking-widest">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-school-gold mt-1 shrink-0" />
                  <p className="text-sm text-slate-400">Saudabad Block, Street #4, Mian Channu, Khanewal District, Punjab</p>
                </li>
                <li>
                  <a href="tel:+923000000000" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                    <Phone size={18} className="text-school-gold shrink-0" /> +92 300 0000000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@mchighschool.edu.pk" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                    <Mail size={18} className="text-school-gold shrink-0" /> info@mchighschool.edu.pk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Govt. MC Girls High School Mian Channu. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs font-medium flex items-center gap-1 group">
              Made with <span className="text-red-500 animate-pulse group-hover:scale-125 transition-transform inline-block">❤️</span> in Mian Channu
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to top button */}
      <motion.button
        initial={{opacity: 0}}
        animate={{opacity: isScrolled ? 1 : 0}}
        className="fixed bottom-8 right-8 w-12 h-12 bg-school-navy text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-school-gold hover:text-school-navy transition-all z-50 border border-white/10"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <ChevronRight size={24} className="-rotate-90" />
      </motion.button>
    </div>
  );
}
