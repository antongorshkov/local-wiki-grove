
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LucideMenu, LucideUserCircle, LucideSun, LucideMoon, LucideSave } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

type HeaderProps = {
  title: string;
  onMenuToggle: () => void;
  isEditing: boolean;
  onSave?: () => void;
};

const Header = ({ title, onMenuToggle, isEditing, onSave }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleSave = () => {
    if (onSave) {
      onSave();
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully",
      });
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl",
      "transition-all duration-200"
    )}>
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="h-9 w-9">
            <LucideMenu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-medium text-foreground hover:opacity-80 transition-opacity">
            Community Wiki
          </Link>
        </div>
        
        <div className="flex items-center">
          {isEditing && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
              className="mr-3 text-xs font-medium animate-fade-in"
            >
              <LucideSave className="h-3.5 w-3.5 mr-1.5" />
              Save
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode} 
            className="h-9 w-9"
          >
            {isDarkMode ? (
              <LucideSun className="h-5 w-5" />
            ) : (
              <LucideMoon className="h-5 w-5" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <LucideUserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
