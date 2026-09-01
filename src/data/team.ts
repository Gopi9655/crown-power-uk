export type TeamMember = {
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Technology" | "Business" | "Sustainability" | "Legal";
  image: string;
  email?: string;
  bio: string;
};

export const team: TeamMember[] = [
  { name: "Mr Aref Mashali", role: "Company Director & Electrical Power Systems Engineer", category: "Leadership", image: "/images/team/mr-aref-mashali.png", email: "arefm@crownpoweruk.co.uk", bio: "Leads as Company Director while applying expertise in electrical power systems engineering across Crown Power’s renewable and industrial work." },
  { name: "Ms Iara Oliveira", role: "Company Secretary", category: "Leadership", image: "/images/team/ms-iara-oliveira.jpg", email: "experience@crownpoweruk.co.uk", bio: "Manages corporate governance and supports efficient administrative operations and organisational compliance." },
  { name: "Ms Alessandra Russo", role: "Company Financial Advisor", category: "Business", image: "/images/team/ms-alessandra-russo.jpg", email: "info@crownpoweruk.co.uk", bio: "Provides strategic financial guidance and supports financial decision-making for the business." },
  { name: "Ms Emily Edwards", role: "Business Law Expert", category: "Legal", image: "/images/team/ms-emily-edwards.jpg", email: "attorneys@crownpoweruk-legals.co.uk", bio: "Specialises in corporate legal frameworks, commercial contracts, governance and regulatory compliance." },
  { name: "Ms Aimee Chen", role: "Collaboration & Client Relations", category: "Business", image: "/images/team/ms-aimee-chen.jpg", email: "client@crownpoweruk.co.uk", bio: "Supports international collaboration, strategic partnerships and client relationships across diverse markets." },
  { name: "Ms Maryam Noorzadeh", role: "Events Manager & Art Designer", category: "Business", image: "/images/team/ms-maryam-noorzadeh.jpg", bio: "Combines creative design expertise with event planning and management." },
  { name: "Mr Abdussamad Asjid Saleem", role: "Computer Hardware & Software Engineering", category: "Technology", image: "/images/team/mr-abdussamad-asjid-saleem.jpg", bio: "Works across hardware architecture, software development, system integration and optimisation." },
  { name: "Mr Murtadha Alkinani", role: "PhD Researcher & Mechanical Engineer", category: "Engineering", image: "/images/team/mr-murtadha-alkinani.jpg", bio: "Bridges academic research and practical engineering across mechanical design, thermal dynamics and advanced manufacturing." },
  { name: "Ms Niloufar Javdani Bafarasat", role: "Business & Market Intelligence (MSc)", category: "Business", image: "/images/team/ms-niloufar-javdani-bafarasat.jpg", bio: "Applies strategic analysis and data-informed decision-making to business development and emerging technology." },
  { name: "Mr Evan Murphy", role: "Electrical & Construction Engineer", category: "Engineering", image: "/images/team/mr-evan-murphy.jpg", bio: "Supports electrical system installations and power-infrastructure project delivery." },
  { name: "Mr Rahim Modhej", role: "Electrical Power Systems Engineer", category: "Engineering", image: "/images/team/mr-rahim-modhej.jpg", bio: "Electrical power engineer focused on renewable energy systems and collaborative sustainable-power solutions." },
  { name: "Ms Sheida Hooshmandi", role: "PhD Sustainability Strategy & Transformation", category: "Sustainability", image: "/images/team/ms-sheida-hooshmandi.jpg", bio: "Supports sustainability strategy, change management, measurement, regulatory compliance and reporting." },
  { name: "Mr Amirmohammad Sadeghi", role: "IT Engineer", category: "Technology", image: "/images/team/mr-amirmohammad-sadeghi.jpg", bio: "Implements technical solutions and maintains digital infrastructure for dependable system performance." },
  { name: "Ms Shabnam Asadzadeh", role: "International Business Management (MSc)", category: "Business", image: "/images/team/ms-shabnam-asadzadeh.jpg", bio: "Focuses on cross-cultural leadership, global markets and cross-border business relationships." },
  { name: "Mr Lucas Schmit", role: "Materials Engineer", category: "Engineering", image: "/images/team/mr-lucas-schmit.jpg", bio: "Develops, tests and processes metals, ceramics, plastics, composites and semiconductors for engineering use." },
  { name: "Ms Ella Jones", role: "IT Engineering Expert", category: "Technology", image: "/images/team/ms-ella-jones.jpg", bio: "Works across software development, systems architecture and network infrastructure with a focus on security and performance." },
  { name: "Ms Devon Stevens", role: "Computer Science & Engineering", category: "Technology", image: "/images/team/ms-devon-stevens.jpg", bio: "Combines computer-science knowledge with practical work in software, systems architecture and advanced computing." },
  { name: "Ms Shaista", role: "Sustainability & Environmental Management · H&S Officer", category: "Sustainability", image: "/images/team/ms-shaista.jpg", bio: "Supports health and safety, environmental management, resource use and sustainable development practices." },
  { name: "Mr Saadeldin Ali", role: "Electrical Power Systems Engineer", category: "Engineering", image: "/images/team/mr-saadeldin-ali.jpg", bio: "Electrical power engineer focused on renewable energy systems and sustainable power solutions." },
  { name: "Mr Osman Mohammad", role: "Electrical Power Systems Engineer", category: "Engineering", image: "/images/team/mr-osman-mohammad.jpg", bio: "Electrical power engineer focused on renewable energy systems and sustainable power solutions." },
  { name: "Ms Xiaoxiao Li", role: "Engineering Management (MSc)", category: "Business", image: "/images/team/ms-xiaoxiao-li.jpg", bio: "Combines business and engineering knowledge across marketing, management, accounting and project delivery." },
  { name: "Ms Raian Mohamed khair", role: "Electrical & Electronic Engineering", category: "Engineering", image: "/images/team/ms-raian-mohamed-khair.jpg", bio: "Works across circuit design, signal processing, power systems and telecommunications." },
  { name: "Mr Jianming Wang", role: "Artificial Intelligence (MSc)", category: "Technology", image: "/images/team/mr-jianming-wang.jpg", bio: "Specialises in machine learning, neural networks and data analytics for intelligent decision-support systems." },
  { name: "Ms Andreia Lopes Da Silvia", role: "Business Management & HR", category: "Business", image: "/images/team/ms-andreia-lopes-da-silvia.jpg", bio: "Supports business management and human resources across strategic and operational work." },
  { name: "Mr Ragavan Rajkumar", role: "Automotive Engineering (MSc)", category: "Engineering", image: "/images/team/mr-ragavan-rajkumar.jpg", bio: "Brings knowledge of powertrain efficiency and vehicle dynamics across combustion and electric-vehicle systems." },
  { name: "Mr Bartek Kowalczyk", role: "Automotive Engineering (MSc)", category: "Engineering", image: "/images/team/mr-bartek-kowalczyk.jpg", bio: "Works across vehicle design, performance optimisation and sustainable transportation solutions." },
  { name: "Ms Jingting Jiao", role: "Electrical Power Systems Engineer", category: "Engineering", image: "/images/team/ms-jingting-jiao.jpg", bio: "Electrical power engineer focused on renewable energy systems and sustainable power solutions." },
  { name: "Mr Rudra Krishna", role: "Electrical & Electronics Engineer (MSc)", category: "Engineering", image: "/images/team/mr-rudra-krishna.jpg", bio: "Experienced with MATLAB, Simulink and Simscape, transformer sizing, cable and breaker selection, load calculations, control systems, machines and power electronics." },
  { name: "Mr Yiyu Ding", role: "Electrical Power System Engineering (MSc)", category: "Engineering", image: "/images/team/mr-yiyu-ding.jpg", bio: "Electrical power engineer focused on renewable energy systems and sustainable power solutions." },
  { name: "Mr Demir Denise", role: "PhD Digital Pedagogy", category: "Technology", image: "/images/team/mr-demir-denise.jpg", bio: "Specialises in digital pedagogy, innovative teaching methods, AI-supported learning and authentic assessment." },
  { name: "Ms Shereen Zaher Ibrahim Elmaghraby", role: "Human Resources Specialist", category: "Business", image: "/images/team/ms-shereen-zaher-ibrahim-elmaghraby.jpg", bio: "Supports recruitment, talent acquisition, employee records, onboarding, offboarding and HR reporting." },
];

export const teamCategories = ["All", "Leadership", "Engineering", "Technology", "Business", "Sustainability", "Legal"] as const;
