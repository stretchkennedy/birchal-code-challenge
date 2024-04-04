import { Company } from "./company";

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
  company: Pick<Company, "name", "industry", "mainImage", "logoImage", "coverImage">;
  type: CampaignType;
  status: CampaignStatus;
  closingInDays: number;
  closeDate: string;
  closeDateFormatted: string;
}

