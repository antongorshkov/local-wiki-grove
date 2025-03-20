
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Plus } from "lucide-react";
import MainLayout from '@/components/layouts/MainLayout';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { mockPages } from '@/data/mockWikiData';

const PageTile = ({ page, onClick }: { 
  page: { 
    id: string; 
    title: string; 
    lastEdited: string; 
    excerpt?: string;
  }, 
  onClick: () => void 
}) => {
  // Extract an excerpt from the content if not provided directly
  const excerpt = page.excerpt || 'Click to view this wiki page';
  
  return (
    <Card 
      className="h-full cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/30 flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">{page.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-1">{excerpt}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Book className="h-3 w-3 mr-1" />
          <span>Last edited {page.lastEdited}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');

  // Process page data for display
  const pages = Object.entries(mockPages).map(([id, page]) => ({
    id,
    title: page.title,
    lastEdited: page.lastEdited,
    excerpt: id === 'welcome' 
      ? 'This is a collaborative space for our community of 200 people to share and maintain relevant local information.'
      : 'Please follow these guidelines when contributing to our community wiki.'
  }));

  const handlePageClick = (pageId: string) => {
    navigate(`/${pageId}`);
  };

  const handleCreatePage = () => {
    setNewPageDialogOpen(true);
  };

  const handleNewPageSubmit = () => {
    if (newPageTitle.trim()) {
      // This would typically create a new page in a real application
      toast({
        title: "Page created",
        description: `"${newPageTitle}" has been created successfully`,
      });
      setNewPageDialogOpen(false);
      setNewPageTitle('');
    }
  };

  return (
    <MainLayout title="Community Wiki">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Wiki Pages</h1>
          <Button onClick={handleCreatePage}>
            <Plus className="mr-1 h-4 w-4" />
            New Page
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => (
            <PageTile 
              key={page.id} 
              page={page} 
              onClick={() => handlePageClick(page.id)} 
            />
          ))}
        </div>

        <Dialog open={newPageDialogOpen} onOpenChange={setNewPageDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create new page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="page-title">Page title</Label>
                <Input
                  id="page-title"
                  placeholder="Enter page title"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewPageDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleNewPageSubmit}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Index;
