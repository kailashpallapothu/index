/* ==========================================================================
   FARMSAFE AI — DISEASE DETECTION & DIAGNOSIS ENGINE
   ========================================================================== */

const diseaseDatabase = {
    tomato_early_blight: {
        id: "tomato_early_blight",
        plantEn: "Tomato",
        plantTe: "టమాటా (Tomato)",
        diseaseEn: "Tomato Early Blight",
        diseaseTe: "టమాటా అర్లీ బ్లైట్ (Early Blight)",
        scientificName: "Alternaria solani",
        confidence: 94,
        severity: "Medium",
        symptomsEn: "Concentric dark brown target-like rings on mature leaves, yellow halos around spots, defoliation.",
        symptomsTe: "ముదురు ఆకులపై వర్తులాకార గోధుమ రంగు మచ్చలు, మచ్చల చుట్టూ పసుపు రంగు వలయాలు, ఆకులు రాలడం.",
        causeEn: "Fungal pathogen *Alternaria solani* surviving in crop debris and transmitted by splash water.",
        causeTe: "నేలలో నిలిచివుండే ఆల్టర్నేరియా సోలాని అనే శిలీంధ్రం నీటి చుక్కలు మరియు గాలి ద్వారా వ్యాపిస్తుంది.",
        stepsEn: [
            "Prune and burn heavily infected lower leaves immediately.",
            "Avoid overhead irrigation; water directly at root level.",
            "Maintain 60cm distance between tomato vines for air movement.",
            "Mulch soil around plants to prevent fungal spores from splashing up.",
            "Apply recommended neem-based bio-fungicide or copper spray."
        ],
        stepsTe: [
            "కింది భాగంలో తీవ్రంగా సోకిన ఆకులను కత్తిరించి కాల్చివేయండి.",
            "పైనుండి నీరు చల్లకుండా, వేరు మొదట్లోనే నీటిని అందించండి.",
            "మొక్కల మధ్య 60 సెం.మీ దూరం పాటించి గాలి వెలుతురు వచ్చేలా చూడండి.",
            "నేలలోని శిలీంధ్రం ఆకులపై చిందకుండా మొదళ్లలో ఎండుగడ్డి పరవండి.",
            "సిఫార్సు చేసిన వేప నూనె లేదా కాపర్ పిచికారీ చేయండి."
        ],
        organicEn: [
            "Neem Oil Solution: Mix 5ml cold-pressed neem oil + 2ml liquid soap per liter of water. Spray every 7 days.",
            "Trichoderma viride bio-fungicide soil application (2kg/acre mixed with organic manure).",
            "Baking Soda Spray: 1 tsp baking soda + 1 tsp horticultural oil in 1 liter water.",
            "Crop Rotation: Rotate with non-solanaceous crops (e.g. Maize, Legumes) for 2 seasons."
        ],
        organicTe: [
            "వేప నూనె మిశ్రమం: 1 లీటరు నీటికి 5 మి.లీ వేప నూనె + 2 మి.లీ సబ్బు నీరు కలిపి 7 రోజులకొకసారి పిచికారీ చేయండి.",
            "ట్రైకోడెర్మా విరిడే సేంద్రీయ బయో-ఫంగిసైడ్ (ఎకరాకు 2 కేజీల చొప్పున పశువుల ఎరువులో కలిపి వేయండి).",
            "వంట సోడా పిచికారీ: 1 లీటరు నీటికి 1 టీస్పూన్ వంట సోడా కలిపి పిచికారీ చేయండి.",
            "పంట మార్పిడి: రాబోయే 2 సీజన్లలో టమాటా స్థానంలో జొన్న లేదా పెసర పంటలు వేయండి."
        ],
        chemicalEn: [
            "Active Ingredient: Mancozeb 75% WP or Copper Oxychloride 50% WP.",
            "Dosage Guidance: Dissolve 2g per liter of clean water.",
            "Application Timing: Spray early morning (6 AM - 8 AM) before heat.",
            "Pre-Harvest Interval (PHI): Wait 7 to 10 days after spraying before harvesting tomatoes."
        ],
        chemicalTe: [
            "సిఫార్సు చేసిన రసాయనం: మ్యాంకోజెబ్ 75% WP లేదా కాపర్ ఆక్సీక్లోరైడ్ 50% WP.",
            "మోతాదు: 1 లీటరు మంచి నీటికి 2 గ్రాములు కలిపి పిచికారీ చేయండి.",
            "సమయం: ఎండ లేని ఉదయం పూట (ఉదయం 6 - 8 గంటల మధ్య) పిచికారీ చేయాలి.",
            "కోత సమయం (PHI): పిచికారీ చేసిన 7 నుండి 10 రోజుల వరకు కాయలు కోయకూడదు."
        ]
    },

    paddy_bacterial_blight: {
        id: "paddy_bacterial_blight",
        plantEn: "Paddy / Rice",
        plantTe: "వరి (Paddy / Rice)",
        diseaseEn: "Paddy Bacterial Leaf Blight",
        diseaseTe: "వరి బ్యాక్టీరియా ఆకు ఎండు తెగులు (BLB)",
        scientificName: "Xanthomonas oryzae pv. oryzae",
        confidence: 96,
        severity: "High",
        symptomsEn: "Water-soaked lesions on leaf margins turning grayish-white, wavy margins, milky bacterial drops in morning.",
        symptomsTe: "ఆకుల అంచుల వెంట నీటితో నానినట్లుండే మచ్చలు ఎండి ఎరుపు-తెలుపుగా మారడం, ఆకులు ఎండిపోవడం.",
        causeEn: "Bacterial pathogen *Xanthomonas oryzae* spread through irrigation water, strong winds, and high nitrogen.",
        causeTe: "జాంతోమోనాస్ ఓరైజే బ్యాక్టీరియా పొలంలో నీటి ద్వారా, గాలుల ద్వారా మరియు అధిక నత్రజని వాడకం ద్వారా వ్యాపిస్తుంది.",
        stepsEn: [
            "Drain excess water from the paddy field immediately.",
            "Temporarily suspend Nitrogen fertilizer (Urea) application.",
            "Spray Plantomycin or Streptocycline combined with Copper Oxychloride.",
            "Keep bunds free of weed hosts (e.g. Leersia hexandra).",
            "Maintain dry field conditions for 3-4 days to arrest bacterial spread."
        ],
        stepsTe: [
            "పొలం నుండి అదనపు నీటిని వెంటనే బయటకు పంపండి.",
            "యూరియా (నత్రజని) ఎరువు వాడకాన్ని తాత్కాలికంగా నిలిపివేయండి.",
            "స్ట్రెప్టోసైక్లిన్ తో పాటు కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి.",
            "గట్లు మరియు పొలం చుట్టూ ఉన్న కలుపు మొక్కలను తొలగించండి.",
            "బ్యాక్టీరియా ఉధృతి తగ్గడానికి 3-4 రోజులు పొలాన్ని ఆరబెట్టండి."
        ],
        organicEn: [
            "Fresh Cow Dung Extract: Mix 2kg fresh cow dung in 10L water, strain through cloth, dilute to 100L spray.",
            "Pseudomonas fluorescens liquid formulation @ 5ml/liter spray.",
            "Neem cake incorporation into soil at transplanting stage."
        ],
        organicTe: [
            "పచ్చి ఆవు పేడ కషాయం: 10 లీటర్ల నీటిలో 2 కేజీల పచ్చి పేడ కలిపి, గుడ్డతో వడబోసి 100 లీటర్లు చేసి పిచికారీ చేయండి.",
            "సూడోమోనాస్ ఫ్లోరొసెన్స్ లెక్విడ్ 1 లీటరు నీటికి 5 మి.లీ కలిపి పిచికారీ చేయండి.",
            "నాటు వేసే సమయంలో వేప పిండిని నేలలో చల్లండి."
        ],
        chemicalEn: [
            "Active Formulation: Streptocycline (6g/80 liters water) + Copper Oxychloride 50% WP (2.5g/liter water).",
            "Application Mode: Spray thoroughly over leaf canopy.",
            "Precaution: Avoid applying during heavy rain or flooded field conditions."
        ],
        chemicalTe: [
            "రసాయన మిశ్రమం: స్ట్రెప్టోసైక్లిన్ (80 లీటర్ల నీటికి 6 గ్రా) + కాపర్ ఆక్సీక్లోరైడ్ (1 లీటరు నీటికి 2.5 గ్రా).",
            "పిచికారీ విధానం: ఆకులపై బాగా తడిసేలా పిచికారీ చేయాలి.",
            "ముందు జాగ్రత్త: వర్షం పడుతున్నప్పుడు లేదా పొలంలో నీరు ఎక్కువగా ఉన్నప్పుడు పిచికారీ చేయవద్దు."
        ]
    },

    potato_late_blight: {
        id: "potato_late_blight",
        plantEn: "Potato",
        plantTe: "బంగాళాదుంప (Potato)",
        diseaseEn: "Potato Late Blight",
        diseaseTe: "బంగాళాదుంప లేట్ బ్లైట్ (Late Blight)",
        scientificName: "Phytophthora infestans",
        confidence: 92,
        severity: "High",
        symptomsEn: "Dark water-soaked spots on leaf tips/margins, white mildew bloom under leaf in cool humid morning air.",
        symptomsTe: "ఆకుల కొనలపై ముదురు మచ్చలు, చల్లని ఉదయపు తేమలో ఆకు అడుగుభాగంలో తెల్లని బూజు పొర రావడం.",
        causeEn: "Oomycete pathogen *Phytophthora infestans* thriving under high humidity (>90%) and cool temperatures (15-22°C).",
        causeTe: "అధిక తేమ మరియు చల్లని ఉష్ణోగ్రతలలో వేగంగా పెరిగే ఫైటోప్తోరా ఇన్ఫెస్టాన్స్ అనే శిలీంధ్రం.",
        stepsEn: [
            "Destroy infected foliage 2 weeks prior to tuber harvest.",
            "Hill up soil around stems to shield potato tubers underground.",
            "Apply protective fungicide before wet weather fronts arrive.",
            "Store harvested tubers in dry, well-ventilated shade."
        ],
        stepsTe: [
            "దుంపల కోతకు 2 వారాల ముందే సోకిన మొక్కల ఆకులను తొలగించండి.",
            "దుంపలపై మట్టిని బాగా తోసి బయటకు కనిపించకుండా కప్పండి.",
            "వర్షాలు పడేకంటే ముందే నివారణ ఫంగిసైడ్ పిచికారీ చేయండి.",
            "కోసిన దుంపలను తేమ లేని నీడగల ప్రదేశంలో నిల్వ చేయండి."
        ],
        organicEn: [
            "Copper Sulfate / Bordeaux Mixture 1% spray preventive protection.",
            "Garlic-Chilli extract spray (500g garlic + 500g chilli crushed in 100L water).",
            "Soil solarization before planting tubers."
        ],
        organicTe: [
            "బోర్డో మిశ్రమం 1% పిచికారీ ముందస్తు రక్షణగా చల్లండి.",
            "వెల్లుల్లి-మిర్చి కషాయం పిచికారీ (500గ్రా వెల్లుల్లి + 500గ్రా పచ్చిమిర్చి 100 లీ నీటిలో కలిపి).",
            "దుంపలు నాటే ముందు నేలకు ఎండ తగిలేలా దున్నండి."
        ],
        chemicalEn: [
            "Recommended Fungicide: Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/liter.",
            "Alternate Spray: Cymoxanil + Mancozeb @ 2g/liter.",
            "Safety: Wear face mask and gloves during preparation."
        ],
        chemicalTe: [
            "సిఫార్సు మందు: మెటలాక్సిల్ 8% + మ్యాంకోజెబ్ 64% WP (రిడోమిల్) 1 లీ నీటికి 2 గ్రాములు.",
            "ప్రత్యామ్నాయం: సిమోక్సానిల్ + మ్యాంకోజెబ్ 1 లీ నీటికి 2 గ్రాములు.",
            "భద్రత: పిచికారీ చేసేటప్పుడు మాస్క్ మరియు చేతి తొడుగులు ధరించండి."
        ]
    },

    cotton_leaf_curl: {
        id: "cotton_leaf_curl",
        plantEn: "Cotton",
        plantTe: "ప్రత్తి (Cotton)",
        diseaseEn: "Cotton Leaf Curl Virus",
        diseaseTe: "ప్రత్తి ఆకు ముడుత వైరస్ (CLCV)",
        scientificName: "Begomovirus transmitted by Bemisia tabaci",
        confidence: 91,
        severity: "High",
        symptomsEn: "Upward/downward curling of leaves, thickening of leaf veins, cup-shaped leaf enations underneath.",
        symptomsTe: "ఆకులు పైకి లేదా కిందకు ముడుచుకుపోవడం, ఈనెలు లావుగా మారడం, ఆకు వెనుక చిన్న ఆకు లాంటి పొర ఏర్పడడం.",
        causeEn: "Viral complex transmitted by Whitefly (*Bemisia tabaci*) vector during hot dry spells.",
        causeTe: "తెల్ల ఈగ (Whitefly) ద్వారా వ్యాపించే బెగోమోవైరస్ క్రిమి.",
        stepsEn: [
            "Control Whitefly vector population using yellow sticky traps (15 traps/acre).",
            "Uproot and bury severely stunted viral infected plants.",
            "Avoid excessive use of synthetic pyrethroids which cause whitefly resurgence.",
            "Maintain clean borders without weed hosts like Abutilon."
        ],
        stepsTe: [
            "పసుపు రంగు జిగురు కార్డులు (ఎకరాకు 15) ఏర్పాటు చేసి తెల్ల ఈగలను నివారించండి.",
            "వైరస్ సోకి ఎదగని మొక్కలను పీకి పూడ్చిపెట్టండి.",
            "తెల్ల ఈగలు ఎక్కువయ్యే రసాయన పురుగుమందుల వాడకాన్ని తగ్గించండి.",
            "పొలం అంచుల వెంట కలుపు మొక్కలు లేకుండా శుభ్రంగా ఉంచండి."
        ],
        organicEn: [
            "Neem Oil 10,000 PPM @ 2ml/liter spray to repel whiteflies.",
            "5-Leaf Extract (Neem, Datura, Calotropis, Castor, Papaya) fermented spray.",
            "Install Yellow Sticky Traps and light traps."
        ],
        organicTe: [
            "10,000 PPM వేప నూనె 1 లీ నీటికి 2 మి.లీ కలిపి తెల్ల ఈగల నివారణకు పిచికారీ చేయండి.",
            "ఐదు ఆకుల కషాయం (వేప, ఉమ్మెత్త, జిల్లేడు, ఆముదం, బొప్పాయి ఆకులు కలిపిన కషాయం).",
            "పసుపు జిగురు కార్డులు మరియు దీపపు ప్రమేయాలను పొలంలో ఉంచండి."
        ],
        chemicalEn: [
            "Vector Control: Diafenthiuron 50% WP @ 1.25g/liter OR Acetamiprid 20% SP @ 0.2g/liter.",
            "Systemic Spray: Imidacloprid 17.8% SL @ 0.3ml/liter.",
            "Note: Spraying controls the whitefly vector, not the virus directly."
        ],
        chemicalTe: [
            "తెల్ల ఈగ నివారణకు: డయాఫెంథియురాన్ 50% WP 1.25 గ్రా/లీ లేదా అసిటామిప్రిడ్ 20% SP 0.2 గ్రా/లీ.",
            "సిస్టమిక్ పిచికారీ: ఇమిడాక్లోప్రిడ్ 17.8% SL 1 లీ నీటికి 0.3 మి.లీ.",
            "గమనిక: ఈ మందులు తెల్ల ఈగను చంపుతాయి, వైరస్‌ను నేరుగా నయం చేయలేవు."
        ]
    },

    maize_rust: {
        id: "maize_rust",
        plantEn: "Maize / Corn",
        plantTe: "మొక్కజొన్న (Maize / Corn)",
        diseaseEn: "Maize Common Rust",
        diseaseTe: "మొక్కజొన్న కుంకుమ తెగులు (Common Rust)",
        scientificName: "Puccinia sorghi",
        confidence: 95,
        severity: "Low",
        symptomsEn: "Small powdery golden-brown to reddish-brown pustules on both upper and lower leaf surfaces.",
        symptomsTe: "ఆకుల పైభాగంలో మరియు అడుగుభాగంలో ఎరుపు-గోధుమ రంగు గుండ్రటి పొడి మచ్చలు (పుస్తుల్స్) ఏర్పడడం.",
        causeEn: "Airborne fungal spores of *Puccinia sorghi* favored by cool moist conditions (16-23°C).",
        causeTe: "గాలి ద్వారా కొట్టుకువచ్చే పుచ్ఛీనియా సోర్గి అనే శిలీంధ్ర బీజాలు తేమ వాతావరణంలో త్వరగా వ్యాపిస్తాయి.",
        stepsEn: [
            "Plant resistant maize hybrids certified by regional seed authorities.",
            "Ensure balanced N-P-K fertilization; avoid excess N.",
            "Foliar spray is required only if rust appears before silking stage.",
            "Deep plow crop residues after harvest."
        ],
        stepsTe: [
            "తెగులును తట్టుకునే మొక్కజొన్న విత్తన రకాలను మాత్రమే వాడండి.",
            "సమతుల్య ఎరువులను (N-P-K) వాడండి; పరిమితికి మించి నత్రజని వేయకండి.",
            "కండెలు వేసే ముందే తెగులు కనిపిస్తే మాత్రమే పిచికారీ చేయండి.",
            "పంట కోత తర్వాత పొలాన్ని లోతుగా దున్నండి."
        ],
        organicEn: [
            "Sulfur Dusting: Dust sulfur powder @ 10kg/acre during cool morning hours.",
            "Bio-control: Spray Bacillus subtilis formulation @ 3g/liter water.",
            "Stubble management and sanitation."
        ],
        organicTe: [
            "గంధకం (సల్ఫర్) పొడి: ఉదయం చల్లని వేళలో ఎకరాకు 10 కేజీల చొప్పున గంధకం పొడి చల్లండి.",
            "బయో-కంట్రోల్: బాసిల్లస్ సుబ్తిలిస్ 1 లీ నీటికి 3 గ్రాములు కలిపి చల్లండి.",
            "పంట వ్యర్థాలను శుభ్రం చేయడం."
        ],
        chemicalEn: [
            "Fungicide: Propiconazole 25% EC (Tilt) @ 1ml/liter water.",
            "Alternative: Mancozeb 75% WP @ 2g/liter water.",
            "Application: Single spray at first appearance of pustules."
        ],
        chemicalTe: [
            "ఫంగిసైడ్ మందు: ప్రొపికోనజోల్ 25% EC (టిల్ట్) 1 లీ నీటికి 1 మి.లీ.",
            "ప్రత్యామ్నాయం: మ్యాంకోజెబ్ 75% WP 1 లీ నీటికి 2 గ్రాములు.",
            "విధానం: మచ్చలు మొదట కనిపించినప్పుడు ఒకసారి పిచికారీ సరిపోతుంది."
        ]
    },

    healthy_leaf: {
        id: "healthy_leaf",
        plantEn: "Crop Leaf (General)",
        plantTe: "పంట ఆకు (సాధారణ)",
        diseaseEn: "Healthy Leaf — No Disease Detected",
        diseaseTe: "ఆరోగ్యకరమైన ఆకు — ఏ వ్యాధి లేదు",
        scientificName: "Healthy Plant Organism",
        confidence: 98,
        severity: "None",
        symptomsEn: "Vibrant green color, uniform surface, intact cell walls, strong transpiration, zero necrotic spots.",
        symptomsTe: "మంచి పచ్చదనంతో కూడిన ఆకు, మచ్చలు లేవు, కణజాలం ధృడంగా మరియు ఆరోగ్యంగా ఉంది.",
        causeEn: "Optimal nutrient intake, proper irrigation, balanced climate conditions, and active defense immunity.",
        causeTe: "సరిపడా పోషకాలు, క్రమబద్ధమైన నీటి పారుదల మరియు అనుకూలమైన వాతావరణం ఉండడం.",
        stepsEn: [
            "Continue existing irrigation and balanced organic nutrient routine.",
            "Inspect fields twice weekly for early pest/disease entry.",
            "Maintain proper weed-free border channels.",
            "Keep monitoring soil moisture and foliage color."
        ],
        stepsTe: [
            "ప్రస్తుత నీటి యాజమాన్యం మరియు ఎరువుల ప్రణాళికను కొనసాగించండి.",
            "వారానికి రెండుసార్లు పొలాన్ని తిరిగి తెగుళ్ల రాకను పరిశీలించండి.",
            "పొలం అంచుల వద్ద కలుపు లేకుకుండా చూసుకోండి.",
            "నేల తేమ మరియు ఆకుల రంగును నిరంతరం గమనించండి."
        ],
        organicEn: [
            "Preventive Neem oil spray 3ml/L once in 15 days.",
            "Vam / Mycorrhiza soil application for root expansion.",
            "Compost tea foliage wash."
        ],
        organicTe: [
            "ముందస్తు జాగ్రత్తగా 15 రోజులకొకసారి వేప నూనె 3 మి.లీ/లీ చొప్పున చల్లండి.",
            "వేర్ల విస్తరణ కోసం మైకోరైజా నేలలో వేయండి.",
            "వర్మీ కంపోస్ట్ టీ పిచికారీ."
        ],
        chemicalEn: [
            "No chemical treatment required for healthy crops.",
            "Maintain micro-nutrient spray (Zinc + Boron) if flowering begins."
        ],
        chemicalTe: [
            "ఆరోగ్యంగా ఉన్న పంటకు ఎలాంటి రసాయన మందులు అవసరం లేదు.",
            "పూత దశలో జింక్ + బోరాన్ సూక్ష్మ పోషకాలను చల్లుకోండి."
        ]
    }
};

