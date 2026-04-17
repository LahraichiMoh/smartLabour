import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  IconShield,
  IconZap,
  IconUsers,
  IconAward,
  IconTrendingUp,
  IconBriefcase,
  IconMail,
  IconPhone,
  IconMapPin,
  IconChevronUp,
  IconArrowRight,
  IconTrading,
  IconCustom,
  IconConstruction,
  IconRecruitment,
} from "@/components/SvgIcons";

/**
 * Smart Labour - Premium Mobile-First One-Page Website
 * Design Philosophy: Modern Minimalism with Premium Glassmorphism
 * Mobile-First Responsive Design with Custom SVG Icons
 */

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [aboutAnimated, setAboutAnimated] = useState(false);
  const [stats, setStats] = useState({ experience: 0, projects: 0, clients: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("about");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setAboutAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!aboutAnimated) return;
    const interval = setInterval(() => {
      setStats((prev) => ({
        experience: Math.min(prev.experience + 1, 4),
        projects: Math.min(prev.projects + 5, 150),
        clients: Math.min(prev.clients + 2, 100),
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [aboutAnimated]);

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form submitted:", data);
    reset();
    alert("Merci! Votre message a été envoyé avec succès.");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#0099CC]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#003366]/15 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#CCFF00]/15 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 md:px-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-center items-center">
              <motion.button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="flex items-center"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src="/logo%20smart%20labour.png"
                  alt="Smart Labour"
                  className="h-12 sm:h-14 md:h-16 w-auto"
                  loading="eager"
                  decoding="async"
                />
              </motion.button>
            </div>
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-black/5">
              <div
                className="h-full w-full origin-left bg-gradient-to-r from-[#CCFF00] via-[#0099CC] to-[#003366]"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6 md:px-8"
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div
              className="space-y-5 sm:space-y-6 md:space-y-7"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs text-gray-700">
                  <span className="h-2 w-2 rounded-full bg-[#CCFF00]" />
                  Casablanca, Maroc
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/40 text-xs text-gray-700">
                  <span className="h-2 w-2 rounded-full bg-[#0099CC]" />
                  Négoce • Services • Construction • Recrutement
                </span>
              </motion.div>

              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" variants={itemVariants}>
                <span className="text-[#003366]">Smart Labour</span>
                <br />
                <span className="bg-gradient-to-r from-[#003366] via-[#0099CC] to-[#0099CC] bg-clip-text text-transparent">
                  des solutions qui avancent vite
                </span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Un partenaire multisectoriel pour exécuter, livrer et sécuriser vos besoins opérationnels avec une approche claire, réactive et orientée résultat.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-1">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#003366] to-[#0099CC] hover:from-[#00284d] hover:to-[#00a6db] text-white px-6 py-3 text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0099CC]/10"
                  >
                    Parler à un expert
                    <IconArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection("services")}
                    className="w-full sm:w-auto border-[#0099CC]/30 bg-white/60 hover:bg-white/80 text-[#003366] px-6 py-3 text-sm md:text-base"
                  >
                    Voir nos domaines
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "Années", value: "4+" },
                  { label: "Projets", value: "120+" },
                  { label: "Satisfaction", value: "100%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 sm:p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl ring-1 ring-[#0099CC]/10"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-[#003366]">{item.value}</div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: IconShield, title: "Fiable", desc: "Process clair et suivi" },
                  { icon: IconZap, title: "Rapide", desc: "Réponse et exécution" },
                  { icon: IconUsers, title: "Expert", desc: "Équipes qualifiées" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-3 sm:p-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl ring-1 ring-[#0099CC]/10"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-[#0099CC] stroke-current" />
                        <div className="text-sm font-bold text-[#003366]">{item.title}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-56 sm:h-64 md:h-80 lg:h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-[#003366]/20 via-[#0099CC]/20 to-[#CCFF00]/15 rounded-3xl blur-2xl"
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-[#0099CC]/20" />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663231017387/ALETnczSC3E4RfYkCQaNAC/hero-geometric-abstract-TjzXLeTy3wYcAy8JQykfBc.webp"
                alt="Geometric abstract background"
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl"
              />
              <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 grid grid-cols-2 gap-2">
                {[
                  { icon: IconTrading, label: "Négoce général" },
                  { icon: IconCustom, label: "Prestations sur mesure" },
                  { icon: IconConstruction, label: "Travaux & construction" },
                  { icon: IconRecruitment, label: "Recrutement" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 px-3 py-2 ring-1 ring-[#0099CC]/10"
                    >
                      <Icon className="w-5 h-5 text-[#003366] stroke-current" />
                      <div className="text-[11px] sm:text-xs font-semibold text-[#003366] leading-tight">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <motion.div
                className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-[#CCFF00]/50 blur-sm"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 h-14 w-14 rounded-full bg-[#0099CC]/35 blur-sm"
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Scroll to explore</p>
              <div className="w-5 h-8 border-2 border-[#003366] rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-1.5 bg-[#0099CC] rounded-full mt-1.5"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-10 md:mb-12 lg:mb-16">
            {/* About Text */}
            <motion.div
              className="space-y-4 sm:space-y-5 md:space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                À propos de <span className="text-[#003366]">Smart Labour</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Une expertise reconnue au service de votre réussite depuis plus de 7 ans.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Smart Labour s'impose comme un partenaire de confiance dans quatre domaines d'excellence : le négoce général, les prestations de services diversifiées, les travaux de construction et l'intérim-recrutement.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Notre approche se distingue par une compréhension approfondie des enjeux de nos clients et une capacité d'adaptation qui nous permet de proposer des solutions sur mesure, efficaces et durables.
              </p>
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              className="space-y-4 md:space-y-5 lg:space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Mission Card */}
              <motion.div
                className="p-4 sm:p-5 md:p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Notre mission
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Transformer vos défis en opportunités grâce à notre expertise multisectorielle.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#003366]/10 to-[#0099CC]/10 backdrop-blur-md border border-[#0099CC]/15 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Notre vision
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Être le partenaire privilégié des entreprises visionnaires en créant de la valeur authentique et pérenne.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { value: stats.experience, label: "Années d'expérience", icon: IconTrendingUp },
              { value: stats.projects, label: "Projets réalisés", icon: IconBriefcase },
              { value: stats.clients, label: "% Satisfaction", icon: IconAward },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-3 sm:p-4 md:p-5 bg-white/60 backdrop-blur-md border border-white/40 rounded-lg md:rounded-xl text-center hover:shadow-lg transition-shadow ring-1 ring-[#0099CC]/10"
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#0099CC] mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003366] mb-1">
                    {stat.value}
                    {stat.label.includes("Années") ? "+" : stat.label.includes("Satisfaction") ? "%" : "+"}
                  </div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nos domaines d'<span className="text-[#003366]">expertise</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Quatre piliers d'excellence pour accompagner votre croissance et vos ambitions.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                number: "01",
                title: "Négoce général",
                description: "Solutions commerciales complètes et distribution spécialisée.",
                icon: IconTrading,
              },
              {
                number: "02",
                title: "Prestations diverses",
                description: "Services sur mesure adaptés à vos besoins spécifiques.",
                icon: IconCustom,
              },
              {
                number: "03",
                title: "Travaux & Construction",
                description: "Expertise complète du bâtiment et des constructions.",
                icon: IconConstruction,
              },
              {
                number: "04",
                title: "Intérim & Recrutement",
                description: "Solutions RH personnalisées pour vos besoins en personnel.",
                icon: IconRecruitment,
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  className="group p-4 sm:p-5 md:p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-lg md:rounded-xl hover:shadow-xl transition-all duration-300 ring-1 ring-[#0099CC]/10"
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    backgroundColor: "rgba(0, 153, 204, 0.06)",
                    borderColor: "rgba(0, 153, 204, 0.25)",
                  }}
                >
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="text-xs font-bold text-[#003366] bg-[#CCFF00]/25 px-2 py-1 rounded-full">
                      {service.number}
                    </div>
                  </div>
                  <Icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#0099CC] mb-3 sm:mb-4 group-hover:scale-110 transition-transform stroke-current" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Pourquoi nous <span className="text-[#003366]">choisir</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Les avantages qui font la différence pour votre entreprise.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: IconShield,
                title: "Fiabilité",
                description: "Partenaire de confiance avec 4+ ans d'expérience",
              },
              {
                icon: IconZap,
                title: "Efficacité",
                description: "Solutions rapides et adaptées à vos besoins",
              },
              {
                icon: IconUsers,
                title: "Expertise",
                description: "Équipe d'experts passionnés et qualifiés",
              },
              {
                icon: IconAward,
                title: "Qualité",
                description: "100% satisfaction client garantie",
              },
              {
                icon: IconTrendingUp,
                title: "Croissance",
                description: "Accompagnement de votre développement",
              },
              {
                icon: IconBriefcase,
                title: "Multisectoriel",
                description: "Expertise dans 4 domaines clés",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-4 sm:p-5 md:p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-lg md:rounded-xl hover:shadow-lg transition-all ring-1 ring-[#0099CC]/10"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#0099CC] mb-3 sm:mb-4 stroke-current" />
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white/60 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              La différence <span className="text-[#003366]">Smart Labour</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Un style de collaboration simple, transparent et orienté livraison.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote:
                  "Réactivité et clarté. On avance vite, avec un suivi structuré et des livrables propres.",
                name: "Direction opérationnelle",
                sector: "Services",
              },
              {
                quote:
                  "Bonne capacité d’adaptation. Les solutions proposées étaient réalistes et efficaces sur le terrain.",
                name: "Chef de projet",
                sector: "Construction",
              },
              {
                quote:
                  "Un partenaire fiable: communication directe, délais respectés, et une vraie culture du résultat.",
                name: "Responsable achats",
                sector: "Négoce",
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="p-5 sm:p-6 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl ring-1 ring-[#0099CC]/10 shadow-sm hover:shadow-lg transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-semibold text-[#003366] bg-[#CCFF00]/25 px-3 py-1 rounded-full">
                    {t.sector}
                  </div>
                  <div className="h-2 w-10 rounded-full bg-gradient-to-r from-[#003366] to-[#0099CC]" />
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">“{t.quote}”</div>
                <div className="mt-5 pt-4 border-t border-gray-200/60 text-xs text-gray-500">{t.name}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Devis rapide",
                text: "Une réponse claire et actionnable, sans blabla.",
              },
              {
                title: "Exécution cadrée",
                text: "Planning, coordination et points de suivi réguliers.",
              },
              {
                title: "Qualité & sécurité",
                text: "Standards pro, contrôle et transparence sur les risques.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="p-4 sm:p-5 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl ring-1 ring-[#0099CC]/10"
              >
                <div className="text-sm font-bold text-[#003366]">{item.title}</div>
                <div className="text-xs text-gray-600 mt-1">{item.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Questions <span className="text-[#003366]">fréquentes</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Les réponses simples aux sujets qui reviennent le plus.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl ring-1 ring-[#0099CC]/10 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "Quels secteurs couvrez-vous ?",
                  a: "Nous intervenons sur le négoce général, des prestations sur mesure, les travaux & construction, ainsi que l’intérim et recrutement selon le besoin.",
                },
                {
                  q: "Comment se déroule une demande de devis ?",
                  a: "Vous décrivez votre besoin. Nous vous envoyons une proposition claire (périmètre, délai, budget) puis nous lançons l’exécution avec un suivi régulier.",
                },
                {
                  q: "Travaillez-vous uniquement à Casablanca ?",
                  a: "Nous sommes basés à Casablanca, et nous pouvons intervenir selon le projet et la logistique.",
                },
                {
                  q: "Quels sont vos délais de réponse ?",
                  a: "En général, nous répondons rapidement avec un premier retour et un cadrage du besoin. Les délais exacts dépendent du périmètre et de l’urgence.",
                },
              ].map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-[#003366]">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Parlons de votre <span className="text-[#003366]">projet</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous accompagner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 md:mb-10 lg:mb-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-4 sm:space-y-5 md:space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: IconMail,
                  label: "Email",
                  value: "info.smartlabour@gmail.com",
                },
                {
                  icon: IconPhone,
                  label: "Téléphone",
                  value: "+212 660 63 71 37",
                },
                {
                  icon: IconMapPin,
                  label: "Adresse",
                  value: "Casablanca, Maroc",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="p-4 sm:p-5 md:p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-lg md:rounded-xl hover:shadow-lg transition-all ring-1 ring-[#0099CC]/10"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0099CC] stroke-current" />
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900">{item.label}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 ml-7 sm:ml-8">{item.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="md:col-span-2 space-y-3 sm:space-y-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Prénom *"
                    {...register("firstName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nom *"
                    {...register("lastName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  {...register("email")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  {...register("phone")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition"
                />
                <input
                  type="text"
                  placeholder="Entreprise"
                  {...register("company")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition"
                />
              </div>

              <div>
                <textarea
                  placeholder="Décrivez votre projet ou vos besoins... *"
                  rows={4}
                  {...register("message")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-white/60 backdrop-blur-md border border-white/40 rounded-lg focus:outline-none focus:border-[#0099CC] focus:ring-2 focus:ring-[#0099CC]/20 transition resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#003366] to-[#0099CC] hover:from-[#00284d] hover:to-[#00a6db] text-white font-bold py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm shadow-lg shadow-[#0099CC]/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer le message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <img
                  src="/logo%20smart%20labour.png"
                  alt="Smart Labour"
                  className="h-7 w-auto"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#0099CC] to-[#CCFF00] bg-clip-text text-transparent">
                  Smart Labour
                </h3>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Votre partenaire de confiance pour le négoce général, les prestations diverses, la construction et le recrutement.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                {["about", "services", "why-us", "contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="hover:text-[#0099CC] transition"
                    >
                      {item === "why-us" ? "Pourquoi nous" : item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">Services</h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li>Négoce Général</li>
                <li>Prestations Diverses</li>
                <li>Travaux & Construction</li>
                <li>Intérim & Recrutement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-xs sm:text-sm">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li>info.smartlabour@gmail.com</li>
                <li>+212 660 63 71 37</li>
                <li>Casablanca, Maroc</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-gray-400 text-xs">
            <p>© 2024 Smart Labour. Tous droits réservés.</p>
          </div>
        </div>
      </motion.footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-30 bg-[#003366] hover:bg-[#00284d] text-white p-3 sm:p-4 rounded-full shadow-lg shadow-[#003366]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
