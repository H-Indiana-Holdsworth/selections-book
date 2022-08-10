import { useEffect } from 'react';
import { buildAuthorizeEndpointAndRedirect } from './services/auth';

export default function App() {
  useEffect(() => {
    buildAuthorizeEndpointAndRedirect();
  }, []);

  return <h1>Hello Procore!</h1>;
}
