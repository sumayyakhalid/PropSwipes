import { Helmet } from 'react-helmet-async';
import { UserListView } from 'src/sections/subscriber/view';
// sections

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Subscriber Management</title>
      </Helmet>

      <UserListView />
    </>
  );
}
