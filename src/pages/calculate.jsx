import { observer } from "mobx-react-lite";

import fieldsValue from "../stores/fields-value";

import Header from "../components/molecules/Header/Header";
import Navigation from "../components/molecules/Navigation/Navigation";
import Paper from "../components/atoms/Paper/Paper";
import Calculator from "../components/molecules/Calculator/Calculator";

import "../styles/global.scss";
import "../styles/Calculate.scss";

const Calculate = observer(() => {
  const { showPreloader } = fieldsValue;

  return (
    <>
      <Header />

      <div className="Calculate">
        <Paper
          display="flex"
          className="Calculate-Content"
          top={{ all: 80 }}
        >
          {!showPreloader && <Navigation />}
          <Calculator />
        </Paper>
      </div>
    </>
  );
});

export default Calculate;
