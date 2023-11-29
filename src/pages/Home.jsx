import { Navbar, Feature, Benefits, Demo, Feedback, Footer, Header, Joinus, Whyus} from '../containers';

// 0xF6477c535Ad72cb223e092Eb2cDBdB2F27101428
const Home = () => {
  return (
    <div>
        <div className="Home">
          <Navbar />
          <Header />
          <Feature />
          <Benefits />
          <Demo />
          <Whyus />
          <Feedback />
          <Joinus />
          <Footer />
        </div>
    </div>
  )
}

export default Home