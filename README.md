# POPCORN 🍿

_Popcorn_ est une plateforme open source et (vraiment) sans frais ni commission qui aide les développeur-e-s freelance de Nantes à trouver des projets : [Voir le site](https://popcorn-nantes.github.io)

Les objectifs de _Popcorn_ pour les développeurs freelances :

- 📈 Nous aider à trouver des affaires à Nantes, sans commission ni intermédiaire
- 📗 Open source : on maîtrise les fonctionnalités tel que les résultats de recherche, les informations affichées par nos profils etc.
- 💬 Faire circuler les tuyaux boulot entre freelances via le tchat privé. (accessible uniquement en cas d'inscription sur le site vitrine)
- 🌟 Apparaitre sur la première page de google sur les mots clefs de type "développeur freelance Nantes".
- 💪 Proposer une alternative gratuite aux _market places_ de freelances centralisées
- 🛡️ Résilience: on renforce les liens du tissu économique local et on s'entre-aide sur nos problématiques communes.

## Nous rencontrer

Nos RDV sont annoncés ici: https://www.meetup.com/fr-FR/meetup-group-tCnaDLLH/

Ces évenements sont l'occasion pour ses membres de se rencontrer, boire des bières, réseauter, échanger des tuyaux boulots. Quand on déjà rencontré ou discuté avec quelqu'un, est on plus apte à lui confier des plans travails ou à faire équipe avec lui car ça crée de la confiance! pensez-y ^^

## Créer son profil

- Fork ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour créer l'url de ton profil. Attention à ne pas laisser l'underscore `_` au début du nom du fichier, sinon ton profil sera désactivé par défaut ! Un doute sur la syntaxe `yaml` de ton profil ? Tu peux copier-coller ton profil ici pour vérifier que c'est ok: http://www.yamllint.com/
- Ajoute ta photo dans le dossier `/static/media/photos` : **la photo doit faire 100ko maximum ⚠️**.
- Fait une _pull request_ avec pour titre \_Nouveau profil : {{ton prénom}} .
- Bienvenue sur _Popcorn_ ! ✨ Tu recevras également un mail pour t'inviter sur le tchat de _Popcorn_, qui est ze place to be pour trouver des plans tafs à Nantes.

Pour soumettre une suggestion, signaler un bug, demander de l'aide, tu peux aussi tout simplement [ouvrir une issue sur ce repo](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## éditer son profil

## FAQ

### Quelle est la différence avec des plateformes comme Malt ou Comet ?

- _Popcorn_ est une [association à but non-lucratif](https://opencollective.com/popcorn) et ne prélève pas de commission.
- _Popcorn_ est réservé aux **développeur·e·s de la région nantaise**.
- _Popcorn_ est développé et maintenu par les développeur(e)s freelances eux-mêmes.
- _Popcorn_ n'est **pas** un intermédiaire ou une entreprise: les clients entrent directement en contact avec les freelances. _Popcorn_ ne joue aucun rôle dans les échanges qui suivent ensuite entre les deux parties.

## Documentation technique

Il s'agit d'un site généré statiquement par un script Node.js à partir de fichiers markdowns.

## Installation

cloner ce dépôt puis

```sh
npm install
```

Générer la version statique du site

```sh
npm run build
```

Servir la version statique du site

```sh
serve _site
```

### Déployer

Le déploiement du site est déclenché automatiquement par les _github actions_ lors d'un merge sur la branche `master`. Les changements peuvent donc prendre quelques minutes avant d'être visible en production.