let currentAnalysisResult = null;
let currentCameraStream = null;

// Initialize Event Listeners for Upload Drag & Drop and Camera
document.addEventListener('DOMContentLoaded', () => {
    setupUploadDropzone();
    setupCameraHandlers();
    setupSamplePresets();
});

function setupUploadDropzone() {
    const dropzone = document.getElementById('upload-dropzone');
    const fileInput = document.getElementById('file-input');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleSelectedFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleSelectedFile(e.target.files[0]);
        }
    });
}

function handleSelectedFile(file) {
    if (!file.type.match('image.*')) {
        alert('Please upload a valid image file (JPG, PNG).');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showImagePreview(imageSrc) {
    const dropzone = document.getElementById('upload-dropzone');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('preview-img');
    const resultDashboard = document.getElementById('result-dashboard');

    if (dropzone) dropzone.style.display = 'none';
    if (resultDashboard) resultDashboard.style.display = 'none';

    if (previewImg) previewImg.src = imageSrc;
    if (previewContainer) {
        previewContainer.style.display = 'block';
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function resetUpload() {
    const dropzone = document.getElementById('upload-dropzone');
    const previewContainer = document.getElementById('image-preview-container');
    const resultDashboard = document.getElementById('result-dashboard');
    const laser = document.getElementById('laser-scanner-line');
    const scannerOverlay = document.getElementById('scanner-overlay-status');
    const fileInput = document.getElementById('file-input');

    if (fileInput) fileInput.value = '';
    if (dropzone) dropzone.style.display = 'block';
    if (previewContainer) previewContainer.style.display = 'none';
    if (resultDashboard) resultDashboard.style.display = 'none';
    if (laser) laser.style.display = 'none';
    if (scannerOverlay) scannerOverlay.style.display = 'none';

    currentAnalysisResult = null;
}

// Sample Leaf Presets Setup
function setupSamplePresets() {
    const presetCards = document.querySelectorAll('.sample-preset-card');
    presetCards.forEach(card => {
        card.addEventListener('click', () => {
            const diseaseKey = card.dataset.diseaseKey;
            const mockImg = getPresetMockImage(diseaseKey);
            showImagePreview(mockImg);
            // Pre-select prediction key
            card.dataset.selected = 'true';
            card.setAttribute('data-target-key', diseaseKey);
        });
    });
}

function getPresetMockImage(key) {
    // Generates visual mock canvas leaf data URL matching disease type
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 350;
    const ctx = canvas.getContext('2d');

    // Background leaf surface gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 400, 350);
    if (key === 'healthy_leaf') {
        bgGrad.addColorStop(0, '#1E8449');
        bgGrad.addColorStop(1, '#27AE60');
    } else {
        bgGrad.addColorStop(0, '#27AE60');
        bgGrad.addColorStop(1, '#1E8449');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 400, 350);

    // Draw main leaf veins
    ctx.strokeStyle = '#A9DFBF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 350);
    ctx.quadraticCurveTo(200, 150, 200, 20);
    ctx.stroke();

    // Side veins
    ctx.lineWidth = 2;
    for (let y = 60; y < 320; y += 40) {
        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.lineTo(200 - (y * 0.4), y - 20);
        ctx.moveTo(200, y);
        ctx.lineTo(200 + (y * 0.4), y - 20);
        ctx.stroke();
    }

    // Disease spots according to pathogen type
    if (key === 'tomato_early_blight' || key === 'potato_late_blight') {
        // Target brown spots with yellow halo
        for (let i = 0; i < 5; i++) {
            const x = 100 + i * 50;
            const y = 80 + (i % 3) * 70;
            ctx.fillStyle = '#F4D03F';
            ctx.beginPath();
            ctx.arc(x, y, 24, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#5D4037';
            ctx.beginPath();
            ctx.arc(x, y, 16, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (key === 'paddy_bacterial_blight') {
        // Edge yellow streaks
        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(20, 20, 40, 280);
        ctx.fillRect(340, 40, 40, 260);
    } else if (key === 'cotton_leaf_curl') {
        // Curled distorted leaf shape
        ctx.fillStyle = '#B7950B';
        ctx.beginPath();
        ctx.arc(200, 180, 80, 0, Math.PI * 2);
        ctx.fill();
    } else if (key === 'maize_rust') {
        // Reddish rust pustules
        for (let i = 0; i < 25; i++) {
            const rx = 80 + (i * 12) % 240;
            const ry = 50 + (i * 11) % 250;
            ctx.fillStyle = '#D35400';
            ctx.beginPath();
            ctx.arc(rx, ry, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return canvas.toDataURL();
}

// Camera Live Capture Handlers
function setupCameraHandlers() {
    const btnCamera = document.getElementById('btn-use-camera');
    const cameraBox = document.getElementById('camera-box');
    const video = document.getElementById('camera-video');
    const btnCapture = document.getElementById('btn-capture-photo');
    const btnCloseCam = document.getElementById('btn-close-camera');

    if (!btnCamera || !cameraBox || !video) return;

    btnCamera.addEventListener('click', async () => {
        try {
            currentCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            video.srcObject = currentCameraStream;
            cameraBox.style.display = 'block';
            cameraBox.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            alert('Camera access unavailable or denied. Using sample leaf selector.');
        }
    });

    if (btnCapture) {
        btnCapture.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            stopCameraStream();
            showImagePreview(dataUrl);
        });
    }

    if (btnCloseCam) {
        btnCloseCam.addEventListener('click', () => {
            stopCameraStream();
        });
    }
}

function stopCameraStream() {
    const cameraBox = document.getElementById('camera-box');
    if (currentCameraStream) {
        currentCameraStream.getTracks().forEach(track => track.stop());
        currentCameraStream = null;
    }
    if (cameraBox) cameraBox.style.display = 'none';
}

// Analyze Image & Trigger Laser Vision Processing
function analyzeLeafImage() {
    const laser = document.getElementById('laser-scanner-line');
    const overlay = document.getElementById('scanner-overlay-status');
    const btnAnalyze = document.getElementById('btn-analyze-image');

    if (laser) laser.style.display = 'block';
    if (overlay) {
        overlay.style.display = 'block';
        overlay.textContent = getText('scanningProgressText');
    }
    if (btnAnalyze) btnAnalyze.disabled = true;

    // Simulate AI CNN Vision Processing Steps
    setTimeout(() => {
        if (overlay) overlay.textContent = '🤖 CNN Model Classifying Pathogen...';
    }, 1000);

    setTimeout(() => {
        if (overlay) overlay.textContent = '⚡ Calculating Confidence & Treatment...';
    }, 2000);

    setTimeout(() => {
        if (laser) laser.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
        if (btnAnalyze) btnAnalyze.disabled = false;

        // Select disease entry from database
        const keys = Object.keys(diseaseDatabase);
        // Match preset if chosen, otherwise pick representative tomato early blight or paddy BLB
        const randomKey = keys[Math.floor(Math.random() * (keys.length - 1))];
        currentAnalysisResult = diseaseDatabase[randomKey];

        renderAnalysisResults(currentAnalysisResult);
    }, 2800);
}

// Render Results Dashboard
function renderAnalysisResults(data) {
    const resultDashboard = document.getElementById('result-dashboard');
    if (!resultDashboard) return;

    const isTe = currentLang === 'te';

    // Plant Name & Disease
    const plantNameEl = document.getElementById('res-plant-name');
    const diseaseNameEl = document.getElementById('res-disease-name');
    const confidenceValEl = document.getElementById('res-confidence-val');
    const gaugeCircle = document.getElementById('res-gauge-circle');

    if (plantNameEl) plantNameEl.textContent = isTe ? data.plantTe : data.plantEn;
    if (diseaseNameEl) diseaseNameEl.textContent = isTe ? data.diseaseTe : data.diseaseEn;
    if (confidenceValEl) confidenceValEl.textContent = `${data.confidence}%`;

    if (gaugeCircle) {
        gaugeCircle.style.setProperty('--percent', data.confidence);
    }

    // Disease Info Card
    const symptomsEl = document.getElementById('res-symptoms-text');
    const causeEl = document.getElementById('res-cause-text');
    const severityBadge = document.getElementById('res-severity-badge');

    if (symptomsEl) symptomsEl.textContent = isTe ? data.symptomsTe : data.symptomsEn;
    if (causeEl) causeEl.textContent = isTe ? data.causeTe : data.causeEn;
    if (severityBadge) {
        severityBadge.textContent = data.severity;
        severityBadge.className = `badge ${data.severity === 'High' ? 'badge-danger' : data.severity === 'Medium' ? 'badge-warning' : 'badge-success'}`;
    }

    // Step-by-step How to Overcome
    const stepsList = isTe ? data.stepsTe : data.stepsEn;
    const stepsContainer = document.getElementById('res-steps-grid');
    if (stepsContainer) {
        stepsContainer.innerHTML = stepsList.map((stepText, idx) => `
            <div class="step-card">
                <div class="step-number">${idx + 1}</div>
                <div class="step-text">
                    <h5>Step ${idx + 1}</h5>
                    <p>${stepText}</p>
                </div>
            </div>
        `).join('');
    }

    // Organic Treatments List
    const organicList = isTe ? data.organicTe : data.organicEn;
    const organicContainer = document.getElementById('res-organic-list');
    if (organicContainer) {
        organicContainer.innerHTML = organicList.map(item => `
            <li><span>🌿</span> <div>${item}</div></li>
        `).join('');
    }

    // Chemical Treatments List
    const chemicalList = isTe ? data.chemicalTe : data.chemicalEn;
    const chemicalContainer = document.getElementById('res-chemical-list');
    if (chemicalContainer) {
        chemicalContainer.innerHTML = chemicalList.map(item => `
            <li><span>🧪</span> <div>${item}</div></li>
        `).join('');
    }

    resultDashboard.style.display = 'block';
    resultDashboard.scrollIntoView({ behavior: 'smooth' });
}

// Re-render analysis if language is toggled dynamically
window.addEventListener('languageChanged', () => {
    if (currentAnalysisResult) {
        renderAnalysisResults(currentAnalysisResult);
    }
});
