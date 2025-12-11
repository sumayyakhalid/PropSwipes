import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Divider } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function UserPropertyListing({ listings = [] }) {
  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2}>
      {listings.map((listing) => (
        <UserListingCard key={listing.id} listing={listing} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function UserListingCard({ listing }) {
  const {
    status,
    statusColor,
    title,
    price,
    bed,
    bath,
    square_ft,
    parking,
    fees,
    images,
    listedDate,
  } = listing;

  const mainImage = images?.[0];
  const thumbs = images?.[1];
  const thirdImage = images?.[3]; // Third image for +3 overlay
  const remainingCount = Math.max((images?.length || 0) - 3, 0);
  const router = useRouter();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0px 10px 40px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
      }}
    >
      <Box sx={{ p: 2, pb: 1, position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 1,
          }}
        >
          {/* Main Image */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              height: 180,
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={mainImage}
              alt={title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Status Chip Overlay */}
            {/* {console.log('dropwdown selected status', status)} */}
            <Chip
              label={status}
              size="medium"
              color={statusColor}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontSize: 12,
                height: 24,
                borderRadius: 1.5,
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Thumbnails + +3 */}
          <Stack spacing={1} sx={{ height: 180 }}>
            <Box
              sx={{
                flex: 1,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={thumbs}
                alt={title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>

            {/* +3 Overlay - Third image with blue tint and white text */}
            {remainingCount > 0 && (
              <Box
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Third image as background */}
                {thirdImage ? (
                  <>
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
                    {/* Blue tint overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: '#016BFFC2',
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
                  </>
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      bgcolor: '#0F172A',
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
      </Box>

      <CardContent sx={{ pt: 0, px: 2, pb: 1 }}>
        <Typography variant="caption" sx={{ color: '#919EAB' }}>
          Listed Date {listedDate || 'September 30, 2025'}
        </Typography>
        <Divider />

        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {price}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src="/assets/icons/dashboard/sale.svg" alt="for sale" />
          <Typography variant="caption" sx={{ color: '#22C55E' }}>
            For Sale
          </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip
            icon={<img src="/assets/icons/dashboard/3-bed.svg" alt="bed" />}
            label={bed}
            size="medium"
            sx={{
              bgcolor: '#046AF71A',
              fontSize: 12,
              color: '#016BFF',
              '&:hover': { bgcolor: '#046AF71A', color: '#016BFF' },
            }}
          />
          <Chip
            icon={<img src="/assets/icons/dashboard/2-bed.svg" alt="bed" />}
            label={bath}
            size="medium"
            sx={{
              bgcolor: '#046AF71A',
              fontSize: 12,
              color: '#016BFF',
              '&:hover': { bgcolor: '#046AF71A', color: '#016BFF' },
            }}
          />
          <Chip
            icon={<img src="/assets/icons/dashboard/square-ft.svg" alt="bed" />}
            label={square_ft}
            size="medium"
            sx={{
              bgcolor: '#046AF71A',
              fontSize: 12,
              color: '#016BFF',
              '&:hover': { bgcolor: '#046AF71A', color: '#016BFF' },
            }}
          />
          <Chip
            icon={<img src="/assets/icons/dashboard/parking.svg" alt="bed" />}
            label={parking}
            size="medium"
            sx={{
              bgcolor: '#046AF71A',
              fontSize: 12,
              color: '#016BFF',
              '&:hover': { bgcolor: '#046AF71A', color: '#016BFF' },
            }}
          />
          <Chip
            icon={<img src="/assets/icons/dashboard/fees.svg" alt="bed" />}
            label={fees}
            size="medium"
            sx={{
              bgcolor: '#046AF71A',
              fontSize: 12,
              color: '#016BFF',
              '&:hover': { bgcolor: '#046AF71A', color: '#016BFF' },
            }}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#046AF7',
            color: '#FFFFFF',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 1,
            py: 1.5,
            '&:hover': { bgcolor: '#0356D6' },
          }}
          onClick={() => router.push(paths.propertyManagement.detail(listing.id))}
        >
          Review Property Details
        </Button>
      </CardActions>
    </Card>
  );
}

UserListingCard.propTypes = {
  listing: PropTypes.object,
};

UserPropertyListing.propTypes = {
  listings: PropTypes.array,
};
