import PropTypes from 'prop-types';
// @mui
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useNavigate } from 'react-router';
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  assignSubscriptionDialog,
  onAssignSubscription,
}) {
  const { name, role, address, phoneNumber, createdAt, plan, status } = row;

  const confirm = useBoolean();
  const navigate = useNavigate();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={name}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{address}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{createdAt}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{plan}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 150 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            navigate(paths.subscriberManagement.detail(row.id));
          }}
        >
          View Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (onAssignSubscription) {
              onAssignSubscription();
            } else {
              assignSubscriptionDialog.onTrue();
            }
            popover.onClose();
          }}
        >
          Assign Subscription
        </MenuItem>
      </CustomPopover>
    </>
  );
}

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  assignSubscriptionDialog: PropTypes.object,
  onAssignSubscription: PropTypes.func,
};
