import Hero from "../components/Hero";
import StateHandler from "../components/StateHandler"
import useFetch from "../hooks/useFetch";

interface Campaign {
  id: string;
  company: Company;
}

interface Company {
  name: string;
}

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
          { campaigns.map(c => <p key={c.id}>{c.company.name}</p>) }
        </StateHandler>
      </div>
    </>
  );
};

export default Home;
