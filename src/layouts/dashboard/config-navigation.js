import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 0.8, height: 0.8 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  dashboard: icon('dashboard'),
  subscriberManagement: icon('ic_subscriber_management'),
  flaggedConversations: icon('ic_flagged_conversations'),
  listingsManagement: icon('ic_listings_management'),
  settings: icon('gear'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('subscriber management'),
            path: paths.dashboard.subscriberManagement,
            icon: ICONS.subscriberManagement,
          },
          {
            title: t('flagged conversations'),
            path: paths.dashboard.general.analytics,
            icon: ICONS.flaggedConversations,
          },
          {
            title: t('Listings Management'),
            path: paths.dashboard.general.banking,
            icon: ICONS.listingsManagement,
          },
          {
            title: t('Settings'),
            path: paths.dashboard.general.banking,
            icon: ICONS.settings,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
