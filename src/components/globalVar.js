export const packageList = [
    {
        name: "Package A", price: 2000, count: 29, data: [
            "Preliminary Test (Complete Blood Count, ESR, Urine Routine)", "Diabetic Checkup (F.B.S, HBA1C)",
            "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
            "Liver Profile (Bilirubin Total, Bilirubin Direct, Bilirubin Indirect, SGOT, SGPT, Total Protien, Albumin, Globulin, Alkaline  Phosphate, Gamma G.T)",
            "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
            "Physician Examination", "Teleconsultation"
        ]
    },
    {
        name: "Package B", price: 2000, count: 23, data: [
            "Preliminary Test (Complete Blood Count, ESR, Urine Routine)", "Diabetic Checkup (F.B.S, HBA1C)",
            "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
            "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
            "Thyroid Profile (T3, T4, TSH)", "Radiological Test (ECG)",
            "USG Abdomen", "Physician Examination", "Teleconsultation"
        ]
    }
]


export const customizePackageList = [
    {
        value: "Vital Check ( Blood Sugar, BP & PR ) - 3 Tests", price: 200, sub: [
            "Blood Glucose fasting / Random", "Blood Pressure Check (BP)", "Pulse Rate Check (PR)"
        ]
    },
    {
        value: "Thyroid (TFT) - 5 Tests", price: 900, sub: [
            "Total Tri-iodothyronine (T3)", "Total Thyroxine (T4)", "FT3", "FT4", "Thyroid Stimulating Hormone (TSH)"
        ]
    },
    {
        value: "Heart Risk Profile (Lipid) - 9 Tests", price: 600, sub: [
            "Total Cholesterol", "HDL (Good Cholesterol)", "Non HDL Cholesterol", "LDL (Bad Cholesterol)",
            "VLDL Cholesterol", "Triglycerides", "LDL/HDL Cholesterol Ratio", "HDL/LDL Cholesterol Ratio",
            "TC (Total Cholesterol) /HDL Cholesterol Ratio"
        ]
    },
    {
        value: "Liver Function Test (LFT) - 11 Tests", price: 600, sub: [
            "Billirubin-TOtal", "Billirubin-Direct", "Billirubin-Indirect", "Alkaline Phosphatase ( ALP )",
            "SGOT (AST)", "SGPT (ALT)", "Protein-Total", "Albumin", "Globulin", "Serum Albumin / Globulin Ratio",
            "Gamma GT/GGT ( Gamma Glutamyl Transferase)"
        ]
    },
    {
        value: "Kidney Function Test (KFT) - 6 Tests + Electrolytes", price: 700, sub: [
            "Uric Acid", "SErum Urea", "Serum Creatinine", "Urea/Creatinine Ratio", "Blood Urea Nitrogen (BUN)",
            "BUN / Cretinine Ratio", "Electrolyte Profile (Potassium, Sodium & Chloride)"
        ]
    },
    {
        value: "Complete Urine Routine Analysis (CUE) - 20 Tests", price: 500, sub: [
            "Color", "Specific Gravity", "Apparence", "REaction (pH)", "Protiens", "Glucose", "Nitrites", "Blood", "Ketones",
            "Bilirubin", "Urobilinogen", "Leukocutes", "PUS (WBC) Cells", "RBC", "Epithelial Cells", "Crystals", "Casts", "Bacteria",
            "Budding Yeasts Cells", "Other Findings"
        ]
    },
    {
        value: "Complete Blood Counr (CBC) - 24 Tests", price: 500, sub: [
            "Hemoglobin (Hb)", "Total WBC Count (TLC)", "R.B.C Count", "MCV", "MCH", "MCHC", "Packed Cell Volume (PCV)", "Platelet count",
            "RDW-SD", "RDW-CV", "PDW", "MPV", "P-LCR", "PCT", "Neutrophils", "Lymphocytes", "Monocytes", "Eosinophills", "Basophils",
            "Absolute Neutrophils Count", "Absolute Lymphocytes Count", "Absolute Monocytes Count",
            "Absolute Eosinophils Count", "Absolute Basophils Count",
        ]
    },
    {value: "Vitamin B12", price: 700, sub: []},
    {value: "Vitamin D-3 (25-Hydroxy)", price: 1000, sub: []},
    {value: "ECG", price: 500, sub: []},
    {value: "USG(Abdomen & Pelvis)", price: 1100, sub: []},
    {value: "Chest X-ray", price: 400, sub: []},
    {value: "PSA (Male)", price: 600, sub: []},
    {value: "Eye Checkup", price: 250, sub: []},
    {value: "GP Consulation", price: 300, sub: []},
    {value: "Mamography", price: 1200, sub: []},
    {value: "Pap Smear (Female)", price: 1500, sub: []},
]


