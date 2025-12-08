import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { _userList } from 'src/_mock';

// ----------------------------------------------------------------------

const AMENITIES = [
  'Swimming Pool',
  'Fitness Center',
  'In-Unit Laundry',
  'Fireplace',
  'Storage Unit',
  'Parking Garage',
  'Garden/Landscaping',
  'Balcony/Patio',
  'Central Air/Heat',
  'Elevator',
  'Concierge',
  'Rooftop Access',
  'Tennis Court',
  'Doorman',
  'Business Center',
];

// ----------------------------------------------------------------------

export default function PropertyDetailPage({ currentProperty }) {
  const settings = useSettingsContext();

  const currentUserDetails = _userList.find((user) =>
    user?.listings?.some((listing) => listing.id === currentProperty)
  );

  const currentUserListing = currentUserDetails?.listings?.find(
    (listing) => listing.id === currentProperty
  );

  const images = currentUserListing?.images || [];
  const slides = images.map((img) => ({ src: img }));
  const lightbox = useLightBox(slides);

  if (!currentUserListing) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography variant="h6" sx={{ textAlign: 'center', py: 5 }}>
          Property not found
        </Typography>
      </Container>
    );
  }

  const {
    status,
    statusColor,
    title,
    tag,
    tagColor,
    price,
    bed,
    bath,
    square_ft,
    parking,
    fees,
    lotSize,
    builtYear,
    listedDate,
    type,
    description,
    key_Features,
  } = currentUserListing;

  const mainImage = images[0];
  const thumb = images?.[1];
  const thirdImage = images?.[2];
  const remainingCount = Math.max(images.length - 3, 0);

  const amenities = key_Features?.amenities || AMENITIES;
  const appliances = key_Features?.appliances;
  const interior_features = key_Features?.interior_features;

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Property Management"
          links={[
            {
              name: 'Property List',
              href: paths.propertyManagement.root,
            },
            { name: title },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Grid container spacing={3}>
          {/* Left Column - Property Details */}
          <Grid xs={12} md={12}>
            {/* Image Gallery */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                gap: 1.5,
                mb: 3,
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: { xs: 300, md: 400 },
                }}
                onClick={() => lightbox.onOpen(mainImage)}
              >
                <Image
                  alt={title}
                  src={mainImage}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {status && (
                  <Chip
                    label={status}
                    color={statusColor}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              {/* Thumbnail Images */}
              <Stack
                spacing={1}
                sx={{
                  height: { xs: 300, md: 400 },
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flex: 1,
                    minHeight: 0,
                  }}
                  onClick={() => lightbox.onOpen(thumb)}
                >
                  <Image
                    alt={title}
                    src={thumb}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                {(thirdImage || remainingCount > 0) && (
                  <Box
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 0,
                      cursor: 'pointer',
                    }}
                    onClick={() => lightbox.onOpen(thirdImage || thumb)}
                  >
                    {thirdImage && (
                      <Box
                        component="img"
                        src={thirdImage}
                        alt={title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    {remainingCount > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: thirdImage ? '#016BFFC2' : 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'common.white',
                            fontWeight: 700,
                            fontSize: 24,
                            lineHeight: 1,
                          }}
                        >
                          +{remainingCount}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid xs={12} md={8}>
            {/* Property Overview */}
            <Box sx={{ p: 1, mb: 3 }}>
              <Stack spacing={1}>
                <Grid container spacing={2}>
                  <Grid xs={12} md={5}>
                    <Box
                      color={tagColor}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src="/assets/icons/dashboard/for_sale_red.svg"
                        alt="tag"
                        width={14}
                        height={14}
                      />
                      <Typography variant="body2" sx={{ color: 'red' }}>
                        {tag}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '26px' }}>
                      {title}
                    </Typography>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 0.5,
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          alignItems: 'center',
                          mt: 1,
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/location_blue.svg"
                          alt="location"
                          width={14}
                          height={14}
                        />
                        {currentUserDetails?.address || '123 Main street, Seattle, WA, 98101'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          alignItems: 'center',
                          mt: 1,
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/listing_date.svg"
                          alt="listing_date"
                          width={14}
                          height={14}
                        />
                        Listing Date: {currentUserDetails?.listedDate || '2025-01-01'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          alignItems: 'center',
                          mt: 1,
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/total_matches.svg"
                          alt="total matches"
                          width={14}
                          height={14}
                        />
                        Property Type: {currentUserDetails?.type || '2025-01-01'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={7}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        mr: '2rem',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Price
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#006BFF', fontWeight: 500 }}>
                        {price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/2-bed.svg"
                          alt="bed"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          {bed}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/3-bed.svg"
                          alt="bath"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          {bath}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/square-ft.svg"
                          alt="SqFt"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          {square_ft}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/listing_date.svg"
                          alt="SqFt"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          Year Built:
                          {builtYear}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/listing_date.svg"
                          alt="SqFt"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          Parking:
                          {parking}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/lot_size.svg"
                          alt="SqFt"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          Lot Size:
                          {lotSize}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          border: '1px solid #E0E0E0',
                          borderRadius: 1,
                          padding: 1,
                          width: 'auto',
                          height: 'auto',
                        }}
                      >
                        <img
                          src="/assets/icons/dashboard/fees.svg"
                          alt="SqFt"
                          width={16}
                          height={16}
                        />
                        <Typography variant="body2" sx={{ color: '#919EAB', fontSize: '12px' }}>
                          {fees}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider />
              </Stack>
            </Box>

            {/* Description */}
            <Box sx={{ p: 1, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Description
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {description}
              </Typography>
            </Box>

            {/* Key Features / Amenities */}
            <Typography variant="h6" sx={{ mb: 3 }}>
              Key Features:
            </Typography>
            {/* Aamenities  */}
            <Card sx={{ p: 1 }}>
              <Typography variant="subtitle2">Amenities</Typography>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {amenities.map((amenity) => (
                  <Stack
                    key={amenity}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ diplay: 'flex', flexWrap: 'wrap' }}
                  >
                    <img src={amenity.icon} alt="swimming_pool" width={20} height={20} />
                    <Typography variant="body2">{amenity.name}</Typography>
                  </Stack>
                ))}
              </Box>
            </Card>

            {/* Appliances */}
            <Card sx={{ p: 1, my: 2 }}>
              <Typography variant="subtitle2">Appliances</Typography>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {appliances.map((amenity) => (
                  <Stack
                    key={amenity}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ diplay: 'flex', flexWrap: 'wrap' }}
                  >
                    <img src={amenity.icon} alt="swimming_pool" width={20} height={20} />
                    <Typography variant="body2">{amenity.name}</Typography>
                  </Stack>
                ))}
              </Box>
            </Card>

            {/* Interior Features */}
            <Card sx={{ p: 1 }}>
              <Typography variant="subtitle2">Interior Features</Typography>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {interior_features.map((amenity) => (
                  <Stack
                    key={amenity}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ diplay: 'flex', flexWrap: 'wrap' }}
                  >
                    <img src={amenity.icon} alt="swimming_pool" width={20} height={20} />
                    <Typography variant="body2">{amenity.name}</Typography>
                  </Stack>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Property Owner & Stats */}
          <Grid xs={12} md={4}>
            <Stack spacing={3}>
              {/* Property Owner */}
              <Card sx={{ p: 1 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Property Owner
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Avatar
                    src={currentUserDetails?.avatarUrl}
                    alt={currentUserDetails?.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Stack direction="row" spacing={10} alignItems="space-around">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="subtitle1">{currentUserDetails?.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Seller
                      </Typography>
                    </Box>
                    <Iconify icon="solar:eye-bold" width={18} sx={{ color: 'text.secondary' }} />
                  </Stack>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <img
                      src="/assets/icons/dashboard/phone_blue.svg"
                      alt="phone"
                      width={15}
                      height={16}
                    />
                    <Typography variant="body2" sx={{ color: '#919EAB' }}>
                      Ph:No .
                    </Typography>
                    <Typography variant="body2">{currentUserDetails?.phoneNumber}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ flexWrap: 'wrap' }}
                  >
                    <img
                      src="/assets/icons/dashboard/email_blue.svg"
                      alt="email"
                      width={15}
                      height={16}
                    />
                    <Typography variant="body2" sx={{ color: '#919EAB' }}>
                      Email
                    </Typography>
                    <Typography variant="body2">{currentUserDetails?.email}</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ height: '40px', fontSize: '13px', width: '90%' }}
                  >
                    Reject Property
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ height: '40px', fontSize: '13px' }}
                  >
                    Approve Property
                  </Button>
                </Stack>
              </Card>

              {/* Stats */}
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Stats:
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}
                    >
                      <img
                        src="/assets/icons/dashboard/total_clicks.svg"
                        alt="views"
                        width={24}
                        height={24}
                      />
                      <Typography
                        sx={{ color: 'text.secondary', fontSize: '18px', fontWeight: 400 }}
                      >
                        200+ <br /> Clicks
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}
                    >
                      <img
                        src="/assets/icons/dashboard/total_matches.svg"
                        alt="views"
                        width={24}
                        height={24}
                      />
                      <Typography
                        sx={{ color: 'text.secondary', fontSize: '18px', fontWeight: 400 }}
                      >
                        50+ <br /> Matches
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

// ----------------------------------------------------------------------

PropertyDetailPage.propTypes = {
  currentProperty: PropTypes.string,
};
