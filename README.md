# POPCORN

## Créer son profil

- Forker ce dépôt
- Ajouter sa fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`
- Ajouter sa photo dans le dossier `/static/images` : **la photo doit faire 100ko maximum.**
- Faire une _pull request_
- Bienvenue sur POPCORN ! ✨

## Doc technique

## installation

cloner ce dépôt puis

```sh
npm install
```

démarrer le serveur de dev

```sh
npm run dev
```

Parser les markdowns du dossier `content` en JSON :

```sh
npm run cc
```

## déployer

```sh
./deploy.sh
```
