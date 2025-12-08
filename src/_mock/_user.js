// assets
import { countries } from 'src/assets/data';
//
import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'banned', label: 'Banned' },
  { value: 'rejected', label: 'Rejected' },
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: countries[1].label,
  school: _mock.companyName(2),
  company: _mock.companyName(1),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  createdAt: '10-2-25',
  plan: 'premium',
  role: _mock.role(index),

  email: _mock.email(index),
  address: '908 Jack Locks',
  name: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  company: _mock.companyName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),

  totalSwipes: _mock.number.nativeL(index),
  totalMatches: _mock.number.nativeL(index),
  totalReportReceived: _mock.number.nativeL(index),

  status:
    (index % 2 && 'pending') || (index % 3 && 'banned') || (index % 4 && 'rejected') || 'active',

  // User listings
  listings: [
    {
      id: _mock.id(index * 3),
      status: 'Approved',
      statusColor: 'success',
      title: `Rockland County ${index + 1}`,
      tag: index % 3 === 0 ? 'For Sale' : 'For Rent',
      tagColor: index % 3 === 0 ? 'success' : 'error',
      price: `$${2000 + index * 100}`,
      bed: '3 Bed',
      bath: '2 Bath',
      square_ft: `${15000 + index * 100} Sq Ft`,
      type: 'Residential',
      parking: '2 Parking',
      fees: 'HOA fees (Monthly): $350',
      lotSize: '150SqFt',
      builtYear: '2025',
      listedDate: 'September 30, 2025',
      images: [
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
      ],
      key_Features: {
        amenities: [
          { name: 'Swimming Pool', icon: '/assets/icons/dashboard/swimming_pool.svg' },
          { name: 'Fitness Center', icon: '/assets/icons/dashboard/fitness.svg' },
          { name: 'In-Unit Laundry', icon: '/assets/icons/dashboard/in_unit_laundry.svg' },
          { name: 'Fireplace', icon: '/assets/icons/dashboard/fire_place.svg' },
          { name: 'Storage Unit', icon: '/assets/icons/dashboard/storage_unit.svg' },
          { name: 'Parking Garage', icon: '/assets/icons/dashboard/parking_garage.svg' },
          { name: 'Garden/Landscaping', icon: '/assets/icons/dashboard/garden.svg' },
          { name: 'Balcony/Patio', icon: '/assets/icons/dashboard/balcony.svg' },
          { name: 'Central Air/Heat', icon: '/assets/icons/dashboard/central_air.svg' },
          { name: 'Elevator', icon: '/assets/icons/dashboard/elevator.svg' },
          { name: 'Concierge', icon: '/assets/icons/dashboard/concierge.svg' },
          { name: 'Rooftop Access', icon: '/assets/icons/dashboard/rooftop.svg' },
          { name: 'Tennis Court', icon: '/assets/icons/dashboard/tennis_court.svg' },
          { name: 'Doorman', icon: '/assets/icons/dashboard/doorman.svg' },
          { name: 'Business Center', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Bike Storage', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Security System', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Conference Room', icon: '/assets/icons/dashboard/business_center.svg' },
        ],
        appliances: [
          { name: 'Dishwasher', icon: '/assets/icons/dashboard/dishwasher.svg' },
          { name: 'Microwave', icon: '/assets/icons/dashboard/microwave.svg' },
          { name: 'Washer/Dryer Unit', icon: '/assets/icons/dashboard/washer_dryer.svg' },
          { name: 'Refrigerator', icon: '/assets/icons/dashboard/refrigerator.svg' },
          { name: 'Gas Range/Oven', icon: '/assets/icons/dashboard/gas_range.svg' },
          { name: 'Garbage Disposal', icon: '/assets/icons/dashboard/garbage_disposal.svg' },
          { name: 'Wine Cooler', icon: '/assets/icons/dashboard/wine_cooler.svg' },
          { name: 'Ice Maker', icon: '/assets/icons/dashboard/ice_maker.svg' },
          {
            name: 'Stainless Steel Appliance',
            icon: '/assets/icons/dashboard/stainless_steel.svg',
          },
          { name: 'Gas Cooktop', icon: '/assets/icons/dashboard/gas_cooktop.svg' },
          { name: 'Double Oven', icon: '/assets/icons/dashboard/double_oven.svg' },
        ],
        interior_features: [
          { name: 'Hardwood Floors', icon: '/assets/icons/dashboard/hardwood_floors.svg' },
          { name: 'Tile Flooring', icon: '/assets/icons/dashboard/tile_flooring.svg' },
          { name: 'Carpet', icon: '/assets/icons/dashboard/carpet.svg' },
          { name: 'High Ceilings (9ft+)', icon: '/assets/icons/dashboard/high_ceilings.svg' },
          { name: 'Vaulted Ceilings', icon: '/assets/icons/dashboard/vaulted_ceilings.svg' },
          { name: 'Crown Molding', icon: '/assets/icons/dashboard/crown_molding.svg' },
          { name: 'Walk-in Closets', icon: '/assets/icons/dashboard/walk_in_closets.svg' },
          { name: 'Open Floor Plan', icon: '/assets/icons/dashboard/open_floor_plan.svg' },
          { name: 'Updated Kitchen', icon: '/assets/icons/dashboard/updated_kitchen.svg' },
          { name: 'Granite Countertops', icon: '/assets/icons/dashboard/granite_countertops.svg' },
          { name: 'Recently Renovated', icon: '/assets/icons/dashboard/recently_renovated.svg' },
          { name: 'Energy Efficient Windows', icon: '/assets/icons/dashboard/energy_windows.svg' },
          { name: 'New Paint', icon: '/assets/icons/dashboard/new_paint.svg' },
          { name: 'Skylight', icon: '/assets/icons/dashboard/skylight.svg' },
          { name: 'Bay Windows', icon: '/assets/icons/dashboard/bay_windows.svg' },
          { name: 'French Doors', icon: '/assets/icons/dashboard/french_doors.svg' },
        ],
        exterior_features: ['Front Porch', 'Backyard', 'Garage', 'Fenced Yard', 'Covered Patio'],
      },
      description:
        'Really nice renovated apartment - #4 in restored farmhouse Victorian off North Broadway. Well lit with large windows, hardwood floors, eat-in kitchen, high ceilings, non-working fireplace, coin operated washer/dryer and large yard. Seasonal river views. Quiet neighborhood. Owner pays for heat and tenant pays electric. Check it out!',
    },
    {
      id: _mock.id(index * 3 + 1),
      status: 'Pending',
      statusColor: 'warning',
      title: `Manhattan ${index + 1}`,
      tag: index % 2 === 0 ? 'For Sale' : 'For Rent',
      tagColor: index % 2 === 0 ? 'success' : 'error',
      price: `$${3000 + index * 150}`,
      bed: '4 Bed',
      bath: '3 Bath',
      square_ft: `${20000 + index * 200} Sq Ft`,
      parking: '2 Parking',
      fees: 'HOA fees (Monthly): $350',
      lotSize: '150SqFt',
      builtYear: '2025',
      listedDate: 'October 15, 2025',
      images: [
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
      ],
      key_Features: {
        amenities: [
          { name: 'Swimming Pool', icon: '/assets/icons/dashboard/swimming_pool.svg' },
          { name: 'Fitness Center', icon: '/assets/icons/dashboard/fitness.svg' },
          { name: 'In-Unit Laundry', icon: '/assets/icons/dashboard/in_unit_laundry.svg' },
          { name: 'Fireplace', icon: '/assets/icons/dashboard/fire_place.svg' },
          { name: 'Storage Unit', icon: '/assets/icons/dashboard/storage_unit.svg' },
          { name: 'Parking Garage', icon: '/assets/icons/dashboard/parking_garage.svg' },
          { name: 'Garden/Landscaping', icon: '/assets/icons/dashboard/garden.svg' },
          { name: 'Balcony/Patio', icon: '/assets/icons/dashboard/balcony.svg' },
          { name: 'Central Air/Heat', icon: '/assets/icons/dashboard/central_air.svg' },
          { name: 'Elevator', icon: '/assets/icons/dashboard/elevator.svg' },
          { name: 'Concierge', icon: '/assets/icons/dashboard/concierge.svg' },
          { name: 'Rooftop Access', icon: '/assets/icons/dashboard/rooftop.svg' },
          { name: 'Tennis Court', icon: '/assets/icons/dashboard/tennis_court.svg' },
          { name: 'Doorman', icon: '/assets/icons/dashboard/doorman.svg' },
          { name: 'Business Center', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Bike Storage', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Security System', icon: '/assets/icons/dashboard/business_center.svg' },
          { name: 'Conference Room', icon: '/assets/icons/dashboard/business_center.svg' },
        ],
        appliances: [
          { name: 'Dishwasher', icon: '/assets/icons/dashboard/dishwasher.svg' },
          { name: 'Microwave', icon: '/assets/icons/dashboard/microwave.svg' },
          { name: 'Washer/Dryer Unit', icon: '/assets/icons/dashboard/washer_dryer.svg' },
          { name: 'Refrigerator', icon: '/assets/icons/dashboard/refrigerator.svg' },
          { name: 'Gas Range/Oven', icon: '/assets/icons/dashboard/gas_range.svg' },
          { name: 'Garbage Disposal', icon: '/assets/icons/dashboard/garbage_disposal.svg' },
          { name: 'Wine Cooler', icon: '/assets/icons/dashboard/wine_cooler.svg' },
          { name: 'Ice Maker', icon: '/assets/icons/dashboard/ice_maker.svg' },
          {
            name: 'Stainless Steel Appliance',
            icon: '/assets/icons/dashboard/stainless_steel.svg',
          },
          { name: 'Gas Cooktop', icon: '/assets/icons/dashboard/gas_cooktop.svg' },
          { name: 'Double Oven', icon: '/assets/icons/dashboard/double_oven.svg' },
        ],
        interior_features: [
          { name: 'Hardwood Floors', icon: '/assets/icons/dashboard/hardwood_floors.svg' },
          { name: 'Tile Flooring', icon: '/assets/icons/dashboard/tile_flooring.svg' },
          { name: 'Carpet', icon: '/assets/icons/dashboard/carpet.svg' },
          { name: 'High Ceilings (9ft+)', icon: '/assets/icons/dashboard/high_ceilings.svg' },
          { name: 'Vaulted Ceilings', icon: '/assets/icons/dashboard/vaulted_ceilings.svg' },
          { name: 'Crown Molding', icon: '/assets/icons/dashboard/crown_molding.svg' },
          { name: 'Walk-in Closets', icon: '/assets/icons/dashboard/walk_in_closets.svg' },
          { name: 'Open Floor Plan', icon: '/assets/icons/dashboard/open_floor_plan.svg' },
          { name: 'Updated Kitchen', icon: '/assets/icons/dashboard/updated_kitchen.svg' },
          { name: 'Granite Countertops', icon: '/assets/icons/dashboard/granite_countertops.svg' },
          { name: 'Recently Renovated', icon: '/assets/icons/dashboard/recently_renovated.svg' },
          { name: 'Energy Efficient Windows', icon: '/assets/icons/dashboard/energy_windows.svg' },
          { name: 'New Paint', icon: '/assets/icons/dashboard/new_paint.svg' },
          { name: 'Skylight', icon: '/assets/icons/dashboard/skylight.svg' },
          { name: 'Bay Windows', icon: '/assets/icons/dashboard/bay_windows.svg' },
          { name: 'French Doors', icon: '/assets/icons/dashboard/french_doors.svg' },
        ],
        exterior_features: ['Front Porch', 'Backyard', 'Garage', 'Fenced Yard', 'Covered Patio'],
      },
      description:
        'Really nice renovated apartment - #4 in restored farmhouse Victorian off North Broadway. Well lit with large windows, hardwood floors, eat-in kitchen, high ceilings, non-working fireplace, coin operated washer/dryer and large yard. Seasonal river views. Quiet neighborhood. Owner pays for heat and tenant pays electric. Check it out!',
    },
    {
      id: _mock.id(index * 3 + 1),
      status: 'Blocked',
      statusColor: 'error',
      title: `Manhattan ${index + 1}`,
      tag: index % 2 === 0 ? 'For Sale' : 'For Rent',
      tagColor: index % 2 === 0 ? 'success' : 'error',
      price: `$${3000 + index * 150}`,
      bed: '4 Bed',
      bath: '3 Bath',
      square_ft: `${20000 + index * 200} Sq Ft`,
      parking: '2 Parking',
      fees: 'HOA fees (Monthly): $350',
      lotSize: '150SqFt',
      builtYear: '2025',
      listedDate: 'October 15, 2025',
      images: [
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
        '/assets/icons/dashboard/property-1.png',
        '/assets/icons/dashboard/property-2.png',
        '/assets/icons/dashboard/property-3.png',
      ],
      key_Features: {
        amenities: [
          { name: 'Swimming Pool', icon: '/assets/icons/dashboard/swimming_pool.svg' },
          { name: 'Fitness Center', icon: '/assets/icons/dashboard/fitness.svg' },
          { name: 'In-Unit Laundry', icon: '/assets/icons/dashboard/in_unit_laundry.svg' },
          { name: 'Fireplace', icon: '/assets/icons/dashboard/fire_place.svg' },
          { name: 'Storage Unit', icon: '/assets/icons/dashboard/storage_unit.svg' },
          { name: 'Parking Garage', icon: '/assets/icons/dashboard/parking_garage.svg' },
        ],
        appliances: [
          { name: 'Dishwasher', icon: '/assets/icons/dashboard/dishwasher.svg' },
          { name: 'Microwave', icon: '/assets/icons/dashboard/microwave.svg' },
          { name: 'Washer/Dryer Unit', icon: '/assets/icons/dashboard/washer_dryer.svg' },
          { name: 'Refrigerator', icon: '/assets/icons/dashboard/refrigerator.svg' },
          { name: 'Gas Range/Oven', icon: '/assets/icons/dashboard/gas_range.svg' },
        ],
        interior_features: [
          { name: 'Hardwood Floors', icon: '/assets/icons/dashboard/hardwood_floors.svg' },
          { name: 'High Ceilings', icon: '/assets/icons/dashboard/high_ceilings.svg' },
          { name: 'Fireplace', icon: '/assets/icons/dashboard/fire_place.svg' },
          { name: 'Laundry Room', icon: '/assets/icons/dashboard/laundry_room.svg' },
          { name: 'Yard', icon: '/assets/icons/dashboard/yard.svg' },
        ],
        exterior_features: ['Front Porch', 'Backyard', 'Garage', 'Fenced Yard', 'Covered Patio'],
      },
      description:
        'Really nice renovated apartment - #4 in restored farmhouse Victorian off North Broadway. Well lit with large windows, hardwood floors, eat-in kitchen, high ceilings, non-working fireplace, coin operated washer/dryer and large yard. Seasonal river views. Quiet neighborhood. Owner pays for heat and tenant pays electric. Check it out!',
    },
  ],
}));
