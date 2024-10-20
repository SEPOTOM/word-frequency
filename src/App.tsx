import { FrequencyTable, TextForm } from '@/components';

const App = () => (
  <>
    <TextForm maxChars={2048} />
    <FrequencyTable frequencyData={[]} />
  </>
);

export default App;
