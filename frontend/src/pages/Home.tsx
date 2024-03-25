import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="campaigns">
        <h1>Live &amp; Recent Campaigns</h1>
        <p className="subtitle">Invest in exciting Australian brands</p>
        {/* Campaign Tiles go here*/}
      </div>
    </>
  );
};

export default Home;
