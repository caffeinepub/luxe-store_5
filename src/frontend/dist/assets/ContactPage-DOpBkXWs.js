import { c as createLucideIcon, j as reactExports, q as jsxRuntimeExports, t as motion, I as Input, O as Send, F as ue } from "./index-KWc8MtR0.js";
import { T as Textarea } from "./textarea-1B8Jy0ND.js";
import { M as MapPin } from "./map-pin-nb4jmMoQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    ue.success("Message sent!", {
      description: "We'll get back to you within 24 hours."
    });
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen pt-28 px-4 pb-16", "data-ocid": "contact.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-12 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-luxe-cyan text-xs uppercase tracking-widest font-semibold mb-2", children: "Get In Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-black uppercase text-foreground", children: "Contact Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-md mx-auto", children: "Have a question or need help? Our team is here to assist you." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [
        {
          icon: MapPin,
          label: "Address",
          value: "350 Fifth Avenue, New York, NY 10118"
        },
        { icon: Phone, label: "Phone", value: "+1 (800) LUXE-999" },
        { icon: Mail, label: "Email", value: "support@luxestore.com" }
      ].map(({ icon: Icon, label, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.1 },
          className: "glass-card rounded-2xl p-5 flex items-start gap-4",
          "data-ocid": `contact.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-luxe-cyan/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-luxe-cyan" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-0.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: value })
            ] })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.form,
        {
          onSubmit: handleSubmit,
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "lg:col-span-2 glass-card rounded-3xl p-8 space-y-5",
          "data-ocid": "contact.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "c-name",
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    children: "Full Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "c-name",
                    value: form.name,
                    onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
                    placeholder: "John Doe",
                    required: true,
                    className: "bg-white/5 border-border/50",
                    "data-ocid": "contact.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "c-email",
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    children: "Email Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "c-email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => setForm((p) => ({ ...p, email: e.target.value })),
                    placeholder: "john@example.com",
                    required: true,
                    className: "bg-white/5 border-border/50",
                    "data-ocid": "contact.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "c-subject",
                  className: "block text-sm font-semibold text-foreground mb-1.5",
                  children: "Subject"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "c-subject",
                  value: form.subject,
                  onChange: (e) => setForm((p) => ({ ...p, subject: e.target.value })),
                  placeholder: "How can we help?",
                  required: true,
                  className: "bg-white/5 border-border/50",
                  "data-ocid": "contact.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "c-message",
                  className: "block text-sm font-semibold text-foreground mb-1.5",
                  children: "Message"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "c-message",
                  value: form.message,
                  onChange: (e) => setForm((p) => ({ ...p, message: e.target.value })),
                  placeholder: "Tell us more...",
                  rows: 5,
                  required: true,
                  className: "bg-white/5 border-border/50 resize-none",
                  "data-ocid": "contact.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                whileHover: { scale: 1.01 },
                whileTap: { scale: 0.99 },
                type: "submit",
                disabled: sending || sent,
                className: "w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60",
                "data-ocid": "contact.submit_button",
                children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" }) : sent ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✓ Sent!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
                  " Send Message"
                ] })
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
export {
  ContactPage as default
};
