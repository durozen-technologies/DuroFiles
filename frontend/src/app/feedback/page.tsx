"use client";

import { useState } from 'react';
import { Footer } from '../../components/Footer';
import { Star, Loader2, CheckCircle2, Sparkles, ThumbsUp } from 'lucide-react';

const EMOJI_REACTIONS = [
  { emoji: "😐", label: "Meh" },
  { emoji: "🙂", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😍", label: "Love it" },
  { emoji: "🤩", label: "Amazing!" },
];

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

export default function Feedback() {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_FEEDBACK_SCRIPT_URL || '';
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating, reaction: selectedEmoji !== null ? EMOJI_REACTIONS[selectedEmoji].label : '' }),
      });
      setSuccess(true);
      setFormData({ name: '', email: '', feedback: '' });
      setRating(0);
      setSelectedEmoji(null);
    } catch (err: any) {
      setError(err.message || 'Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-20 text-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-violet-100/50 dark:bg-violet-950/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-100/40 dark:bg-pink-950/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Share Your Feedback
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Help us improve DuroFiles! Your honest thoughts and feature requests shape what we build next.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 flex-1 flex items-start justify-center">
        <div className="w-full max-w-xl">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">

            {success ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You! 🎉</h4>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm max-w-xs leading-relaxed">
                  Your feedback has been received. We truly appreciate your help in making DuroFiles better!
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20"
                >
                  <ThumbsUp size={16} />
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Feedback Form</h2>
                  <p className="text-slate-400 dark:text-slate-500 text-sm">Tell us what you think or suggest a feature.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl border border-red-500/20 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Quick Emoji Reaction */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      How do you feel about DuroFiles?
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {EMOJI_REACTIONS.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedEmoji(selectedEmoji === idx ? null : idx)}
                          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                            selectedEmoji === idx
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105'
                          }`}
                        >
                          <span className="text-2xl leading-none">{item.emoji}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Rate your experience
                    </label>
                    <div className="flex gap-2 items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={34}
                          className="cursor-pointer transition-all duration-150 hover:scale-110 active:scale-95"
                          fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                          color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                      {rating > 0 && (
                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 ml-2">
                          {RATING_LABELS[rating]} ({rating}/5)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required type="text" value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name" className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required type="email" value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com" className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Feedback <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required value={formData.feedback}
                      onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                      placeholder="Share your thoughts, suggestions, or report any issues..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Submit Feedback'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
