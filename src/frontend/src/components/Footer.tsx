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
        background: "var(--footer-bg)",
        borderColor: "rgba(0, 255, 255, 0.3)",
        borderTopWidth: "2px",
        boxShadow:
          "0 -2px 40px rgba(0, 255, 255, 0.12), 0 -1px 0 rgba(255, 0, 255, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span
                className="font-display text-3xl font-black tracking-wider neon-pulse"
                style={{
                  textShadow:
                    "0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.25)",
                }}
              >
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
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all"
                style={{
                  borderColor: "rgba(0,255,255,0.2)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,255,255,0.6)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(0,255,255,0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,255,255,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-ocid="footer.input"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl border transition-all"
                style={{
                  background: "rgba(0,255,255,0.12)",
                  borderColor: "rgba(0,255,255,0.35)",
                  color: "#00ffff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(0,255,255,0.25)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 12px rgba(0,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(0,255,255,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
                data-ocid="footer.submit_button"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                className="font-display font-bold text-sm uppercase tracking-widest mb-4"
                style={{
                  color: "#00ffff",
                  textShadow: "0 0 8px rgba(0,255,255,0.4)",
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      style={{ textDecoration: "none" }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.textShadow = "0 0 8px rgba(0,255,255,0.6)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#00ffff";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.textShadow = "none";
                        (e.currentTarget as HTMLAnchorElement).style.color = "";
                      }}
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

        <div
          className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(0,255,255,0.15)" }}
        >
          <p className="text-sm text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{
                color: "#00ffff",
                textShadow: "0 0 6px rgba(0,255,255,0.5)",
              }}
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
                className="p-2 rounded-full text-muted-foreground transition-all"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#00ffff";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(0,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 10px rgba(0,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
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
