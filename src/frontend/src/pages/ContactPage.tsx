import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 px-4 pb-16" data-ocid="contact.page">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl font-black uppercase text-foreground">
            Contact Us
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Have a question or need help? Our team is here to assist you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-5">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: "350 Fifth Avenue, New York, NY 10118",
              },
              { icon: Phone, label: "Phone", value: "+1 (800) LUXE-999" },
              { icon: Mail, label: "Email", value: "support@luxestore.com" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 flex items-start gap-4"
                data-ocid={`contact.card.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-xl bg-luxe-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-luxe-cyan" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm text-foreground font-medium">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-3xl p-8 space-y-5"
            data-ocid="contact.panel"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="c-name"
                  className="block text-sm font-semibold text-foreground mb-1.5"
                >
                  Full Name
                </label>
                <Input
                  id="c-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  required
                  className="bg-white/5 border-border/50"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="c-email"
                  className="block text-sm font-semibold text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                  required
                  className="bg-white/5 border-border/50"
                  data-ocid="contact.input"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="c-subject"
                className="block text-sm font-semibold text-foreground mb-1.5"
              >
                Subject
              </label>
              <Input
                id="c-subject"
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="How can we help?"
                required
                className="bg-white/5 border-border/50"
                data-ocid="contact.input"
              />
            </div>
            <div>
              <label
                htmlFor="c-message"
                className="block text-sm font-semibold text-foreground mb-1.5"
              >
                Message
              </label>
              <Textarea
                id="c-message"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us more..."
                rows={5}
                required
                className="bg-white/5 border-border/50 resize-none"
                data-ocid="contact.textarea"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={sending || sent}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
              data-ocid="contact.submit_button"
            >
              {sending ? (
                <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : sent ? (
                <>✓ Sent!</>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
