
import type { Mission, Agency, MissionType, BlogPost } from '@/types/mission';

// All the agencies from the provided data
export const mockAgencies: Agency[] = [
  { id: 'agency-1', name: 'NASA', country: 'USA' },
  { id: 'agency-2', name: 'SpaceX', country: 'USA' },
  { id: 'agency-3', name: 'ESA', country: 'Europe' },
  { id: 'agency-4', name: 'ISRO', country: 'India' },
  { id: 'agency-5', name: 'CNSA', country: 'China' },
  { id: 'agency-6', name: 'Axiom Space', country: 'USA' },
  { id: 'agency-7', name: 'JAXA', country: 'Japan' },
  { id: 'agency-8', name: 'Soviet Space Program', country: 'USSR' },
  { id: 'agency-9', name: 'ESA/JAXA', country: 'Europe/Japan' },
  { id: 'agency-10', name: 'NASA/ESA/ASI', country: 'USA/Europe/Italy' },
  { id: 'agency-11', name: 'NASA (in collaboration with ESA & CSA)', country: 'International' },
  { id: 'agency-12', name: 'ISRO/JAXA', country: 'India/Japan' },
  { id: 'agency-13', name: 'NASA / ESA / NOAA / EUMETSAT', country: 'International' },
  { id: 'agency-14', name: 'NASA / ESA', country: 'International' },
  { id: 'agency-15', name: 'NASA / ESA / JAXA / CSA', country: 'International' },
  { id: 'agency-16', name: 'Axiom Space / NASA / SpaceX', country: 'International' },
  { id: 'agency-17', name: 'NASA / ESA / CSA', country: 'International' },
];


// All the mission types from the provided data
export const mockMissionTypes: MissionType[] = [
    { id: 'type-1', name: 'Planetary Science', description: 'Missions focused on studying planets, moons, and other celestial bodies within solar systems.' },
    { id: 'type-2', name: 'Deep Space Exploration', description: 'Missions venturing beyond Earth orbit to explore distant objects and phenomena in the universe.' },
    { id: 'type-3', name: 'Human Spaceflight', description: 'Missions involving human crews traveling to space, including to space stations or other celestial bodies.' },
    { id: 'type-4', name: 'Satellite Launch', description: 'Missions primarily focused on deploying satellites into orbit for various purposes like communication or Earth observation.' },
    { id: 'type-5', name: 'Earth Observation', description: 'Missions designed to observe Earth from space for environmental monitoring, mapping, and other scientific purposes.' },
    { id: 'type-6', name: 'Launch Vehicle Test', description: 'Missions conducted to test and validate new launch vehicles or rocket technologies.' },
    { id: 'type-7', name: 'Space Telescope/Observatory', description: 'Missions deploying telescopes in space to observe the universe across various wavelengths.'},
    { id: 'type-8', name: 'Planetary Defense', description: 'Missions focused on detecting, tracking, and mitigating potential impacts from near-Earth objects.' },
    { id: 'type-9', name: 'Lunar Science', description: 'Missions dedicated to the scientific study of the Moon.' },
    { id: 'type-10', name: 'Astronomy / Space Telescope', description: 'Missions deploying telescopes in space to observe the universe across various wavelengths.'},
    { id: 'type-11', name: 'Asteroid / Deep Space Exploration', description: 'Missions to study asteroids and other small bodies in deep space.'},
    { id: 'type-12', name: 'Asteroid Sample Return', description: 'Missions to collect and return samples from asteroids.' },
    { id: 'type-13', name: 'Solar Science / Space Weather', description: 'Missions to study the Sun and space weather.' },
    { id: 'type-14', name: 'Lunar Orbit Platform / Human & Robotic Support', description: 'Space stations in lunar orbit.' },
    { id: 'type-15', name: 'Earth Science', description: 'Missions focused on studying Earth.' },
    { id: 'type-16', name: 'Human Spaceflight / Commercial ISS Mission', description: 'Commercial human spaceflight missions to the ISS.' },
    { id: 'type-17', name: 'Earth Science / Oceanography', description: 'Missions focused on Earth and ocean observation.' },
    { id: 'type-18', name: 'Space Telescope / Astronomy', description: 'Missions deploying telescopes in space to observe the universe.' },
    { id: 'type-19', name: 'Lunar Science / Orbiter + Attempted Lander', description: 'Lunar missions involving an orbiter and a landing attempt.' },
    { id: 'type-20', name: 'Deep Space Exploration / Outer Planet Science', description: 'Missions focused on outer planets.' },
    { id: 'type-21', name: 'Planetary Science / Sample Return', description: 'Missions designed to return samples from other planets.' },
    { id: 'type-22', name: "Planetary Defense / Asteroid Science", description: 'Missions for planetary defense and asteroid studies.' },
    { id: 'type-23', name: "Planetary Science / Mars Rover Mission", description: 'Missions involving rovers on Mars.' },
];

export const mockBlogPosts: BlogPost[] = [
    {
    id: 'the-future-of-interstellar-travel-challenges-and-breakthroughs',
    title: "The Future of Interstellar Travel: Challenges and Breakthroughs",
    excerpt: "Exploring the immense challenges humanity faces in achieving interstellar travel, and the potential scientific breakthroughs that could make it a reality.",
    author: "Dr. Nova Stargazer",
    date: "2024-07-28",
    category: "Space Exploration",
    tags: ["Interstellar Travel", "Breakthrough Propulsion", "Future Technology"],
    content: {
      "Introduction": "Interstellar travel—the dream of voyaging beyond our solar system—has captured the human imagination for centuries. But despite decades of technological progress, it remains one of the most formidable challenges in space exploration.",
      "Challenges": {
        "distance": "The nearest star system, Alpha Centauri, is over 4.37 light-years away. With current propulsion technology, it would take tens of thousands of years to get there.",
        "energy_requirements": "Reaching even a fraction of the speed of light requires massive amounts of energy. Traditional chemical propulsion is vastly inadequate.",
        "human_factors": "Radiation exposure, long-duration isolation, and life support for decades or centuries are critical issues for crewed missions."
      },
      "Scientific_Breakthroughs": {
        "nuclear_propulsion": "Concepts like nuclear thermal and nuclear electric propulsion promise higher efficiency and longer mission durations.",
        "antimatter_engines": "Though theoretical, antimatter propulsion could deliver unprecedented speeds but faces enormous containment and production challenges.",
        "warp_drive": "Alcubierre’s warp bubble theory suggests space-time could be manipulated for faster-than-light travel, but it remains speculative and energy-intensive."
      },
      "Future_Outlook": "While true interstellar travel may still be far off, projects like Breakthrough Starshot and continued propulsion research lay the groundwork for future generations. International collaboration, long-term funding, and cross-disciplinary innovation will be key."
    }
  },
  {
    id: 'unveiling-artemis-nasas-plan-to-return-humans-to-the-moon',
    title: "Unveiling Artemis: NASA's Plan to Return Humans to the Moon",
    excerpt: "A deep dive into the Artemis program, its objectives, key missions, and the technologies being developed for sustained lunar presence.",
    author: "Luna Observer",
    date: "2024-07-15",
    category: "Lunar Missions",
    tags: ["Artemis", "NASA", "Moon Mission", "Lunar Gateway"],
    content: {
      "Program_Overview": "Artemis is NASA’s ambitious initiative to return humans to the Moon by the mid-2020s and establish a sustainable lunar presence by the 2030s.",
      "Objectives": [
        "Land the first woman and next man on the Moon.",
        "Establish the Lunar Gateway as a space station orbiting the Moon.",
        "Lay the foundation for crewed Mars missions."
      ],
      "Key_Missions": {
        "Artemis_I": "An uncrewed test flight of the Space Launch System (SLS) and Orion spacecraft.",
        "Artemis_II": "A crewed lunar flyby mission set to test life support and navigation systems.",
        "Artemis_III": "A historic mission aiming to land astronauts near the lunar South Pole."
      },
      "Technology_Development": {
        "Orion": "A deep-space crew capsule with advanced safety features.",
        "SLS": "NASA’s most powerful rocket designed for deep space travel.",
        "HLS_Human_Landing_System": "In partnership with SpaceX, the Starship will land humans on the lunar surface.",
        "Lunar_Gateway": "A modular outpost serving as a staging point for surface missions."
      },
      "Impact": "The Artemis program signals a new era of international collaboration and private-public partnerships in space exploration. It will pave the way for long-term lunar habitation and beyond."
    }
  },
  {
    id: 'the-role-of-ai-in-modern-space-missions',
    title: "The Role of AI in Modern Space Missions",
    excerpt: "How artificial intelligence is revolutionizing space exploration, from autonomous rover navigation to analyzing vast astronomical datasets.",
    author: "Tech Astro",
    date: "2024-06-30",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Space Robotics", "Data Analysis"],
    content: {
      "Introduction": "Artificial Intelligence (AI) is becoming a game-changer in the realm of space exploration, enabling autonomous decision-making, pattern recognition, and system optimization.",
      "Applications": {
        "rovers": "Mars rovers like Perseverance use AI for autonomous navigation, obstacle avoidance, and scientific target selection.",
        "satellites": "AI enhances Earth observation by identifying weather patterns, deforestation, and urban sprawl more accurately and quickly.",
        "spacecraft": "Onboard AI systems help monitor health, diagnose faults, and optimize energy usage.",
        "astronomy": "Machine learning algorithms process massive data from telescopes, identifying exoplanets, galaxies, and potential supernovae."
      },
      "Benefits": [
        "Faster data processing and reduced human oversight.",
        "Ability to operate autonomously in remote or hazardous environments.",
        "Enhanced mission efficiency and adaptability."
      ],
      "Future_Potential": "As AI continues to evolve, it will enable more sophisticated robotic missions, support crewed deep space missions, and play a crucial role in interplanetary and interstellar navigation."
    }
  },
    {
    id: 'life-beyond-earth-the-search-for-exoplanets',
    title: "Life Beyond Earth: The Search for Exoplanets",
    excerpt: "An overview of the methods used to detect exoplanets and the ongoing quest to find habitable worlds beyond our solar system.",
    author: "Cosmic Voyager",
    date: "2024-08-05",
    category: "Astronomy",
    tags: ["Exoplanets", "Astrobiology", "Habitable Zones", "Kepler", "TESS"],
    content: {
      "Introduction": "The search for exoplanets—planets beyond our solar system—is at the heart of modern astronomy, driven by the ultimate question: Are we alone?",
      "Detection_Methods": {
        "transit_method": "Used by Kepler and TESS, this method detects slight dimming in a star’s brightness when a planet passes in front of it.",
        "radial_velocity": "Measures the wobble in a star’s motion due to gravitational pull from orbiting planets.",
        "direct_imaging": "Attempts to visually capture planets by blocking out starlight using advanced optics.",
        "gravitational_microlensing": "Detects planets by observing light bending due to a planet passing in front of a background star."
      },
      "Notable_Discoveries": [
        "Kepler-186f: One of the first Earth-size planets in the habitable zone.",
        "TRAPPIST-1 system: A compact system of seven Earth-size planets, three of which may be habitable.",
        "Proxima b: The closest known potentially habitable exoplanet, orbiting Proxima Centauri."
      ],
      "Future_Missions": {
        "James_Webb_Space_Telescope_JWST": "Will analyze atmospheres of exoplanets for biosignatures.",
        "ESA_PLATO_and_ARIEL": "Upcoming missions to detect and characterize exoplanets."
      },
      "Conclusion": "The exoplanet hunt is not just about finding planets—it’s about understanding planetary systems and the possibility of life elsewhere in the universe."
    }
  },
];

