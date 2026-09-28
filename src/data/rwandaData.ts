export interface ProvinceData {
  id: string;
  name: string;
  kinyarwandaName: string;
  capital: string;
  districtsCount: number;
  districts: string[];
  keyEconomicPillar: string;
  terrain: string;
  highlight: string;
}

export interface IremboService {
  id: string;
  category: string;
  title: string;
  titleRw: string;
  agency: string;
  estimatedFeeRwf: number;
  deliveryTime: string;
  prerequisites: string[];
  onlinePortal: string;
  popular: boolean;
}

export interface CropData {
  id: string;
  name: string;
  nameRw: string;
  category: 'Export Cash Crop' | 'Food Staple' | 'Horticulture';
  mainDistricts: string[];
  optimalAltitude: string;
  annualRainfall: string;
  marketPriceRwfKg: number;
  priceTrend: '+4.2%' | '+2.5%' | '-1.1%' | '+6.8%' | '0.0%';
  harvestSeason: string;
  commonPests: string[];
  bestPractices: string;
}

export interface TourismDestination {
  id: string;
  name: string;
  type: 'National Park' | 'Cultural Heritage' | 'Water & Adventure' | 'Urban & MICE';
  location: string;
  highlights: string[];
  permitFee: string;
  bestTimeToVisit: string;
  conservationNote: string;
}

export interface DroneHospital {
  name: string;
  district: string;
  distanceKm: number;
  flightMinutes: number;
  hub: 'Muhanga Nest' | 'Kayonza Nest';
  criticalSupplies: string;
}

