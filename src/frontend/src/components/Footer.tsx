import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

const SOCIAL_LINKS = [
  { Icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: SiX, label: "X (Twitter)", href: "https://x.com" },
  { Icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're subscribed!", {
        description: "Welcome to the LUXE community.",
      });
      setEmail("");
    }
  };

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "All Products", to: "/products" },
        { label: "Electronics", to: "/products" },
        { label: "Fashion", to: "/products" },
        { label: "Sports", to: "/products" },
        { label: "Beauty", to: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Careers", to: "/about" },
        { label: "Press", to: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", to: "/contact" },
        { label: "Shipping", to: "/contact" },
        { label: "Returns", to: "/contact" },
        { label: "Track Order", to: "/account" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Account", to: "/account" },
        { label: "Orders", to: "/account" },
        { label: "Wishlist", to: "/wishlist" },
        { label: "Cart", to: "/cart" },
      ],
    },
  ];

  return (
    <footer
      className="border-t mt-20"
      style={{
        background: "linear-gradient(180deg, #06000f 0%, #020008 100%)",
        borderColor: "rgba(147, 51, 234, 0.5)",
        borderTopWidth: "2px",
        boxShadow: "0 -2px 40px rgba(147, 51, 234, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl font-black tracking-wider">
                LU<span className="gradient-text">XE</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Premium products curated for the discerning shopper. Quality,
              style, and innovation delivered to your door.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-border/50 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none focus:border-luxe-cyan/50 transition-colors"
                data-ocid="footer.input"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-luxe-cyan/20 text-luxe-cyan border border-luxe-cyan/30 hover:bg-luxe-cyan/30 transition-all"
                data-ocid="footer.submit_button"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxe-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-muted-foreground hover:text-luxe-cyan hover:bg-luxe-cyan/10 transition-all"
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
