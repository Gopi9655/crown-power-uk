export const siteUrl = "https://www.crownpoweruk.co.uk";

export const company = {
  name: "Crown Power Energy Systems Ltd",
  shortName: "Crown Power",
  email: "info@crownpoweruk.co.uk",
  directorEmail: "arefm@crownpoweruk.co.uk",
  phone: "+44 7492 046104",
  phoneHref: "+447492046104",
  companyNumber: "16070400",
  vatNumber: "480 0284 11",
  registeredOffice: "Companies House, Crown Way, Cardiff, CF14 3UZ, DX 33050 Cardiff",
  headOffice: "West Midlands, England, UK",
};

export type NavItem = { label: string; href: string; description: string };

export const navigation: { label: string; items: NavItem[] }[] = [
  {
    label: "Solutions",
    items: [
      { label: "Renewable Integration", href: "/services#renewable", description: "Solar, wind, storage, hybrid and microgrids" },
      { label: "Smart Energy Technologies", href: "/services#smart", description: "Smart grids, EMS, SCADA and monitoring" },
      { label: "Power Systems", href: "/services#power", description: "Grid design, substations and protection" },
      { label: "Industrial & Commercial", href: "/services#industrial", description: "Factories, data centres and UPS" },
      { label: "Maintenance & Support", href: "/services#specialised", description: "Audits, power quality and consulting" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "Battery Energy Storage", href: "/bess", description: "Scalable storage for resilient networks" },
      { label: "Smart Grid Transformers", href: "/gridtransformer", description: "Intelligent distribution and monitoring" },
      { label: "Battery Products", href: "/ourproducts", description: "Alkaline, NiMH and lithium-ion cells" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "Industrial", href: "/services#sectors", description: "Manufacturing, processing and warehousing" },
      { label: "Commercial", href: "/services#sectors", description: "Offices, retail and hospitality" },
      { label: "Infrastructure", href: "/services#sectors", description: "Telecoms, transport and utilities" },
      { label: "Agriculture", href: "/services#sectors", description: "Farms, greenhouses and cold storage" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", description: "Who we are and how we work" },
      { label: "Leadership & Team", href: "/meet-the-team", description: "Meet our people" },
      { label: "Partners & Contractors", href: "/businesspartnercontractor", description: "Work with Crown Power" },
      { label: "Careers & Internships", href: "/internships", description: "Early-careers programmes" },
      { label: "Training", href: "/training", description: "Professional development" },
      { label: "Health & Safety", href: "/health-and-safety", description: "Our commitment" },
      { label: "Legal Department", href: "/legaldepartment", description: "Compliance and governance" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Statements & Announcements", href: "/statements-announcements", description: "Latest updates from Crown Power" },
      { label: "Why Green Energy", href: "/why-go-solar", description: "A more sustainable energy future" },
    ],
  },
];

export type ServiceCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  items: string[];
};

export const services: ServiceCategory[] = [
  {
    id: "renewable",
    number: "01",
    title: "Renewable Integration",
    description: "Bringing renewable and hybrid generation onto reliable, well-engineered systems.",
    image: "/images/services/renewable-integration.jpg",
    items: ["Solar Power Integration", "Wind Energy Systems", "Battery Energy Storage Systems", "Hybrid Power Systems", "Microgrid Solutions", "Green Energy Projects"],
  },
  {
    id: "smart",
    number: "02",
    title: "Smart Energy Technologies",
    description: "Intelligent control and visibility across generation, storage and demand.",
    image: "/images/services/smart-energy-technologies.jpg",
    items: ["Smart Grid Solutions", "Energy Management Systems", "Power Monitoring Systems", "Automation Technologies", "Remote Monitoring", "SCADA Systems"],
  },
  {
    id: "power",
    number: "03",
    title: "Power Systems Solutions",
    description: "Robust grid infrastructure, distribution and protection built to standard.",
    image: "/images/services/power-systems.jpg",
    items: ["Grid Infrastructure Design", "Power Distribution Systems", "Substation Installation", "Network Upgrades", "Switchgear Systems", "Control & Protection Systems"],
  },
  {
    id: "industrial",
    number: "04",
    title: "Industrial & Commercial Services",
    description: "Dependable power for factories, buildings, data centres and critical facilities.",
    image: "/images/services/industrial-commercial.jpg",
    items: ["Industrial Power Systems", "Factory Installations", "Commercial Buildings", "Data Centre Power", "Emergency Power Systems", "UPS Systems"],
  },
  {
    id: "specialised",
    number: "05",
    title: "Specialised Services",
    description: "Expert analysis, maintenance and consulting to keep systems performing.",
    image: "/images/services/specialised-services.jpg",
    items: ["Power Quality Analysis", "Energy Efficiency Audits", "Preventive Maintenance", "Emergency Response", "System Upgrades", "Technical Consulting"],
  },
];

export const sectors = [
  { title: "Industrial", items: ["Manufacturing Plants", "Processing Facilities", "Warehouses", "Industrial Parks"] },
  { title: "Commercial", items: ["Office Buildings", "Shopping Centres", "Hotels", "Business Parks"] },
  { title: "Infrastructure", items: ["Data Centres", "Telecommunications", "Transport Facilities", "Utilities"] },
  { title: "Agricultural", items: ["Farms & Livestock", "Greenhouses", "Cold Storage", "Irrigation Systems", "Feed Mills", "Aquaculture"] },
];

export const offices = [
  { country: "United Kingdom", city: "West Midlands", detail: "Head Office — England, UK. Registered in England & Wales.", contact: "info@crownpoweruk.co.uk" },
  { country: "Portugal", city: "Lisbon", detail: "European branch supporting regional projects.", contact: "aref.mashali@crownpower.pt" },
  { country: "United Arab Emirates", city: "Dubai", detail: "Arab Bank Bldg, Port Saeed, Dubai, UAE.", contact: "+971 052 689 7096" },
];

export const announcements = [
  { date: "11 May 2025", title: "Internships and Work Experience", category: "Careers", summary: "An official update on Crown Power's practical, industry-focused internship and work experience programme." },
  { date: "26 February 2025", title: "Smart Cat’s Eyes Road Sign System with AI Integration", category: "Innovation", summary: "A Crown Power statement exploring intelligent roadside infrastructure and AI integration." },
  { date: "17 February 2025", title: "Transforming Energy Infrastructure through AI-Powered Electrical Engineering", category: "Engineering", summary: "An official statement on the role of applied AI in modern electrical engineering." },
  { date: "14 February 2025", title: "Smart Transformer", category: "Products", summary: "An official statement outlining Crown Power's smart transformer direction." },
  { date: "30 January 2025", title: "Transmission Line Noise Analysis Project", category: "Research", summary: "An AI-based approach to comprehensive transmission-line noise management." },
  { date: "27 January 2025", title: "Battery Recycling Initiative", category: "Sustainability", summary: "A Crown Power statement focused on battery recycling and responsible material recovery." },
];

export const liveData = [
  { title: "UK Renewable Energy Map", href: "https://www.mygridgb.co.uk/map/" },
  { title: "GB Electricity Mix — Live", href: "https://infogram.com/live-dashboard-gb-electricity-mix-1h0n25ze0vjz2pe" },
  { title: "National Grid: Live", href: "https://grid.iamkate.com/" },
  { title: "Energy Dashboard", href: "https://www.energydashboard.co.uk/live" },
  { title: "Europe Electricity Maps", href: "https://app.electricitymaps.com/map/72h/hourly" },
];

export type ContentSection = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type ContentPage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  type?: "document" | "editorial";
  sections: ContentSection[];
  cta?: { title: string; text: string; label: string; href: string };
};

