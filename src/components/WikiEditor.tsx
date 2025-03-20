
import { useEffect, useState } from 'react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';
import { cn } from '@/lib/utils';

type WikiEditorProps = {
  initialContent?: string;
  readOnly?: boolean;
  onChange?: (content: string) => void;
  className?: string;
};

const WikiEditor = ({
  initialContent,
  readOnly = false,
  onChange,
  className,
}: WikiEditorProps) => {
  const [isClient, setIsClient] = useState(false);

  // Create a new editor instance
  const editor: BlockNoteEditor | null = useBlockNote({
    editable: !readOnly,
    initialContent: initialContent 
      ? JSON.parse(initialContent) as PartialBlock[] 
      : undefined,
    onEditorContentChange: (editor) => {
      if (onChange) {
        onChange(JSON.stringify(editor.topLevelBlocks));
      }
    },
  });

  // BlockNote has issues with SSR, so we only render it on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={cn("rounded-lg border border-border bg-card animate-pulse p-4", className)}>
        <div className="h-6 w-2/3 bg-muted rounded mb-3"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded mb-2 w-11/12"></div>
        <div className="h-4 bg-muted rounded mb-4 w-4/5"></div>
        <div className="h-6 w-1/2 bg-muted rounded mb-3"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg", className)}>
      <BlockNoteView
        editor={editor}
        theme="light"
        className={cn(
          "bn-container min-h-[200px] rounded-lg transition-all",
          readOnly ? "pointer-events-none" : "border border-border"
        )}
      />
    </div>
  );
};

export default WikiEditor;
