// Generate a code verifier

function generateVerifier() {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);

  return Array.from(array, (item) => `0${item.toString(16)}`.substr(-2)).join(
    ''
  );
}

// The code challenge performs the following logic on
// the code verifier we generated above

async function generateChallenge(verifier) {
  function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);

    return window.crypto.subtle.digest('SHA-256', data);
  }

  function base64URLEncode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+\$/, '');
  }

  const hashed = await sha256(verifier);

  return base64URLEncode(hashed);
}

// Build endpoint

export async function buildAuthorizeEndpointAndRedirect() {
  const host = 'https://login-sandbox.procore.com/oauth/authorize';
  const clientId =
    '7b18a910f1b9cce5d80479e0d9f260f3bc0293158603e3f2dbdb559ed8314140';
  const redirectUri = 'http://localhost:4567/callback';
  //   const scope = 'specific,scopes,for,app';
  const verifier = generateVerifier();
  const challenge = await generateChallenge(verifier);

  // Build endpoint
  const endpoint = `${host}?
      response_type=code&
      client_id=${clientId}&
      redirect_uri=${redirectUri}&
      code_challenge=${challenge}&
      code_challenge_method=S256`;

  // Set verifier to local storage
  localStorage.setItem('verifier', verifier);

  // Redirect to authentication server's login page
  window.location = endpoint;
}