const rawMissionData: any[] = [
  {
    "mission_name": "Mars Explorer Rover 2025",
    "description": "A mission to explore the Martian surface and search for signs of past life, focusing on Jezero Crater.",
    "agency": "NASA",
    "type": "Planetary Science",
    "launch_date": "2025-07-15",
    "status": "Planned",
    "target": { "body": "Mars", "region": "Jezero Crater" },
    "objectives": [
      "Investigate ancient Martian environments for signs of microbial life.",
      "Collect and cache rock and soil samples for potential future return.",
      "Study Mars' geology and climate history.",
      "Test advanced technologies for future human exploration."
    ],
    "spacecraft": { "name": "Mars Explorer Rover", "type": "Autonomous Wheeled Rover", "features": ["Advanced imaging and spectroscopic instruments", "Drill for subsurface sampling", "Environmental sensors", "Navigation AI for autonomous terrain mapping"] },
    "instruments": [ { "name": "AstroSpec", "function": "Spectrometer for analyzing rock and soil composition" }, { "name": "MicroCameye", "function": "High-resolution microscopic imager" }, { "name": "CLIMA-Sense", "function": "Environmental sensor for atmospheric data" }, { "name": "DrillBot", "function": "Drill system for collecting subsurface core samples" } ],
    "launch_vehicle": "Atlas V 541",
    "duration": "Initial surface mission planned for 1 Martian year (~687 Earth days)",
    "science_return": { "expected_outcomes": ["Identification of organic compounds", "Detailed geological mapping of Jezero delta", "First in-situ carbon isotope measurements on Mars"] },
    "links": { "official_site": "https://mars.nasa.gov/marsexplorer2025", "press_release": "https://nasa.gov/press/marsexplorer2025" }
  },
  {
    "mission_name": "Europa Clipper",
    "description": "A mission to conduct detailed reconnaissance of Jupiter's moon Europa and investigate whether the icy moon could harbor conditions suitable for life.",
    "agency": "NASA",
    "type": "Deep Space Exploration",
    "launch_date": "2024-10-10",
    "status": "Planned",
    "target": { "body": "Europa", "system": "Jupiter" },
    "objectives": ["Determine the thickness of Europa's icy shell and search for subsurface lakes.", "Analyze the composition of the surface and potential ocean below.", "Study the moon’s geology and recent surface activity.", "Assess Europa's habitability and look for potential biosignatures."],
    "spacecraft": { "name": "Europa Clipper", "type": "Orbiter", "features": ["Radiation-hardened electronics", "Long-range communication system", "High-gain antenna", "Solar arrays for power generation"] },
    "instruments": [ { "name": "REASON", "function": "Radar for probing ice shell thickness" }, { "name": "Europa Imaging System (EIS)", "function": "High-resolution imaging of surface features" }, { "name": "MASPEX", "function": "Mass spectrometer to analyze atmospheric and plume composition" }, { "name": "SUDA", "function": "Dust analyzer for surface and plume particles" }, { "name": "MIRIS", "function": "Infrared spectrometer to study surface composition" } ],
    "launch_vehicle": "Falcon Heavy",
    "duration": "Multiple flybys over ~4 years in Jupiter system",
    "science_return": { "expected_outcomes": ["Detailed maps of Europa's surface features", "Assessment of potential water plumes and their contents", "Data on habitability potential of Europa's subsurface ocean"] },
    "links": { "official_site": "https://europa.nasa.gov", "press_release": "https://nasa.gov/press/europa-clipper" }
  },
  {
    "mission_name": "Artemis III",
    "description": "The third planned crewed mission of the Artemis program, which will land the first woman and first person of color on the Moon.",
    "agency": "NASA",
    "type": "Human Spaceflight",
    "launch_date": "2026-09-01",
    "status": "Planned",
    "target": { "body": "Moon", "region": "Lunar South Pole" },
    "objectives": ["Perform a crewed lunar landing near the lunar South Pole.", "Demonstrate new human landing system capabilities with SpaceX Starship HLS.", "Conduct scientific research, including sample collection and analysis.", "Lay groundwork for a sustained lunar presence as part of the Artemis program."],
    "spacecraft": { "name": "Orion + Starship HLS", "type": "Crew Capsule + Lunar Lander", "features": ["Orion spacecraft for deep-space transport", "SpaceX Starship HLS for lunar descent and ascent", "Advanced life support systems", "Lunar EVA suits for surface operations"] },
    "instruments": [ { "name": "Portable Surface Science Toolkit", "function": "Tools for geology, environmental analysis, and sample collection" }, { "name": "Lunar Communications and Navigation System", "function": "Supports surface positioning and Earth communications" } ],
    "launch_vehicle": "Space Launch System (SLS) Block 1",
    "duration": "Approximately 30 days, with ~6.5 days on the lunar surface",
    "science_return": { "expected_outcomes": ["Collection of lunar samples from unexplored polar regions", "Characterization of local resources (e.g., water ice)", "Validation of technologies for Artemis Base Camp and Mars readiness"] },
    "links": { "official_site": "https://www.nasa.gov/artemis-iii", "press_release": "https://www.nasa.gov/press-release/artemis-iii" }
  },
  {
    "mission_name": "Starlink Group 99",
    "description": "Deployment of another batch of Starlink satellites to low Earth orbit to expand global internet coverage.",
    "agency": "SpaceX",
    "type": "Satellite Launch",
    "launch_date": "2023-05-20",
    "end_date": "2023-05-20",
    "status": "Completed",
    "target": { "body": "LEO", "region": "Low Earth Orbit" },
    "objectives": ["Deploy a batch of Starlink communication satellites into operational orbits.", "Enhance the Starlink constellation’s global broadband coverage and latency.", "Increase total operational Starlink satellites in orbit."],
    "spacecraft": { "name": "Starlink Satellites", "type": "Communication Satellites", "features": ["Flat-panel satellite design", "Ku- and Ka-band phased array antennas", "Ion propulsion system for orbit raising", "Laser inter-satellite links (select units)"] },
    "instruments": [],
    "launch_vehicle": "Falcon 9 Block 5",
    "duration": "Single-day launch and deployment",
    "science_return": { "expected_outcomes": ["Improved Starlink bandwidth and regional coverage", "Reduced latency for global internet services", "Support for maritime, aviation, and remote area connectivity"] },
    "links": { "official_site": "https://www.spacex.com/launches/starlink", "press_release": "https://www.spacex.com/launches/sl-99" }
  },
  {
    "mission_name": "Chandrayaan-3",
    "description": "India's third lunar exploration mission, which successfully landed a rover on the Moon's south pole.",
    "agency": "ISRO",
    "type": "Planetary Science",
    "launch_date": "2023-07-14",
    "end_date": "2023-09-04",
    "status": "Completed",
    "target": { "body": "Moon", "region": "South Pole" },
    "objectives": [ "Demonstrate soft landing capabilities on the lunar surface.", "Deploy a rover to explore the lunar terrain near the south pole.", "Conduct in-situ scientific experiments on lunar soil and surface.", "Search for water ice and study the composition of the Moon’s polar region." ],
    "spacecraft": { "name": "Chandrayaan-3", "type": "Lander + Rover", "features": [ "Vikram lander with sensors for velocity and terrain mapping", "Pragyan rover equipped with mobility and communication systems", "Independent payload modules for data collection", "Solar-powered for limited mission duration" ] },
    "instruments": [ { "name": "ChaSTE", "function": "Thermal conductivity and temperature probe on lander" }, { "name": "ILSA", "function": "Seismometer to detect lunar quakes" }, { "name": "LP", "function": "Langmuir Probe for plasma environment measurement" }, { "name": "APXS", "function": "Alpha Particle X-Ray Spectrometer for surface composition (rover)" }, { "name": "LIBS", "function": "Laser-Induced Breakdown Spectroscope for element detection (rover)" } ],
    "launch_vehicle": "LVM3-M4 (GSLV Mk III)",
    "duration": "Lunar surface operations lasted ~14 Earth days (1 lunar day)",
    "science_return": { "expected_outcomes": [ "First successful landing near the lunar south pole", "Surface temperature data and seismic activity recorded", "Rover mobility and terrain analysis conducted successfully", "Enhanced understanding of Moon’s polar geology and potential water ice presence" ] },
    "links": { "official_site": "https://www.isro.gov.in/Chandrayaan3.html", "press_release": "https://www.isro.gov.in/press-release/Chandrayaan3-landing.html" }
  },
  {
    "mission_name": "Psyche",
    "description": "NASA mission to explore the metallic asteroid 16 Psyche, believed to be the exposed nickel-iron core of an early planetesimal.",
    "agency": "NASA",
    "type": "Asteroid / Deep Space Exploration",
    "launch_date": "2023-10-13",
    "status": "Ongoing",
    "target": { "body": "Asteroid 16 Psyche", "region": "Asteroid Belt (between Mars and Jupiter)" },
    "objectives": [ "Determine whether Psyche is the core of a planetesimal (a building block of planets).", "Understand planetary core formation and differentiation processes.", "Characterize Psyche’s composition, magnetic field, and geology.", "Test deep space communications with NASA’s laser system (Deep Space Optical Comm)." ],
    "spacecraft": { "name": "Psyche", "type": "Asteroid Orbiter", "features": [ "Solar-electric propulsion (Hall thrusters)", "High-gain antenna for deep space communication", "Laser communication demonstration system", "Gamma-ray and neutron spectrometer for elemental analysis" ] },
    "instruments": [ { "name": "Multispectral Imager", "function": "Captures high-resolution images to study surface features" }, { "name": "Magnetometer", "function": "Detects remnant magnetic field indicating a planetary core" }, { "name": "Gamma-ray and Neutron Spectrometer", "function": "Determines elemental composition of surface materials" }, { "name": "Deep Space Optical Communication (DSOC)", "function": "Tests high-bandwidth laser communications with Earth" } ],
    "launch_vehicle": "Falcon Heavy",
    "duration": "Arrival in 2029; Orbit phase: 26 months",
    "science_return": { "expected_outcomes": [ "First mission to explore a metal-rich asteroid", "Insights into building blocks of terrestrial planets", "Potential clues to early solar system formation", "Advancement of deep space communication technologies" ] },
    "links": { "official_site": "https://psyche.asu.edu/", "press_release": "https://www.nasa.gov/mission_pages/psyche/overview/index.html" }
  },
  {
    "mission_name": "Axiom Mission 3 (Ax-3)",
    "description": "A private human spaceflight mission to the International Space Station (ISS) operated by Axiom Space, marking the third commercial astronaut flight under Axiom's program.",
    "agency": "Axiom Space / NASA / SpaceX",
    "type": "Human Spaceflight / Commercial ISS Mission",
    "launch_date": "2024-01-18",
    "end_date": "2024-02-09",
    "status": "Completed",
    "target": { "body": "International Space Station (ISS)", "region": "Low Earth Orbit (LEO)" },
    "objectives": [ "Transport a crew of commercial astronauts to the ISS for research and outreach.", "Demonstrate capabilities of commercial human spaceflight missions.", "Perform microgravity research and international science payload experiments.", "Support future goals of building and transitioning to Axiom’s own space station modules." ],
    "spacecraft": { "name": "Crew Dragon Freedom", "type": "Crew Capsule", "features": [ "Autonomous docking and reentry systems", "Environmental control and life support", "Touchscreen navigation interface", "Supports extended-duration low-Earth orbit missions" ] },
    "instruments": [],
    "launch_vehicle": "Falcon 9",
    "duration": "22 days (ISS stay included)",
    "science_return": { "expected_outcomes": [ "Completion of multidisciplinary science experiments in microgravity.", "Operational data supporting commercial crew operations and training.", "Advancement of biomedical, physics, and Earth observation studies" ] },
    "links": { "official_site": "https://www.axiomspace.com/missions/ax-3", "press_release": "https://www.nasa.gov/feature/axiom-mission-3-successfully-returns-to-earth" }
  },
  {
    "mission_name": "Tiangong Space Station Expansion",
    "description": "Ongoing efforts to expand and maintain the Chinese Tiangong Space Station, including crew rotations, resupply missions, and the addition of scientific modules.",
    "agency": "CNSA",
    "type": "Human Spaceflight",
    "launch_date": "2022-07-24",
    "status": "Ongoing",
    "target": { "body": "LEO", "region": "Tiangong Space Station" },
    "objectives": [ "Complete modular assembly of the Tiangong Space Station including the core and lab modules.", "Ensure continuous crewed presence aboard the station through regular Shenzhou missions.", "Conduct scientific experiments across space medicine, materials science, and Earth observation.", "Support China's long-term goal of an independent, permanently crewed space platform." ],
    "spacecraft": { "name": "Tiangong (Modules: Tianhe, Wentian, Mengtian)", "type": "Modular Orbital Station", "features": [ "Pressurized crew modules with living and working quarters", "Robotic arm for module positioning and maintenance", "International experiment payloads", "Docking ports for crew and cargo vehicles" ] },
    "instruments": [ { "name": "Space Science Cabinets", "function": "Support multidisciplinary experiments in physics, biology, and Earth science" }, { "name": "External Payload Platforms", "function": "Allow exposure of experiments to the space environment" } ],
    "launch_vehicle": "Long March 5B, Long March 2F (for crew)",
    "duration": "Ongoing with regular rotations and expansions (2022–)",
    "science_return": { "expected_outcomes": [ "Continuous flow of scientific data in low-Earth orbit from a Chinese-led platform.", "Operational readiness for long-term human habitation in space.", "Support for international and bilateral collaborations with partner nations." ] },
    "links": { "official_site": "http://www.cmse.gov.cn", "press_release": "http://www.cmse.gov.cn/xwzx/202207/t20220724_50622.html" }
  },
  {
    "mission_name": "Lucy Mission",
    "description": "NASA's first mission to study the Trojan asteroids, ancient small bodies that share Jupiter's orbit and may hold clues to the early solar system.",
    "agency": "NASA",
    "type": "Deep Space Exploration",
    "launch_date": "2021-10-16",
    "status": "Ongoing",
    "target": { "body": "Jupiter Trojans", "region": "Lagrange Points L4 and L5 of Jupiter" },
    "objectives": [ "Explore and characterize the composition, geology, and physical properties of multiple Trojan asteroids.", "Understand the diversity of primitive bodies that formed the outer planets.", "Study the origins and evolution of the solar system through these 'fossils' of planetary formation.", "Perform multiple flybys of different Trojan groups (L4 and L5 swarms)." ],
    "spacecraft": { "name": "Lucy", "type": "Solar-Powered Deep Space Probe", "features": [ "Two large solar arrays for power generation beyond Mars’ orbit", "High-gain antenna for deep space communication", "Lightweight composite structure for long-duration flight", "Autonomous navigation and fault protection systems" ] },
    "instruments": [ { "name": "L'LORRI", "function": "High-resolution visible imager for surface geology" }, { "name": "L'TES", "function": "Thermal emission spectrometer for surface temperature mapping" }, { "name": "L'Ralph", "function": "Visible and infrared spectrometer for surface composition analysis" }, { "name": "Radio Science Investigation", "function": "Measures mass and density via Doppler tracking" } ],
    "launch_vehicle": "Atlas V 401",
    "duration": "12-year mission covering 8 asteroid flybys (2021–2033)",
    "science_return": { "expected_outcomes": [ "First close-up observations of Trojan asteroids in both L4 and L5 regions", "Comparative analysis of D-type and P-type asteroids", "New insights into solar system formation and planetary migration models" ] },
    "links": { "official_site": "https://www.nasa.gov/lucy", "press_release": "https://www.nasa.gov/press-release/nasa-s-lucy-mission-launches-to-study-trojan-asteroids" }
  },
  {
    "mission_name": "Mars Sample Return - Fetch Rover",
    "description": "A planned ESA rover designed to retrieve cached samples collected by NASA's Perseverance rover on Mars and deliver them to a Mars Ascent Vehicle for return to Earth.",
    "agency": "ESA",
    "type": "Planetary Science",
    "launch_date": "2028-08-01",
    "status": "Planned",
    "target": { "body": "Mars", "region": "Jezero Crater" },
    "objectives": [ "Locate and retrieve sealed sample tubes left by NASA's Perseverance rover.", "Transport the collected samples to the Mars Ascent Vehicle for launch into Mars orbit.", "Support NASA and ESA's joint Mars Sample Return (MSR) campaign.", "Demonstrate advanced autonomous mobility and precision robotic handling on Martian terrain." ],
    "spacecraft": { "name": "Fetch Rover", "type": "Autonomous Mars Rover", "features": [ "High-precision robotic arm for sample handling", "AI-based terrain navigation and obstacle avoidance", "Thermal and dust shielding for long-term survival", "Compact and lightweight frame for agility" ] },
    "instruments": [ { "name": "Sample Recovery System", "function": "Locates and picks up sample tubes left on the surface" }, { "name": "Navigation Cameras", "function": "Enable autonomous movement and localization" }, { "name": "Terrain Mapping Sensors", "function": "Assist in planning efficient paths through complex landscapes" } ],
    "launch_vehicle": "Ariane 6 (Tentative)",
    "duration": "Expected mission duration: ~2 Earth years on Mars",
    "science_return": { "expected_outcomes": [ "Enable humanity’s first return of Martian samples to Earth", "Preserve geological context of Mars' ancient environments", "Provide materials for analysis by Earth-based labs for decades to come" ] },
    "links": { "official_site": "https://exploration.esa.int/web/mars/-/mars-sample-return", "press_release": "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/Mars_Sample_Return_overview" }
  },
  {
    "mission_name": "Hypothetical SLS Test Flight Failure",
    "description": "A fictional test flight of an SLS Block 1 variant that experienced an in-flight anomaly during a suborbital trajectory test.",
    "agency": "NASA",
    "type": "Launch Vehicle Test",
    "launch_date": "2027-03-10",
    "end_date": "2027-03-10",
    "status": "Failed",
    "target": { "body": "N/A", "region": "Suborbital Test Range" },
    "objectives": [ "Test flight performance of SLS Block 1 variant under near-flight conditions.", "Validate avionics, telemetry systems, and stage separation mechanisms.", "Assess flight trajectory control in suborbital regime.", "Gather data for future improvements in launch vehicle reliability." ],
    "spacecraft": { "name": "SLS Block 1 Test Vehicle", "type": "Launch Vehicle (Suborbital)", "features": [ "Core stage with RS-25 engines", "Two solid rocket boosters (SRBs)", "Uncrewed upper stage mock payload", "Full telemetry suite with destruct command system" ] },
    "instruments": [ { "name": "Telemetry Pack 1", "function": "Monitors structural loads and stress distribution during ascent" }, { "name": "Flight Guidance Recorder", "function": "Logs trajectory deviations and system performance in real-time" }, { "name": "Stage Interface Sensor System", "function": "Evaluates performance of stage separation mechanisms" } ],
    "launch_vehicle": "SLS Block 1 (Prototype)",
    "duration": "Approx. 4 minutes (terminated early due to anomaly)",
    "science_return": { "expected_outcomes": [ "Partial validation of ground-based simulations under launch conditions", "Failure identified in stage separation system during ascent phase", "Data used to enhance safety and reliability of future SLS configurations" ] },
    "links": { "official_site": "https://www.nasa.gov/sls", "press_release": "https://www.nasa.gov/fictional/2027/sls-block1-test-flight-anomaly" }
  },
  {
    "mission_name": "BepiColombo",
    "description": "A joint ESA/JAXA mission to Mercury to study its composition, geophysics, atmosphere, magnetosphere, and geological history using two orbiters.",
    "agency": "ESA/JAXA",
    "type": "Planetary Science",
    "launch_date": "2018-10-20",
    "status": "Ongoing",
    "target": { "body": "Mercury", "region": "Inner Solar System" },
    "objectives": [ "Study Mercury’s magnetic field and magnetosphere in detail.", "Map the planet’s surface and determine its composition.", "Investigate the planet’s interior structure and geophysics.", "Understand Mercury’s exosphere and interactions with solar wind." ],
    "spacecraft": { "name": "BepiColombo", "type": "Dual-Orbiter System", "features": [ "Mercury Planetary Orbiter (MPO) by ESA", "Mercury Magnetospheric Orbiter (Mio) by JAXA", "Electric propulsion system for deep space cruise", "Thermal protection for harsh solar environment" ] },
    "instruments": [ { "name": "MERTIS", "function": "Thermal infrared spectrometer to study surface composition" }, { "name": "MGNS", "function": "Gamma-ray and neutron spectrometer for elemental analysis" }, { "name": "ISA", "function": "Italian spring accelerometer for internal structure measurements" }, { "name": "PHEBUS", "function": "UV spectrometer for exosphere analysis" }, { "name": "MPPE", "function": "Suite of plasma particle sensors on Mio" }, { "name": "MERMAG", "function": "Magnetometer for studying Mercury’s magnetic field" } ],
    "launch_vehicle": "Ariane 5 ECA",
    "duration": "Cruise to Mercury: ~7 years (Mercury arrival: 2025); science phase: 1–2 Earth years",
    "science_return": { "expected_outcomes": [ "First dual-orbiter measurements of Mercury’s environment", "High-resolution mapping of Mercury’s surface and magnetic field", "New insights into the formation of terrestrial planets near the Sun", "Comparative magnetospheric studies in extreme solar conditions" ] },
    "links": { "official_site": "https://sci.esa.int/web/bepicolombo", "press_release": "https://www.esa.int/Science_Exploration/Space_Science/BepiColombo_arrives_at_Mercury" }
  },
  {
    "mission_name": "Voyager 1",
    "description": "Launched in 1977, Voyager 1 is exploring the outer reaches of our solar system and is now in interstellar space. It was the first spacecraft to provide detailed images of Jupiter and Saturn.",
    "agency": "NASA",
    "type": "Deep Space Exploration",
    "launch_date": "1977-09-05",
    "status": "Ongoing",
    "target": { "body": "Interstellar Space", "region": "Beyond Heliosphere" },
    "objectives": [ "Conduct flybys of Jupiter and Saturn and study their moons, rings, and magnetic fields.", "Search for and characterize the interplanetary and interstellar medium.", "Transmit data from beyond the heliopause, the boundary between the solar wind and interstellar space.", "Carry a Golden Record containing sounds and images of Earth as a message to potential extraterrestrial life." ],
    "spacecraft": { "name": "Voyager 1", "type": "Deep Space Probe", "features": [ "High-gain antenna for long-range communication", "Radioisotope Thermoelectric Generator (RTG) for power", "Cosmic ray and plasma instruments", "Golden Record onboard with Earth information" ] },
    "instruments": [ { "name": "Imaging Science Subsystem (ISS)", "function": "Captured detailed photos of planets and moons" }, { "name": "Cosmic Ray Subsystem (CRS)", "function": "Measures cosmic rays and radiation in interstellar space" }, { "name": "Plasma Spectrometer (PLS)", "function": "Analyzes properties of the solar wind and plasma environment" }, { "name": "Magnetometer (MAG)", "function": "Measures magnetic fields in the solar system and beyond" }, { "name": "Photopolarimeter System (PPS)", "function": "Studied surface texture and composition via light scattering" } ],
    "launch_vehicle": "Titan IIIE-Centaur",
    "duration": "Ongoing (over 47 years in space)",
    "science_return": { "expected_outcomes": [ "First human-made object to reach interstellar space", "Data on Jupiter's and Saturn's atmospheres, rings, and moons", "Ongoing measurements of cosmic rays and magnetic fields outside the heliosphere", "Proof of concept for long-duration robotic space missions" ] },
    "links": { "official_site": "https://voyager.jpl.nasa.gov/mission/status/", "press_release": "https://www.nasa.gov/feature/voyager-1-in-interstellar-space" }
  },
  {
    "mission_name": "Voyager 2",
    "description": "Launched in 1977 before Voyager 1, Voyager 2 remains the only spacecraft to have visited all four outer planets: Jupiter, Saturn, Uranus, and Neptune. It is now traveling through interstellar space.",
    "agency": "NASA",
    "type": "Deep Space Exploration",
    "launch_date": "1977-08-20",
    "status": "Ongoing",
    "target": { "body": "Interstellar Space", "region": "Beyond Heliosphere" },
    "objectives": [ "Study all four gas and ice giants: Jupiter, Saturn, Uranus, and Neptune.", "Investigate the solar system’s edge and the transition into interstellar space.", "Transmit valuable long-term data about cosmic radiation, magnetic fields, and plasma waves.", "Carry a Golden Record as a time capsule and greeting to extraterrestrial life." ],
    "spacecraft": { "name": "Voyager 2", "type": "Deep Space Probe", "features": [ "Twin of Voyager 1 with similar design and systems", "Unique trajectory to fly by Uranus and Neptune", "RTG-powered systems for extended missions", "Golden Record onboard with Earth’s audio-visual information" ] },
    "instruments": [ { "name": "Planetary Radio Astronomy Investigation (PRA)", "function": "Detected and studied radio emissions from planetary magnetospheres" }, { "name": "Infrared Interferometer Spectrometer (IRIS)", "function": "Analyzed planetary atmospheres and thermal emissions" }, { "name": "Ultraviolet Spectrometer (UVS)", "function": "Studied planetary upper atmospheres and the heliosphere" }, { "name": "Low-Energy Charged Particles (LECP)", "function": "Measured charged particles in planetary magnetospheres and interstellar space" }, { "name": "Plasma Wave Subsystem (PWS)", "function": "Detected electron density in interstellar space" } ],
    "launch_vehicle": "Titan IIIE-Centaur",
    "duration": "Ongoing (over 47 years in space)",
    "science_return": { "expected_outcomes": [ "First and only flybys of Uranus and Neptune by a spacecraft", "Data supporting understanding of planetary magnetospheres and atmospheres", "Ongoing interstellar science complementing Voyager 1", "Demonstration of interstellar mission longevity and engineering excellence" ] },
    "links": { "official_site": "https://voyager.jpl.nasa.gov/mission/status/", "press_release": "https://www.nasa.gov/feature/voyager-2-enters-interstellar-space" }
  },
  {
    "mission_name": "New Horizons",
    "description": "A NASA mission designed to perform the first reconnaissance of Pluto and its moons, and to explore other Kuiper Belt Objects (KBOs) in the outer solar system.",
    "agency": "NASA",
    "type": "Deep Space Exploration",
    "launch_date": "2006-01-20",
    "status": "Ongoing",
    "target": { "body": "Pluto & Kuiper Belt", "region": "Outer Solar System" },
    "objectives": [ "Conduct the first close-up study of Pluto and its largest moon, Charon.", "Investigate Pluto’s surface features, atmosphere, and geological history.", "Perform flybys of additional Kuiper Belt Objects beyond Pluto.", "Collect data on the outer heliosphere and interplanetary medium." ],
    "spacecraft": { "name": "New Horizons", "type": "Flyby and Kuiper Belt Probe", "features": [ "Compact and lightweight deep space probe", "RTG-powered for extended operation far from the Sun", "High-gain antenna for long-range communication", "Redundant onboard storage and fault protection" ] },
    "instruments": [ { "name": "LORRI (Long Range Reconnaissance Imager)", "function": "High-resolution monochrome imaging of Pluto’s surface and KBOs" }, { "name": "Ralph", "function": "Color and infrared imaging spectrometer for surface composition" }, { "name": "Alice", "function": "Ultraviolet imaging spectrometer for studying Pluto’s atmosphere" }, { "name": "SWAP (Solar Wind Around Pluto)", "function": "Measures solar wind interactions with Pluto’s atmosphere" }, { "name": "PEPSSI", "function": "Energetic particle spectrometer for studying the space environment" }, { "name": "REX (Radio Science Experiment)", "function": "Examines atmospheric structure via radio occultation" }, { "name": "SDC (Student Dust Counter)", "function": "Detects dust particles in the outer solar system" } ],
    "launch_vehicle": "Atlas V 551",
    "duration": "Pluto flyby completed in 2015; KBO flybys and heliospheric science ongoing",
    "science_return": { "expected_outcomes": [ "Revealed complex geology and surprising atmosphere of Pluto", "Discovered possible cryovolcanoes and nitrogen ice flows", "First detailed observations of a Kuiper Belt Object (Arrokoth, 2019)", "Enhanced understanding of early solar system bodies" ] },
    "links": { "official_site": "https://www.nasa.gov/mission_pages/newhorizons/main/index.html", "press_release": "https://www.nasa.gov/press-release/nasa-s-new-horizons-team-reveals-new-scientific-results-from-pluto-flyby" }
  },
  {
    "mission_name": "Cassini-Huygens",
    "description": "A flagship mission to explore Saturn and its complex system, including the historic landing of ESA’s Huygens probe on Titan.",
    "agency": "NASA/ESA/ASI",
    "type": "Planetary Science",
    "launch_date": "1997-10-15",
    "end_date": "2017-09-15",
    "status": "Completed",
    "target": { "body": "Saturn System", "region": "Outer Solar System" },
    "objectives": [ "Study Saturn’s atmosphere, rings, and magnetosphere.", "Explore Titan’s surface and atmosphere via the Huygens lander.", "Observe the diverse moons of Saturn, including Enceladus and Iapetus.", "Understand the evolution and dynamics of a giant planet system." ],
    "spacecraft": { "name": "Cassini Orbiter + Huygens Probe", "type": "Orbiter + Atmospheric Entry Probe", "features": [ "RTG-powered spacecraft with extended deep space endurance", "High-gain antenna and relay capability for lander communication", "Deployable Huygens probe for atmospheric entry on Titan", "Multi-wavelength observation platforms for surface and subsurface analysis" ] },
    "instruments": [ { "name": "ISS (Imaging Science Subsystem)", "function": "Captured visible and near-infrared images of Saturn and its moons" }, { "name": "RADAR", "function": "Mapped surface features of Titan through dense atmosphere" }, { "name": "INMS (Ion and Neutral Mass Spectrometer)", "function": "Analyzed atmospheric composition of Titan and Enceladus" }, { "name": "CIRS (Composite Infrared Spectrometer)", "function": "Measured infrared emissions for thermal mapping" }, { "name": "MAG (Magnetometer)", "function": "Studied Saturn's magnetic field and interactions with solar wind" }, { "name": "GCMS (Gas Chromatograph Mass Spectrometer - Huygens)", "function": "Analyzed Titan’s atmospheric composition during descent" }, { "name": "DWE (Descent Imager/Spectral Radiometer - Huygens)", "function": "Captured images and spectra during Titan descent" } ],
    "launch_vehicle": "Titan IVB/Centaur",
    "duration": "20 years (13 years in orbit around Saturn)",
    "science_return": { "expected_outcomes": [ "Discovered liquid methane lakes and rivers on Titan", "Confirmed active geysers and subsurface ocean on Enceladus", "Revealed fine structure and dynamics of Saturn’s rings", "Demonstrated complex interactions between moons, rings, and magnetosphere" ] },
    "links": { "official_site": "https://solarsystem.nasa.gov/missions/cassini/overview/", "press_release": "https://www.nasa.gov/press-release/cassini-mission-to-saturn-ends-with-plunge-into-planet" }
  },
  {
    "mission_name": "JUICE (Jupiter Icy Moons Explorer)",
    "description": "An ESA-led mission to study Jupiter and its three largest icy moons—Ganymede, Europa, and Callisto—to investigate their potential habitability and subsurface oceans.",
    "agency": "ESA",
    "type": "Deep Space Exploration / Outer Planet Science",
    "launch_date": "2023-04-14",
    "status": "Ongoing",
    "target": { "body": "Jupiter System", "region": "Ganymede, Europa, Callisto" },
    "objectives": [ "Characterize the habitability of Ganymede, Europa, and Callisto.", "Study the composition, geology, and internal oceans of these moons.", "Analyze Jupiter’s magnetosphere, atmosphere, and system dynamics.", "Enter orbit around Ganymede, becoming the first spacecraft to orbit a moon other than Earth's." ],
    "spacecraft": { "name": "JUICE", "type": "Jupiter Orbiter", "features": [ "Large solar panels optimized for low sunlight conditions", "Radiation-hardened electronics for Jupiter’s harsh environment", "Advanced propulsion and autonomous navigation", "High-gain antenna for deep space communication" ] },
    "instruments": [ { "name": "JANUS", "function": "High-resolution optical camera for surface imaging" }, { "name": "MAJIS", "function": "Visible and infrared spectrometer for surface composition" }, { "name": "RIME", "function": "Radar sounder to probe subsurface structures" }, { "name": "J-MAG", "function": "Magnetometer to study magnetic fields and ocean detection" }, { "name": "UVS", "function": "Ultraviolet spectrometer for exosphere analysis" } ],
    "launch_vehicle": "Ariane 5 ECA",
    "duration": "Arrival at Jupiter: 2031; Ganymede orbit phase begins in 2034",
    "science_return": { "expected_outcomes": [ "Enhanced understanding of subsurface oceans and icy moon habitability", "New models of Jupiter's atmosphere, auroras, and magnetic interactions", "Geological maps and crustal analysis of multiple moons", "Pioneering deep-space operations in complex multi-body environments" ] },
    "links": { "official_site": "https://www.esa.int/Science_Exploration/Space_Science/Juice_overview", "press_release": "https://www.esa.int/Science_Exploration/Space_Science/Juice/Juice_lifts_off_on_mission_to_explore_Jupiter_s_moons" }
  },
  {
    "mission_name": "Dragonfly",
    "description": "A revolutionary NASA rotorcraft lander mission to Saturn's moon Titan, aiming to explore diverse surface environments and search for prebiotic chemistry.",
    "agency": "NASA",
    "type": "Planetary Science",
    "launch_date": "2027-07-01",
    "status": "Planned",
    "target": { "body": "Titan (Saturn’s moon)", "region": "Shangri-La Dune Fields" },
    "objectives": [ "Investigate Titan's prebiotic chemistry and potential for life.", "Study the atmosphere and weather patterns of Titan.", "Explore a variety of terrains — from dunes to possible cryovolcanic areas.", "Perform aerial and surface science using mobility across Titan’s low-gravity environment." ],
    "spacecraft": { "name": "Dragonfly", "type": "Rotorcraft Lander (Octocopter)", "features": [ "Eight rotors for powered flight in Titan’s thick atmosphere", "RTG-powered for long-duration surface operations", "Autonomous navigation and hazard detection systems", "Sample collection and in-situ analysis instruments" ] },
    "instruments": [ { "name": "DraMS (Dragonfly Mass Spectrometer)", "function": "Analyzes organic materials and surface composition" }, { "name": "GCMS", "function": "Identifies molecular compounds for signs of life-related chemistry" }, { "name": "Camera Suite", "function": "Panoramic and microscopic imaging of Titan's terrain" }, { "name": "Meteorology and Seismology Package", "function": "Monitors Titan's weather and internal seismic activity" } ],
    "launch_vehicle": "Falcon Heavy (Planned)",
    "duration": "Arrival at Titan by 2034; primary mission expected to last 2.7 years",
    "science_return": { "expected_outcomes": [ "Detailed understanding of Titan’s complex organic chemistry", "Insight into habitability in icy worlds beyond Earth", "First aerial exploration of another planetary body", "New models of pre-life chemical evolution in the outer solar system" ] },
    "links": { "official_site": "https://dragonfly.jhuapl.edu/", "press_release": "https://www.nasa.gov/press-release/nasa-s-dragonfly-will-fly-around-titan-looking-for-origins-signs-of-life" }
  },
  {
    "mission_name": "VERITAS (Venus Emissivity, Radio Science, InSAR, Topography, and Spectroscopy)",
    "description": "A NASA Discovery mission to map Venus’ surface in high resolution and investigate whether it had past oceans, volcanic activity, or tectonic features.",
    "agency": "NASA",
    "type": "Planetary Science",
    "launch_date": "2031-01-01",
    "status": "Planned",
    "target": { "body": "Venus", "region": "Global Venusian Surface" },
    "objectives": [ "Produce high-resolution topographic maps of Venus to determine geologic processes.", "Search for active volcanism and surface deformation.", "Determine the planet's geologic history and why it evolved so differently from Earth.", "Analyze surface composition to infer past presence of water." ],
    "spacecraft": { "name": "VERITAS Orbiter", "type": "Venus Orbiter", "features": [ "Synthetic Aperture Radar (SAR) for surface imaging through dense clouds", "Near-infrared spectrometer to detect surface composition", "Gravity science investigation tools for interior structure analysis", "Solar-powered spacecraft with high data return capability" ] },
    "instruments": [ { "name": "VenSAR", "function": "Synthetic Aperture Radar to map surface topography and deformation" }, { "name": "VEM (Venus Emissivity Mapper)", "function": "Infrared spectrometer for surface composition and volcanic activity" }, { "name": "Gravity Science Package", "function": "Tracks spacecraft motion to infer Venus’ internal structure" } ],
    "launch_vehicle": "TBD (Expected to be Falcon 9 or Atlas V)",
    "duration": "Mission duration expected ~3 years in orbit",
    "science_return": { "expected_outcomes": [ "First global topographic map of Venus since Magellan", "Identification of active volcanic regions", "Understanding of Earth-Venus geological divergence", "Clues to Venus’ potential early habitability" ] },
    "links": { "official_site": "https://www.nasa.gov/feature/veritas-venus-mission", "press_release": "https://www.jpl.nasa.gov/news/nasa-selects-2-missions-to-study-lost-habitable-world-of-venus" }
  },
  {
    "mission_name": "LUPEX (Lunar Polar Exploration Mission)",
    "description": "A collaborative mission by ISRO and JAXA to explore the Moon’s south polar region using a lander and a rover to assess the presence of water ice and lunar habitability.",
    "agency": "ISRO/JAXA",
    "type": "Lunar Science",
    "launch_date": "2026-01-01",
    "status": "Planned",
    "target": { "body": "Moon", "region": "South Polar Region" },
    "objectives": [ "Investigate the presence and quantity of water ice in permanently shadowed regions.", "Assess the feasibility of utilizing lunar resources for future human missions.", "Demonstrate precision landing and mobility in the challenging lunar south pole.", "Collect and analyze samples from deep lunar regolith layers." ],
    "spacecraft": { "name": "LUPEX Lander and Rover", "type": "Lunar Lander + Rover", "features": [ "Japanese lander with precision navigation systems", "Indian rover with drilling and analytical instruments", "Thermal protection and mobility for extreme lunar conditions", "Solar and battery hybrid power systems" ] },
    "instruments": [ { "name": "Lunar Radar Sounder", "function": "Penetrates subsurface layers to detect ice and rock boundaries" }, { "name": "Volatile Analysis Package", "function": "Identifies water and other volatiles in the regolith" }, { "name": "Drill System", "function": "Extracts samples up to 1 meter below surface" }, { "name": "Panoramic Camera and Spectrometer", "function": "Visual and compositional analysis of terrain" } ],
    "launch_vehicle": "H3 or GSLV Mk III (TBD)",
    "duration": "Expected mission life: 30 days (lander); 15 days (rover)",
    "science_return": { "expected_outcomes": [ "New data on availability of in-situ resources on the Moon", "High-resolution imaging and mapping of polar terrain", "Technology demonstration for future lunar bases", "Strengthened international lunar cooperation between ISRO and JAXA" ] },
    "links": { "official_site": "https://global.jaxa.jp/projects/sas/lunar_polar/index.html", "press_release": "https://www.isro.gov.in/Missions/LUPEX.html" }
  },
  {
    "mission_name": "Nancy Grace Roman Space Telescope",
    "description": "NASA’s next-generation wide-field infrared space telescope designed to investigate dark energy, exoplanets, and cosmic structures with a view 100x wider than Hubble.",
    "agency": "NASA",
    "type": "Astronomy / Space Telescope",
    "launch_date": "2027-05-01",
    "status": "Planned",
    "target": { "body": "Deep Space (Observational)", "region": "Lagrange Point 2 (L2)" },
    "objectives": [ "Investigate the nature of dark energy and the expansion of the universe.", "Conduct a census of exoplanets using gravitational microlensing.", "Perform wide-field surveys of galaxies, stars, and cosmic structures.", "Complement JWST and Hubble with large-scale sky coverage." ],
    "spacecraft": { "name": "Nancy Grace Roman Telescope", "type": "Space Observatory", "features": [ "2.4-meter primary mirror (same size as Hubble’s)", "Wide Field Instrument (WFI) with 300-megapixel camera", "Coronagraph for direct imaging of exoplanets", "Optimized for near-infrared imaging and spectroscopy" ] },
    "instruments": [ { "name": "Wide Field Instrument (WFI)", "function": "High-resolution infrared imaging over wide fields" }, { "name": "Coronagraph Instrument", "function": "Blocks starlight to directly image and analyze exoplanets" } ],
    "launch_vehicle": "Falcon Heavy (TBD)",
    "duration": "Planned mission life: 5 years (extendable to 10 years)",
    "science_return": { "expected_outcomes": [ "Deep surveys of the universe at unprecedented scale", "Breakthroughs in understanding dark energy and cosmic acceleration", "Discovery of thousands of new exoplanets", "Direct imaging of exoplanetary systems" ] },
    "links": { "official_site": "https://roman.gsfc.nasa.gov/", "press_release": "https://www.nasa.gov/feature/goddard/2022/nasa-s-nancy-grace-roman-space-telescope-overview" }
  },
  {
    "mission_name": "Sentinel-6 Michael Freilich",
    "description": "An Earth-observing satellite developed by a U.S.-European partnership to monitor global sea-level rise and ocean conditions with unmatched accuracy.",
    "agency": "NASA / ESA / NOAA / EUMETSAT",
    "type": "Earth Science / Oceanography",
    "launch_date": "2020-11-21",
    "status": "Ongoing",
    "target": { "body": "Earth", "region": "Global Oceans (LEO orbit)" },
    "objectives": [ "Measure global sea surface height with centimeter-level accuracy.", "Monitor ocean currents and their effect on climate change.", "Support long-term climate data continuity from the TOPEX/Poseidon and Jason series.", "Improve weather forecasting, especially for hurricanes and coastal flooding." ],
    "spacecraft": { "name": "Sentinel-6 Michael Freilich", "type": "Earth Observation Satellite", "features": [ "Radar altimeter for precise sea level measurements", "Microwave radiometer to correct atmospheric interference", "GNSS Radio Occultation for atmospheric profiling", "Sun-synchronous low Earth orbit for consistent global coverage" ] },
    "instruments": [ { "name": "Poseidon-4 Radar Altimeter", "function": "Measures distance from satellite to sea surface" }, { "name": "AMR-C (Advanced Microwave Radiometer – Climate)", "function": "Corrects for water vapor effects on radar signal" }, { "name": "GNSS-RO (Radio Occultation)", "function": "Provides vertical profiles of temperature and humidity" }, { "name": "Laser Retroreflector Array", "function": "Enhances orbit tracking accuracy" } ],
    "launch_vehicle": "Falcon 9",
    "duration": "Nominal 5.5 years (with possible extension)",
    "science_return": { "expected_outcomes": [ "High-precision sea level monitoring for climate modeling", "Better understanding of global ocean circulation", "Contribution to hurricane and weather forecasting models", "Continuity of over 30 years of sea-level observations" ] },
    "links": { "official_site": "https://www.nasa.gov/sentinel-6/", "press_release": "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-6/Sentinel-6_Michael_Freilich_lifts_off" }
  },
  {
    "mission_name": "DART (Double Asteroid Redirection Test)",
    "description": "NASA's first planetary defense mission that successfully demonstrated asteroid deflection by crashing a spacecraft into Dimorphos, the small moon of asteroid Didymos.",
    "agency": "NASA",
    "type": "Planetary Defense",
    "launch_date": "2021-11-24",
    "end_date": "2022-09-26",
    "status": "Completed",
    "target": { "body": "Dimorphos (moon of Didymos)", "region": "Near-Earth Asteroid" },
    "objectives": [ "Demonstrate kinetic impact technique for asteroid deflection.", "Change the orbital period of Dimorphos around Didymos.", "Test autonomous navigation system for targeting small body impact.", "Validate models for planetary defense response scenarios." ],
    "spacecraft": { "name": "DART", "type": "Kinetic Impact Vehicle", "features": [ "Single impactor spacecraft", "Didymos Reconnaissance and Asteroid Camera for Optical Navigation (DRACO)", "Autonomous real-time navigation using SMART Nav system", "Carried LICIAcube (CubeSat by ASI) for post-impact observation" ] },
    "instruments": [ { "name": "DRACO", "function": "Camera used for navigation and impact targeting" }, { "name": "SMART Nav", "function": "Autonomous navigation software guiding final approach" }, { "name": "LICIAcube (Carried Separately)", "function": "Captured images of impact and resulting ejecta" } ],
    "launch_vehicle": "Falcon 9",
    "duration": "10-month cruise; impact occurred on 2022-09-26",
    "science_return": { "expected_outcomes": [ "First successful asteroid deflection in history", "Validated kinetic impactor technique for planetary defense", "Observed significant orbital shift in Dimorphos", "Paved way for follow-up missions like Hera" ] },
    "links": { "official_site": "https://www.nasa.gov/planetarydefense/dart", "press_release": "https://www.nasa.gov/feature/nasa-s-dart-mission-successfully-changed-motion-of-asteroid" }
  },
  {
    "mission_name": "OSIRIS-REx",
    "description": "NASA’s mission to collect and return a sample from the near-Earth asteroid Bennu, helping scientists understand the early solar system and assess asteroid impact risk.",
    "agency": "NASA",
    "type": "Asteroid Sample Return",
    "launch_date": "2016-09-08",
    "end_date": "2023-09-24 (Earth return)",
    "status": "Completed (Sample returned)",
    "target": { "body": "Bennu", "region": "Near-Earth Asteroid" },
    "objectives": [ "Collect at least 60 grams of regolith from the surface of Bennu.", "Return the sample to Earth for detailed laboratory analysis.", "Map Bennu’s surface and analyze its composition and structure.", "Improve understanding of asteroid dynamics and potential impact risks." ],
    "spacecraft": { "name": "OSIRIS-REx", "type": "Sample Return Spacecraft", "features": [ "Touch-And-Go Sample Acquisition Mechanism (TAGSAM)", "High-resolution mapping cameras and spectrometers", "Solar-powered spacecraft with sample return capsule", "Navigation based on surface landmarks" ] },
    "instruments": [ { "name": "OCAMS", "function": "Cameras for imaging and navigation" }, { "name": "OVIRS", "function": "Spectrometer for visible and infrared reflectance" }, { "name": "OTES", "function": "Thermal emission spectrometer" }, { "name": "OLA", "function": "Laser altimeter for 3D surface mapping" }, { "name": "REXIS", "function": "X-ray imaging for elemental analysis" } ],
    "launch_vehicle": "Atlas V 411",
    "duration": "7-year round trip (2016–2023)",
    "science_return": { "expected_outcomes": [ "Sample of pristine asteroid material from the early solar system", "Clues about the origin of organics and water on Earth", "Improved modeling of asteroid motion and Yarkovsky effect", "Foundation for future asteroid mining and exploration missions" ] },
    "links": { "official_site": "https://www.nasa.gov/osiris-rex", "press_release": "https://www.nasa.gov/press-release/nasa-s-osiris-rex-asteroid-sample-return-mission-successfully-delivers-to-earth" }
  },
  {
    "mission_name": "James Webb Space Telescope (JWST)",
    "description": "The most powerful space telescope ever built, JWST is designed to observe the early universe, distant galaxies, exoplanets, and cosmic phenomena in infrared wavelengths.",
    "agency": "NASA / ESA / CSA",
    "type": "Space Telescope / Astronomy",
    "launch_date": "2021-12-25",
    "status": "Ongoing",
    "target": { "body": "Deep Space (Observational)", "region": "Sun–Earth Lagrange Point 2 (L2)" },
    "objectives": [ "Observe the formation of the first stars and galaxies after the Big Bang.", "Study the atmospheres of exoplanets for signs of habitability or life.", "Explore the structure and formation of galaxies and stellar nurseries.", "Provide infrared imaging beyond the capabilities of Hubble and Spitzer." ],
    "spacecraft": { "name": "James Webb Space Telescope", "type": "Infrared Space Observatory", "features": [ "6.5-meter segmented primary mirror", "Five-layer sunshield the size of a tennis court", "Cryogenic cooling system for infrared detectors", "High-gain communication with ground stations" ] },
    "instruments": [ { "name": "NIRCam", "function": "Near-Infrared Camera for imaging and surveys" }, { "name": "NIRSpec", "function": "Spectrograph for studying distant galaxies" }, { "name": "MIRI", "function": "Mid-Infrared Instrument for cold celestial objects" }, { "name": "FGS/NIRISS", "function": "Fine Guidance Sensor and Near-Infrared Imager for exoplanet spectroscopy" } ],
    "launch_vehicle": "Ariane 5 ECA",
    "duration": "Planned 10 years (extendable)",
    "science_return": { "expected_outcomes": [ "Deep infrared views of early universe structures", "Atmospheric data for hundreds of exoplanets", "Breakthroughs in star and galaxy formation science", "Unprecedented imagery of nebulae, brown dwarfs, and black holes" ] },
    "links": { "official_site": "https://webb.nasa.gov/", "press_release": "https://www.nasa.gov/press-release/nasa-s-james-webb-space-telescope-launches-to-see-first-galaxies" }
  },
  {
    "mission_name": "Chandrayaan-2",
    "description": "India’s second lunar exploration mission aimed to explore the Moon’s south polar region using an orbiter, lander, and rover. Though the lander failed to soft land, the orbiter continues to deliver valuable science.",
    "agency": "ISRO",
    "type": "Lunar Science / Orbiter + Attempted Lander",
    "launch_date": "2019-07-22",
    "status": "Ongoing (Orbiter)",
    "target": { "body": "Moon", "region": "South Polar Region" },
    "objectives": [ "Study lunar topography, mineralogy, exosphere, and elemental abundance.", "Search for water ice on the Moon’s surface.", "Demonstrate soft-landing and rover mobility technology.", "Support future lunar missions through high-resolution mapping." ],
    "spacecraft": { "name": "Chandrayaan-2", "type": "Orbiter + Lander (Vikram) + Rover (Pragyan)", "features": [ "High-resolution camera for lunar mapping", "Synthetic Aperture Radar for subsurface ice detection", "Lander Vikram with autonomous navigation (failed landing)", "Rover Pragyan intended for terrain analysis (not deployed)" ] },
    "instruments": [ { "name": "TMC 2", "function": "Terrain Mapping Camera for 3D lunar surface imaging" }, { "name": "CLASS", "function": "Spectrometer for lunar surface elemental analysis" }, { "name": "SAR", "function": "L-band Synthetic Aperture Radar to detect subsurface water ice" }, { "name": "CHACE-2", "function": "Study the composition of the lunar exosphere" } ],
    "launch_vehicle": "GSLV Mk III-M1",
    "duration": "Orbiter expected to operate for 7 years (launched in 2019)",
    "science_return": { "expected_outcomes": [ "High-resolution data on lunar surface composition", "Mapping of potential water ice deposits", "Extended life and performance of orbiter systems", "Enhanced mission experience for Chandrayaan-3" ] },
    "links": { "official_site": "https://www.isro.gov.in/Chandrayaan2.html", "press_release": "https://www.isro.gov.in/update/22-jul-2019/chandrayaan-2-launch-successful" }
  },
  {
    "mission_name": "Aditya-L1",
    "description": "India’s first dedicated solar observatory launched by ISRO to study the Sun’s outer atmosphere (corona), solar flares, and space weather from the Lagrange Point 1 (L1).",
    "agency": "ISRO",
    "type": "Solar Science / Space Weather",
    "launch_date": "2023-09-02",
    "status": "Ongoing",
    "target": { "body": "Sun", "region": "Lagrange Point 1 (L1)" },
    "objectives": [ "Observe solar corona and understand coronal heating processes.", "Track solar flares and coronal mass ejections (CMEs).", "Study solar wind behavior and its impact on space weather.", "Support forecasting models for geomagnetic storms affecting Earth." ],
    "spacecraft": { "name": "Aditya-L1", "type": "Solar Observatory Satellite", "features": [ "Positioned at L1 for continuous Sun observation", "Autonomous attitude control for solar pointing", "Solar-powered with sun-facing thermal shielding", "Multiple optical and particle-detecting instruments" ] },
    "instruments": [ { "name": "VELC (Visible Emission Line Coronagraph)", "function": "Observes the solar corona in visible light" }, { "name": "SUIT", "function": "UV imaging of the Sun’s chromosphere" }, { "name": "ASPEX", "function": "Analyzes solar wind particles" }, { "name": "Magnetometer", "function": "Measures magnetic fields in interplanetary space" }, { "name": "SoLEXS", "function": "Monitors X-ray solar flares" } ],
    "launch_vehicle": "PSLV-XL",
    "duration": "Nominal mission life: 5 years",
    "science_return": { "expected_outcomes": [ "Continuous, real-time monitoring of solar activity", "Valuable data for solar storm prediction", "Increased understanding of Sun-Earth interactions", "Support for satellite and communication system protection from space weather" ] },
    "links": { "official_site": "https://www.isro.gov.in/Aditya_L1.html", "press_release": "https://www.isro.gov.in/Launch_of_Aditya_L1.html" }
  },
  {
    "mission_name": "Mars Sample Return (MSR)",
    "description": "A multi-agency mission under development by NASA and ESA to retrieve samples collected by Perseverance rover and return them to Earth for advanced laboratory analysis.",
    "agency": "NASA / ESA",
    "type": "Planetary Science / Sample Return",
    "launch_date": "Early 2030s (TBD)",
    "status": "Planned",
    "target": { "body": "Mars", "region": "Jezero Crater (Sample Collection); Earth (Return)" },
    "objectives": [ "Collect Martian soil and rock samples gathered by Perseverance rover.", "Launch samples into Mars orbit using a small rocket (Mars Ascent Vehicle).", "Capture samples in orbit and return them safely to Earth.", "Search for ancient signs of life and study Mars’ geology and climate history." ],
    "spacecraft": { "name": "Sample Retrieval Lander, Mars Ascent Vehicle, Earth Return Orbiter", "type": "Multi-spacecraft mission", "features": [ "Perseverance as collector and depot", "Fetch rover or direct transfer to MAV", "Orbit rendezvous with ESA-built orbiter", "Earth Entry Vehicle with sterile containment" ] },
    "instruments": [ { "name": "Sample Containment System", "function": "Secure and isolate samples during return to prevent contamination" }, { "name": "Sample Transfer Arm (STA)", "function": "Robotic arm to move sample tubes to MAV" }, { "name": "Mars Ascent Vehicle (MAV)", "function": "Launch samples into Mars orbit" }, { "name": "Capture and Containment and Return System (CCRS)", "function": "Secure samples in Earth Return Orbiter" } ],
    "launch_vehicle": "TBD (potentially Atlas V or Ariane 6 for different modules)",
    "duration": "Mission span: ~10–11 years from collection to Earth return",
    "science_return": { "expected_outcomes": [ "First ever sample return from another planet", "Unprecedented insight into Mars’ past habitability", "Search for fossilized microbial life in Mars samples", "Enable long-term comparative planetary science" ] },
    "links": { "official_site": "https://mars.nasa.gov/msr/", "press_release": "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/Mars_Sample_Return" }
  },
  {
    "mission_name": "Hera",
    "description": "ESA’s mission to study the aftermath of NASA’s DART impact on asteroid moon Dimorphos, assess its internal structure, and validate planetary defense strategies.",
    "agency": "ESA",
    "type": "Planetary Defense / Asteroid Science",
    "launch_date": "2024-10-01 (TBD)",
    "status": "Planned",
    "target": { "body": "Dimorphos and Didymos", "region": "Near-Earth Asteroid System" },
    "objectives": [ "Measure the impact crater left by DART on Dimorphos.", "Determine the mass and internal structure of Dimorphos.", "Study binary asteroid dynamics and surface morphology.", "Demonstrate technologies for autonomous asteroid navigation." ],
    "spacecraft": { "name": "Hera", "type": "Asteroid Orbiter", "features": [ "Carries two CubeSats: Milani and Juventas", "Milani for spectral analysis and dust", "Juventas for radar tomography of the asteroid", "Autonomous navigation for proximity operations" ] },
    "instruments": [ { "name": "Asteroid Framing Camera (AFC)", "function": "High-resolution imaging of Dimorphos and crater" }, { "name": "Thermal Infrared Imager (TIRI)", "function": "Measures surface temperature and thermal properties" }, { "name": "JuRa (Juventas Radar)", "function": "Radar to probe internal structure of Dimorphos" }, { "name": "HyperScout", "function": "Hyperspectral imager on CubeSat for surface composition" } ],
    "launch_vehicle": "Ariane 6 or Falcon 9 (TBD)",
    "duration": "Arrival in 2026; study duration: ~6 months",
    "science_return": { "expected_outcomes": [ "Accurate measurement of kinetic impact effectiveness", "Data on internal structure and porosity of Dimorphos", "Improved models for planetary defense simulations", "Demonstration of future asteroid mission autonomy" ] },
    "links": { "official_site": "https://www.esa.int/Safety_Security/Hera", "press_release": "https://www.esa.int/Science_Exploration/Space_Safety/Hera_ESA_s_mission_to_asteroid_Dimorphos" }
  },
  {
    "mission_name": "Lunar Gateway",
    "description": "An international lunar orbital space station being developed by NASA, ESA, JAXA, and CSA, intended to support long-term lunar exploration under the Artemis program and beyond.",
    "agency": "NASA / ESA / JAXA / CSA",
    "type": "Lunar Orbit Platform / Human & Robotic Support",
    "launch_date": "First modules planned for 2025–2026",
    "status": "Planned",
    "target": { "body": "Moon (Orbit)", "region": "Near-Rectilinear Halo Orbit (NRHO)" },
    "objectives": [ "Provide support for long-term crewed lunar missions.", "Serve as a staging point for surface missions to the Moon and Mars.", "Enable research in deep space living and technology testing.", "Act as a communication relay and science lab in lunar orbit." ],
    "spacecraft": { "name": "Lunar Gateway (initial modules: HALO, PPE)", "type": "Modular Space Station", "features": [ "Habitation and Logistics Outpost (HALO)", "Power and Propulsion Element (PPE)", "Docking for Orion and lunar landers", "Expandable with international science and habitation modules" ] },
    "instruments": [ { "name": "ERS (External Robotic System)", "function": "Robotic arm system for cargo handling and maintenance" }, { "name": "DSOC Relay", "function": "Laser communications demonstration for high-data-rate transfer" }, { "name": "Environmental Monitoring Systems", "function": "Life support and radiation analysis" } ],
    "launch_vehicle": "Falcon Heavy, SLS, or commercial options (per module)",
    "duration": "Modular, multidecade platform (starting ~2025)",
    "science_return": { "expected_outcomes": [ "Sustained lunar presence with reusable infrastructure", "Preparation for Mars and deep space exploration", "New research on lunar exosphere, geology, and radiation", "International collaboration on long-duration spaceflight" ] },
    "links": { "official_site": "https://www.nasa.gov/gateway", "press_release": "https://www.nasa.gov/feature/what-is-the-gateway" }
  },
  {
    "mission_name": "Tianwen-1",
    "description": "China’s first successful interplanetary mission, which sent an orbiter, lander, and rover (Zhurong) to Mars to study the planet’s surface and environment.",
    "agency": "CNSA",
    "type": "Planetary Science / Mars Rover Mission",
    "launch_date": "2020-07-23",
    "status": "Partially ongoing (orbiter active, rover inactive as of 2022)",
    "target": { "body": "Mars", "region": "Utopia Planitia" },
    "objectives": [ "Orbit and map the Martian surface from space.", "Land a rover on Mars to analyze geology and climate.", "Search for signs of water-ice and study magnetic fields.", "Demonstrate China's deep space capabilities in orbit, entry, descent, and landing." ],
    "spacecraft": { "name": "Tianwen-1 (includes Zhurong rover)", "type": "Orbiter + Lander + Rover", "features": [ "High-resolution cameras and ground-penetrating radar", "Powered by solar arrays, with thermal regulation system", "Rover with six wheels and autonomous hazard avoidance", "Orbiter acts as relay and science platform" ] },
    "instruments": [ { "name": "Mars Rover Subsurface Exploration Radar", "function": "Probes ground structure to detect buried ice or rock" }, { "name": "Mars Surface Compound Detector", "function": "Identifies chemical composition of surface materials" }, { "name": "Navigation and Terrain Cameras", "function": "Panoramic imagery and path planning" }, { "name": "Meteorological Measuring Instrument", "function": "Records temperature, wind, pressure, and radiation" } ],
    "launch_vehicle": "Long March 5",
    "duration": "Rover operated ~1 year; orbiter continues as science platform",
    "science_return": { "expected_outcomes": [ "Detailed surface data from Utopia Planitia", "Radar mapping of shallow subsurface", "First Chinese images and weather data from Mars", "Validation of full Mars mission lifecycle by CNSA" ] },
    "links": { "official_site": "http://www.cnsa.gov.cn/", "press_release": "https://www.nature.com/articles/d41586-021-01321-5" }
  }
].flat();

