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
    <div>
      <img className="header" src={mainImage} />
      <div className="middle">
        <div className="logo" style={{
          backgroundColor: logoColour || "var(--background-dark)",
        }}>
          <img src={logoImage} />
        </div>
        <div className="description">
          <h3 className="heavy">{name}</h3>
          <p className="light">{industry}</p>
        </div>
      </div>
      <div className="footer">
        <p className="heavy">{typeFormats[type]}</p>
        <p>{getStatusFormatted(campaign)}</p>
      </div>
    </div>
  );
};

export default CampaignItem;
