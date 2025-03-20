
// Mock data - in a real app this would come from an API
export const mockPages = {
  'welcome': {
    id: 'welcome',
    title: 'Welcome to the Community Wiki',
    content: JSON.stringify([
      {
        "id": "1",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "Welcome to our Community Wiki",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "2",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "This is a collaborative space for our community of 200 people to share and maintain relevant local information. Feel free to browse existing pages or contribute by editing them.",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "3",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Getting Started",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "4",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "To get started, you can:",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "5",
        "type": "bulletListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Browse existing pages using the sidebar",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "6",
        "type": "bulletListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Create new pages with the \"+ New Page\" button",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "7",
        "type": "bulletListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Edit existing pages by clicking the \"Edit\" button",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "8",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Happy collaborating!",
            "styles": {}
          }
        ],
        "children": []
      }
    ]),
    lastEdited: '2 days ago'
  },
  'community-guidelines': {
    id: 'community-guidelines',
    title: 'Community Guidelines',
    content: JSON.stringify([
      {
        "id": "1",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "Community Guidelines",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "2",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Please follow these guidelines when contributing to our community wiki.",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "3",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Be Respectful",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "4",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Treat others with respect and kindness. Avoid personal attacks or derogatory language.",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "5",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Be Accurate",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "6",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Strive for accuracy in all contributions. Verify information before adding it to the wiki.",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "7",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Be Constructive",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "8",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Make edits that improve or add value to the wiki. If you disagree with content, suggest improvements rather than simply deleting.",
            "styles": {}
          }
        ],
        "children": []
      }
    ]),
    lastEdited: '5 days ago'
  }
};

// Type for a wiki page
export type WikiPageData = {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
};
