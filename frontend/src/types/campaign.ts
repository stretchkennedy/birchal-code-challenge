import { Company } from "./company";

// Ideally I'd move Companies.tsx over to this enum, but from the instructions
// it's under active development and I would probably communicate with the other
// developer to avoid merge conflicts rather than do it now
export enum CampaignType {
  EOI = "EOI",
  OFFER = "OFFER",
}

export enum CampaignStatus {
  LIVE = "LIVE",
  CLOSED = "CLOSED",
}

export interface Campaign {
  id: string;
  company: Pick<Company, "name" | "industry" | "mainImage" | "logoImage" | "coverImage" | "logoColour">;
  type: CampaignType;
  status: CampaignStatus;
  closingInDays: number;
  closeDate: string;
  closeDateFormatted: string;
}
