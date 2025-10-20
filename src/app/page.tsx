"use client";
import React from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const BackgroundFX = dynamic(() => import("./BackgroundFX"), { ssr: false });
const ParallaxProvider = dynamic(
  () => import("react-scroll-parallax").then(m => m.ParallaxProvider),
  { ssr: false }
);

const SectionHeader = ({
  id,
  title,
  subtitle,
  accent = "indigo",
  icon,
  titleClassName,
}: {
  id: string;
  title: string;
  subtitle?: string;
  accent?: "indigo" | "cyan" | "amber" | "emerald";
  icon?: React.ReactNode;
  titleClassName?: string;
}) => {
  // Palete po akcentu
  const gradient: Record<string, string> = {
    indigo: "from-indigo-400 via-sky-400 to-cyan-400",
    cyan: "from-cyan-400 via-teal-300 to-emerald-300",
    amber: "from-amber-300 via-orange-300 to-rose-300",
    emerald: "from-emerald-300 via-teal-300 to-cyan-300",
  };

  const ringBg: Record<string, string> = {
    indigo: "bg-indigo-500/15",
    cyan: "bg-cyan-400/15",
    amber: "bg-amber-400/15",
    emerald: "bg-emerald-400/15",
  };

  const textAccent: Record<string, string> = {
    indigo: "text-indigo-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
  };

  return (
    <header id={id} className="relative mb-16 text-center">
      {/* dekor pozadina — stabilna, bez random-a (hydration-safe) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className={`absolute -top-10 -left-10 h-28 w-28 rounded-full blur-2xl ${ringBg[accent]}`} />
        <div className={`absolute -bottom-10 -right-12 h-28 w-28 rounded-full blur-2xl ${ringBg[accent]}`} />
      </div>

      
      {/* naslov: gradient by default, ili custom klasa ako proslediš titleClassName */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={
          titleClassName
            ? `mt-4 text-3xl md:text-4xl font-semibold tracking-tight ${titleClassName}`
            : `mt-4 text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r ${gradient[accent]} bg-clip-text text-transparent`
        }
      >
        {title}
      </motion.h2>

      {/* ping tačkice za “život” */}
      <div className="relative mx-auto mt-2 h-0 w-0">
        <span className={`absolute -left-16 -top-2 h-2 w-2 rounded-full ${textAccent[accent]}/70 animate-ping`} />
        <span className={`absolute left-16 -top-1.5 h-1.5 w-1.5 rounded-full ${textAccent[accent]} animate-pulse`} />
      </div>

      {/* svetleća linija ispod naslova */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-4 h-[2px] w-44 origin-center rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      <div className={`mx-auto h-4 w-36 rounded-full blur-xl ${ringBg[accent]}`} />

      {/* podnaslov (opciono) */}
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-neutral-400">{subtitle}</p>
      ) : null}
    </header>
  );
};




const Tag = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-300">
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article
    className={
      "group rounded-2xl border border-neutral-800 p-6 bg-neutral-950/50 backdrop-blur " +
      "hover:border-neutral-600 transition " + className
    }
  >
    {children}
  </article>
);

const PROFESSIONAL_EXPERIENCE = [
  {
    role: "Full-Stack Software Developer",
    company: "Zagrebačka banka (UniCredit Group)",
    period: "Oct 2024 – Present",
    location: "Remote",
    bullets: [
      "Contributed to e-banking web application development (UI modernization + backend improvements).",
      "Focused on reliability and performance; improved user experience.",
    ],
    tech: ["Java", "JavaScript", "HTML", "CSS", "PostgreSQL", "Jira", "GitLab"],
  },
  {
    role: ".NET Developer",
    company: "Palace Agency",
    period: "Sep 2023 – Aug 2024",
    location: "Remote",
    bullets: [
      "Developing a real-estate web application (sales and rentals).",
      "Maintaining and extending backend services; migrating from legacy systems.",
    ],
    tech: ["C#/.NET", "EF", "PostgreSQL", "CI/CD", "Azure DevOps"],
  },
];

