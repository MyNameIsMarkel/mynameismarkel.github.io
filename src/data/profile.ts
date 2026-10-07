/* ═══════════════════════════════════════════════════════════
   profile.ts — TODO el contenido del ABOUT ME / SOBRE MÍ
   Cada texto va en los dos idiomas:  L('español', 'english')
   Si un texto es igual en ambos (p.ej. "Python"), pon solo el string.
   ═══════════════════════════════════════════════════════════ */
import type { Localized } from '../i18n/ui';

const L = (es: string, en: string): Localized => ({ es, en });

type Color = 'red' | 'blue' | 'gold';
export interface Tag { text: Localized; color: Color }
/* Atajos para las etiquetas de color */
const red  = (text: Localized): Tag => ({ text, color: 'red' });
const blue = (text: Localized): Tag => ({ text, color: 'blue' });
const gold = (text: Localized): Tag => ({ text, color: 'gold' });

export interface Card { date: Localized; title: Localized; place: Localized; desc?: Localized; tags: Tag[] }

/* ─── Cabecera ──────────────────────────────────────────── */
export const HERO = {
  eyebrow: L('Portfolio personal', 'Personal Portfolio'),
  firstName: 'Markel',
  lastName: 'Iturbe',
  photo: '/images/profile.jpg',        // archivo en public/images/
  role: L(
    'Grado en Ciberseguridad y Técnico Superior en Administración de Sistemas Informáticos en Red.',
    "Bachelor's Degree in Cybersecurity & Higher Technician in Networked Computer Systems Administration.",
  ),
  bio: L(
    'Profesional de la ciberseguridad con experiencia práctica en pruebas de penetración, seguridad de dispositivos industriales (IEC 62443) y cumplimiento normativo (TISAX). Con formación en administración de sistemas y redes, actualmente finalizando el Grado en Ciberseguridad. Experiencia en análisis de brechas, evaluación de riesgos y gestión de auditorías, con un fuerte enfoque en unir la seguridad técnica y los marcos de cumplimiento. Apasionado por proteger entornos industriales y corporativos frente a amenazas en constante evolución.',
    "Cybersecurity professional with hands-on experience in penetration testing, industrial device security (IEC 62443), and regulatory compliance (TISAX). Background in systems and network administration, currently completing a Bachelor's Degree in Cybersecurity. Experienced in gap analysis, risk assessment, and audit management, with a strong focus on bridging technical security and compliance frameworks. Passionate about protecting industrial and corporate environments against evolving threats.",
  ),
};

/* ─── Enlaces (botones bajo la bio) ─────────────────────── */
export const LINKS = {
  github:     'https://github.com/MyNameIsMarkel',
  linkedin:   'https://www.linkedin.com/in/mynameismarkel/',
  hackthebox: 'https://profile.hackthebox.com/profile/019f28b7-65b5-71f3-83ff-72ad9019897d',
  email:      'mynameismarkel@gmail.com',
};

/* ─── Títulos de sección ────────────────────────────────── */
export const SECTIONS = {
  experience:     L('Experiencia laboral', 'Work Experience'),
  education:      L('Formación', 'Education'),
  certifications: L('Certificaciones', 'Certifications'),
  languages:      L('Idiomas', 'Languages'),
};

/* ─── Experiencia ───────────────────────────────────────── */
const INTERNSHIP = L('Prácticas', 'Internship');

