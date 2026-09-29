import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Eye, EyeOff, Star } from 'lucide-react';
import { getAllProjectsAdmin, createProject, updateProject, deleteProject } from '../../services/projects';
import { Project, ProjectInput } from '../../types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { LoadingState } from '../../components/ui/States';
import { ProjectForm } from '../../components/admin/ProjectForm';

export const AdminProjects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [isCreating, setIsCreating] = useState(searchParams.get('create') === 'true');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Delete dialog states
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjectsAdmin();
      setProjects(data);

      const editId = searchParams.get('edit');
      if (editId) {
        const found = data.find((p) => p.id === editId);
        if (found) setEditingProject(found);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching projects';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (data: ProjectInput) => {
    setActionLoading(true);
    try {
      const created = await createProject(data);
      setProjects([created, ...projects]);
      setIsCreating(false);
      searchParams.delete('create');
      setSearchParams(searchParams);
      setToast({ type: 'success', message: `Project "${created.title}" initialized successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create project';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: ProjectInput) => {
    if (!editingProject) return;
    setActionLoading(true);
    try {
      const updated = await updateProject(editingProject.id, data);
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      setEditingProject(null);
      searchParams.delete('edit');
      setSearchParams(searchParams);
      setToast({ type: 'success', message: `Project "${updated.title}" updated successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update project';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await deleteProject(deleteTarget.id);
      setProjects(projects.filter((p) => p.id !== deleteTarget.id));
      setToast({ type: 'success', message: `Project "${deleteTarget.title}" purged from registry.` });
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete project';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const togglePublish = async (project: Project) => {
    try {
      const updated = await updateProject(project.id, { published: !project.published });
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      setToast({
        type: 'success',
        message: `Project ${updated.published ? 'published' : 'unpublished'} successfully.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Toggle failed';
      setToast({ type: 'error', message: msg });
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const updated = await updateProject(project.id, { featured: !project.featured });
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      setToast({
        type: 'success',
        message: `Project ${updated.featured ? 'marked featured' : 'removed from featured'}.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Toggle failed';
      setToast({ type: 'error', message: msg });
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-6">
        <div>
          <span className="font-mono text-xs font-bold text-accent uppercase">
            [SPECIFICATION_REPOSITORY]
          </span>
          <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
            PROJECT SPECIFICATIONS
          </h1>
        </div>

        {!isCreating && !editingProject && (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setIsCreating(true);
              setEditingProject(null);
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" /> NEW PROJECT
          </Button>
        )}
      </div>

      {/* Form View (Create or Edit) */}
      {isCreating ? (
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => {
            setIsCreating(false);
            searchParams.delete('create');
            setSearchParams(searchParams);
          }}
          loading={actionLoading}
        />
      ) : editingProject ? (
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleUpdate}
          onCancel={() => {
            setEditingProject(null);
            searchParams.delete('edit');
            setSearchParams(searchParams);
          }}
          loading={actionLoading}
        />
      ) : (
        /* Table View */
        <div className="space-y-4">
          <div className="p-3 bg-surface border-2 border-border shadow-brutal-sm flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="FILTER PROJECTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-surface-muted text-foreground font-mono text-xs border border-border focus:outline-none"
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
              COUNT: {filtered.length} RECORDS
            </span>
          </div>

          {loading ? (
            <LoadingState message="SCANNING PROJECT ARCHIVES..." />
          ) : (
            <div className="bg-surface border-3 border-border shadow-brutal overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-surface-muted border-b-2 border-border text-foreground font-bold uppercase">
                  <tr>
                    <th className="p-3">COVER</th>
                    <th className="p-3">TITLE / SLUG</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">FEATURED</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filtered.map((proj) => (
                    <tr key={proj.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="p-3 w-16">
                        {proj.cover_image ? (
                          <img
                            src={proj.cover_image}
                            alt=""
                            className="w-12 h-9 object-cover border border-border bg-surface-muted"
                          />
                        ) : (
                          <div className="w-12 h-9 border border-border bg-surface-muted flex items-center justify-center text-[9px] text-muted-foreground">
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-black font-sans text-sm text-foreground uppercase">
                          {proj.title}
                        </div>
                        <div className="text-muted-foreground text-[10px]">/{proj.slug}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-surface-muted border border-border text-[10px]">
                          {proj.category || 'General'}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => togglePublish(proj)}
                          className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 border ${
                            proj.published
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                              : 'bg-gray-100 text-gray-700 border-gray-400'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {proj.published ? (
                            <>
                              <Eye className="w-3 h-3" /> PUBLISHED
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" /> DRAFT
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleFeatured(proj)}
                          className={`p-1 border ${
                            proj.featured
                              ? 'bg-accent text-accent-foreground border-border'
                              : 'bg-surface-muted text-muted-foreground border-border/40 hover:text-foreground'
                          }`}
                          title="Click to toggle featured spotlight"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 bg-surface hover:bg-surface-muted border border-border shadow-brutal-sm"
                            title="Edit project"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-foreground" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(proj)}
                            className="p-1.5 bg-danger/10 hover:bg-danger text-danger hover:text-white border border-danger transition-colors"
                            title="Purge project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        NO PROJECTS RECORDED IN REPOSITORY.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="PURGE PROJECT SPECIFICATION?"
        message={`Are you sure you wish to permanently erase "${deleteTarget?.title}"? This operation cannot be undone.`}
        confirmLabel="PURGE RECORD"
        cancelLabel="ABORT"
        isDestructive={true}
        loading={actionLoading}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