const INTERNSHIPS = [
  {
    role: "Full-Stack Software Developer",
    company: "Valcon (ex Hybrid IT)",
    period: "May 2023",
    bullets: [
      "Designed and implemented a library operations API.",
      "Set up CI/CD pipelines on Azure; collaborated in a team environment.",
    ],
    tech: ["C#/.NET", "EF", "Identity", "PostgreSQL", "CI/CD", "Azure", "Scrum"],
  },
  {
    role: ".NET Developer",
    company: "Vega IT",
    period: "Jan 2023",
    bullets: [
      "Web application for internal records and time management.",
      "Clean Architecture, TypeScript front-end, MS SQL database.",
    ],
    tech: ["C#/.NET", "EF", "React", "TypeScript", "MS SQL", "GitHub"],
  },
];

const PERSONAL_PROJECTS = [
  {
    title: "E-commerce application",
    description: "End-to-end e-commerce app (search, cart, checkout) focused on UI/UX.",
    tech: ["C#/.NET", "Angular", "PostgreSQL", "Docker", "GitHub"],
  },
  {
    title: "Blood transfusion center",
    description: "Centralized information system for a blood transfusion center with appointment scheduling.",
    tech: ["Java", "Spring Boot", "Angular", "MongoDB", "GitHub"],
  },
  {
    title: "Dislinkt",
    description: "LinkedIn-like web app: profiles, connections, posts; backend logic, user management, and relationships.",
    tech: ["C#/.NET", "Entity Framework", "React", "PostgreSQL", "GitHub"],
  },
  {
    title: "Private hospital (WPF)",
    description: "Desktop application for private hospital staff; simulation of real client requirements.",
    tech: ["WPF", "C#", "NoSQL", "GitHub"],
  },
  {
    title: "Cinema",
    description: "Online movie ticket reservation system.",
    tech: ["Java", "Spring Boot", "H2", "HTML", "CSS", "JavaScript", "GitHub"],
  },
  {
    title: "Supplement store",
    description: "Online store for health and training supplements.",
    tech: ["C#/.NET", "EF", "React", "PostgreSQL", "GitHub"],
  },
];

import {
  FaReact,
  FaAngular,
  FaDocker,
  FaJava,
  FaGithub,
  FaGitlab,
  FaMicrosoft,
  FaDatabase,
  FaCloud,
  FaCode,
  FaKey,
  FaCogs,
  FaUsers,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaWindows,
  FaDownload,
  FaEnvelope,
  FaLinkedin,
  FaPhone,
  FaLanguage,
  FaSchool,
  FaUniversity,
  FaGraduationCap,
} from "react-icons/fa";
import { RiLeafLine } from "react-icons/ri";
import NavBar from "./NavBar";
import dynamic from "next/dynamic";
import { Parallax } from "react-scroll-parallax";


const ALL_PROJECT_TECHS = Array.from(
  new Set([
    ...PERSONAL_PROJECTS.flatMap((p) => p.tech),
    ...PROFESSIONAL_EXPERIENCE.flatMap((e) => e.tech),
    ...INTERNSHIPS.flatMap((i) => i.tech),
  ])
);

