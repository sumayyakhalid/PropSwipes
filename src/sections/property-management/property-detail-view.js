import PropTypes from 'prop-types';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _userList } from 'src/_mock';

// ----------------------------------------------------------------------

export default function PropertyDetailPage({ currentProperty }) {
  console.log('currentProperty', currentProperty); // id

  const currentListing = _userList
    .map((user) => user.listings)
    .flat()
    .find((listing) => listing.id === currentProperty);
  console.log('currentListing', currentListing);

  return (
    <>
      <CustomBreadcrumbs
        heading="Property Management"
        links={[
          {
            name: 'Property List',
            href: paths.subscriberManagement.root,
          },

          { name: 'User Profile Detials' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* property detail */}
      {/* <UserPropertyListing listings={[userDetail.listings]} /> */}
    </>
  );
}

// ----------------------------------------------------------------------

PropertyDetailPage.propTypes = {
  currentProperty: PropTypes.object,
};
