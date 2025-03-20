
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideChevronRight, LucideChevronDown, LucidePlus, LucideSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type Page = {
  id: string;
  title: string;
  path: string;
  parent?: string;
};

type Category = {
  id: string;
  name: string;
  pages: string[];
  isExpanded: boolean;
};

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onCreatePage: () => void;
};

const Sidebar = ({ isOpen, onToggle, onCreatePage }: Props) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Community', pages: ['1', '2'], isExpanded: true },
    { id: '2', name: 'Events', pages: ['3'], isExpanded: true },
    { id: '3', name: 'Resources', pages: ['4', '5'], isExpanded: true },
  ]);
  
  const [pages, setPages] = useState<Page[]>([
    { id: '1', title: 'Welcome', path: '/', parent: '1' },
    { id: '2', title: 'Community Guidelines', path: '/community-guidelines', parent: '1' },
    { id: '3', title: 'Upcoming Events', path: '/upcoming-events', parent: '2' },
    { id: '4', title: 'Local Resources', path: '/local-resources', parent: '3' },
    { id: '5', title: 'Contact Information', path: '/contact-information', parent: '3' },
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, isExpanded: !category.isExpanded }
        : category
    ));
  };

  const filteredPages = searchQuery 
    ? pages.filter(page => 
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-background transition-all duration-300 ease-in-out fixed left-0 top-0 h-full z-30",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Wiki</h2>
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            <LucideChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 relative">
          <LucideSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-1 px-3">
          {!searchQuery && categories.map((category) => (
            <div key={category.id} className="py-1">
              <div 
                className="flex items-center justify-between py-1 px-2 rounded-md cursor-pointer hover:bg-accent group"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center text-sm font-medium">
                  {category.isExpanded ? (
                    <LucideChevronDown className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  ) : (
                    <LucideChevronRight className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  )}
                  {category.name}
                </div>
              </div>
              {category.isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {pages
                    .filter(page => page.parent === category.id)
                    .map(page => (
                      <Link
                        key={page.id}
                        to={page.path}
                        className={cn(
                          "block px-2 py-1 text-sm rounded-md transition-colors hover:bg-accent",
                          location.pathname === page.path 
                            ? "bg-accent text-accent-foreground font-medium" 
                            : "text-foreground"
                        )}
                      >
                        {page.title}
                      </Link>
                    ))
                  }
                </div>
              )}
            </div>
          ))}
          
          {searchQuery && (
            <div className="mt-2 space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase px-2 py-1">
                Search Results
              </div>
              {filteredPages.length > 0 ? (
                filteredPages.map(page => (
                  <Link
                    key={page.id}
                    to={page.path}
                    className={cn(
                      "block px-2 py-1 text-sm rounded-md transition-colors hover:bg-accent",
                      location.pathname === page.path 
                        ? "bg-accent text-accent-foreground font-medium" 
                        : "text-foreground"
                    )}
                  >
                    {page.title}
                  </Link>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  No pages found
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <Button 
          className="w-full justify-start" 
          size="sm" 
          onClick={onCreatePage}
        >
          <LucidePlus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
