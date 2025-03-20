
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import PageHeader from '@/components/PageHeader';
import WikiEditor from '@/components/WikiEditor';
import DeletePageDialog from '@/components/wiki/DeletePageDialog';
import { useWikiPage } from '@/hooks/useWikiPage';

const WikiPage = () => {
  const { pageId = 'welcome' } = useParams();
  const {
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
  } = useWikiPage(pageId);
  
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
      
      <DeletePageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </MainLayout>
  );
};

export default WikiPage;
