import { EvRegistration } from "./components/EvRegistration";
import { EvRegistryDetails } from "./components/EvRegistryDetails";
import { EvStatusCard } from "./components/EvStatusCard";
import { Heder } from "./components/Heder";
import { ManufacturesChart } from "./components/ManufacturesChart";
import { Wrapper } from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Heder></Heder>
      <EvStatusCard></EvStatusCard>
      <ManufacturesChart></ManufacturesChart>
      <EvRegistration></EvRegistration>
      <EvRegistryDetails></EvRegistryDetails>
    </Wrapper>
  );
}

export default App;
