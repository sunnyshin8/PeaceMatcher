import * as XLSX from 'xlsx';
import * as path from 'path';

// Define interfaces for our data structures
export interface MedicineDetail {
  name: string;
  description: string;
  symptoms: string[];
  sideEffects: string[];
  contraindications: string[];
  dosageForm: string;
}

export interface AgeReference {
  medicine: string;
  ageGroup: string;
  dosage: string;
  frequency: string;
  specialInstructions?: string;
}

class MedicineDatabase {
  private static instance: MedicineDatabase | null = null;
  private medicineDetails: MedicineDetail[] = [];
  private ageReferences: AgeReference[] = [];
  private lastLoadTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.loadData();
  }

  public static getInstance(): MedicineDatabase {
    if (!MedicineDatabase.instance) {
      MedicineDatabase.instance = new MedicineDatabase();
    }
    return MedicineDatabase.instance;
  }

  private loadData() {
    const now = Date.now();
    if (this.lastLoadTime && now - this.lastLoadTime < this.CACHE_DURATION) {
      return;
    }
    this.lastLoadTime = now;

    try {
      // Expanded medicine database with 15+ medicines
      this.medicineDetails = [
        {
          name: "Dolo 650mg",
          description: "Paracetamol 650mg - Pain reliever and fever reducer (Indian brand)",
          symptoms: ["fever", "headache", "muscle aches", "pain", "body ache", "toothache"],
          sideEffects: ["liver damage (at high doses)", "mild nausea", "allergic reactions (rare)"],
          contraindications: ["liver disease", "alcohol abuse", "hepatitis"],
          dosageForm: "tablet"
        },
        {
          name: "Ibuprofen",
          description: "NSAID pain reliever, fever reducer, and anti-inflammatory",
          symptoms: ["pain", "fever", "inflammation", "headache", "arthritis", "menstrual cramps", "toothache"],
          sideEffects: ["stomach upset", "heartburn", "dizziness", "nausea"],
          contraindications: ["stomach ulcers", "bleeding disorders", "kidney disease", "heart disease"],
          dosageForm: "tablet, capsule, liquid"
        },
        {
          name: "Diphenhydramine",
          description: "Antihistamine for allergy relief and sleep aid",
          symptoms: ["allergies", "hay fever", "common cold", "insomnia", "itching", "runny nose", "sneezing"],
          sideEffects: ["drowsiness", "dry mouth", "blurred vision", "constipation"],
          contraindications: ["glaucoma", "enlarged prostate", "asthma", "urinary retention"],
          dosageForm: "tablet, liquid, capsule"
        },
        {
          name: "Cetirizine",
          description: "Second-generation antihistamine for allergy relief (non-drowsy)",
          symptoms: ["allergies", "hay fever", "hives", "itching", "runny nose", "watery eyes"],
          sideEffects: ["mild drowsiness", "dry mouth", "headache"],
          contraindications: ["kidney disease", "liver disease"],
          dosageForm: "tablet, liquid"
        },
        {
          name: "Omeprazole",
          description: "Proton pump inhibitor for acid reflux and stomach ulcers",
          symptoms: ["acidity", "heartburn", "acid reflux", "stomach ulcer", "GERD", "indigestion"],
          sideEffects: ["headache", "diarrhea", "nausea", "vitamin B12 deficiency (long-term)"],
          contraindications: ["liver disease", "osteoporosis risk"],
          dosageForm: "capsule"
        },
        {
          name: "Amoxicillin",
          description: "Broad-spectrum antibiotic for bacterial infections",
          symptoms: ["bacterial infection", "ear infection", "sore throat", "urinary infection", "skin infection", "sinusitis"],
          sideEffects: ["diarrhea", "nausea", "rash", "vomiting"],
          contraindications: ["penicillin allergy", "mononucleosis", "liver disease"],
          dosageForm: "capsule, liquid"
        },
        {
          name: "Azithromycin",
          description: "Macrolide antibiotic for respiratory and skin infections",
          symptoms: ["bacterial infection", "pneumonia", "bronchitis", "ear infection", "sinusitis", "skin infection"],
          sideEffects: ["nausea", "diarrhea", "abdominal pain", "headache"],
          contraindications: ["liver disease", "heart rhythm disorders", "myasthenia gravis"],
          dosageForm: "tablet, liquid"
        },
        {
          name: "Metformin",
          description: "First-line medication for type 2 diabetes",
          symptoms: ["diabetes", "high blood sugar", "insulin resistance", "PCOS"],
          sideEffects: ["nausea", "diarrhea", "abdominal pain", "metallic taste", "vitamin B12 deficiency"],
          contraindications: ["kidney disease", "liver disease", "heart failure", "alcohol abuse"],
          dosageForm: "tablet"
        },
        {
          name: "Losartan",
          description: "ARB medication for high blood pressure and kidney protection",
          symptoms: ["high blood pressure", "hypertension", "diabetic kidney disease", "heart failure"],
          sideEffects: ["dizziness", "fatigue", "low blood pressure", "high potassium"],
          contraindications: ["pregnancy", "bilateral renal artery stenosis", "hyperkalemia"],
          dosageForm: "tablet"
        },
        {
          name: "Amlodipine",
          description: "Calcium channel blocker for high blood pressure and angina",
          symptoms: ["high blood pressure", "hypertension", "chest pain", "angina"],
          sideEffects: ["swelling in ankles", "dizziness", "flushing", "headache"],
          contraindications: ["severe heart failure", "aortic stenosis", "low blood pressure"],
          dosageForm: "tablet"
        },
        {
          name: "ORS (Oral Rehydration Salts)",
          description: "Electrolyte solution for dehydration management",
          symptoms: ["dehydration", "diarrhea", "vomiting", "heat exhaustion", "loose motions"],
          sideEffects: ["nausea (if taken too fast)", "vomiting (if hypertonic)"],
          contraindications: ["severe vomiting (IV fluids needed)", "bowel obstruction"],
          dosageForm: "powder for solution"
        },
        {
          name: "Loperamide",
          description: "Anti-diarrheal medication",
          symptoms: ["diarrhea", "loose motions", "traveler's diarrhea"],
          sideEffects: ["constipation", "abdominal cramps", "dizziness"],
          contraindications: ["bloody diarrhea", "bacterial infection", "children under 2"],
          dosageForm: "tablet, liquid"
        },
        {
          name: "Salbutamol Inhaler",
          description: "Bronchodilator for asthma and breathing difficulties",
          symptoms: ["asthma", "wheezing", "shortness of breath", "breathing difficulty", "bronchospasm"],
          sideEffects: ["tremor", "headache", "rapid heartbeat", "muscle cramps"],
          contraindications: ["heart rhythm disorders", "hyperthyroidism"],
          dosageForm: "inhaler"
        },
        {
          name: "Diclofenac",
          description: "NSAID for pain and inflammation relief",
          symptoms: ["back pain", "joint pain", "arthritis", "sports injury", "muscle pain", "inflammation"],
          sideEffects: ["stomach pain", "heartburn", "diarrhea", "headache"],
          contraindications: ["stomach ulcers", "heart disease", "kidney disease", "asthma triggered by NSAIDs"],
          dosageForm: "tablet, gel, injection"
        },
        {
          name: "Ondansetron",
          description: "Anti-nausea medication (anti-emetic)",
          symptoms: ["nausea", "vomiting", "motion sickness"],
          sideEffects: ["headache", "constipation", "dizziness"],
          contraindications: ["heart rhythm disorders", "liver disease"],
          dosageForm: "tablet, injection, liquid"
        },
      ];

      // Expanded age-specific dosage references
      this.ageReferences = [
        // Dolo 650
        { medicine: "Dolo 650mg", ageGroup: "adult", dosage: "1 tablet (650mg)", frequency: "Every 6-8 hours as needed", specialInstructions: "Do not exceed 4 tablets in 24 hours. Take with water after meals" },
        { medicine: "Dolo 650mg", ageGroup: "senior", dosage: "1 tablet (650mg)", frequency: "Every 8 hours as needed", specialInstructions: "Do not exceed 3 tablets in 24 hours. Monitor liver function" },
        { medicine: "Dolo 650mg", ageGroup: "teen", dosage: "1 tablet (650mg)", frequency: "Every 6-8 hours as needed", specialInstructions: "Do not exceed 3 tablets in 24 hours" },
        { medicine: "Dolo 650mg", ageGroup: "child", dosage: "Half tablet (325mg)", frequency: "Every 6-8 hours as needed", specialInstructions: "Do not exceed 3 doses in 24 hours. Crush and mix with water if needed" },
        // Ibuprofen
        { medicine: "Ibuprofen", ageGroup: "adult", dosage: "200-400mg", frequency: "Every 4-6 hours", specialInstructions: "Take with food. Max 1200mg/day without prescription" },
        { medicine: "Ibuprofen", ageGroup: "teen", dosage: "200mg", frequency: "Every 6-8 hours", specialInstructions: "Take with food. Max 800mg/day" },
        { medicine: "Ibuprofen", ageGroup: "child", dosage: "5-10 mg/kg", frequency: "Every 6-8 hours", specialInstructions: "Take with food. Max 4 doses per day. Use liquid form for young children" },
        // Cetirizine
        { medicine: "Cetirizine", ageGroup: "adult", dosage: "10mg", frequency: "Once daily", specialInstructions: "Can be taken with or without food" },
        { medicine: "Cetirizine", ageGroup: "child", dosage: "5mg", frequency: "Once daily", specialInstructions: "Use liquid form for children under 6" },
        // Amoxicillin
        { medicine: "Amoxicillin", ageGroup: "adult", dosage: "250-500mg", frequency: "Every 8 hours", specialInstructions: "Complete full course. Take with or without food" },
        { medicine: "Amoxicillin", ageGroup: "child", dosage: "25-50mg/kg/day", frequency: "Divided into 3 doses", specialInstructions: "Complete full course. Shake liquid form well before use" },
        // ORS
        { medicine: "ORS (Oral Rehydration Salts)", ageGroup: "adult", dosage: "1 sachet in 1 liter water", frequency: "Sip frequently throughout the day", specialInstructions: "Do not add sugar. Use boiled cooled water" },
        { medicine: "ORS (Oral Rehydration Salts)", ageGroup: "child", dosage: "1 sachet in 1 liter water", frequency: "Small sips every few minutes", specialInstructions: "Give 50-100ml after each loose stool" },
        // Omeprazole
        { medicine: "Omeprazole", ageGroup: "adult", dosage: "20mg", frequency: "Once daily before breakfast", specialInstructions: "Take 30 minutes before meals. Swallow whole, do not crush" },
        // Salbutamol
        { medicine: "Salbutamol Inhaler", ageGroup: "adult", dosage: "1-2 puffs (100-200mcg)", frequency: "Every 4-6 hours as needed", specialInstructions: "Shake before use. Rinse mouth after use" },
        { medicine: "Salbutamol Inhaler", ageGroup: "child", dosage: "1 puff (100mcg)", frequency: "Every 4-6 hours as needed", specialInstructions: "Use spacer device for children. Rinse mouth after use" },
      ];

    } catch (error) {
      console.error('Error loading medicine database:', error);
      throw new Error('Failed to load medicine database');
    }
  }

  findMedicinesForSymptoms(symptoms: string[]): MedicineDetail[] {
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
    return this.medicineDetails.filter(medicine =>
      medicine.symptoms.some(symptom =>
        normalizedSymptoms.some(s => symptom.toLowerCase().includes(s) || s.includes(symptom.toLowerCase()))
      )
    );
  }

  getDosageByAgeGroup(medicineName: string, ageGroup: string): AgeReference | undefined {
    return this.ageReferences.find(ref =>
      ref.medicine.toLowerCase() === medicineName.toLowerCase() &&
      ref.ageGroup.toLowerCase() === ageGroup.toLowerCase()
    );
  }

  getAllSymptoms(): string[] {
    const symptomsSet = new Set<string>();
    this.medicineDetails.forEach(medicine => {
      medicine.symptoms.forEach(symptom => {
        symptomsSet.add(symptom.toLowerCase().trim());
      });
    });
    return Array.from(symptomsSet);
  }

  getAllMedicines(): MedicineDetail[] {
    return [...this.medicineDetails];
  }

  searchMedicines(query: string): MedicineDetail[] {
    const q = query.toLowerCase().trim();
    return this.medicineDetails.filter(med =>
      med.name.toLowerCase().includes(q) ||
      med.description.toLowerCase().includes(q) ||
      med.symptoms.some(s => s.includes(q))
    );
  }
}

// Export the MedicineDatabase class
export { MedicineDatabase };