export const EXPERIENCE: Card[] = [
  {
    date: L('Septiembre 2025 – Junio 2026', 'September 2025 – June 2026'),
    title: L('Técnico de Cumplimiento TISAX', 'TISAX Compliance Technician'),
    place: 'RPK Group',
    desc: L(
      'Realicé análisis de brechas frente al marco TISAX, identificando y evaluando riesgos de seguridad de la información. Gestioné las no conformidades durante todo el proceso de auditoría, coordinando las acciones correctivas para lograr un resultado de cumplimiento satisfactorio.',
      'Conducted gap analyses against the TISAX framework, identifying and evaluating information security risks. Managed non-conformities throughout the audit process, coordinating corrective actions to ensure successful compliance outcomes.',
    ),
    tags: [
      red(INTERNSHIP), gold('TISAX'),
      blue(L('Cumplimiento normativo', 'Compliance')),
      blue(L('Análisis de brechas', 'Gap Analysis')),
      blue(L('Evaluación de riesgos', 'Risk Assessment')),
      blue(L('Gestión de no conformidades', 'Non-Conformity Management')),
      blue(L('Soporte a auditorías', 'Audit Support')),
      blue(L('Sistema de Gestión de Seguridad de la Información', 'Information Security Management System')),
    ],
  },
  {
    date: L('Enero 2024 – Abril 2025', 'January 2024 – April 2025'),
    title: L('Especialista en Ciberseguridad', 'Cybersecurity Specialist'),
    place: L('Orbik Cybersecurity, Mondragón', 'Orbik Cybersecurity, Mondragon'),
    desc: L(
      'Realicé pruebas de penetración y de robustez sobre dispositivos industriales conforme al estándar IEC/ISO 62443. También llevé a cabo evaluaciones relacionadas con la normativa de ciberresiliencia, ayudando a los clientes a reforzar la postura de seguridad de sus sistemas industriales.',
      'Performed penetration testing and robustness testing on industrial devices in accordance with the IEC/ISO 62443 standard. Also carried out assessments related to cyber resilience regulations, helping clients strengthen the security posture of their industrial systems.',
    ),
    tags: [
      red(L('Jornada completa', 'Full-time')),
      gold('IEC/ISO 62443'),
      gold('Cyber Resilience Act (CRA)'),
      gold(L('Ciberseguridad industrial (OT)', 'Industrial Cybersecurity (OT)')),
      blue(L('Comunicación con clientes', 'Client Communication')),
      blue(L('Pruebas de penetración', 'Penetration Testing')),
      blue(L('Pruebas de robustez', 'Robustness Testing')),
      blue(L('Evaluación de vulnerabilidades', 'Vulnerability Assessment')),
      blue(L('Seguridad en dispositivos embebidos', 'Embedded Device Security Testing')),
    ],
  },
  {
    date: L('Marzo 2023 – Mayo 2023', 'March 2023 – May 2023'),
    title: L('Consultor de Negocio y Tecnología', 'Business and Technology Consultant'),
    place: 'Entelgy Innotec Security, Vitoria',
    desc: L(
      'Di soporte a clientes mientras monitorizaba e identificaba actividades fraudulentas en línea. Documenté y reporté incidentes de seguridad de forma estructurada, contribuyendo a reducir los tiempos de respuesta y a mejorar la protección de los clientes.',
      'Provided customer support while monitoring and identifying fraudulent online activities. Documented and reported security incidents in a structured manner, contributing to faster response times and improved client protection.',
    ),
    tags: [
      red(INTERNSHIP),
      blue(L('Atención al cliente', 'Customer Support')),
      blue(L('Detección de phishing', 'Phishing Detection')),
      blue(L('Análisis de fraude', 'Fraud Analysis')),
      blue(L('Reporte de incidentes', 'Incident Reporting')),
      blue(L('Monitorización de amenazas', 'Threat Monitoring')),
    ],
  },
  {
    date: L('Marzo 2022 – Junio 2022', 'March 2022 – June 2022'),
    title: L('Responsable de Marketing y Desarrollador', 'Marketing Manager & Developer'),
    place: 'Selpath Technologies, Bilbao',
    desc: L(
      'Responsable del diseño y desarrollo de soluciones software con un fuerte enfoque en la seguridad, garantizando que los productos se construyeran siguiendo principios de desarrollo seguro desde las primeras fases.',
      'Responsible for the design and development of software solutions with a strong focus on security, ensuring that products were built following secure development principles from the earliest stages.',
    ),
    tags: [
      red(INTERNSHIP), gold('Python'), gold('JavaScript'),
      blue(L('Desarrollo de software seguro', 'Secure Software Development')),
      blue(L('Seguridad desde el diseño', 'Security by Design')),
      blue(L('Ingeniería de software', 'Software Engineering')),
    ],
  },
];

