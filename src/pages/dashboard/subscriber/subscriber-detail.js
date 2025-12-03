import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import UserDetailPage from 'src/sections/subscriber/view/user-detail-view';

// ----------------------------------------------------------------------

export default function SubscriberDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Subscriber Management</title>
      </Helmet>

      <UserDetailPage currentUser={id} />
    </>
  );
}
