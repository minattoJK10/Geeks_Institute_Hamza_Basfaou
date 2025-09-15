
# HR Agent CLI

HR Agent CLI est une application en ligne de commande pour faciliter la recherche, la sélection et l’emailing de candidats. Elle permet de :  

- Rechercher des candidats dans MongoDB selon des critères (compétences, expérience, localisation, disponibilité, etc.)  
- Créer et gérer des shortlists  
- Générer des emails personnalisés pour les candidats  
- Obtenir des statistiques sur le pipeline de recrutement  

---

## Prérequis

- Python 3.10+
- MongoDB avec une collection `candidates` contenant les données des candidats
- Un fichier `.env` avec les variables suivantes :
  ```env
  BASE_URL=<URL de l'API modèle>
  API_KEY=<Clé API>
  MODEL=<Nom du modèle>
  MONGO_URL=mongodb://localhost:27017/
````

* Bibliothèques Python requises :

  ```bash
  pip install pymongo requests python-dotenv
  ```

---

## Installation

1. Clonez le projet :

   ```bash
   git clone <votre-repo>
   cd <répertoire-du-projet>
   ```
2. Créez un environnement virtuel :

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   ```
3. Installez les dépendances :

   ```bash
   pip install -r requirements.txt
   ```
4. Configurez le fichier `.env` avec vos clés et l’URL MongoDB.

---

## Usage

Lancez l’application CLI :

```bash
python hr_agent.py
```

### Commandes disponibles

* **Aide :**

  ```text
  help
  ```

* **Rechercher des candidats :**

  ```text
  Find top 5 React interns in Casablanca, 0-2 years, available this month
  ```

* **Sauvegarder une shortlist :**

  ```text
  Save #1 #3 as "FE-Intern-A"
  ```

* **Créer un email pour une shortlist :**

  ```text
  Draft an outreach email for "FE-Intern-A" using job "Frontend Intern" in friendly tone
  ```

* **Modifier le sujet ou la signature d’un email :**

  ```text
  Change the subject to "Quick chat about a Frontend Intern role?"
  Edit closing to "Cheers,\nHamza"
  ```

* **Afficher les statistiques du pipeline :**

  ```text
  Show analytics
  ```

* **Lister toutes les shortlists :**

  ```text
  List shortlists
  Show shortlist "FE-Intern-A"
  ```

---

## Structure du projet

```
hr_agent.py        # Code principal
Data/candidates.json    # Données des candidats (MongoDB)
Data/shortlists.json    # Shortlists sauvegardées
Data/jobs.json          # Données des jobs (MongoDB)   
.env               # Variables d'environnement
seed_db.py         # to create the database in (MongoDB)
requirements.txt   
```

---

## Fonctionnalités principales

1. **Recherche de candidats** via un modèle ou heuristique locale.
2. **Score des candidats** selon compétences, localisation, expérience et disponibilité.
3. **Shortlists** : sauvegarde, consultation et affichage des shortlists.
4. **Génération d’emails** personnalisés avec HTML et plain-text.
5. **Analytics** pour visualiser le pipeline et les compétences les plus fréquentes.

---

## Notes

* `datetime.utcnow()` génère un avertissement de dépréciation ; il est recommandé d’utiliser un objet `timezone-aware` pour UTC.
* `shortlists.json` est créé automatiquement lors de la première sauvegarde.
* Le fichier `shortlists.json` est mis à jour à chaque nouvelle shortlist et peut être consulté avec la commande `List shortlists`.

---

## Auteur

**Hamza Basfaou** – HR Agent CLI


