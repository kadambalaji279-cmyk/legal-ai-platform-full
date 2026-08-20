import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Scale as ScaleIcon,
  AlertTriangle,
  GitCompareArrows,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import GaugeRing from "../../components/GaugeRing";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Clause Classification",
    desc: "Auto-tag payment, penalty, termination & 4 more clause types.",
  },
  {
    icon: TrendingUp,
    title: "Risk Analysis",
    desc: "0-100 composite score with Low/Med/High/Critical bands.",
  },
  {
    icon: ScaleIcon,
    title: "Fairness Score",
    desc: "Rights vs obligations balance between both parties.",
  },
  {
    icon: AlertTriangle,
    title: "Missing Clause Detection",
    desc: "Flags mandatory clauses absent from the document.",
  },
  {
    icon: MessageSquare,
    title: "Legal Q&A",
    desc: "Ask questions, get answers grounded in your document.",
  },
  {
    icon: GitCompareArrows,
    title: "Agreement Comparison",
    desc: "Side-by-side diff between two contract versions.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-navy">
        <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-royal/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Final Year AI Research Platform
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
              AI-Powered Legal
              <br />
              Intelligence
              <br />
              &amp; Citizen
              <br />
              Assistance
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-300 sm:text-xl">
              Making legal documents understandable for every citizen —
              upload any agreement and get risk, fairness &amp; plain-language
              answers in seconds.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/upload" variant="teal">
                <Upload size={18} /> Upload Document
              </Button>
              <Button as={Link} to="/qa" variant="translucent">
                <MessageSquare size={18} /> Try Demo
              </Button>
              <Button as={Link} to="/login" variant="outlineDark">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl ring-1 ring-black/5 transition-shadow hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.35)]">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-navy">
                  Rental_Agreement.pdf
                </p>
                <span className="rounded-full bg-brandgreen/10 px-3 py-1 text-xs font-semibold text-brandgreen">
                  Analysed
                </span>
              </div>

              <div className="mt-7 flex items-center justify-center gap-10">
                <GaugeRing value={78} label="Risk" color="#EF4444" size={116} />
                <GaugeRing value={35} label="Fair" color="#F59E0B" size={116} />
              </div>

              <p className="mt-9 text-center text-sm text-slate-500">
                3 clauses missing · 12 classified
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">
            Everything a citizen needs to review a legal document
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Six AI modules working together in one pipeline
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group cursor-default rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-royal/30 hover:shadow-xl hover:shadow-royal/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
