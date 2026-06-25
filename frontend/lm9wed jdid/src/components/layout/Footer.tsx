import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Mail, Phone, MapPin, Share2, Camera, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE } from '@/lib/data';

const footerLinks = {
  école: [
    { to: '/about',    label: "À propos de l'EEMCI" },
    { to: '/schools',  label: 'Nos deux écoles' },
    { to: '/alumni',   label: 'Réseau alumni' },
    { to: '/news',     label: 'Actualités' },
  ],
  formations: [
    { to: '/programs?level=Bac',      label: 'Technicien (Bac)' },
    { to: '/programs?level=Bac%2B2',  label: 'Technicien Spécialisé (Bac+2)' },
    { to: '/programs?level=Bac%2B3',  label: 'Bachelor (Bac+3)' },
    { to: '/programs?level=Bac%2B5',  label: 'Master (Bac+5)' },
    { to: '/programs?level=Bac%2B8',  label: 'Doctorat (Bac+8)' },
  ],
  légal: [
    { to: '/contact',  label: 'Contact' },
    { to: '#',         label: 'Politique de confidentialité' },
    { to: '#',         label: 'Mentions légales' },
    { to: '#',         label: "Conditions d'utilisation" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-500/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-600/10 blur-[80px] pointer-events-none" />

      <div className="container relative">
        {/* Main grid */}
        <div className="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5 border-b border-white/8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="lg" />
            <p className="mt-5 text-sm text-primary-200/70 max-w-xs leading-relaxed">
              {SITE.fullName}. Formation supérieure d'excellence reconnue par l'État marocain et l'Europe depuis {SITE.founded}.
            </p>

            {/* Accreditation badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Accrédité État Marocain', 'Membre FEDE', 'Double Diplôme FR–MA'].map((b) => (
                <span key={b} className="chip bg-white/8 border border-white/15 text-primary-200 text-[10px]">{b}</span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-2 mt-6">
              {[
                { label: 'Facebook',  Icon: Share2,         href: SITE.facebook },
                { label: 'Instagram', Icon: Camera,         href: SITE.instagram },
                { label: 'WhatsApp',  Icon: MessageCircle,  href: `https://wa.me/${SITE.whatsapp}` },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 grid place-items-center hover:bg-white/15 hover:border-white/20 transition"
                >
                  <Icon className="w-4 h-4 text-primary-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent-400 mb-5">
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={`${heading}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-200/70 hover:text-white transition flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.label !== 'Contact' && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="py-8 grid md:grid-cols-3 gap-5 border-b border-white/8 text-sm">
          {[
            {
              Icon: MapPin,
              label: 'Adresse',
              value: SITE.address,
              href: SITE.addressUrl,
            },
            {
              Icon: Phone,
              label: 'Téléphone',
              value: `${SITE.phone} · ${SITE.phone2}`,
              href: `tel:${SITE.phone}`,
            },
            {
              Icon: Mail,
              label: 'Email',
              value: SITE.email,
              href: `mailto:${SITE.email}`,
            },
          ].map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-start gap-3 group hover:text-white transition"
            >
              <span className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 grid place-items-center shrink-0 group-hover:bg-accent-500/20 group-hover:border-accent-500/30 transition">
                <Icon className="w-4 h-4 text-primary-300" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-primary-400 font-semibold">{label}</span>
                <span className="block text-primary-200/80 group-hover:text-white transition mt-0.5">{value}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-400/60">
          <p>© {new Date().getFullYear()} EEMCI Meknès — Tous droits réservés.</p>
          <p>École Européenne de Management, Commerce & IT et d'Hôtellerie & Tourisme</p>
        </div>
      </div>
    </footer>
  );
}
