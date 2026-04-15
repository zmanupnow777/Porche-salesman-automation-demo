import { EmailStepKey, LeadInput } from "@/lib/types";

export const SALES_REP = {
  sales_rep_name: "Steffan Semurath",
  dealership_name: "Porsche Centre Trinidad",
  phone_number: "868 752 1398",
  email: "ssemurath@lsmtnt.com",
  location: "Don Miguel, San Juan, Trinidad and Tobago"
};

export const FIELD_OPTIONS = {
  vehicle_interest: [
    "Porsche Macan",
    "Porsche Cayenne",
    "Porsche 911 Carrera S",
    "Porsche 718 Cayman",
    "Porsche Taycan"
  ],
  inquiry_type: [
    "pricing request",
    "availability request",
    "book a test drive",
    "financing inquiry",
    "trade-in inquiry",
    "general question"
  ],
  preferred_contact_method: ["email", "phone", "WhatsApp"],
  timeline_to_purchase: [
    "immediately",
    "within 1 month",
    "within 3 months",
    "just researching"
  ],
  budget_range: [
    "Under $80,000",
    "$80,000 - $120,000",
    "$120,000 - $180,000",
    "$180,000+"
  ],
  trade_in_interest: ["yes", "no"],
  test_drive_interest: ["yes", "no"],
  lead_source: [
    "Instagram DM",
    "Website Inquiry",
    "Showroom Walk-In",
    "Referral",
    "Phone Call",
    "Manual Entry"
  ]
} satisfies Record<keyof Omit<LeadInput, "first_name" | "last_name" | "email" | "phone" | "notes">, string[]>;

export const EMAIL_SEQUENCE: Array<{
  key: EmailStepKey;
  title: string;
  realTiming: string;
  demoTiming: string;
  delayMinutes: number;
}> = [
  {
    key: "email_1",
    title: "Email 1",
    realTiming: "Immediately after lead capture",
    demoTiming: "T+0m demo",
    delayMinutes: 0
  },
  {
    key: "email_2",
    title: "Email 2",
    realTiming: "24-48 hours later if no reply",
    demoTiming: "T+2m demo",
    delayMinutes: 2
  },
  {
    key: "email_3",
    title: "Email 3",
    realTiming: "4-7 days later if still no reply",
    demoTiming: "T+6m demo",
    delayMinutes: 6
  }
];

export const EMPTY_LEAD_FORM: LeadInput = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  vehicle_interest: FIELD_OPTIONS.vehicle_interest[0],
  inquiry_type: FIELD_OPTIONS.inquiry_type[0],
  preferred_contact_method: FIELD_OPTIONS.preferred_contact_method[0],
  timeline_to_purchase: FIELD_OPTIONS.timeline_to_purchase[1],
  budget_range: FIELD_OPTIONS.budget_range[1],
  trade_in_interest: FIELD_OPTIONS.trade_in_interest[1],
  test_drive_interest: FIELD_OPTIONS.test_drive_interest[1],
  notes: "",
  lead_source: FIELD_OPTIONS.lead_source[0]
};
