import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// mock
import { _flaggedConversations } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import SuspendAccountDialog from './suspend-acount-dialog';

// ----------------------------------------------------------------------

export default function FlaggedConversationsListView() {
  const suspendAccountDialog = useBoolean(false);
  const settings = useSettingsContext();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedParties, setExpandedParties] = useState({});

  const filteredConversations = _flaggedConversations.filter((conv) =>
    conv.reportedUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setExpandedParties({});
  }, []);

  const handleToggleParty = useCallback((partyId) => {
    setExpandedParties((prev) => ({
      ...prev,
      [partyId]: !prev[partyId],
    }));
  }, []);

  const renderPartyMessages = (party) => {
    // Get messages from the party's conversationMessages array
    const partyMessages = party?.conversationMessages || [];

    if (!partyMessages || partyMessages.length === 0) {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          No messages available for this party.
        </Typography>
      );
    }

    return (
      <Stack spacing={2}>
        <Divider>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'left', display: 'block' }}
          >
            {party.chatDate || selectedConversation.chatDate}
          </Typography>
        </Divider>

        {partyMessages.map((message) => {
          // Determine side: if sender is the reported user (Amanda), show on right, else left
          const isReportedUser = message.senderId === selectedConversation?.reportedUser?.id;
          const messageSide = isReportedUser ? 'right' : 'left';

          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: messageSide === 'left' ? 'flex-start' : 'flex-end',
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
                sx={{
                  maxWidth: '85%',
                  flexDirection: messageSide === 'left' ? 'row' : 'row-reverse',
                }}
              >
                <Avatar
                  src={message.senderAvatar}
                  alt={message.senderName}
                  sx={{ width: 32, height: 32 }}
                >
                  <Iconify icon={message.senderIcon} width={18} />
                </Avatar>
                <Box sx={{ maxWidth: '100%' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-word',
                      color: '#919EAB',
                      textAlign: messageSide === 'right' ? 'right' : 'left',
                      display: 'block',
                    }}
                  >
                    {message.createdAt}
                  </Typography>

                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: messageSide === 'left' ? '#F5E1E3' : '#d0f5d9',
                      maxWidth: '100%',
                      mt: '0.5rem',
                    }}
                  >
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {message.body}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    );
  };

  const renderSidebar = (
    <Stack
      sx={{
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2rem',
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.secondary' }} />
          <InputBase
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, fontSize: '14px' }}
          />
        </Stack>
      </Box>

      {/* Conversations List */}
      <Scrollbar sx={{ flex: 1, borderBottomLeftRadius: '1rem' }}>
        <Stack spacing={0}>
          {filteredConversations.map((conversation) => (
            <Box
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              sx={{
                p: 2,
                cursor: 'pointer',
                bgcolor: selectedConversation?.id === conversation.id ? '#F5E1E3' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={conversation.reportedUser.avatarUrl}
                  alt={conversation.reportedUser.name}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" noWrap>
                    {conversation.reportedUser.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: '#AD0000', fontWeight: 600, fontSize: '14px' }}
                  >
                    Reported by {conversation.reportedBy}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Scrollbar>
    </Stack>
  );

  const renderEmptyState = (
    <Stack
      sx={{
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadiuds: 2,
        bgColor: 'yellow',
        // bgcolor: 'background.paper',
        p: 5,
      }}
    >
      <img
        src="/assets/icons/dashboard/suspended_acounts.svg"
        alt="Suspended Acounts"
        style={{ width: '150px', height: '150px' }}
      />
      <Typography variant="h4" sx={{ mt: 1, color: 'text.primary' }}>
        Select a Conversation to Begin Review
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 500, lineHeight: 1.6 }}
      >
        Each conversation requires an administrative decision to either Suspend the accused user or
        Mark as Good.
      </Typography>
    </Stack>
  );

  const renderConversationDetail = selectedConversation && (
    <Stack
      sx={{
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        m: 0,
        backgroundColor: 'white',
        borderTopRightRadius: '1rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header with Suspend Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F5E1E3',
          p: '1rem',
          // borderRadius: '0 12px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Box>
            <img
              src="/assets/icons/dashboard/suspended_acount.svg"
              alt="Suspended Acounts"
              width={22}
              height={22}
            />
          </Box>
          <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>
            Review Conversation History & Evidence
          </Typography>
        </Box>

        <Button
          onClick={() => suspendAccountDialog.onTrue()}
          variant="contained"
          color="error"
          sx={{ backgroundColor: 'red', fontSize: '12px', padding: '0.5rem', borderRadius: 1.5 }}
        >
          Suspend Account
        </Button>
      </Box>

      <Scrollbar sx={{ flex: 1 }}>
        <Box>
          {/* See Evidence Header */}
          <Typography sx={{ p: 1, fontWeight: 600, fontSize: '15px', my: 1, mx: 1 }}>
            See Evidence
          </Typography>
          <Divider />

          {/* First Reported Party (Top) */}
          {selectedConversation.reportedParties.length > 0 && (
            <Card
              sx={{
                // p: 2,
                mb: 0,
                bgcolor: expandedParties[selectedConversation.reportedParties[0].id]
                  ? '#FCE4E4'
                  : 'transparent',
                borderRadius: '0rem',
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  p: 2,
                  bgcolor: expandedParties[selectedConversation.reportedParties[0].id]
                    ? '#F5E1E3'
                    : 'transparent',
                }}
              >
                <Avatar
                  src={selectedConversation.reportedParties[0].avatarUrl}
                  alt={selectedConversation.reportedParties[0].name}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {selectedConversation.reportedParties[0].name}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: '#AD0000', fontWeight: 600 }}>
                    Reported Date: {selectedConversation.reportedParties[0].reportedDate}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify
                    icon="solar:eye-bold"
                    width={18}
                    sx={{
                      color: expandedParties[selectedConversation.reportedParties[0].id]
                        ? 'error.main'
                        : 'text.secondary',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleToggleParty(selectedConversation.reportedParties[0].id)}
                  >
                    <Iconify
                      icon={
                        expandedParties[selectedConversation.reportedParties[0].id]
                          ? 'eva:arrow-ios-upward-fill'
                          : 'eva:arrow-ios-downward-fill'
                      }
                      width={20}
                      sx={{ color: 'text.secondary' }}
                    />
                  </IconButton>
                </Box>
              </Stack>
              <Collapse in={expandedParties[selectedConversation.reportedParties[0].id]}>
                <Box sx={{ py: 1, backgroundColor: 'white', p: 2 }}>
                  {renderPartyMessages(selectedConversation.reportedParties[0])}
                </Box>
              </Collapse>
            </Card>
          )}

          {/* Chat Transcript */}
          {selectedConversation.messages.length > 0 && (
            <>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {selectedConversation.chatDate}
              </Typography>

              <Box
                sx={{
                  p: 2,
                  mb: 3,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  maxHeight: 500,
                  overflow: 'auto',
                }}
              >
                <Stack spacing={2.5}>
                  {selectedConversation.messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.side === 'left' ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                        sx={{
                          maxWidth: '75%',
                          flexDirection: message.side === 'left' ? 'row' : 'row-reverse',
                        }}
                      >
                        <Avatar
                          src={message.senderAvatar}
                          alt={message.senderName}
                          sx={{ width: 36, height: 36 }}
                        >
                          <Iconify icon={message.senderIcon} width={20} />
                        </Avatar>
                        <Box sx={{ maxWidth: '100%' }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: message.side === 'left' ? '#dddddd' : 'success.lighter',
                              maxWidth: '100%',
                            }}
                          >
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                              {message.body}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#919EAB',
                              display: 'block',
                              mt: 0.5,
                              textAlign: message.side === 'left' ? 'left' : 'right',
                            }}
                          >
                            {message.createdAt}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    textAlign: 'center',
                    mt: 3,
                    py: 1,
                  }}
                >
                  Scroll To Read Whole Chat
                </Typography>
              </Box>
            </>
          )}

          {/* Additional Reported Parties (Bottom) */}
          {selectedConversation.reportedParties.length > 1 && (
            <Stack>
              {selectedConversation.reportedParties.slice(1).map((party) => (
                <Card
                  key={party.id}
                  sx={{
                    // p: 2,
                    mb: 0,
                    // bgcolor: expandedParties[party.id] ? '#F5E1E3' : 'transparent',
                    borderRadius: '0rem',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
                    <Avatar src={party.avatarUrl} alt={party.name} sx={{ width: 48, height: 48 }} />
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {party.name}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#AD0000', fontWeight: 600 }}>
                        Reported Date: {party.reportedDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Iconify
                        icon="solar:eye-bold"
                        width={18}
                        sx={{
                          color: expandedParties[party.id] ? 'error.main' : 'text.secondary',
                        }}
                      />
                      <IconButton size="small" onClick={() => handleToggleParty(party.id)}>
                        <Iconify
                          icon={
                            expandedParties[party.id]
                              ? 'eva:arrow-ios-upward-fill'
                              : 'eva:arrow-ios-downward-fill'
                          }
                          width={20}
                          sx={{ color: 'text.secondary' }}
                        />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Collapse in={expandedParties[party.id]}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        p: 2,
                        py: 1,
                      }}
                    >
                      {renderPartyMessages(party)}
                    </Box>
                  </Collapse>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Scrollbar>
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Flagged Conversations"
        links={[
          {
            name: 'Flagged Conversations',
            href: paths.flaggedConversations.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Stack sx={{backgroundColor:'white',borderRadius:'2px'}}>

</Stack> */}
      <Grid
        container
        spacing={3}
        sx={{ backgroundColor: 'white', borderRadius: 3, border: '2px solid #919EAB33' }}
      >
        {/* Left Sidebar */}
        <Grid
          xs={12}
          md={4}
          sx={{
            borderRadius: '0.2rem',
            borderRight: '1px solid #E0E0E0',
            p: 0,
          }}
        >
          {renderSidebar}
        </Grid>

        {/* Main Content Area */}
        <Grid
          xs={12}
          md={8}
          sx={{ borderBottomRightRadius: '2rem', overflow: 'hidden', p: 0, m: 0 }}
        >
          {selectedConversation ? renderConversationDetail : renderEmptyState}
        </Grid>
      </Grid>
      {suspendAccountDialog.value && (
        <SuspendAccountDialog suspendAccountDialog={suspendAccountDialog} />
      )}
    </Container>
  );
}
