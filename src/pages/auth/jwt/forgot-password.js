import { Helmet } from 'react-helmet-async';
import { JwtForgotPasswordView } from 'src/sections/auth/jwt';
// sections

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Login</title>
      </Helmet>

      <JwtForgotPasswordView />
    </>
  );
}
