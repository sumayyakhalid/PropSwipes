import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _flaggedConversations = [
  {
    id: _mock.id(0),
    reportedUser: {
      id: 'amanda-100', // Unique ID for Amanda
      name: 'Amanda Micheal',
      avatarUrl: _mock.image.avatar(0),
    },
    reportedBy: 3,
    reportedDate: '12/12/2025',
    reportedParties: [
      {
        id: 'sumayya-101', // Unique ID for Sumayya
        name: 'Sumayya',
        avatarUrl: _mock.image.avatar(0),
        reportedDate: '12/12/2025',
        isHidden: false,
        // Messages between Sumayya and Amanda
        conversationMessages: [
          {
            id: _mock.id(0),
            senderId: 'sumayya-101',
            receiverId: 'amanda-100',
            senderName: 'Sumayya',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: "Yo, I don't wanna buy your property your property is too expensive i cant afford that properrt.",
            createdAt: '4:02 PM',
            side: 'left',
          },
          {
            id: _mock.id(1),
            senderId: 'amanda-100',
            receiverId: 'sumayya-101',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'Do what you wanna do, this is my fake Account😊',
            createdAt: '4:02 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
      {
        id: 'niko-102', // Unique ID for Niko
        name: 'Niko Belic',
        avatarUrl: _mock.image.avatar(1),
        reportedDate: '12/12/2025',
        isHidden: true,
        // Messages between Niko and Amanda
        conversationMessages: [
          {
            id: _mock.id(2),
            senderId: 'niko-102',
            receiverId: 'amanda-100',
            senderName: 'Niko Belic',
            senderAvatar: _mock.image.avatar(1),
            senderIcon: 'solar:suit-bold',
            body: "oh! if you can't afford that kind expensive properties don't Dream it, why you start the conversation go-yourself i am bout to report you,",
            createdAt: '4:02 PM',
            side: 'left',
          },
          {
            id: _mock.id(3),
            senderId: 'amanda-100',
            receiverId: 'niko-102',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'Do what you wanna do, this is my fake Account😊',
            createdAt: '4:02 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
      {
        id: 'thomas-103', // Unique ID for Thomas
        name: 'Thomas Edison',
        avatarUrl: _mock.image.avatar(2),
        reportedDate: '12/12/2025',
        isHidden: false,
        // Messages between Thomas and Amanda
        conversationMessages: [
          {
            id: _mock.id(4),
            senderId: 'thomas-103',
            receiverId: 'amanda-100',
            senderName: 'Thomas Edison',
            senderAvatar: _mock.image.avatar(2),
            senderIcon: 'solar:bolt-bold',
            body: 'Your listing price is misleading. Clarify the total fees.',
            createdAt: '4:10 PM',
            side: 'left',
          },
          {
            id: _mock.id(5),
            senderId: 'amanda-100',
            receiverId: 'thomas-103',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'The price includes HOA fees; full breakdown is in the listing.',
            createdAt: '4:11 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
    ],
    // Legacy messages array - kept for backward compatibility but not used
    messages: [],
    chatDate: '12/12/2025',
  },
  {
    id: _mock.id(1),
    reportedUser: {
      id: 'amanda-100', // Unique ID for Amanda
      name: 'Thomas Edison',
      avatarUrl: _mock.image.avatar(0),
    },
    reportedBy: 3,
    reportedDate: '12/12/2025',
    reportedParties: [
      {
        id: 'sumayya-101', // Unique ID for Sumayya
        name: 'Sumayya',
        avatarUrl: _mock.image.avatar(0),
        reportedDate: '12/12/2025',
        isHidden: false,
        // Messages between Sumayya and Amanda
        conversationMessages: [
          {
            id: _mock.id(0),
            senderId: 'sumayya-101',
            receiverId: 'amanda-100',
            senderName: 'Sumayya',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: "Yo, I don't wanna buy your property your property is too expensive i cant afford that properrt.",
            createdAt: '4:02 PM',
            side: 'left',
          },
          {
            id: _mock.id(1),
            senderId: 'amanda-100',
            receiverId: 'sumayya-101',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'Do what you wanna do, this is my fake Account😊',
            createdAt: '4:02 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
      {
        id: 'niko-102', // Unique ID for Niko
        name: 'Niko Belic',
        avatarUrl: _mock.image.avatar(1),
        reportedDate: '12/12/2025',
        isHidden: true,
        // Messages between Niko and Amanda
        conversationMessages: [
          {
            id: _mock.id(2),
            senderId: 'niko-102',
            receiverId: 'amanda-100',
            senderName: 'Niko Belic',
            senderAvatar: _mock.image.avatar(1),
            senderIcon: 'solar:suit-bold',
            body: "oh! if you can't afford that kind expensive properties don't Dream it, why you start the conversation go-yourself i am bout to report you,",
            createdAt: '4:02 PM',
            side: 'left',
          },
          {
            id: _mock.id(3),
            senderId: 'amanda-100',
            receiverId: 'niko-102',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'Do what you wanna do, this is my fake Account😊',
            createdAt: '4:02 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
      {
        id: 'thomas-103', // Unique ID for Thomas
        name: 'Thomas Edison',
        avatarUrl: _mock.image.avatar(2),
        reportedDate: '12/12/2025',
        isHidden: false,
        // Messages between Thomas and Amanda
        conversationMessages: [
          {
            id: _mock.id(4),
            senderId: 'thomas-103',
            receiverId: 'amanda-100',
            senderName: 'Thomas Edison',
            senderAvatar: _mock.image.avatar(2),
            senderIcon: 'solar:bolt-bold',
            body: 'Your listing price is misleading. Clarify the total fees.',
            createdAt: '4:10 PM',
            side: 'left',
          },
          {
            id: _mock.id(5),
            senderId: 'amanda-100',
            receiverId: 'thomas-103',
            senderName: 'Amanda Micheal',
            senderAvatar: _mock.image.avatar(0),
            senderIcon: 'solar:glasses-bold',
            body: 'The price includes HOA fees; full breakdown is in the listing.',
            createdAt: '4:11 PM',
            side: 'right',
          },
        ],
        chatDate: '12/12/2025',
      },
    ],
    // Legacy messages array - kept for backward compatibility but not used
    messages: [],
    chatDate: '12/12/2025',
  },
  {
    id: _mock.id(2),
    reportedUser: {
      id: _mock.id(5),
      name: 'Jacquline Thomas',
      avatarUrl: _mock.image.avatar(5),
    },
    reportedBy: 2,
    reportedDate: '12/10/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/10/2025',
  },
  {
    id: _mock.id(3),
    reportedUser: {
      id: _mock.id(6),
      name: 'Frankline',
      avatarUrl: _mock.image.avatar(6),
    },
    reportedBy: 1,
    reportedDate: '12/09/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/09/2025',
  },
  {
    id: _mock.id(4),
    reportedUser: {
      id: _mock.id(7),
      name: 'Antq Notk',
      avatarUrl: _mock.image.avatar(7),
    },
    reportedBy: 5,
    reportedDate: '12/08/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/08/2025',
  },
  {
    id: _mock.id(5),
    reportedUser: {
      id: _mock.id(8),
      name: 'Jack Sparrow',
      avatarUrl: _mock.image.avatar(8),
    },
    reportedBy: 2,
    reportedDate: '12/07/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/07/2025',
  },
  {
    id: _mock.id(6),
    reportedUser: {
      id: _mock.id(9),
      name: 'Bruce Tint',
      avatarUrl: _mock.image.avatar(9),
    },
    reportedBy: 4,
    reportedDate: '12/06/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/06/2025',
  },
  {
    id: _mock.id(7),
    reportedUser: {
      id: _mock.id(10),
      name: 'Toman Ambrose',
      avatarUrl: _mock.image.avatar(10),
    },
    reportedBy: 1,
    reportedDate: '12/05/2025',
    reportedParties: [],
    messages: [],
    chatDate: '12/05/2025',
  },
];
