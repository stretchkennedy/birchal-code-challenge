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
    logoColour,
  } = company;

  return (
    <div className="campaign-tiles__tile">
      <img className="campaign-tiles__header" src={mainImage} />
      <div className="campaign-tiles__middle">
        <div className="campaign-tiles__logo" style={{
          backgroundColor: logoColour || "var(--background-dark)",
        }}>
          <img src={logoImage} />
        </div>
        <div className="campaign-tiles__description">
          <h3 className="heavy">{name}</h3>
          <p className="light">{industry}</p>
        </div>
      </div>
      <div className="campaign-tiles__footer">
        <p className="heavy">{typeFormats[type]}</p>
        <p>{getStatusFormatted(campaign)}</p>
      </div>
    </div>
  );
};

export default CampaignItem;
