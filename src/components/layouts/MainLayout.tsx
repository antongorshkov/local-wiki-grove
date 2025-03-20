
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
  isEditing?: boolean;
  onSave?: () => void;
};

const MainLayout = ({ 
  children, 
  title = "Community Wiki", 
  isEditing = false,
  onSave
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const { toast } = useToast();
  const location = useLocation();

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title={title} 
        onMenuToggle={toggleSidebar} 
        isEditing={isEditing}
        onSave={onSave}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
          onCreatePage={handleCreatePage} 
        />
        
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'md:pl-64' : 'pl-0'
          }`}
        >
          <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
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
  );
};

export default MainLayout;
