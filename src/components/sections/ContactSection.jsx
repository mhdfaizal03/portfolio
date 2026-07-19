import React from 'react';
import { Phone, Mail, Linkedin, Github, Award, Check, Send, RefreshCw } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function ContactSection({
  formData,
  setFormData,
  errors,
  isSubmitting,
  handleContactSubmit,
  setIsHovering
}) {
  return (
    <section id="contact" className="py-28 px-6 bg-gradient-to-b from-transparent to-accent/5">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          subtitle="05 // DIALOG"
          title="Connect with Faizal"
          description="Have an opening, a freelance project, or just want to chat Flutter? Drop a message!"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Contact Information */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 border rounded-2xl space-y-4 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800">
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Direct Contact
              </h4>

              <div className="space-y-4 text-xs font-mono font-sans">
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-slate-600 dark:text-slate-300">+91 8075374600</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:mhdfaizalofficial@gmail.com" className="hover:underline cursor-pointer">
                    mhdfaizalofficial@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                  <Linkedin className="w-4 h-4 text-accent" />
                  <a
                    href="https://linkedin.com/in/mhdfaizal"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline cursor-pointer"
                  >
                    linkedin.com/in/mhdfaizal
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                  <Github className="w-4 h-4 text-accent" />
                  <a
                    href="https://github.com/mhdfaizal03"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline cursor-pointer"
                  >
                    github.com/mhdfaizal03
                  </a>
                </div>
              </div>
            </div>

            {/* Experience highlight card */}
            <div className="p-6 border rounded-2xl space-y-3 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800">
              <div className="flex items-center space-x-2 text-accent">
                <Award className="w-4 h-4" />
                <span className="text-xs uppercase font-mono font-bold">Hiring Highlights</span>
              </div>
              <ul className="text-xs space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Open to remote and hybrid positions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Able to join immediately</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>Advanced state architectures (BLoC / GetX)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={handleContactSubmit}
              className="border rounded-3xl p-6 sm:p-8 space-y-5 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Job Opening"
                  className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${
                    errors.subject
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                  }`}
                />
                {errors.subject && (
                  <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.subject}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">
                  Message Details
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Faizal, we would love to schedule a interview..."
                  className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                  }`}
                />
                {errors.message && (
                  <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.message}</span>
                )}
              </div>

              {/* Form state draft indicator */}
              {Object.values(formData).some((v) => v.length > 0) && (
                <span className="text-[9px] font-bold font-mono block flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>Changes saved as draft locally</span>
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50 text-slate-50 dark:text-slate-950"
                onMouseEnter={() => setIsHovering && setIsHovering(true)}
                onMouseLeave={() => setIsHovering && setIsHovering(false)}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting details...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
