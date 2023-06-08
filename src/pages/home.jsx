import Typography from "../components/atoms/Typography/Typography";
import Header from "../components/molecules/Header/Header";
import Paper from "../components/atoms/Paper/Paper";
import Link from "../components/atoms/Link/Link";

import "../styles/Home.scss";

const Home = () => {
  return (
    <>
      <Header />
      <div className="Home">
        <Paper
          className="SearchAddress-Content"
          top={{ all: 32 }}
          right={{ all: 32 }}
          left={{ all: 32 }}
        >
          <Typography size={26} weight={700}>
            Calculator
          </Typography>
          <Paper top={{ all: 16 }}>
            <Typography size={20} weight={500}>
              Here you can get sum of two and more numbers
            </Typography>
          </Paper>
          <Paper top={{ all: 24 }}>
            <Typography size={20} weight={500}>
              Let`s calculate your numbers.
            </Typography>{' '}
            <Link color="blue" to="/login">
              <Typography size={20} weight={500}>
                Log in
              </Typography>
            </Link>
          </Paper>
        </Paper>
      </div>
    </>
  );
};

export default Home;
