# 🎓 L1 Droit S2 Toulon - Dashboard Masterclass v9

[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)](https://reactjs.org/)
[![Version](https://img.shields.io/badge/Version-9.0.0-2F5D50)](https://github.com/Yorian-melki/l1-droit-s2-toulon-v9)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Dashboard interactif pour révisions L1 Droit S2 - Université de Toulon

## ✨ Fonctionnalités

- ✅ **IA Infaillible** : HuggingFace + Ollama + Mock (correction automatique, génération de sujets)
- ✅ **Dark Mode** : Palette Vert Profond Élégant (light/dark toggle)
- ✅ **37 Thèmes** : DC, DDF, IA, HD (Droit constitutionnel, Droit de la famille, etc.)
- ✅ **85 PDFs** : Knowledge Base complète
- ✅ **24 Annales** : Sujets réels L1 S2
- ✅ **Flashcards SM-2** : Répétition espacée scientifique
- ✅ **6 Méthodologies** : Dissertation, Cas pratique, Commentaire d'arrêt, etc.
- ✅ **Priorités dynamiques** : Calcul auto basé sur ECTS × Proximité exam × Maîtrise
- ✅ **100% Gratuit/Illimité** : Aucune limite, tout fonctionne offline si besoin

## 🚀 Démarrage rapide

### Installation locale

```bash
# Cloner le repo
git clone https://github.com/Yorian-melki/l1-droit-s2-toulon-v9.git
cd l1-droit-s2-toulon-v9

# Installer les dépendances
npm install

# Lancer l'app
npm start
```

L'app s'ouvre sur http://localhost:3000

### Import dans CodeSandbox (1 clic)

1. Va sur https://codesandbox.io
2. Clique "Import" → "Import from GitHub"
3. Colle : `https://github.com/Yorian-melki/l1-droit-s2-toulon-v9`
4. C'EST PRÊT ! 🎉

## 🎨 Palette Couleurs

**Dark Mode (default)** :
- Fond : `#0E1412` (Pine Black)
- Surface : `#141C19` (Deep Forest Slate)
- Primary : `#2F7D5C` (Emerald Moss)
- Texte : `#E7F0EB` (Mint White)

**Light Mode** :
- Fond : `#F2F6F3` (Cool Mint Wash)
- Surface : `#DCE8E1` (Eucalyptus Light)
- Primary : `#2F5D50` (Deep Teal Green)
- Texte : `#18221E` (Charcoal Green Black)

## 🤖 Configuration IA

Le token HuggingFace est **déjà configuré** dans le code. L'IA fonctionne immédiatement.

Pour utiliser Ollama (IA locale) :
```bash
brew install ollama
ollama run llama3.2
```

Puis dans l'app : **⚙️ Réglages** → Choisir "Ollama"

## 📚 Structure du projet

```
l1-droit-s2-toulon-v9/
├── src/
│   ├── App.jsx          # Code principal (1156 lignes)
│   └── index.jsx        # Point d'entrée
├── public/
│   └── index.html       # Template HTML
├── package.json         # Dépendances
└── README.md           # Ce fichier
```

## 🎯 Matières incluses

- **DC** : Droit constitutionnel de la Ve République (Mr Bardin) - 5 ECTS
- **DDF** : Droit de la famille (Mme Douchy-Oudot) - 5 ECTS
- **IA** : Institutions administratives (Mr Bardin) - 3 ECTS
- **HD** : Histoire du droit (Mme Regarde-Riot) - 3 ECTS

## 🛠️ Technologies

- React 18.2
- Recharts 2.10 (graphiques)
- LocalStorage (persistence)
- SM-2 Algorithm (flashcards)
- HuggingFace Inference API
- Ollama (optionnel)

## 📝 License

MIT License - Libre d'utilisation

## 👨‍💻 Auteur

**Yorian Melki** - L1 Droit S2 Toulon

---

**Version 9.0.0** - Février 2026 - 100% Gratuit/Illimité ✅
