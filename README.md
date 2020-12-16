# POPCORN 🍿

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

_Popcorn_ est une plateforme open source et (vraiment) sans frais ni commission qui aide les développeur-e-s freelance de Nantes à trouver des clients et des missions : [Voir le site](https://popcorn-nantes.github.io). C'est aussi un réseau et un tchat privé où l'on s'échange des plans tafs et où l'on s'entraide sur nos problématiques communes.

Les objectifs de _Popcorn_ pour les développeurs freelances :

- 📈 Nous aider à trouver des affaires à Nantes, sans commission ni intermédiaire
- 📗 Open source : on maîtrise les fonctionnalités du site tel que les résultats de recherche, l'ordre d'apparition des profils, les informations affichées par nos profils etc.
- 💬 Faire circuler les tuyaux boulot entre freelances via le tchat privé. (accessible uniquement en cas d'inscription sur le site vitrine)
- 🌟 Apparaitre sur la première page de google sur les mots clefs de type "développeur freelance Nantes".
- 💪 Proposer une alternative gratuite aux _market places_ de freelances centralisées
- 🛡️ Résilience: on renforce les liens du tissu économique local et on s'entre-aide sur nos problématiques communes.

## Nous rencontrer

Nos RDV sont annoncés ici: https://www.meetup.com/fr-FR/meetup-group-tCnaDLLH/

Ces évenements sont l'occasion pour ses membres de se rencontrer, boire des bières, réseauter, échanger des tuyaux boulots. Quand on a déjà rencontré ou discuté avec quelqu'un, on est plus apte à lui confier des plans travails ou à faire équipe avec lui car ça crée de la confiance! pensez-y ^^

## Créer son profil

- Fork ce dépôt
- Ajoute ta fiche dans le dossier `content/persons` en prenant comme exemple le fichier `_exemple.md`. Le nom de ton fichier sera utilisé pour créer l'url de ton profil. Attention à ne pas laisser l'underscore `_` au début du nom du fichier, sinon ton profil sera désactivé par défaut ! Un doute sur la syntaxe `yaml` de ton profil ? Tu peux copier-coller ton profil ici pour vérifier que c'est ok: http://www.yamllint.com/
- Ajoute ta photo dans le dossier `/static/media/photos` : **la photo doit faire 100ko maximum ⚠️**.
- Fais une _pull request_ avec pour titre Nouveau profil : {{ton prénom}}
- Bienvenue sur _Popcorn_ ! ✨ Tu recevras également un mail pour t'inviter sur le tchat de _Popcorn_, qui est ze place to be pour trouver des plans tafs à Nantes.

Pour soumettre une suggestion, signaler un bug, demander de l'aide, tu peux aussi tout simplement [ouvrir une issue sur ce repo](https://github.com/popcorn-nantes/popcorn-nantes/issues/new)

## PHILOSOPHIE TECHNIQUE : 0 MAINTENANCE, 0 FRAIS, SIMPLE ET EFFICACE

Le mot "Popcorn" a été notamment choisi pour évoquer une grande légèreté. Son mantra technique pourrait être:

"Dis moi ce dont tu as besoin, je te dirai comment t'en passer."

L'idée expérimentée par Popcorn est d'avoir un site aussi léger techniquement que possible, sans serveur et base de données afin qu'il ne requiert quasiment aucune maintenance et intervention de notre part ni aucun frais, parce que :

- On est déjà tous "sous l'eau", ce site ne doit pas être une charge de travail supplémentaire.
- On ne veut pas que le site reste 48 heures en rade parce qu'il ya un truc qui déconne et que tout le monde est trop occupé pour intervenir dessus.
- On ne veut pas qu'au fil du temps une personne devienne "responsable" du site, qu'elle soit la seule à piger comment tout fonctionne et qu'elle parte à Barcelone ou quitte Popcorn en laissant aux autres un truc compliqué qu'ils et elles ne maitrisent pas
- On veut bien être hébergé pour 0 euros chez Github ^^
- On veut bien un site qui soit capable de supporter un fort pic de charge sans broncher : évitons le cas du site qui tombe pile au moment où un article de presse le mentionne 😅
- On veut bien un moteur de recherche super-rapide et un site qui s'affiche super vite
- On veut bien que des gens puissent tout simplement forker le repo de démarrage pour créer leur propre annuaire 💚

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

Générer la version statique du site finale (version de production)

```sh
npm run build
```

Générer la version statique du site pour le dev (plus rapide car pas d'optim des images)

```sh
npm run dev
```

le dossier \_site contient le code html final:

```sh
npx serve _site
```

### Déployer

Le déploiement du site est déclenché automatiquement par les _github actions_ lors d'un merge sur la branche `master`. Les changements peuvent donc prendre quelques minutes avant d'être visible en production.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://adrien.pessu.net"><img src="https://avatars0.githubusercontent.com/u/7055334?v=4" width="100px;" alt=""/><br /><sub><b>Adrien Pessu</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=adrienpessu" title="Code">💻</a> <a href="#financial-adrienpessu" title="Financial">💵</a> <a href="https://github.com/popcorn-nantes/popcorn-nantes/pulls?q=is%3Apr+reviewed-by%3Aadrienpessu" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://gwenaelp.github.io"><img src="https://avatars0.githubusercontent.com/u/5365267?v=4" width="100px;" alt=""/><br /><sub><b>Gwenael Pluchon</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=gwenaelp" title="Code">💻</a> <a href="#eventOrganizing-gwenaelp" title="Event Organizing">📋</a></td>
    <td align="center"><a href="http://alvin.berthelot.rocks"><img src="https://avatars2.githubusercontent.com/u/2531591?v=4" width="100px;" alt=""/><br /><sub><b>Alvin Berthelot</b></sub></a><br /><a href="#financial-alvinberthelot" title="Financial">💵</a> <a href="#ideas-alvinberthelot" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=alvinberthelot" title="Code">💻</a></td>
    <td align="center"><a href="http://www.a-team.fr"><img src="https://avatars3.githubusercontent.com/u/9682519?v=4" width="100px;" alt=""/><br /><sub><b>guillaume charbonnier</b></sub></a><br /><a href="#financial-gcharbonnier" title="Financial">💵</a> <a href="#ideas-gcharbonnier" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.laumiere.net"><img src="https://avatars1.githubusercontent.com/u/4622095?v=4" width="100px;" alt=""/><br /><sub><b>Aurélien Laumière</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=alaumiere" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/fabienjuif"><img src="https://avatars0.githubusercontent.com/u/17828231?v=4" width="100px;" alt=""/><br /><sub><b>Fabien JUIF</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=fabienjuif" title="Code">💻</a> <a href="#ideas-fabienjuif" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/achorein"><img src="https://avatars1.githubusercontent.com/u/6529851?v=4" width="100px;" alt=""/><br /><sub><b>Anselme Chorein</b></sub></a><br /><a href="#financial-achorein" title="Financial">💵</a> <a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=achorein" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://wink-dev.com"><img src="https://avatars2.githubusercontent.com/u/7903123?v=4" width="100px;" alt=""/><br /><sub><b>Bastien THOMAS</b></sub></a><br /><a href="#financial-bastien-wink" title="Financial">💵</a> <a href="#eventOrganizing-bastien-wink" title="Event Organizing">📋</a></td>
    <td align="center"><a href="https://jocelyn.griselle.io"><img src="https://avatars2.githubusercontent.com/u/5202507?v=4" width="100px;" alt=""/><br /><sub><b>Jocelyn Griselle</b></sub></a><br /><a href="#financial-jocelyngriselle" title="Financial">💵</a> <a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=jocelyngriselle" title="Code">💻</a></td>
    <td align="center"><a href="http://tonio.ngyn.org"><img src="https://avatars2.githubusercontent.com/u/531694?v=4" width="100px;" alt=""/><br /><sub><b>Antoine Nguyen</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=tonioo" title="Code">💻</a></td>
    <td align="center"><a href="https://www.kezaweb.fr"><img src="https://avatars2.githubusercontent.com/u/9287634?v=4" width="100px;" alt=""/><br /><sub><b>Yoann Chocteau</b></sub></a><br /><a href="#eventOrganizing-Yoann-TYT" title="Event Organizing">📋</a></td>
    <td align="center"><a href="https://github.com/agnesmdev"><img src="https://avatars2.githubusercontent.com/u/61702409?v=4" width="100px;" alt=""/><br /><sub><b>Agnès Maury</b></sub></a><br /><a href="https://github.com/popcorn-nantes/popcorn-nantes/commits?author=agnesmdev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/epitre"><img src="https://avatars0.githubusercontent.com/u/1972431?v=4" width="100px;" alt=""/><br /><sub><b>CPdA</b></sub></a><br /><a href="#eventOrganizing-epitre" title="Event Organizing">📋</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


