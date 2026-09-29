import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, Star, ExternalLink } from 'lucide-react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../services/achievements';
import { Achievement, AchievementInput } from '../../types';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { LoadingState } from '../../components/ui/States';
import { AchievementForm } from '../../components/admin/AchievementForm';

export const AdminAchievements: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreating, setIsCreating] = useState(searchParams.get('create') === 'true');
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setAchievements(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch achievements';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleCreate = async (data: AchievementInput) => {
    setActionLoading(true);
    try {
      const created = await createAchievement(data);
      setAchievements([created, ...achievements]);
      setIsCreating(false);
      searchParams.delete('create');
      setSearchParams(searchParams);
      setToast({ type: 'success', message: `Achievement "${created.title}" recorded successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Creation failed';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: AchievementInput) => {
    if (!editingAchievement) return;
    setActionLoading(true);
    try {
      const updated = await updateAchievement(editingAchievement.id, data);
      setAchievements(achievements.map((a) => (a.id === updated.id ? updated : a)));
      setEditingAchievement(null);
      setToast({ type: 'success', message: `Achievement "${updated.title}" updated successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Update failed';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await deleteAchievement(deleteTarget.id);
      setAchievements(achievements.filter((a) => a.id !== deleteTarget.id));
      setToast({ type: 'success', message: `Achievement record purged.` });
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion failed';
      setToast({ type: 'error', message: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const toggleFeatured = async (item: Achievement) => {
    try {
      const updated = await updateAchievement(item.id, { featured: !item.featured });
      setAchievements(achievements.map((a) => (a.id === updated.id ? updated : a)));
      setToast({
        type: 'success',
        message: `Achievement ${updated.featured ? 'promoted to featured' : 'demoted from featured'}.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Toggle failed';
      setToast({ type: 'error', message: msg });
    }
  };

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
            [CREDENTIAL_REGISTRY]
          </span>
          <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
            ACHIEVEMENTS &amp; ACCREDITATIONS
          </h1>
        </div>

        {!isCreating && !editingAchievement && (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setIsCreating(true);
              setEditingAchievement(null);
            }}
          >
            <Plus className="w-4 h-4 mr-1.5" /> NEW ACHIEVEMENT
          </Button>
        )}
      </div>

      {isCreating ? (
        <AchievementForm
          onSubmit={handleCreate}
          onCancel={() => {
            setIsCreating(false);
            searchParams.delete('create');
            setSearchParams(searchParams);
          }}
          loading={actionLoading}
        />
      ) : editingAchievement ? (
        <AchievementForm
          initialData={editingAchievement}
          onSubmit={handleUpdate}
          onCancel={() => setEditingAchievement(null)}
          loading={actionLoading}
        />
      ) : (
        <div className="space-y-4">
          {loading ? (
            <LoadingState message="SCANNING CREDENTIAL VAULT..." />
          ) : (
            <div className="bg-surface border-3 border-border shadow-brutal overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-surface-muted border-b-2 border-border text-foreground font-bold uppercase">
                  <tr>
                    <th className="p-3">TITLE / ACCREDITATION</th>
                    <th className="p-3">ISSUER</th>
                    <th className="p-3">DATE</th>
                    <th className="p-3">FEATURED</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {achievements.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="p-3">
                        <div className="font-black font-sans text-sm text-foreground uppercase">
                          {item.title}
                        </div>
                        {item.certificate_url && (
                          <a
                            href={item.certificate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline text-[10px] inline-flex items-center gap-1"
                          >
                            VERIFY CREDENTIAL <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-foreground">
                        {item.issuer || '—'}
                      </td>
                      <td className="p-3 text-muted-foreground">{item.date || '—'}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleFeatured(item)}
                          className={`p-1 border ${
                            item.featured
                              ? 'bg-accent text-accent-foreground border-border'
                              : 'bg-surface-muted text-muted-foreground border-border/40 hover:text-foreground'
                          }`}
                          title="Toggle featured spotlight"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingAchievement(item)}
                            className="p-1.5 bg-surface hover:bg-surface-muted border border-border shadow-brutal-sm"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-foreground" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-1.5 bg-danger/10 hover:bg-danger text-danger hover:text-white border border-danger transition-colors"
                            title="Purge"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {achievements.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        NO ACCREDITATIONS RECORDED.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="PURGE ACCREDITATION RECORD?"
        message={`Are you certain you wish to delete "${deleteTarget?.title}"?`}
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
