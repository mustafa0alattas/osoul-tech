import { z } from "zod";

// Saudi mobile: accepts 5XXXXXXXX, 05XXXXXXXX, 9665XXXXXXXX, +9665XXXXXXXX
export const SAUDI_MOBILE_REGEX = /^(\+?966|0)?5\d{8}$/;

export const NOTES_MAX_LEN = 500;

export const REGISTRATION_TYPES = ["investor", "owner"] as const;
export type RegistrationType = (typeof REGISTRATION_TYPES)[number];

export const INVESTMENT_AMOUNTS = [
  "under10k",
  "from10to50k",
  "from50to200k",
  "above200k",
] as const;

export const PROPERTY_PREFS = [
  "residential",
  "commercial",
  "office",
  "noPreference",
] as const;

export const HOLDING_PERIODS = ["1y", "3y", "5yPlus"] as const;

export const OWNER_PROPERTY_TYPES = [
  "apartment",
  "building",
  "mall",
  "land",
  "offices",
  "other",
] as const;

export const ESTIMATED_VALUES = [
  "under1m",
  "from1to5m",
  "from5to20m",
  "above20m",
] as const;

export const YES_NO = ["yes", "no"] as const;

/**
 * Error messages are injected from the active locale's `Register.errors` namespace,
 * so the schema can be reconstructed at component render time using `useTranslations`.
 */
export type ErrorBag = {
  fullNameRequired: string;
  fullNameTooShort: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailRequired: string;
  emailInvalid: string;
  cityRequired: string;
  investmentAmountRequired: string;
  preferredPropertyTypeRequired: string;
  previousInvestmentRequired: string;
  holdingPeriodRequired: string;
  propertyTypeRequired: string;
  cityDistrictRequired: string;
  estimatedValueRequired: string;
  currentlyRentedRequired: string;
  notesTooLong: string;
  consentRequired: string;
};

export function buildRegisterInterestSchema(e: ErrorBag) {
  const fullName = z
    .string()
    .trim()
    .min(1, e.fullNameRequired)
    .min(3, e.fullNameTooShort);

  const phone = z
    .string()
    .trim()
    .min(1, e.phoneRequired)
    .refine((v) => SAUDI_MOBILE_REGEX.test(v.replace(/\s+/g, "")), {
      message: e.phoneInvalid,
    });

  const email = z
    .string()
    .trim()
    .min(1, e.emailRequired)
    .email(e.emailInvalid);

  const city = z.string().min(1, e.cityRequired);

  const consent = z.literal(true, { error: e.consentRequired });

  const investorBranch = z.object({
    type: z.literal("investor"),
    fullName,
    phone,
    email,
    city,
    investmentAmount: z.enum(INVESTMENT_AMOUNTS, {
      error: e.investmentAmountRequired,
    }),
    preferredPropertyType: z
      .array(z.enum(PROPERTY_PREFS))
      .min(1, e.preferredPropertyTypeRequired),
    previousInvestment: z.enum(YES_NO, { error: e.previousInvestmentRequired }),
    holdingPeriod: z.enum(HOLDING_PERIODS, { error: e.holdingPeriodRequired }),
    consent,
  });

  const ownerBranch = z.object({
    type: z.literal("owner"),
    fullName,
    phone,
    email,
    city,
    propertyType: z.enum(OWNER_PROPERTY_TYPES, { error: e.propertyTypeRequired }),
    cityDistrict: z.string().trim().min(2, e.cityDistrictRequired),
    estimatedValue: z.enum(ESTIMATED_VALUES, { error: e.estimatedValueRequired }),
    currentlyRented: z.enum(YES_NO, { error: e.currentlyRentedRequired }),
    notes: z.string().max(NOTES_MAX_LEN, e.notesTooLong).optional().or(z.literal("")),
    consent,
  });

  return z.discriminatedUnion("type", [
    investorBranch,
    ownerBranch,
  ]);
}

export type RegisterInterestValues = z.infer<
  ReturnType<typeof buildRegisterInterestSchema>
>;
export type InvestorValues = Extract<RegisterInterestValues, { type: "investor" }>;
export type OwnerValues = Extract<RegisterInterestValues, { type: "owner" }>;
