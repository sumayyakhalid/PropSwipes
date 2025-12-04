import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// sections
import UserDetailPage from 'src/sections/subscriber/view/user-detail-view';
import AssignSubscriptionDialog from 'src/sections/subscriber/grant-subscription/assign-subscription-dialog';
// mock
import { _userList } from 'src/_mock';

// ----------------------------------------------------------------------

export default function SubscriberDetailPage() {
  const params = useParams();

  const { id } = params;

  const assignSubscriptionDialog = useBoolean(false);

  const userDetail = _userList.find((user) => user.id === id);

  return (
    <>
      <Helmet>
        <title> Dashboard: Subscriber Management</title>
      </Helmet>

      <UserDetailPage currentUser={id} assignSubscriptionDialog={assignSubscriptionDialog} />

      {assignSubscriptionDialog.value && (
        <AssignSubscriptionDialog
          assignSubscriptionDialog={assignSubscriptionDialog}
          row={userDetail}
        />
      )}
    </>
  );
}
