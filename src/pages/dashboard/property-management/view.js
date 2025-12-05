import { Helmet } from 'react-helmet-async';
import { PropertyListView } from 'src/sections/property-management';
// sections

// ----------------------------------------------------------------------

export default function PropertyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property List</title>
      </Helmet>

      <PropertyListView />
    </>
  );
}
