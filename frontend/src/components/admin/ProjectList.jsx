// frontend/src/components/admin/ProjectList.jsx
import { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../utils/api';
import EditProject from './EditProject';

export default function ProjectList({ onRefresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleUpdated = async () => {
    await loadProjects();
    if (onRefresh) onRefresh();
    setEditingProject(null);
  };

  if (loading) return <div className="text-center py-8">Chargement des projets...</div>;

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags?.map((tag) => (
              <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleEdit(project)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
            >
              ✏️ Modifier
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      ))}

      {editingProject && (
        <EditProject
          project={editingProject}
          onClose={handleCloseEdit}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}