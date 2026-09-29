import React, { useState } from 'react';
import { Project, ProjectInput } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ImageUploader } from './ImageUploader';
import { Wand2 } from 'lucide-react';

export interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (data: ProjectInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [longDescription, setLongDescription] = useState(initialData?.long_description || '');
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '');
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || '');
  const [demoUrl, setDemoUrl] = useState(initialData?.demo_url || '');
  const [techInput, setTechInput] = useState(initialData?.technologies?.join(', ') || '');
  const [category, setCategory] = useState(initialData?.category || 'Frontend');
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [published, setPublished] = useState(initialData?.published ?? true);

  const [formError, setFormError] = useState<string | null>(null);

  const generateSlug = () => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setSlug(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !slug.trim() || !description.trim()) {
      setFormError('Title, slug, and short description are required.');
      return;
    }

    const techList = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await onSubmit({
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        long_description: longDescription.trim() || undefined,
        cover_image: coverImage || undefined,
        github_url: githubUrl.trim() || undefined,
        demo_url: demoUrl.trim() || undefined,
        technologies: techList,
        category,
        featured,
        published,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save project';
      setFormError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 sm:p-8 border-3 border-border shadow-brutal">
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <h3 className="text-xl font-black font-sans uppercase tracking-tight text-foreground">
          {initialData ? 'EDIT SPECIFICATION RECORD' : 'CREATE NEW PROJECT SPEC'}
        </h3>
      </div>

      {formError && (
        <div className="p-3 bg-danger/10 border-2 border-danger text-danger font-mono text-xs font-bold">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="PROJECT TITLE"
          placeholder="e.g. Distributed Ingestion Engine"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              SLUG IDENTIFIER *
            </label>
            <button
              type="button"
              onClick={generateSlug}
              className="text-[10px] font-mono font-bold text-accent hover:underline flex items-center gap-1"
            >
              <Wand2 className="w-3 h-3" /> AUTO-GENERATE
            </button>
          </div>
          <input
            type="text"
            placeholder="distributed-ingestion-engine"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-surface text-foreground font-mono text-sm border-2 border-border shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>
      </div>

      <Textarea
        label="SHORT DESCRIPTION (CARD DISPLAY)"
        placeholder="High-level engineering summary (1-2 sentences)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        required
      />

      <Textarea
        label="LONG DESCRIPTION (DETAIL PAGE OVERVIEW)"
        placeholder="Detailed breakdown of architecture, problem, solution, features, and metrics..."
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
        rows={5}
      />

      <ImageUploader
        label="PROJECT COVER IMAGE"
        folder="projects"
        value={coverImage}
        onChange={(url) => setCoverImage(url)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="GITHUB REPOSITORY URL"
          placeholder="https://github.com/username/project"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <Input
          label="LIVE DEMO URL"
          placeholder="https://demo.example.com"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="TECHNOLOGIES (COMMA SEPARATED)"
          placeholder="React, TypeScript, NestJS, Supabase"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          helperText="Separate each technology with a comma."
        />

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5">
            CATEGORY CLASSIFICATION
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-surface text-foreground font-mono text-sm border-2 border-border shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Mobile">Mobile</option>
            <option value="Fullstack">Fullstack</option>
            <option value="DevOps &amp; Cloud">DevOps &amp; Cloud</option>
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="p-4 bg-surface-muted border-2 border-border flex flex-wrap gap-8 items-center">
        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-foreground">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span>FEATURED PROJECT (PROMOTED ON HOMEPAGE)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-foreground">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span>PUBLISHED (VISIBLE TO PUBLIC)</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          CANCEL
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          SAVE SPECIFICATION
        </Button>
      </div>
    </form>
  );
};
