import { Campaign, CampaignType, CampaignStatus } from "../types/campaign";

const typeFormats = {
  [CampaignType.EOI]: "Expressions of Interest",
  [CampaignType.OFFER]: "Offer",
};

const getStatusFormatted = ({
  status,
  closingInDays,
  closeDateFormatted,
}: Campaign) => {
  if (status === CampaignStatus.LIVE) {
    const daysOrDay = closingInDays > 1 ? "days" : "day";
    return `Closes in ${Math.floor(closingInDays)} ${daysOrDay}`;
  }
  if (status === CampaignStatus.CLOSED) {
    return `Closed at ${closeDateFormatted}`;
  }
};

export interface CampaignProps {
  campaign: Campaign;
}

const CampaignItem = ({ campaign }: CampaignProps) => {
  const {
    company,
    type,
  } = campaign;
  const {
    name,
    industry,
    mainImage,
    logoImage,
  } = company;

  return (
    <div>
      <img src={mainImage} />
      <div>
        <img src={logoImage} />
        <div>
          <p>{name}</p>
          <p>{industry}</p>
        </div>
      </div>
      <div>
        <p>{typeFormats[type]}</p>
        <p>{getStatusFormatted(campaign)}</p>
      </div>
    </div>
  );
};

export default CampaignItem;
