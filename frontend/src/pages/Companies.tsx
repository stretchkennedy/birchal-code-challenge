import { useEffect, useState } from "react";
import { Company } from "../types/company";

const getBackgroundColor = (company: Company) => {
  const isLive = company.campaignStatus === "LIVE";
  if (company.campaignType === "EOI" && isLive) return "var(--blue)";
  if (company.campaignType === "OFFER") return "var(--success)";
  return undefined;
};
const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    fetch("/companies.json")
      .then((res) => res.json())
      .then(setCompanies);
  }, []);
  return (
    <div className="inverted">
      <h1>Discover Australian brands</h1>
      <p className="subtitle">Follow their journey</p>
      <div className="company-tiles">
        {companies.map((c) => (
          <div
            key={c.id}
            style={{
              background: `linear-gradient(rgba(33, 36, 55, 0.75) 20%, rgba(33, 36, 55, 0.4) 100%) center center / cover, url(${c.coverImage}) center center / cover`,
            }}
          >
            <p className="campaign-details">
              <span style={{
                backgroundColor: getBackgroundColor(c),
              }}>{c.campaignStatus === "CLOSED"
                ? "Funded"
                : c.campaignType === "EOI"
                ? "EOI Open"
                : "Accepting Investments"}</span>
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "2rem 0",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: c.logoColour || "var(--neutral)",
                  width: 48,
                  height: 48,
                }}
              >
                <img
                  style={{
                    margin: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={c.logoImage}
                  alt={c.name}
                />
              </div>
              <div style={{ flex: 2, textShadow:'1px 1px 2px rgba(0,0,0,0.5)' }}>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <br />
                <span>{c.location}</span>
              </div>
            </div>
            <p className="industry">
              <span>{c.industry}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
