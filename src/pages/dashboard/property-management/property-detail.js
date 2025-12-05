import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// mock
import { _userList } from 'src/_mock';
import PropertyDetailPage from 'src/sections/property-management/property-detail-view';

// ----------------------------------------------------------------------

export default function PropertyDetailPageComponent() {
  const params = useParams();

  const { id } = params;
  console.log('param id', id);

  const propertyDetail = _userList
    .map((user) => user.listings)
    .flat()
    .find((listing) => listing.id === id);

  console.log('propertyDetail', propertyDetail);
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Detail Management</title>
      </Helmet>

      <PropertyDetailPage currentProperty={id} />
    </>
  );
}
