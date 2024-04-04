import CampaignItem from "../components/CampaignItem";
import Hero from "../components/Hero";
import StateHandler from "../components/StateHandler"
import useFetch from "../hooks/useFetch";
import { Campaign } from "../types/campaign";

const byClosingInDaysDesc = (c1: Campaign, c2: Campaign) => c2.closingInDays - c1.closingInDays;

const Home = () => {
  const fetchState = useFetch<Campaign[]>("/campaigns.json", []);
  const { data: campaigns } = fetchState;
  return (
    <>
      <Hero />
      <div className="campaigns">
        <h1>Live &amp; Recent Campaigns</h1>
        <p className="subtitle">Invest in exciting Australian brands</p>
        <StateHandler {...fetchState} >
          {
            campaigns.sort(byClosingInDaysDesc).map(
              c => <CampaignItem key={c.id} campaign={c} />
            )
          }
        </StateHandler>
      </div>
    </>
  );
};

export default Home;
