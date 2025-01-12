import { cookies } from 'next/headers'; // Access cookies from next/headers

// Auth function that uses the token from cookies
async function Auth() {
  // Access cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken');

  if (!token) {
    return { isLoggedIn: false, message: 'Credentials Not Found' };
  }
  //   return { token: token.value};
  // Proceed with authentication
  if (!process.env.NEXT_PUBLIC_API) {
    return { isLoggedIn: false, message: 'API URL Not Found' };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/v2/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        isLoggedIn: false,
        message: data?.message || 'Authentication Went Wrong',
      };
    }

    return { isLoggedIn: true, data };
  } catch (error) {
    console.error('Auth Error:', error);
    return { isLoggedIn: false, message: 'Authentication Failed' };
  }
}

export default Auth;
