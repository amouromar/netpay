interface FormData {
  income: string; // Hourly wage
  employment: string; // Employment type (w2, 1099)
  state: string; // State of residence/work
  hours: string; // Hours worked so far
  hoursToBeWorkedToday?: string; // Hours to be worked today (optional)
}

interface EarningsResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  netPay: number;
}

interface TaxBracket {
  min: number;
  max?: number;
  rate: number;
}

// Federal tax brackets for 2025 (single filer)
const federalTaxBrackets: TaxBracket[] = [
  { min: 0, max: 11925, rate: 0.1 },
  { min: 11926, max: 48475, rate: 0.12 },
  { min: 48476, max: 103350, rate: 0.22 },
  { min: 103351, max: 197300, rate: 0.24 },
  { min: 197301, max: 250525, rate: 0.32 },
  { min: 250526, max: 626350, rate: 0.35 },
  { min: 626351, rate: 0.37 },
];

// State tax rates for 2025 (single filer, progressive or flat)
const stateTaxRates: {
  [key: string]: { brackets: TaxBracket[] | null; note?: string };
} = {
  AL: {
    brackets: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 501, max: 3000, rate: 0.04 },
      { min: 3001, rate: 0.05 },
    ],
  }, // Alabama
  AK: { brackets: null, note: "No state income tax" }, // Alaska
  AZ: { brackets: [{ min: 0, rate: 0.025 }] }, // Arizona (flat 2.5%)
  AR: {
    brackets: [
      { min: 0, max: 5100, rate: 0.02 },
      { min: 5101, max: 10200, rate: 0.04 },
      { min: 10201, rate: 0.049 },
    ],
  }, // Arkansas
  CA: {
    brackets: [
      { min: 0, max: 10099, rate: 0.01 },
      { min: 10100, max: 23942, rate: 0.02 },
      { min: 23943, max: 37788, rate: 0.04 },
      { min: 37789, max: 52455, rate: 0.06 },
      { min: 52456, max: 66295, rate: 0.08 },
      { min: 66296, max: 338639, rate: 0.093 },
      { min: 338640, max: 406364, rate: 0.103 },
      { min: 406365, max: 677275, rate: 0.113 },
      { min: 677276, rate: 0.133 },
    ],
  }, // California
  CO: { brackets: [{ min: 0, rate: 0.0425 }] }, // Colorado (flat 4.25%)
  CT: {
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10001, max: 50000, rate: 0.05 },
      { min: 50001, max: 100000, rate: 0.055 },
      { min: 100001, rate: 0.06 },
    ],
  }, // Connecticut
  DE: {
    brackets: [
      { min: 2001, max: 5000, rate: 0.022 },
      { min: 5001, max: 10000, rate: 0.039 },
      { min: 10001, max: 20000, rate: 0.048 },
      { min: 20001, max: 25000, rate: 0.052 },
      { min: 25001, max: 60000, rate: 0.0555 },
      { min: 60001, rate: 0.066 },
    ],
  }, // Delaware
  FL: { brackets: null, note: "No state income tax" }, // Florida
  GA: { brackets: [{ min: 0, rate: 0.0549 }] }, // Georgia (flat 5.49%)
  HI: {
    brackets: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2401, max: 4800, rate: 0.032 },
      { min: 4801, max: 9600, rate: 0.055 },
      { min: 9601, max: 14400, rate: 0.064 },
      { min: 14401, max: 21600, rate: 0.068 },
      { min: 21601, max: 36000, rate: 0.076 },
      { min: 36001, max: 48000, rate: 0.079 },
      { min: 48001, max: 150000, rate: 0.0825 },
      { min: 150001, max: 175000, rate: 0.09 },
      { min: 175001, max: 225000, rate: 0.1 },
      { min: 225001, rate: 0.11 },
    ],
  }, // Hawaii
  ID: { brackets: [{ min: 0, rate: 0.058 }] }, // Idaho (flat 5.8%)
  IL: { brackets: [{ min: 0, rate: 0.0495 }] }, // Illinois (flat 4.95%)
  IN: { brackets: [{ min: 0, rate: 0.0315 }] }, // Indiana (flat 3.15%)
  IA: {
    brackets: [
      { min: 0, max: 6260, rate: 0.044 },
      { min: 6261, max: 25040, rate: 0.0482 },
      { min: 25041, max: 56340, rate: 0.057 },
      { min: 56341, rate: 0.06 },
    ],
  }, // Iowa
  KS: {
    brackets: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15001, max: 30000, rate: 0.0525 },
      { min: 30001, rate: 0.057 },
    ],
  }, // Kansas
  KY: { brackets: [{ min: 0, rate: 0.045 }] }, // Kentucky (flat 4.5%)
  LA: {
    brackets: [
      { min: 0, max: 12500, rate: 0.016 },
      { min: 12501, max: 50000, rate: 0.034 },
      { min: 50001, rate: 0.0425 },
    ],
  }, // Louisiana
  ME: {
    brackets: [
      { min: 0, max: 24500, rate: 0.058 },
      { min: 24501, max: 58050, rate: 0.0675 },
      { min: 58051, rate: 0.0715 },
    ],
  }, // Maine
  MD: {
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1001, max: 2000, rate: 0.03 },
      { min: 2001, max: 3000, rate: 0.04 },
      { min: 3001, max: 100000, rate: 0.0475 },
      { min: 100001, max: 125000, rate: 0.05 },
      { min: 125001, max: 150000, rate: 0.0525 },
      { min: 150001, max: 250000, rate: 0.055 },
      { min: 250001, rate: 0.0575 },
    ],
  }, // Maryland
  MA: { brackets: [{ min: 0, rate: 0.05 }] }, // Massachusetts (flat 5%)
  MI: { brackets: [{ min: 0, rate: 0.0425 }] }, // Michigan (flat 4.25%)
  MN: {
    brackets: [
      { min: 0, max: 32450, rate: 0.0535 },
      { min: 32451, max: 106360, rate: 0.068 },
      { min: 106361, max: 197850, rate: 0.0785 },
      { min: 197851, rate: 0.0985 },
    ],
  }, // Minnesota
  MS: { brackets: [{ min: 10001, rate: 0.048 }] }, // Mississippi (flat 4.8% above $10,000)
  MO: {
    brackets: [
      { min: 0, max: 1113, rate: 0.015 },
      { min: 1114, max: 2226, rate: 0.02 },
      { min: 2227, max: 3339, rate: 0.025 },
      { min: 3340, max: 4452, rate: 0.03 },
      { min: 4453, max: 5565, rate: 0.035 },
      { min: 5566, max: 6678, rate: 0.04 },
      { min: 6679, max: 7791, rate: 0.045 },
      { min: 7792, max: 8904, rate: 0.049 },
      { min: 8905, rate: 0.051 },
    ],
  }, // Missouri
  MT: {
    brackets: [
      { min: 0, max: 21100, rate: 0.047 },
      { min: 21101, rate: 0.059 },
    ],
  }, // Montana
  NE: {
    brackets: [
      { min: 0, max: 3700, rate: 0.024 },
      { min: 3701, max: 22170, rate: 0.0351 },
      { min: 22171, max: 35730, rate: 0.0501 },
      { min: 35731, rate: 0.066 },
    ],
  }, // Nebraska
  NV: { brackets: null, note: "No state income tax" }, // Nevada
  NH: { brackets: null, note: "No state income tax on earned income" }, // New Hampshire
  NJ: {
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20001, max: 35000, rate: 0.0175 },
      { min: 35001, max: 40000, rate: 0.035 },
      { min: 40001, max: 75000, rate: 0.05525 },
      { min: 75001, max: 500000, rate: 0.0637 },
      { min: 500001, max: 1000000, rate: 0.0897 },
      { min: 1000001, rate: 0.1075 },
    ],
  }, // New Jersey
  NM: {
    brackets: [
      { min: 0, max: 5500, rate: 0.017 },
      { min: 5501, max: 11000, rate: 0.032 },
      { min: 11001, max: 16000, rate: 0.047 },
      { min: 16001, max: 210000, rate: 0.049 },
      { min: 210001, rate: 0.059 },
    ],
  }, // New Mexico
  NY: {
    brackets: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8501, max: 11700, rate: 0.045 },
      { min: 11701, max: 13900, rate: 0.0525 },
      { min: 13901, max: 80650, rate: 0.059 },
      { min: 80651, max: 215400, rate: 0.0633 },
      { min: 215401, max: 1077550, rate: 0.0685 },
      { min: 1077551, rate: 0.109 },
    ],
    note: "NYC local tax: 3.078%–3.876%",
  }, // New York
  NC: { brackets: [{ min: 0, rate: 0.0475 }] }, // North Carolina (flat 4.75%)
  ND: {
    brackets: [
      { min: 0, max: 44725, rate: 0.011 },
      { min: 44726, max: 108725, rate: 0.0204 },
      { min: 108726, max: 240775, rate: 0.0227 },
      { min: 240776, max: 480050, rate: 0.0264 },
      { min: 480051, rate: 0.029 },
    ],
  }, // North Dakota
  OH: {
    brackets: [
      { min: 26051, max: 49250, rate: 0.0185 },
      { min: 49251, max: 98450, rate: 0.0259 },
      { min: 98451, rate: 0.0333 },
    ],
  }, // Ohio
  OK: {
    brackets: [
      { min: 0, max: 1000, rate: 0.005 },
      { min: 1001, max: 2500, rate: 0.01 },
      { min: 2501, max: 3750, rate: 0.02 },
      { min: 3751, max: 4900, rate: 0.03 },
      { min: 4901, max: 7200, rate: 0.04 },
      { min: 7201, rate: 0.0475 },
    ],
  }, // Oklahoma
  OR: {
    brackets: [
      { min: 0, max: 4050, rate: 0.0475 },
      { min: 4051, max: 10200, rate: 0.0675 },
      { min: 10201, max: 125000, rate: 0.0875 },
      { min: 125001, rate: 0.099 },
    ],
  }, // Oregon
  PA: { brackets: [{ min: 0, rate: 0.0307 }] }, // Pennsylvania (flat 3.07%)
  RI: {
    brackets: [
      { min: 0, max: 73225, rate: 0.0375 },
      { min: 73226, max: 166950, rate: 0.0475 },
      { min: 166951, rate: 0.0599 },
    ],
  }, // Rhode Island
  SC: {
    brackets: [
      { min: 0, max: 3460, rate: 0.0 },
      { min: 3461, max: 17300, rate: 0.03 },
      { min: 17301, rate: 0.064 },
    ],
  }, // South Carolina
  SD: { brackets: null, note: "No state income tax" }, // South Dakota
  TN: { brackets: null, note: "No state income tax" }, // Tennessee
  TX: { brackets: null, note: "No state income tax" }, // Texas
  UT: { brackets: [{ min: 0, rate: 0.0485 }] }, // Utah (flat 4.85%)
  VT: {
    brackets: [
      { min: 0, max: 45125, rate: 0.0335 },
      { min: 45126, max: 108750, rate: 0.066 },
      { min: 108751, max: 233350, rate: 0.076 },
      { min: 233351, rate: 0.0875 },
    ],
  }, // Vermont
  VA: {
    brackets: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3001, max: 5000, rate: 0.03 },
      { min: 5001, max: 17000, rate: 0.05 },
      { min: 17001, rate: 0.0575 },
    ],
  }, // Virginia
  WA: { brackets: null, note: "No state income tax" }, // Washington
  WV: {
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10001, max: 25000, rate: 0.04 },
      { min: 25001, max: 40000, rate: 0.045 },
      { min: 40001, max: 60000, rate: 0.06 },
      { min: 60001, rate: 0.065 },
    ],
  }, // West Virginia
  WI: {
    brackets: [
      { min: 0, max: 14580, rate: 0.035 },
      { min: 14581, max: 29160, rate: 0.044 },
      { min: 29161, max: 405110, rate: 0.058 },
      { min: 405111, rate: 0.0765 },
    ],
  }, // Wisconsin
  WY: { brackets: null, note: "No state income tax" }, // Wyoming
};

