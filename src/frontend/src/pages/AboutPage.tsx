import { Award, Globe, Heart, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    desc: "LUXE was founded with a vision to curate the world's finest products in one premium destination.",
  },
  {
    year: "2020",
    title: "Going Global",
    desc: "Expanded to 30+ countries, bringing premium products to discerning shoppers worldwide.",
  },
  {
    year: "2022",
    title: "1 Million Customers",
    desc: "Reached our first million customers milestone. A testament to our commitment to quality and service.",
  },
  {
    year: "2024",
    title: "Tech Revolution",
    desc: "Launched AI-powered personalization, making product discovery smarter and more intuitive than ever.",
  },
  {
    year: "2026",
    title: "The Future",
    desc: "Pioneering the next era of premium commerce with immersive shopping experiences and AR technology.",
  },
];

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every product is vetted against our rigorous quality standards before it reaches your door.",
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "Your satisfaction drives every decision we make. We're here for you, always.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Premium products from around the world, delivered to your doorstep with care.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Constantly pushing boundaries with technology and design to enhance your experience.",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen" data-ocid="about.page">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0f14 0%, #0d1a2a 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(47,212,255,0.1) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-4">
              Our Story
            </p>
            <h1 className="font-display text-6xl font-black uppercase leading-[0.9] text-foreground mb-6">
              BORN FROM A
              <br />
              <span className="gradient-text">PASSION</span>
              <br />
              FOR QUALITY
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              LUXE was built on a simple belief: everyone deserves access to
              premium products that enhance their life. We scour the globe to
              bring you the extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section
        ref={timelineRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
            Our Journey
          </p>
          <h2 className="font-display text-4xl font-black uppercase text-foreground">
            Milestones
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-luxe-cyan/50 to-transparent" />
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              data-ocid={`about.item.${i + 1}`}
            >
              <div
                className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}
              >
                <span className="font-display text-5xl font-black text-luxe-cyan/20">
                  {m.year}
                </span>
                <h3 className="font-display text-xl font-black text-foreground">
                  {m.title}
                </h3>
                <p
                  className={`text-muted-foreground text-sm mt-1 max-w-xs ${i % 2 === 0 ? "ml-auto" : ""}`}
                >
                  {m.desc}
                </p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-luxe-cyan border-4 border-background" />
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section
        ref={valuesRef}
        className="py-20"
        style={{ background: "rgba(17, 27, 36, 0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <p className="text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              What We Stand For
            </p>
            <h2 className="font-display text-4xl font-black uppercase text-foreground">
              Our Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
                data-ocid={`about.card.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-luxe-cyan/10 flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-luxe-cyan" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
