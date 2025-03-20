
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import PageHeader from '@/components/PageHeader';
import WikiEditor from '@/components/WikiEditor';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

// Mock data - in a real app this would come from an API
const mockPages = {
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
            "text": "Create new pages with the "+ New Page" button",
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
            "text": "Edit existing pages by clicking the "Edit" button",
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

const WikiPage = () => {
  const { pageId = 'welcome' } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [page, setPage] = useState(mockPages[pageId as keyof typeof mockPages] || mockPages.welcome);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(page.content);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Update page when pageId changes
  useEffect(() => {
    const newPage = mockPages[pageId as keyof typeof mockPages];
    if (newPage) {
      setPage(newPage);
      setEditedContent(newPage.content);
      setIsEditing(false);
    } else {
      navigate('/not-found');
    }
  }, [pageId, navigate]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    setPage({ ...page, content: editedContent });
    setIsEditing(false);
    toast({
      title: "Page updated",
      description: "Your changes have been saved successfully"
    });
  };
  
  const handleExport = () => {
    // Create a blob with the content
    const blob = new Blob([page.content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and click it to download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Page exported",
      description: "The page content has been exported as JSON"
    });
  };
  
  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, this would delete from a backend
    toast({
      title: "Page deleted",
      description: "The page has been deleted successfully"
    });
    navigate('/');
    setDeleteDialogOpen(false);
  };
  
  return (
    <MainLayout 
      title={page.title} 
      isEditing={isEditing}
      onSave={handleSave}
    >
      <div className="animate-fade-in">
        <PageHeader
          title={page.title}
          isEditing={isEditing}
          lastEdited={page.lastEdited}
          onEdit={handleEdit}
          onExport={handleExport}
          onDelete={handleDelete}
        />
        
        <div className="relative">
          <WikiEditor
            initialContent={page.content}
            readOnly={!isEditing}
            onChange={setEditedContent}
            className="min-h-[60vh] transition-all duration-300"
          />
        </div>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page
              and all of its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default WikiPage;