// Calculate federal income tax based on annualized income
function calculateFederalIncomeTax(annualIncome: number): number {
  let tax = 0;
  for (const bracket of federalTaxBrackets) {
    if (annualIncome > bracket.min) {
      const taxableInBracket =
        Math.min(annualIncome, bracket.max || Infinity) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }
  return tax;
}

// Calculate state income tax based on annualized income
function calculateStateIncomeTax(annualIncome: number, state: string): number {
  const stateData = stateTaxRates[state];
  if (!stateData || !stateData.brackets) return 0; // No state income tax

  let tax = 0;
  for (const bracket of stateData.brackets) {
    if (annualIncome > bracket.min) {
      const taxableInBracket =
        Math.min(annualIncome, bracket.max || Infinity) - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }
  return tax;
}

// Main earnings calculation function
export function calculateEarnings(data: FormData): EarningsResult {
  const hourlyWage = parseFloat(data.income) || 0;
  const hoursToBeWorked =
    data.hoursToBeWorkedToday !== undefined
      ? parseFloat(data.hoursToBeWorkedToday) || 0
      : parseFloat(data.hours) || 0;
  const employmentType = data.employment;
  const state = data.state;

  // Calculate gross pay (should be hourly wage * hours to be worked today)
  const grossPay = hourlyWage * hoursToBeWorked;

  // Estimate annual income for tax calculations (assuming 40 hours/week, 52 weeks)
  const annualIncome = hourlyWage * 40 * 52;

  // Federal taxes
  let federalTax = 0;
  let ficaTax = 0;

  if (employmentType === "w2") {
    // W-2: Federal income tax + FICA (Social Security + Medicare)
    federalTax =
      (calculateFederalIncomeTax(annualIncome) / (40 * 52)) * hoursToBeWorked;
    const socialSecurity = Math.min(
      grossPay * 0.062,
      (176100 / (40 * 52)) * hoursToBeWorked,
    ); // 6.2% up to $176,100
    const medicare = grossPay * 0.0145; // 1.45%, no cap
    ficaTax = socialSecurity + medicare;
  } else if (employmentType === "1099") {
    // 1099: Federal income tax + Self-employment tax
    federalTax =
      (calculateFederalIncomeTax(annualIncome) / (40 * 52)) * hoursToBeWorked;
    const selfEmploymentTax = Math.min(
      grossPay * 0.153,
      (176100 / (40 * 52)) * hoursToBeWorked * 0.124 + grossPay * 0.029,
    ); // 15.3% (12.4% SS + 2.9% Medicare)
    ficaTax = selfEmploymentTax;
  }

  // State taxes
  const stateTax =
    (calculateStateIncomeTax(annualIncome, state) / (40 * 52)) *
    hoursToBeWorked;

  // Net pay
  const netPay = grossPay - federalTax - ficaTax - stateTax;

  return {
    grossPay: parseFloat(grossPay.toFixed(2)),
    federalTax: parseFloat(federalTax.toFixed(2)),
    stateTax: parseFloat(stateTax.toFixed(2)),
    ficaTax: parseFloat(ficaTax.toFixed(2)),
    netPay: parseFloat(Math.max(netPay, 0).toFixed(2)),
  };
}