const TECH_ICONS: Record<string, React.ReactNode> = {
  // Core stacks
  "C#/.NET": <FaCode className="text-indigo-400 text-xl" />,
  ".NET": <FaCode className="text-indigo-400 text-xl" />,
  "C#": <FaCode className="text-indigo-400 text-xl" />,

  Angular: <FaAngular className="text-red-500 text-xl" />,
  React: <FaReact className="text-cyan-400 text-xl" />,

  HTML: <FaHtml5 className="text-orange-500 text-xl" />,
  CSS: <FaCss3Alt className="text-blue-500 text-xl" />,
  JavaScript: <FaJsSquare className="text-yellow-400 text-xl" />,

  PostgreSQL: <FaDatabase className="text-blue-400 text-xl" />,
  "MS SQL": <FaDatabase className="text-red-400 text-xl" />,
  MongoDB: <FaDatabase className="text-green-400 text-xl" />,

  Docker: <FaDocker className="text-blue-300 text-xl" />,
  Java: <FaJava className="text-orange-400 text-xl" />,
  "Spring Boot": <RiLeafLine className="text-green-500 text-xl" />,

  TypeScript: <FaCode className="text-blue-500 text-xl" />,
  "Entity Framework": <FaDatabase className="text-emerald-400 text-xl" />,
  Identity: <FaKey className="text-amber-400 text-xl" />,
  "CI/CD": <FaCogs className="text-gray-300 text-xl" />,
  Scrum: <FaUsers className="text-gray-400 text-xl" />,

  Azure: <FaCloud className="text-sky-400 text-xl" />,
  "Azure DevOps": <FaCloud className="text-sky-400 text-xl" />,

  WPF: <FaWindows className="text-blue-400 text-xl" />,
  GitHub: <FaGithub className="text-gray-200 hover:text-white transition text-xl" />,
  GitLab: <FaGitlab className="text-orange-400 text-xl" />,

  NoSQL: <FaDatabase className="text-neutral-400 text-xl" />,
};

const LANGUAGES = [
  { name: "Serbian", level: "Native" },
  { name: "English", level: "Communicative, Writing" },
];

const EDUCATION = [
  {
    school: "Gimnazija Kraljevo",
    degree: "High School · Mathematics",
    period: "2014 — 2018",
    icon: "school",
  },
  {
    school: "Faculty of Technical Sciences, University of Novi Sad",
    degree: "Software Engineering and Data Science",
    period: "2018 — 2023",
    icon: "university",
  },
];

const ACCENTS = {
  experience: "indigo-400",
  internships: "cyan-400",
  projects: "amber-400",
};

function EducationItem({
  item,
}: {
  item: (typeof EDUCATION)[number];
}) {
  const Ico =
    item.icon === "school"
      ? FaSchool
      : item.icon === "university"
      ? FaUniversity
      : FaGraduationCap;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6 text-center hover:border-neutral-600 transition">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/5">
        <Ico className="text-neutral-200" />
      </div>
      <h3 className="text-lg font-medium text-neutral-100">{item.school}</h3>
      <p className="mt-1 text-neutral-300">{item.degree}</p>
      {item.period !== "—" ? (
        <p className="mt-1 text-sm text-neutral-400">{item.period}</p>
      ) : null}
    </div>
  );
}