export const RWANDA_PROVINCES: ProvinceData[] = [
  {
    id: 'kigali',
    name: 'Kigali City',
    kinyarwandaName: 'Umujyi wa Kigali',
    capital: 'Kigali (Nyarugenge)',
    districtsCount: 3,
    districts: ['Gasabo', 'Kicukiro', 'Nyarugenge'],
    keyEconomicPillar: 'Financial Services, MICE Tourism, Tech Startups, Green City Kigali',
    terrain: 'Hilly urban plateaus, Nyabarongo valley basin, 1,567m average altitude',
    highlight: 'Kigali Innovation City, Norrsken Kigali, Kigali Convention Centre, Cleanest Capital in Africa',
  },
  {
    id: 'north',
    name: 'Northern Province',
    kinyarwandaName: 'Intara y’Amajyaruguru',
    capital: 'Musanze (Ruhengeri)',
    districtsCount: 5,
    districts: ['Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo'],
    keyEconomicPillar: 'Eco-Tourism, Mountain Gorilla Conservation, Irish Potatoes, High-grade Tea',
    terrain: 'Virunga volcanic chain (Karisimbi 4,507m, Bisoke), fertile volcanic soils',
    highlight: 'Volcanoes National Park, Sorwathe Tea, Twin Lakes (Burera & Ruhondo)',
  },
  {
    id: 'south',
    name: 'Southern Province',
    kinyarwandaName: 'Intara y’Amajyepfo',
    capital: 'Nyanza',
    districtsCount: 8,
    districts: ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango'],
    keyEconomicPillar: 'Higher Education, Specialty Bourbon Coffee, Cultural Heritage, Zipline Hub',
    terrain: 'Gently rolling hills, Central Plateau, high altitude coffee slopes',
    highlight: 'Huye Mountain Specialty Coffee, King’s Palace Museum in Nyanza, University of Rwanda',
  },
  {
    id: 'east',
    name: 'Eastern Province',
    kinyarwandaName: 'Intara y’Iburasirazuba',
    capital: 'Rwamagana',
    districtsCount: 7,
    districts: ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana'],
    keyEconomicPillar: 'Agri-Business, Dairy Farming (Inyange), Akagera Big Five Safari, Bugesera Airport',
    terrain: 'Savannah plains, low rolling hills, lakes and wetland depressions (Lake Ihema)',
    highlight: 'Akagera National Park (rhinos, lions), New Bugesera International Airport, Dairy belt',
  },
  {
    id: 'west',
    name: 'Western Province',
    kinyarwandaName: 'Intara y’Iburengerazuba',
    capital: 'Karongi (Kibuye)',
    districtsCount: 7,
    districts: ['Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
    keyEconomicPillar: 'Cross-border Trade, Lake Kivu Methane Gas to Power, Nyungwe Rainforest, Tea',
    terrain: 'Albertine Rift Escarpment, Lake Kivu shoreline, montane rainforest (Nyungwe)',
    highlight: 'Nyungwe National Park Canopy Walk, Lake Kivu beaches, KivuWatt gas extraction',
  },
];

export const IREMBO_SERVICES: IremboService[] = [
  {
    id: 'criminal_record',
    category: 'Police & Justice',
    title: 'Criminal Record Certificate (Casier Judiciaire)',
    titleRw: 'Icyemezo cy’Ubushinjacyaha (Casier Judiciaire)',
    agency: 'National Public Prosecution Authority (NPPA)',
    estimatedFeeRwf: 1200,
    deliveryTime: '1 to 2 business days',
    prerequisites: ['Rwandan National ID Number', 'Valid Phone number for SMS notifications'],
    onlinePortal: 'irembo.gov.rw',
    popular: true,
  },
  {
    id: 'birth_cert',
    category: 'Civil Status',
    title: 'Birth Certificate (Icyemezo cy’Amavuko)',
    titleRw: 'Icyemezo cy’Amavuko',
    agency: 'National Identification Agency (NIDA) / MINALOC',
    estimatedFeeRwf: 500,
    deliveryTime: 'Instant (e-Certificate download)',
    prerequisites: ['National ID / Child Registration in CRVS', 'Mother/Father ID'],
    onlinePortal: 'irembo.gov.rw',
    popular: true,
  },
  {
    id: 'driving_provisional',
    category: 'Traffic & Transport',
    title: 'Provisional Driving License Exam Registration',
    titleRw: 'Kwandikisha Ikizamini cy’Uruhushya rwo gutwara Ibinyabiziga (Provisoire)',
    agency: 'Rwanda National Police (RNP) Traffic Dept',
    estimatedFeeRwf: 5000,
    deliveryTime: 'Scheduled Exam Date via SMS',
    prerequisites: ['Applicant age 18+', 'National ID number', 'Selection of District Exam Centre'],
    onlinePortal: 'irembo.gov.rw',
    popular: true,
  },
  {
    id: 'land_upi_transfer',
    category: 'Land & Property',
    title: 'Land Title Transfer & Mutation (Ihererekanya ry’Ubutaka)',
    titleRw: 'Ihererekanya ry’Ubutaka n’Umutungo',
    agency: 'National Land Authority (NLA)',
    estimatedFeeRwf: 27000,
    deliveryTime: '3 to 5 business days',
    prerequisites: ['UPI (Unique Parcel Identifier)', 'Notarized sales contract or donation deed', 'Seller & Buyer IDs'],
    onlinePortal: 'irembo.gov.rw',
    popular: true,
  },
  {
    id: 'rdb_business_reg',
    category: 'Business & Trade',
    title: 'RDB New Company Online Incorporation',
    titleRw: 'Kwandikisha Isosiyete Nshya muri RDB',
    agency: 'Rwanda Development Board (RDB)',
    estimatedFeeRwf: 0,
    deliveryTime: 'Under 6 hours (Free of charge)',
    prerequisites: ['Proposed Company Name', 'Shareholder IDs/Passports', 'Articles of Association template'],
    onlinePortal: 'rdb.rw / irembo.gov.rw',
    popular: true,
  },
  {
    id: 'mutuelle_de_sante',
    category: 'Healthcare & Social',
    title: 'Community-Based Health Insurance (Mutuelle de Santé / RSSB)',
    titleRw: 'Ubwishingizi bw’Ubuzima (Mituweli / RSSB)',
    agency: 'Rwanda Social Security Board (RSSB)',
    estimatedFeeRwf: 3000,
    deliveryTime: 'Instant activation upon MoMo/Bank payment',
    prerequisites: ['Household Ubudehe identification', 'Family member ID numbers'],
    onlinePortal: 'irembo.gov.rw',
    popular: true,
  },
  {
    id: 'passport_application',
    category: 'Immigration & Travel',
    title: 'East African Community e-Passport Application',
    titleRw: 'Gusaba Pasiporo nshya y’Umuryango wa Afurika y’Iburasirazuba',
    agency: 'Directorate General of Immigration and Emigration (DGIE)',
    estimatedFeeRwf: 75000,
    deliveryTime: '4 business days (expedited available)',
    prerequisites: ['Valid Rwandan National ID', 'Recommendation letter / proof of travel or employment'],
    onlinePortal: 'irembo.gov.rw',
    popular: false,
  },
  {
    id: 'marriage_cert',
    category: 'Civil Status',
    title: 'Civil Marriage Certificate',
    titleRw: 'Icyemezo cyo Gushyingirwa mu Mategeko',
    agency: 'Ministry of Local Government (MINALOC)',
    estimatedFeeRwf: 1500,
    deliveryTime: 'Immediate upon sector registrar sign-off',
    prerequisites: ['Both Spouses National IDs', 'Sector publication of bans (21 days prior)'],
    onlinePortal: 'irembo.gov.rw',
    popular: false,
  },
];

export const RWANDA_CROPS: CropData[] = [
  {
    id: 'coffee',
    name: 'Specialty Arabica Coffee (Bourbon)',
    nameRw: 'Ikawa ya Bourbon',
    category: 'Export Cash Crop',
    mainDistricts: ['Huye', 'Nyamasheke', 'Karongi', 'Gakenke', 'Rutsiro'],
    optimalAltitude: '1,400m – 2,200m',
    annualRainfall: '1,200 – 1,800mm',
    marketPriceRwfKg: 460,
    priceTrend: '+6.8%',
    harvestSeason: 'February – July (Main Cherry harvest)',
    commonPests: ['Coffee Berry Borer (Stephanoderes hampei)', 'Coffee Leaf Rust (Hemileia vastatrix)', 'Antestia Bug'],
    bestPractices: 'Hand-pick cherry red only (85+ cupping potential). Prompt pulping at local CWS within 8 hours. Mulching with vetiver grass.',
  },
  {
    id: 'tea',
    name: 'Highland Black & Orthodox Tea',
    nameRw: 'Icyayi cyo mu misozi miremire',
    category: 'Export Cash Crop',
    mainDistricts: ['Gicumbi (Sorwathe)', 'Nyabihu (Pfunda)', 'Nyamagabe (Gisovu)', 'Rulindo'],
    optimalAltitude: '1,800m – 2,500m',
    annualRainfall: '1,500 – 2,000mm',
    marketPriceRwfKg: 310,
    priceTrend: '+2.5%',
    harvestSeason: 'Year-round (Peak flush during rainy seasons)',
    commonPests: ['Red spider mite', 'Tea mosquito bug', 'Root rot in poorly drained volcanic subsoils'],
    bestPractices: 'Two leaves and a bud plucking standard. Contour planting across steep hills to arrest soil erosion.',
  },
  {
    id: 'irish_potatoes',
    name: 'Kinigi Irish Potatoes (Ibirayi)',
    nameRw: 'Ibirayi bya Kinigi',
    category: 'Food Staple',
    mainDistricts: ['Musanze', 'Nyabihu', 'Burera', 'Rubavu'],
    optimalAltitude: '1,800m – 2,600m (Volcanic soils)',
    annualRainfall: '1,300 – 1,600mm',
    marketPriceRwfKg: 480,
    priceTrend: '+4.2%',
    harvestSeason: 'Season A (Dec - Jan) & Season B (May - June)',
    commonPests: ['Late Blight (Phytophthora infestans)', 'Bacterial Wilt (Ralstonia solanacearum)'],
    bestPractices: 'Use certified clean seeds from RAB/SPF-Ikigega. Ridging along contours. Preventive fungicide spraying before rain peaks.',
  },
  {
    id: 'bananas',
    name: 'Cooking & Brewing Bananas (Igitoki)',
    nameRw: 'Ibitoki n’Urwagwa',
    category: 'Food Staple',
    mainDistricts: ['Rwamagana', 'Gatsibo', 'Ngoma', 'Kamonyi', 'Ruhango'],
    optimalAltitude: '1,300m – 1,700m',
    annualRainfall: '1,000 – 1,400mm',
    marketPriceRwfKg: 350,
    priceTrend: '0.0%',
    harvestSeason: 'Continuous harvest year-round',
    commonPests: ['Banana Bacterial Wilt / Kirabiranya (BXW)', 'Banana Weevil', 'Fusarium Panama Wilt'],
    bestPractices: 'Debud male flowers using wooden forked sticks. Disinfect cutting machetes with fire or bleach. Strict quarantine of infected mats.',
  },
  {
    id: 'climbing_beans',
    name: 'Iron-Biofortified Climbing Beans (Ibihyimbo)',
    nameRw: 'Ibishyimbo by’Imishingiriro',
    category: 'Food Staple',
    mainDistricts: ['Musanze', 'Gicumbi', 'Gisagara', 'Nyamagabe'],
    optimalAltitude: '1,500m – 2,300m',
    annualRainfall: '1,000 – 1,500mm',
    marketPriceRwfKg: 950,
    priceTrend: '-1.1%',
    harvestSeason: 'January (Season A) & June (Season B)',
    commonPests: ['Bean Stem Maggot', 'Angular Leaf Spot', 'Aphids'],
    bestPractices: 'Stake firmly with bamboo or pennisetum poles. High yield potential up to 3.5 tons/ha with iron-rich varieties (RWR2245).',
  },
  {
    id: 'maize',
    name: 'Hybrid White Maize (Ibigori)',
    nameRw: 'Ibigori bya Kijyambere',
    category: 'Food Staple',
    mainDistricts: ['Nyagatare', 'Gatsibo', 'Kirehe', 'Bugesera'],
    optimalAltitude: '1,300m – 1,800m',
    annualRainfall: '800 – 1,200mm',
    marketPriceRwfKg: 420,
    priceTrend: '+2.5%',
    harvestSeason: 'February – March (Season A)',
    commonPests: ['Fall Armyworm (Spodoptera frugiperda)', 'Maize Stalk Borer'],
    bestPractices: 'Crop intensification program (CIP) spacing. Early scout for armyworm egg clusters. Post-harvest hermetic bag storage (PICS).',
  },
];

export const TOURISM_DESTINATIONS: TourismDestination[] = [
  {
    id: 'volcanoes_np',
    name: 'Volcanoes National Park (Pariki y’Ibirunga)',
    type: 'National Park',
    location: 'Musanze, Northern Province',
    highlights: [
      'Mountain Gorilla Trekking (over 12 habituated gorilla families)',
      'Rare Golden Monkey Tracking in bamboo canopies',
      'Mount Bisoke Crater Lake Summit (3,711m)',
      'Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund',
    ],
    permitFee: '$1,500 per person (Standard) / $200 for EAC Citizens',
    bestTimeToVisit: 'June to September & December to February (Dry Seasons)',
    conservationNote: '10% of park tourism revenue directly funds local community infrastructure (schools, water clinics, health centers).',
  },
  {
    id: 'nyungwe_np',
    name: 'Nyungwe National Park (Pariki ya Nyungwe)',
    type: 'National Park',
    location: 'South-West Albertine Rift (Rusizi / Nyamagabe)',
    highlights: [
      'UNESCO World Heritage Rainforest',
      'East Africa’s Only Canopy Walkway (70m above forest floor)',
      '13 Primate Species including habituated Chimpanzees and Angolan Colobus',
      'Kamiranzovu Waterfall and Swamp Trail',
    ],
    permitFee: '$150 Chimpanzee Trekking / $40 Canopy Walk',
    bestTimeToVisit: 'Year-round; drier trails from June to August',
    conservationNote: 'Feeds 70% of Rwanda’s freshwater catchment basins connecting the Congo and Nile river sources.',
  },
  {
    id: 'akagera_np',
    name: 'Akagera National Park (Pariki y’Akagera)',
    type: 'National Park',
    location: 'Eastern Province border with Tanzania',
    highlights: [
      'Central Africa’s largest protected wetland',
      'Big Five Safari: Lions, Black & White Rhinos, Elephants, Leopards, Buffalos',
      'Lake Ihema boat cruise with hippos, crocodiles, and Shoebill stork',
      'Day & Night Game Drives',
    ],
    permitFee: '$100 per day entry (International) / $16,000 RWF (Rwandan Citizens)',
    bestTimeToVisit: 'July to September (animals gather around water points)',
    conservationNote: 'Managed in partnership with African Parks; zero poaching of key megafauna since restoration.',
  },
  {
    id: 'lake_kivu_trail',
    name: 'Lake Kivu & Congo Nile Trail',
    type: 'Water & Adventure',
    location: 'Rubavu (Gisenyi) to Rusizi via Karongi',
    highlights: [
      '227km Congo Nile hiking, biking, and 4x4 trail along the rift',
      'Rubavu white sandy beaches and thermal hot springs',
      'Night fishing experience with singing fishermen in Karongi',
      'Napoleon Island fruit bat colony kayaking',
    ],
    permitFee: 'Free access for trail hiking; local guide fee $25-$40/day',
    bestTimeToVisit: 'May to October for dry trail conditions',
    conservationNote: 'Methane gas extraction (KivuWatt) generates clean electricity while de-risking the lake.',
  },
  {
    id: 'kigali_cultural',
    name: 'Kigali Cultural & Innovation Hub',
    type: 'Urban & MICE',
    location: 'Kigali City (Nyarugenge, Gasabo)',
    highlights: [
      'Kigali Genocide Memorial (Gisozi)',
      'Kigali Convention Centre & Radisson dome',
      'Inema Arts Centre & Kimironko Market tour',
      'Nyamirambo Women’s Centre walking tour & cooking classes',
    ],
    permitFee: 'Free entry to Memorial (donations encouraged); modest fees for workshops',
    bestTimeToVisit: 'Year-round destination with pleasant 21°C–27°C mountain climate',
    conservationNote: 'Pioneer of monthly Umuganda community greening and Car-Free Zones.',
  },
];

export const ZIPLINE_DRONE_NETWORK: DroneHospital[] = [
  {
    name: 'Butaro District Hospital (Cancer Center)',
    district: 'Burera (Northern)',
    distanceKm: 78,
    flightMinutes: 44,
    hub: 'Muhanga Nest',
    criticalSupplies: 'Specialty Oncology Blood Fractions, O-Negative, Platelets',
  },
  {
    name: 'Kibuye Referral Hospital',
    district: 'Karongi (Western)',
    distanceKm: 64,
    flightMinutes: 36,
    hub: 'Muhanga Nest',
    criticalSupplies: 'Emergency Maternal Postpartum Hemorrhage Blood, Anti-venom',
  },
  {
    name: 'Nyanza District Hospital',
    district: 'Nyanza (Southern)',
    distanceKm: 42,
    flightMinutes: 24,
    hub: 'Muhanga Nest',
    criticalSupplies: 'Pediatric Blood Bags, Rabies Vaccines, Emergency Plasma',
  },
  {
    name: 'Kirehe District Hospital',
    district: 'Kirehe (Eastern)',
    distanceKm: 85,
    flightMinutes: 48,
    hub: 'Kayonza Nest',
    criticalSupplies: 'Maternal Blood Units, Tetanus Antitoxin, Snakebite Serums',
  },
  {
    name: 'Nyagatare Hospital',
    district: 'Nyagatare (Eastern)',
    distanceKm: 62,
    flightMinutes: 35,
    hub: 'Kayonza Nest',
    criticalSupplies: 'Fresh Frozen Plasma, Factor VIII, Emergency Trauma Supplies',
  },
  {
    name: 'Gahini Hospital',
    district: 'Kayonza (Eastern)',
    distanceKm: 18,
    flightMinutes: 11,
    hub: 'Kayonza Nest',
    criticalSupplies: 'Whole Blood Units, Erythrocyte Concentrates',
  },
];

export const RWANDA_STATS = {
  internetCoverage4G5G: '98.7%',
  iremboServicesCount: '100+',
  ziplineDeliveriesMade: '450,000+',
  coffeeExportGrowth: '+28.4% YoY',
  umugandaParticipationRate: '92.1%',
  forestCoverVision2050: '30.4%',
  femaleParliamentaryRepresentation: '61.3%',
  easeOfDoingBusinessAfricaRank: 'No. 2',
};

export const QUICK_PROMPTS = [
  {
    category: 'Citizen Services',
    title: 'How to register a business in 6 hours with RDB?',
    titleRw: 'Kwandikisha ubucuruzi muri RDB mu masaha 6 bikorwa bite?',
    prompt: 'Explain the exact step-by-step process to incorporate a new private company online on the Rwanda Development Board (RDB) portal, including fees (if any), requirements, and tax TIN issuance.',
  },
  {
    category: 'Smart Agriculture',
    title: 'Control of Coffee Leaf Rust & Berry Borer',
    titleRw: 'Kurwanya indwara z’ikawa (Uruhabo n’Utusimba)',
    prompt: 'What are RAB recommended organic and integrated pest management steps to combat Coffee Leaf Rust and Coffee Berry Borer in high-altitude Bourbon Arabica farms?',
  },
  {
    category: 'Visit Rwanda',
    title: 'Gorilla trekking permit checklist & season planning',
    titleRw: 'Ibisabwa mu gusura ingagi mu Birunga no kubona uruhushya',
    prompt: 'Provide a complete itinerary and checklist for mountain gorilla trekking in Volcanoes National Park (Musanze), including permit booking, clothing, fitness level, and the Kwita Izina ceremony.',
  },
  {
    category: 'Health & Innovation',
    title: 'How does Zipline drone medical delivery operate in Rwanda?',
    titleRw: 'Uburyo indege zitagira abapilote (Drones) zitwara amaraso mu bitaro',
    prompt: 'Detail the operational workflow of Zipline drone distribution hubs in Muhanga and Kayonza, delivery speeds to rural hospitals, and the impact on maternal mortality in Rwanda.',
  },
];
