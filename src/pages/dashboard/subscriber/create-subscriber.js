import { Helmet } from 'react-helmet-async';
import { UserCreateView } from 'src/sections/subscriber/view';
// sections

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create New Subscriber</title>
      </Helmet>

      <UserCreateView />
    </>
  );
}
