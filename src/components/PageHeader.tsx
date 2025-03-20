
import { useState } from 'react';
import { LucideEdit, LucideMoreHorizontal, LucideTrash2, LucideShare2, LucideFileOutput } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type PageHeaderProps = {
  title: string;
  isEditing: boolean;
  lastEdited?: string;
  onEdit: () => void;
  onExport?: () => void;
  onDelete?: () => void;
};

const PageHeader = ({ 
  title, 
  isEditing,
  lastEdited,
  onEdit,
  onExport,
  onDelete
}: PageHeaderProps) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Page link has been copied to clipboard",
    });
  };

  return (
    <div className={cn(
      "relative border-b border-border pb-4 mb-6",
      "transition-all duration-300 ease-in-out animate-fade-in"
    )}>
      <div className="flex items-center justify-between">
        <h1 className={cn(
          "text-3xl font-semibold tracking-tight",
          isEditing && "border border-dashed border-border px-3 py-1 rounded-md"
        )}>
          {title}
        </h1>
        
        <div className="flex items-center gap-2">
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <LucideEdit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LucideMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleShare}>
                <LucideShare2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <LucideFileOutput className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <LucideTrash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {lastEdited && (
        <div className="text-xs text-muted-foreground mt-2">
          Last edited {lastEdited}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