// Helper to find agency ID by name
const getAgencyId = (name: string): string => {
  const agency = mockAgencies.find(a => a.name === name);
  if (agency) return agency.id;

  const found = mockAgencies.find(a => a.name.includes(name) || name.includes(a.name));
  return found ? found.id : 'agency-1'; // Default to NASA
};

// Helper to find mission type ID by name
const getMissionTypeId = (name: string): string => {
    const missionType = mockMissionTypes.find(mt => mt.name === name);
    if (missionType) return missionType.id;

    // Handle combined types like "Planetary Science / Sample Return"
    const partialMatch = mockMissionTypes.find(mt => name.startsWith(mt.name));
    if (partialMatch) return partialMatch.id;

    return 'type-1'; // Default to Planetary Science
};


const processedMissions: Mission[] = rawMissionData.map((raw: any) => {
    // Robust date parsing
    const launchDate = new Date(raw.launch_date);
    if (isNaN(launchDate.getTime())) {
        // This will skip missions with non-standard dates like "Early 2030s"
        return null; 
    }

    const endDate = raw.end_date ? new Date(raw.end_date) : undefined;
    if (endDate && isNaN(endDate.getTime())) {
        // Invalid end date, treat as undefined
        raw.end_date = undefined;
    }

    const missionName = raw.mission_name || "Unnamed Mission";

    return {
        id: missionName.toLowerCase().replace(/[\s()]+/g, '-').replace(/-$/, ''),
        name: missionName,
        description: raw.description,
        agencyId: getAgencyId(raw.agency),
        missionTypeId: getMissionTypeId(raw.type),
        launchDate: launchDate.toISOString(),
        endDate: raw.end_date ? new Date(raw.end_date).toISOString() : undefined,
        status: raw.status,
        target: raw.target,
        objectives: raw.objectives || [],
        spacecraft: raw.spacecraft,
        instruments: raw.instruments || [],
        launch_vehicle: raw.launch_vehicle,
        duration: raw.duration,
        science_return: raw.science_return,
        links: raw.links,
        targetDestination: raw.target?.body || 'Unknown',
        imageUrl: `https://placehold.co/600x400.png`,
        events: [], // Keep events empty as per original structure
    };
}).filter((mission): mission is Mission => mission !== null); // Filter out the null (invalid date) entries

// Remove duplicate missions by name
const uniqueMissions = Array.from(new Map(processedMissions.map(m => [m.name, m])).values());

// THIS IS THE CRUCIAL EXPORT
export const mockMissions: Mission[] = uniqueMissions;