/* ─── Formación ─────────────────────────────────────────── */
export const EDUCATION: Card[] = [
  {
    date: L('En curso', 'Ongoing'),
    title: L('Grado en Ciberseguridad', "Bachelor's Degree in Cybersecurity"),
    place: L('Universidad EUNEIZ, Vitoria', 'EUNEIZ University, Vitoria'),
    desc: L(
      'Grado centrado en la prevención, detección y mitigación de incidentes de seguridad: hacking ético, análisis forense digital, desarrollo seguro, gestión de riesgos, inteligencia de amenazas y gobierno y cumplimiento en ciberseguridad.',
      'Degree focused on the prevention, detection, and mitigation of security incidents, covering ethical hacking, digital forensics, secure development, risk management, threat intelligence, and cybersecurity governance and compliance.',
    ),
    tags: [
      red(L('Grado universitario', "Bachelor's Degree")),
      blue(L('Análisis de malware', 'Malware Analysis')),
      blue(L('Criptografía', 'Cryptography')),
      blue(L('Pruebas de penetración', 'Penetration Testing')),
      blue(L('Ciberseguridad industrial', 'Industrial Cybersecurity')),
      blue(L('Gestión de riesgos', 'Risk Management')),
      blue(L('Inteligencia de amenazas', 'Threat Intelligence')),
      blue(L('IA para ciberseguridad', 'AI for Cybersecurity')),
      blue(L('Gobierno y normativa', 'Governance & Standards')),
      blue(L('Seguridad en la nube', 'Cloud Security')),
      blue(L('Red Team y Blue Team', 'Red Team & Blue Team')),
    ],
  },
  {
    date: L('Junio 2023', 'June 2023'),
    title: L(
      'Curso de Especialización en Ciberseguridad en Entornos de las Tecnologías de la Información',
      'Higher Vocational Degree in Cybersecurity in Information Technology Environments',
    ),
    place: 'Maristas Durango',
    desc: L(
      'Especialización oficial en ciberseguridad: respuesta a incidentes, bastionado de redes y sistemas, hacking ético, análisis forense digital, puesta en producción segura y normativa de ciberseguridad, completada con formación dual en empresa.',
      'Official specialization in cybersecurity covering incident response, system and network hardening, ethical hacking, digital forensics, secure deployment, and security regulations, completed with dual work-based training in industry.',
    ),
    tags: [
      red(L('Curso de especialización', 'Advanced Specialization Program')),
      blue(L('Incidentes de ciberseguridad', 'Cybersecurity Incidents')),
      blue(L('Bastionado de redes y sistemas', 'Network & System Hardening')),
      blue(L('Hacking ético', 'Ethical Hacking')),
      blue(L('Normativa de ciberseguridad', 'Security Regulations')),
      blue(L('Fundamentos', 'Core Fundamentals')),
      blue(L('Puesta en producción segura', 'Secure DevOps')),
      blue(L('Análisis forense digital', 'Digital Forensics')),
    ],
  },
  {
    date: L('Junio 2022', 'June 2022'),
    title: L(
      'Técnico Superior en Administración de Sistemas Informáticos en Red',
      'Higher Vocational Degree in Networked Computer Systems Administration',
    ),
    place: L('Escuela Politécnica Superior de Mondragón', 'Mondragon Higher Polytechnic School'),
    desc: L(
      'Ciclo formativo centrado en la administración de sistemas informáticos en red: configuración, mantenimiento y seguridad de servidores, redes, sistemas operativos y bases de datos.',
      'Vocational degree focused on the administration of networked computer systems: configuration, maintenance, and security of servers, networks, operating systems, and databases.',
    ),
    tags: [
      red(L('Ciclo Formativo de Grado Superior', 'Higher Vocational Degree')),
      blue(L('Administración de sistemas', 'Systems Administration')),
      blue(L('Administración de redes', 'Network Administration')),
      blue(L('Gestión de bases de datos', 'DB Management')),
      blue(L('Servicios y aplicaciones web', 'Web Services & Applications')),
      blue(L('Seguridad y alta disponibilidad', 'Security & High Availability')),
      blue(L('Fundamentos de hardware', 'Hardware Fundamentals')),
    ],
  },
];

/* ─── Certificaciones ───────────────────────────────────── */
export const CERTIFICATIONS: Card[] = [
  {
    date: '2026',
    title: 'eJPT',
    place: 'INE Security',
    tags: [red('eLearnSecurity Certified Junior Penetration Tester')],
  },
  {
    date: '2018',
    title: 'B2 First Certificate',
    place: L('Universidad de Cambridge', 'University of Cambridge'),
    tags: [red(L('Inglés', 'English'))],
  },
];

/* ─── Idiomas (level = % de la barra) ───────────────────── */
export const LANGUAGES = [
  { name: L('Español', 'Spanish'), level: 100, label: L('Nativo', 'Native') },
  { name: L('Euskera', 'Basque'),  level: 100, label: L('Nativo', 'Native') },
  { name: L('Inglés', 'English'),  level: 80,  label: 'B2 First' },
];