export const addons = [{value: "Ante Natal ( BSR / Hbsag / HIV / RPR / TSH / CUE / ABO / CBC ) ", price: 1100},
    {value: "Beta Human Chorionic Gonodotropin (Beta HCG) ", price: 600},
    {value: "Bilirubin (Total, Direct & Indirect ) ", price: 230},
    {value: "CA125 - Ovarian Cancer marker ", price: 1100},
    {value: "CA15.3 - Breast Cancer marker ", price: 1150},
    {value: "Complete Blood Count (CBC) ", price: 300},
    {value: "Urine Culture & Sensitivity ", price: 500},
    {value: "Electrolyte Profile (Potassium, Sodium & Chloride) ", price: 300},
    {value: "Fever Panel (MP-AG,Widal,CUE,ESR,CBC/PS) ", price: 750},
    {value: "Folate Serum (Folic Acid) ", price: 1000},
    {value: "Follicle Stimulating Hormone (FSH) ", price: 450},
    {value: "Glycosylated Hemoglobin (GHb/HbA1c) ", price: 500},
    {value: "Haemogram (CBC P/S+ESR) ", price: 400},
    {value: "Hepatitis 'B, Surface antigen (HBsAg) ", price: 300},
    {value: "Hepatitis C Virus (Antibody) ", price: 900},
    {value: "High Sensitive CRP (hsCRP) ", price: 700},
    {value: "HIV 1 & 2  (Antibody) ", price: 350},
    {value: "Kidney Function Test (KFT) ", price: 500},
    {value: "Kidney Function (KFT) + Electrolytes ", price: 700},
    {value: "Lipid (Heart Risk) Profile ", price: 500},
    {value: "Liver Function Test (LFT) - Extended ", price: 500},
    {value: "Luteinising Hormone (LH) ", price: 450},
    {value: "Typhi Dot Combo (Salmonella typhi IgG & IgM) ", price: 500},
    {value: "Prolactin ", price: 450},
    {value: "Rubella virus IgG Antibody or IgM Antibody (each test) ", price: 500},
    {value: "Testosterone Total ", price: 550},
    {value: "Thyroid Panel - II (TSH, TT3, TT4, FT3 & FT4) ", price: 900},
    {value: "Thyroid Panel - IV (FT3, FT4 & TSH) ", price: 750},
    {value: "Thyroid Panel (T3,T4 & TSH) ", price: 500},
    {value: "Total IgE ", price: 750},
    {value: "Vitamin - B12 ", price: 660},
    {value: "Vitamin D-3 (25 - Hydroxy) ", price: 1330},
    {value: "Anti - Mullerian Hormone (AMH) ", price: 1750},
    {value: "Activated Partial Thromboplastin Time (APTT) ", price: 450},
    {value: "Anti Nuclear Antibody (ANA) ", price: 600},
    {value: "Dual Marker with graph ", price: 2200},
    {value: "Ferritin ", price: 600},
    {value: "Quadra Marker With Graph ", price: 3100},
    {value: "TORCH 10 PANEL (IgG & IgM) ", price: 2200},
    {value: "TORCH 5 Panel (IgG) or (IgM) EACH sold Saperatly ", price: 1100},
    {value: "Triple Marker with graph ", price: 2000}]
