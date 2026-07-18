import json
import os
import sys

# Ajouter le dossier courant au chemin
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import Project
import crud
from schemas import ProjectCreate

def import_projects():
    db = SessionLocal()
    
    # Chercher le fichier dans plusieurs emplacements possibles
    possible_paths = [
        'projects.json',  # Dans backend/
        '../frontend/src/data/projects.json',  # Depuis backend/
        '../frontend/data/projects.json',  # Autre possibilité
        os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data', 'projects.json'),
        os.path.join(os.path.dirname(__file__), 'projects.json'),
    ]
    
    file_path = None
    for path in possible_paths:
        if os.path.exists(path):
            file_path = path
            break
    
    if not file_path:
        print("❌ Fichier projects.json non trouvé !")
        print("📁 Chemins recherchés :")
        for path in possible_paths:
            print(f"   - {path}")
        return
    
    print(f"✅ Fichier trouvé : {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        projects_data = json.load(f)
    
    for data in projects_data:
        # Créer l'objet ProjectCreate
        project = ProjectCreate(
            title=data['title'],
            description=data.get('detailedDescription', data['description']),
            tags=data.get('tags', []),
            image_url=data.get('imageName', ''),
            github_url=data.get('link', ''),
            live_url=data.get('link', '')
        )
        crud.create_project(db, project)
        print(f"✅ Importé : {project.title}")
    
    db.close()
    print(f"🎉 Importation terminée ! {len(projects_data)} projets importés.")

if __name__ == "__main__":
    import_projects()