export const contentPages: ContentPage[] = [
  {
    slug: "why-go-solar",
    eyebrow: "Sustainable Energy",
    title: "Empowering you with sustainable energy solutions.",
    intro: "Solar, wind, energy storage and intelligent controls can create cleaner, more resilient energy infrastructure when they are designed as one connected system.",
    image: "/images/home/wind-energy-transition.jpg",
    sections: [
      { heading: "Why choose sustainable energy?", paragraphs: ["Well-designed renewable systems can reduce environmental impact, improve operational efficiency and strengthen energy independence. Crown Power assesses each site and requirement before recommending a route forward."], bullets: ["Advancing environmental sustainability", "Financial and operational efficiency", "Enhanced energy independence", "Strategic planning and conservation"] },
      { heading: "Integrating sustainable energy systems", paragraphs: ["Our work spans smart-grid solutions, solar and wind integration, battery energy storage and microgrids, with engineering support from initial assessment through installation and grid connection."], bullets: ["Site suitability assessment", "System engineering and planning", "Installation and permissions support", "Utility connection and commissioning"] },
    ],
    cta: { title: "Plan a smarter energy system.", text: "Talk to Crown Power about your site, priorities and energy requirements.", label: "Speak to our engineers", href: "/contact#enquiry" },
  },
  {
    slug: "ourproducts",
    eyebrow: "Products · Batteries",
    title: "Battery products for everyday and specialist use.",
    intro: "Crown Power's public product range includes common AA, AAA, C, D and 9V formats across alkaline, nickel-metal hydride and lithium-ion chemistries.",
    image: "/images/bess/battery-products.jpg",
    sections: [
      { heading: "Alkaline batteries", paragraphs: ["Alkaline cells are widely used single-use batteries, valued for dependable discharge in many consumer electronic devices. Used batteries should be taken to an appropriate recycling point rather than general waste."] },
      { heading: "Nickel-metal hydride (NiMH)", paragraphs: ["NiMH batteries are rechargeable and can offer practical long-term value for frequently used devices. Charging time and capacity retention vary with use and product specification."] },
      { heading: "Lithium-ion", paragraphs: ["Lithium-ion batteries are rechargeable and commonly used in laptops, phones and other portable electronics. Product selection, charging and disposal should always follow the manufacturer's guidance."] },
      { heading: "Responsible disposal", paragraphs: ["Never place batteries in fire or ordinary household waste. Use a dedicated collection point at a local recycling centre, supermarket or participating retailer so materials can be recovered safely."] },
    ],
    cta: { title: "Ask about battery products.", text: "Contact Crown Power for current product and format information.", label: "Make an enquiry", href: "/contact#enquiry" },
  },
  {
    slug: "internships",
    eyebrow: "Careers · Early Talent",
    title: "Experience that powers your future.",
    intro: "Practical, industry-focused internships and work experience placements designed to help university students connect academic study with real-world practice.",
    image: "/images/services/power-systems.jpg",
    sections: [
      { heading: "Build your professional foundation", paragraphs: ["Programmes may offer exposure to professional projects, mentorship and skill development across engineering, energy, business, finance, health and safety, and technology disciplines."], bullets: ["Electrical and power systems engineering", "Energy and sustainability", "Business, finance and law", "IT, data and technology", "Health and safety"] },
      { heading: "Before you apply", paragraphs: ["Opportunities, duration and working arrangements depend on current business needs. Review the application information carefully and contact Crown Power if you need clarification before submitting your details."] },
    ],
    cta: { title: "Ready to apply?", text: "Tell us about your field of study, interests and the experience you are looking for.", label: "Start an application", href: "/application" },
  },
  {
    slug: "businesspartnercontractor",
    eyebrow: "Company · Partnerships",
    title: "Partners and contractors.",
    intro: "Crown Power welcomes conversations with qualified organisations and specialists whose capabilities complement our engineering, energy and technology work.",
    sections: [
      { heading: "Working together", paragraphs: ["Potential engagements are considered against project requirements, technical competence, quality, safety, compliance and commercial fit. No partnership or supplier status is created until appropriate due diligence and written agreements are complete."], bullets: ["Engineering and technical specialists", "Installers and specialist contractors", "Technology and product suppliers", "Research and education partners", "Professional and advisory services"] },
      { heading: "Introduce your organisation", paragraphs: ["Send a concise company profile, the services you provide, relevant operating regions and an appropriate contact. Do not send confidential information before a suitable agreement is in place."] },
    ],
    cta: { title: "Start a partnership conversation.", text: "Introduce your organisation and the capabilities you would like to discuss.", label: "Contact Crown Power", href: "/contact#enquiry" },
  },
  {
    slug: "training",
    eyebrow: "Company · Development",
    title: "Training and professional development.",
    intro: "Crown Power supports continual learning across engineering, technology, business and safe working practices.",
    sections: [
      { heading: "A practical learning culture", paragraphs: ["Training needs depend on role, project and regulatory requirements. Development may combine supervised practical experience, technical study, toolbox talks and external learning where appropriate."], bullets: ["Role-specific technical development", "Health and safety awareness", "Quality and compliance", "Digital and professional skills"] },
      { heading: "Training enquiries", paragraphs: ["Availability is not guaranteed and programme details may change. Contact Crown Power for current information about training or work-experience opportunities."] },
    ],
    cta: { title: "Ask about development opportunities.", text: "Tell us what subject or professional pathway you are interested in.", label: "Contact us", href: "/contact#enquiry" },
  },
  {
    slug: "application",
    eyebrow: "Careers · Application",
    title: "Build your professional foundation.",
    intro: "Use our enquiry form to express interest in an internship or work experience placement. Crown Power will confirm whether a suitable opportunity is available.",
    sections: [
      { heading: "What to include", paragraphs: ["Briefly explain your course or professional background, field of interest, availability and what you hope to learn. Do not include sensitive personal documents in the initial enquiry."], bullets: ["Your field of study or specialism", "Preferred dates or availability", "Relevant skills and interests", "A concise reason for applying"] },
      { heading: "Important information", paragraphs: ["Submitting an expression of interest does not guarantee an interview or placement. Any offer will set out the applicable scope, duration and terms in writing."] },
    ],
    cta: { title: "Submit an expression of interest.", text: "Choose ‘Internships & Careers’ in the enquiry form and include the details above.", label: "Open the application form", href: "/contact#enquiry" },
  },
  {
    slug: "health-and-safety",
    eyebrow: "Company · Responsibility",
    title: "Health and safety.",
    intro: "Safe work is fundamental to responsible engineering. Crown Power expects risks to be assessed, controls to be followed and concerns to be raised promptly.",
    sections: [
      { heading: "Our approach", paragraphs: ["Health and safety arrangements are matched to the work being undertaken and the applicable legal, site and client requirements."], bullets: ["Plan work and assess risk before starting", "Use competent people and suitable equipment", "Follow site controls and safe systems of work", "Report hazards, near misses and incidents", "Stop work where conditions are unsafe"] },
      { heading: "Shared responsibility", paragraphs: ["Employees, contractors and visitors are expected to cooperate with safety arrangements and protect themselves and others. Project-specific information is provided through the relevant induction, briefing and documentation."] },
    ],
    cta: { title: "Need to raise a safety matter?", text: "Contact Crown Power with enough detail for the issue to be directed appropriately.", label: "Contact us", href: "/contact" },
  },
  {
    slug: "legaldepartment",
    eyebrow: "Company · Governance",
    title: "Legal department.",
    intro: "The Crown Power legal function supports corporate governance, contracts, compliance and business risk management.",
    sections: [
      { heading: "Legal enquiries", paragraphs: ["Legal correspondence can be directed to attorneys@crownpoweruk-legals.co.uk. Please identify the relevant Crown Power entity, subject and any response deadline."], bullets: ["Corporate and commercial matters", "Contract and supplier matters", "Governance and compliance", "Formal notices and correspondence"] },
      { heading: "Company details", paragraphs: ["Crown Power Energy Systems Ltd is incorporated in England and Wales under company number 16070400. VAT registration number: 480 0284 11. Registered office: Companies House, Crown Way, Cardiff, CF14 3UZ, DX 33050 Cardiff."] },
    ],
  },
  {
    slug: "privacy-policy",
    eyebrow: "Legal · Privacy",
    title: "Privacy policy.",
    intro: "This policy explains how Crown Power Energy Systems Ltd collects, uses, stores and protects personal information in connection with its websites and business activities.",
    type: "document",
    sections: [
      { heading: "1. Information we collect", paragraphs: ["We may collect information you provide through forms, email, telephone or other correspondence; professional and supplier details; recruitment information; and technical information about visits to our websites, including cookies."], bullets: ["Identity and contact details", "Organisation and professional details", "Enquiry, application and correspondence records", "Website usage and cookie information"] },
      { heading: "2. How we use personal information", paragraphs: ["We use personal information to respond to enquiries, provide and improve services, manage business and supplier relationships, consider applications, operate secure websites, meet legal obligations and protect legitimate business interests."] },
      { heading: "3. Legal bases", paragraphs: ["Depending on the activity, processing may be necessary for a contract, compliance with a legal obligation, a legitimate interest, or based on consent. Where we rely on consent, it may be withdrawn by contacting us."] },
      { heading: "4. Sharing information", paragraphs: ["We may share necessary information with group members, consultants, suppliers, contractors, professional advisers, authorities or a business successor. We require service providers to protect information and use it only for the agreed purpose."] },
      { heading: "5. Retention, security and international transfers", paragraphs: ["Information is kept no longer than necessary for the relevant purpose or legal requirement. We use appropriate technical and organisational measures. Where information is transferred outside the UK or EEA, appropriate safeguards are used where required."] },
      { heading: "6. Your rights", paragraphs: ["Depending on applicable law, you may have rights to access, correct, erase or restrict personal information, object to processing, request portability, or complain to a supervisory authority. Some rights are subject to legal exceptions."] },
      { heading: "7. Contact", paragraphs: ["For privacy questions, complaints or requests, email info@crownpoweruk.co.uk or call +44 7492 046104. Crown Power Energy Systems Ltd is the data controller for the processing described here."] },
    ],
  },
  {
    slug: "cookie-policy",
    eyebrow: "Legal · Cookies",
    title: "Cookie policy.",
    intro: "This policy explains how cookies and similar technologies may be used on Crown Power websites.",
    type: "document",
    sections: [
      { heading: "What cookies are", paragraphs: ["Cookies are small text files placed on a device by a website. They can support essential site functions, remember choices and help understand how a website is used."] },
      { heading: "How we use cookies", paragraphs: ["The site may use strictly necessary cookies for security and operation. Analytics or preference cookies should only be used in line with the choices presented to visitors."] },
      { heading: "Managing cookies", paragraphs: ["You can manage or delete cookies through your browser settings. Blocking some cookies may affect site functionality. Where a consent control is available, you can update non-essential cookie choices there."] },
      { heading: "Contact", paragraphs: ["Questions about the use of cookies can be sent to info@crownpoweruk.co.uk."] },
    ],
  },
  {
    slug: "terms-conditions",
    eyebrow: "Legal · Website Terms",
    title: "Terms and conditions.",
    intro: "These terms apply to use of the Crown Power Energy Systems Ltd website and related website services.",
    type: "document",
    sections: [
      { heading: "1. Legal agreement", paragraphs: ["By using this website you agree to these terms. If you do not agree, you should not use the website or its services. Crown Power may update these terms and publish the revised version on this page."] },
      { heading: "2. Using the website", paragraphs: ["Where you provide information, you agree that it is true, accurate, current and complete. You must comply with applicable law, respect the privacy and rights of others, and must not impersonate another person or misrepresent the origin of communications."] },
      { heading: "3. Information and availability", paragraphs: ["Website content is provided for general information and may be changed without notice. Nothing on this website creates an engineering, supply or professional-services contract unless confirmed in a separate written agreement."] },
      { heading: "4. Third-party services and links", paragraphs: ["Links and third-party services are provided for convenience. Independent providers are responsible for their own information, goods, services and terms. Crown Power is not responsible for third-party websites it does not control."] },
      { heading: "5. Privacy", paragraphs: ["Personal information submitted through the website is handled in accordance with the Privacy Policy and applicable data protection law."] },
      { heading: "6. Contact", paragraphs: ["Questions about these terms can be sent to info@crownpoweruk.co.uk or attorneys@crownpoweruk-legals.co.uk."] },
    ],
  },
  {
    slug: "accessibility",
    eyebrow: "Legal · Accessibility",
    title: "Accessibility statement.",
    intro: "Crown Power wants this website to be usable by as many people as possible and aims to work towards WCAG 2.2 AA accessibility.",
    type: "document",
    sections: [
      { heading: "Using this website", paragraphs: ["The site is designed to support keyboard navigation, visible focus states, text resizing, semantic headings, meaningful link text and alternative text for informative imagery."] },
      { heading: "Known limitations", paragraphs: ["Some third-party websites linked from Crown Power are outside our control. Older source documents or third-party content may not meet the same accessibility standard."] },
      { heading: "Feedback and assistance", paragraphs: ["If you cannot access information or need it in another format, email info@crownpoweruk.co.uk and describe the page, information and format you need. We will consider the request and respond as reasonably practicable."] },
    ],
  },
];

export const contentPageMap = Object.fromEntries(contentPages.map((page) => [page.slug, page]));
