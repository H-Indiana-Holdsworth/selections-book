import { buildAuthorizeEndpointAndRedirect } from './services/auth';

export default function App() {
  const handleClick = () => {
    buildAuthorizeEndpointAndRedirect();
  };

  return (
    <>
      <h1>Hello!</h1>
      <button onClick={handleClick}>Sign in with Procore</button>
    </>
  );
}
