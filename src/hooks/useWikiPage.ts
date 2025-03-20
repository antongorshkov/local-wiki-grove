
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { mockPages, WikiPageData } from '@/data/mockWikiData';

export const useWikiPage = (pageId: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [page, setPage] = useState<WikiPageData>(mockPages[pageId as keyof typeof mockPages] || mockPages.welcome);
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
  
  return {
    page,
    isEditing,
    editedContent,
    deleteDialogOpen,
    setEditedContent,
    setDeleteDialogOpen,
    handleEdit,
    handleSave,
    handleExport,
    handleDelete,
    confirmDelete
  };
};