function LanguagesList({ items }: { items: { name: string; level: string }[] }) {
  return (
    <div className="mt-10 mx-auto max-w-3xl">
      <div className="flex items-center justify-center gap-2 text-neutral-200">
        <FaLanguage className="text-xl" />
        <span className="uppercase tracking-widest text-sm text-neutral-300">Languages</span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((l) => (
          <div
            key={l.name}
            className="flex items-center justify-between rounded-xl border border-neutral-800 hover:border-neutral-600 transition bg-neutral-900/50 px-4 py-3 text-sm text-neutral-200"
          >
            <span className="font-medium">{l.name}</span>
            <span className="text-neutral-400">{l.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStackGrid({ techs }: { techs: string[] }) {
  return (
    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-4 place-items-center">
      {techs.map((t) => (
        <div key={t} className="flex flex-col items-center gap-1.5">
          <div
            className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-600 transition hover:scale-110"
            title={t}
          >
            {TECH_ICONS[t] || (
              <span className="text-[10px] text-neutral-400 px-1 text-center">{t}</span>
            )}
          </div>
          <span className="text-[11px] text-neutral-400">{t}</span>
        </div>
      ))}
    </div>
  );
}




function TechRow({ stack }: { stack: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {stack.map((tech) => (
        <div
          key={tech}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 hover:border-neutral-600 transition"
          title={tech}
        >
          {TECH_ICONS[tech] || <span className="text-xs text-neutral-400">{tech}</span>}
        </div>
      ))}
    </div>
  );
}



function ExperienceItem({ item }: { item: (typeof PROFESSIONAL_EXPERIENCE)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
      <h3 className="text-xl font-medium">
        <span className="transition-colors group-hover:text-indigo-400">{item.role}</span>
        {" · "}
        <span className="text-neutral-300 transition-colors group-hover:text-indigo-400">
          {item.company}
        </span>
      </h3>
      <p className="text-sm text-neutral-400">{item.period}{item.location ? ` · ${item.location}` : ""}</p>
      <ul className="mt-4 list-disc list-inside text-neutral-300 space-y-2 inline-block text-left">
        {item.bullets.map((b, i) => (<li key={i}>{b}</li>))}
      </ul>
      <TechRow stack={item.tech} />
    </Card>
    </motion.div>
  );
}

function InternshipItem({ item }: { item: (typeof INTERNSHIPS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <h3 className="text-xl font-medium">
          <span className="transition-colors group-hover:text-cyan-400">{item.role}</span>
          {" · "}
          <span className="text-neutral-300 transition-colors group-hover:text-cyan-400">
            {item.company}
          </span>
        </h3>
        <p className="text-sm text-neutral-400">{item.period}</p>
        <ul className="mt-4 list-disc list-inside text-neutral-300 space-y-2 inline-block text-left">
          {item.bullets.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
        <TechRow stack={item.tech} />
      </Card>
    </motion.div>
  );
}

function ProjectCard({ p }: { p: { title: string; description: string; tech: string[] } }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl border border-neutral-800 p-6 hover:border-neutral-600 transition bg-neutral-950/50 text-center"
    >
      <h3 className="text-xl font-medium transition-colors group-hover:text-amber-400">
        {p.title}
      </h3>
      <p className="text-neutral-400 mt-2">{p.description}</p>
      <TechRow stack={p.tech} />
    </motion.article>
  );
}

export default function Home() {
  return (
    <ParallaxProvider>
      <NavBar />
      <main className="relative overflow-hidden text-center">
        {/* Background bokeh circles with parallax */}
        <BackgroundFX />
        <Parallax speed={-10}>
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 60%)" }}
          />
        </Parallax>
        <Parallax speed={-6}>
          <div
            className="pointer-events-none absolute top-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-25"
            style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 60%)" }}
          />
        </Parallax>

        {/* Hero */}
        <section className="min-h-screen grid place-items-center px-6">
          <div className="max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              Hello, I&apos;m <span className="text-indigo-400">Aleksa</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 text-lg text-neutral-200"
            >
              SOFTWARE DEVELOPER
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-neutral-300"
            >
              Innovative Full Stack Developer passionate about creating seamless and impactful web solutions.
              Eager to leverage modern technologies to solve real-world problems and contribute to dynamic team environments.
            </motion.p>
            {/* Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8 }}
              className="mt-6 flex justify-center"
            >
              <a
                href="/Aleksa Mihic CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-900/50 px-5 py-3 text-sm text-neutral-200 hover:border-neutral-500 hover:text-white hover:bg-neutral-900 transition shadow-sm"
                aria-label="Download CV"
              >
                <FaDownload aria-hidden="true" className="text-base" />
                <span>Download CV</span>
              </a>
            </motion.div>

          </div>
        </section>

        {/* PROFESSIONAL EXPERIENCE */}
        <section className="px-6 py-24 scroll-mt-24 md:scroll-mt-28" id="experience">
          <SectionHeader
            id="professional-experience"
            title="PROFESSIONAL EXPERIENCE"
            accent="indigo"
            icon={<span>💼</span>}
            titleClassName="text-indigo-500"
          />
          <div className="grid gap-6 place-items-center">
            {PROFESSIONAL_EXPERIENCE.map((item) => (
              <ExperienceItem key={item.company + item.period} item={item} />
            ))}
          </div>
        </section>

        {/* Separator */}
        <Parallax speed={8}>
          <div className="h-24 bg-gradient-to-r from-indigo-600/20 to-cyan-400/20" />
        </Parallax>

        {/* INTERNSHIPS */}
        <section className="px-6 py-24 scroll-mt-24 md:scroll-mt-28" id="internships">
          <SectionHeader
            id="internships-head"
            title="INTERNSHIPS"
            accent="cyan"
            icon={<span>🧪</span>}
          />
          <div className="grid gap-6 place-items-center">
            {INTERNSHIPS.map((item) => (
              <InternshipItem key={item.company + item.period} item={item} />
            ))}
          </div>
        </section>

        {/* Separator */}
        <Parallax speed={8}>
          <div className="h-24 bg-gradient-to-r from-indigo-600/20 to-cyan-400/20" />
        </Parallax>

        {/* PERSONAL PROJECTS */}
        <section className="px-6 py-24 scroll-mt-24 md:scroll-mt-28" id="projects">
          <SectionHeader
            id="personal-projects"
            title="PERSONAL PROJECTS"
            accent="amber"
            icon={<span>✨</span>}
          />
          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
            {PERSONAL_PROJECTS.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Separator */}
        <Parallax speed={8}>
          <div className="h-24 bg-gradient-to-r from-indigo-600/20 to-cyan-400/20" />
        </Parallax>

        {/* TECH STACK */}
        <section className="px-6 py-24" id="tech-stack">
          <SectionHeader
            id="tech-stack-head"
            title="TECH STACK"
            subtitle="Technologies I frequently use across my personal projects."
            accent="emerald"
            icon={<span>🧰</span>}
          />
          <TechStackGrid techs={ALL_PROJECT_TECHS} />
        </section>

        {/* Separator */}
        <Parallax speed={8}>
          <div className="h-24 bg-gradient-to-r from-indigo-600/20 to-cyan-400/20" />
        </Parallax>

        {/* EDUCATION */}
        <section className="px-6 py-24 scroll-mt-24 md:scroll-mt-28" id="education">
          <SectionHeader
            id="education-head"
            title="EDUCATION"
            subtitle="Formal education and field of study."
            accent="indigo"
            icon={<FaGraduationCap />}
          />
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {EDUCATION.map((e) => (
              <EducationItem key={e.school} item={e} />
            ))}
          </div>
          <LanguagesList items={LANGUAGES} />
        </section>

        {/* Separator */}
        <Parallax speed={8}>
          <div className="h-24 bg-gradient-to-r from-indigo-600/20 to-cyan-400/20" />
        </Parallax>

        {/* Contact */}
        <section id="contact" className="min-h-[50vh] px-6 py-24 text-center">
          <SectionHeader
            id="contact-head"
            title="CONTACT"
            subtitle="Let&apos;s build something great."
            accent="emerald"
            icon={<span>📬</span>}
          />

          <div className="mt-6 flex items-center justify-center gap-4">
            {/* Email */}
            <a
              href="mailto:amihickv@gmail.com"
              title="Email"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/90 hover:bg-amber-400 text-white transition"
            >
              <FaEnvelope className="text-xl" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/aleksa-mihic-355b7a1a1/"
              target="_blank"
              title="LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] hover:bg-[#3c86d1] text-white transition"
            >
              <FaLinkedin className="text-xl" />
            </a>
            {/* Phone */}
            <a
              href="tel:+381645051104"
              aria-label="Call me"
              title="+381 64 5051 104"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:text-white hover:border-white/20 hover:bg-white/10 backdrop-blur transition"
            >
              <FaPhone className="text-xl" />
            </a>
          </div>
        </section>

      </main>
    </ParallaxProvider>
  );
}