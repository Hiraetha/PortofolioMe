import React, { useState } from 'react';
import { Achievement, AchievementInput } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ImageUploader } from './ImageUploader';

export interface AchievementFormProps {
  initialData?: Achievement | null;
  onSubmit: (data: AchievementInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [issuer, setIssuer] = useState(initialData?.issuer || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [certificateUrl, setCertificateUrl] = useState(initialData?.certificate_url || '');
  const [featured, setFeatured] = useState(initialData?.featured ?? false);

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Achievement title is required.');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        issuer: issuer.trim() || undefined,
        date: date || undefined,
        description: description.trim() || undefined,
        image_url: imageUrl || undefined,
        certificate_url: certificateUrl.trim() || undefined,
        featured,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save achievement';
      setFormError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 sm:p-8 border-3 border-border shadow-brutal">
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <h3 className="text-xl font-black font-sans uppercase tracking-tight text-foreground">
          {initialData ? 'EDIT ACCREDITATION RECORD' : 'CREATE NEW ACCREDITATION'}
        </h3>
      </div>

      {formError && (
        <div className="p-3 bg-danger/10 border-2 border-danger text-danger font-mono text-xs font-bold">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="ACCREDITATION / AWARD TITLE *"
          placeholder="e.g. AWS Certified Solutions Architect"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="ISSUING BODY / ORGANIZATION"
          placeholder="e.g. Amazon Web Services"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="CONFERRAL DATE"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          label="OFFICIAL VERIFICATION / CERTIFICATE URL"
          placeholder="https://credly.com/badges/..."
          value={certificateUrl}
          onChange={(e) => setCertificateUrl(e.target.value)}
        />
      </div>

      <Textarea
        label="DESCRIPTION / SCOPE"
        placeholder="Brief detail of certified competencies, ranking, or requirements..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <ImageUploader
        label="CERTIFICATE / BADGE PREVIEW IMAGE"
        folder="achievements"
        value={imageUrl}
        onChange={(url) => setImageUrl(url)}
      />

      <div className="p-4 bg-surface-muted border-2 border-border">
        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-foreground">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span>FEATURED RECORD (DISPLAY ON HOMEPAGE SPOTLIGHT)</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          CANCEL
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          SAVE ACCREDITATION
        </Button>
      </div>
    </form>
  );
};
