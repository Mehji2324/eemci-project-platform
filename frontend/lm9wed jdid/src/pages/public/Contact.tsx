import { Section } from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, MessageCircle, Camera, Share2 } from 'lucide-react';
import { SITE } from '@/lib/data';

export default function Contact() {
  return (
    <Section eyebrow="Contact" title="Parlons de votre projet" lead="Notre équipe d'admission vous répond sous 24h ouvrées.">
      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={e=>{e.preventDefault(); alert('Message envoyé !');}}
          className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200/70">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nom complet" required />
            <Input label="Email" type="email" required />
          </div>
          <Input label="Téléphone" />
          <div>
            <label className="text-sm font-medium">Sujet</label>
            <select className="w-full h-11 px-4 mt-1.5 rounded-xl border border-slate-200 bg-white">
              <option>Information sur les programmes</option>
              <option>Admission</option>
              <option>Partenariat</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea rows={5} className="w-full mt-1.5 p-4 rounded-xl border border-slate-200 bg-white" />
          </div>
          <Button type="submit" size="lg" className="w-full">Envoyer le message</Button>
        </form>

        <div className="space-y-4">
          {/* Address */}
          <a href={SITE.addressUrl} target="_blank" rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl border border-slate-200/70 flex gap-4 hover:border-primary-300 transition group">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-ink-soft text-sm mt-1">{SITE.address}</p>
            </div>
          </a>

          {/* Phone */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200/70 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Téléphone</p>
              <p className="text-ink-soft text-sm mt-1 space-y-0.5">
                <a href={`tel:${SITE.phone}`} className="hover:text-primary-600 transition block">
                  {SITE.phone} <span className="text-xs text-ink-soft/50">(Fixe)</span>
                </a>
                <a href={`tel:${SITE.phone2}`} className="hover:text-primary-600 transition block">
                  {SITE.phone2} / {SITE.phone3} / {SITE.phone4} <span className="text-xs text-ink-soft/50">(Mobile)</span>
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <a href={`mailto:${SITE.email}`}
            className="p-6 bg-white rounded-2xl border border-slate-200/70 flex gap-4 hover:border-primary-300 transition">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-ink-soft text-sm mt-1">{SITE.email}</p>
            </div>
          </a>

          {/* Social quick links */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200/70 flex gap-3">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition">
              <Share2 className="w-4 h-4" /> Facebook
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-pink-50 text-pink-700 text-sm font-medium hover:bg-pink-100 transition">
              <Camera className="w-4 h-4" /> Instagram
            </a>
          </div>

          {/* Map embed */}
          <iframe
            title="Carte EEMCI Meknès"
            className="w-full h-72 rounded-2xl border border-slate-200/70"
            src="https://maps.google.com/maps?q=33.899212,-5.549426&t=m&z=16&output=embed&iwloc=near"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
