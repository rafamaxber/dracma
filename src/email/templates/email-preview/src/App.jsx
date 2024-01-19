import { WelcomeTemplate } from '../../login';
import { ForgotPasswordTemplate } from '../../forgot-password';

function App() {
  return (
    <>
      {/* <WelcomeTemplate name="John Doe" /> */}
      <hr />
      <ForgotPasswordTemplate firstName="Rafael" token="xxxx" />
    </>
  );
}

export default App;
