# Back2Fest

Back2Fest est un projet comprenant une application mobile développée avec React Native et deux sites web. Ce document fournit les instructions pour lancer l'application mobile et les sites web.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)

- [npm](https://www.npmjs.com/)

- [Expo CLI](https://docs.expo.dev/get-started/installation/)

- [CocoaPods](https://cocoapods.org/) (pour les utilisateurs macOS)

## Installation de l'application mobile

L'application mobile est développée pour iOS. Suivez ces étapes pour la lancer :

1. Clonez le dépôt du projet :

    ```bash

    git clone https://github.com/Anafaure/Back2Fest.git
    cd Back2Fest/App

    ```

2. Installez les dépendances npm :

    ```bash

    npm install

    ```

3. Allez dans le dossier iOS et installez les dépendances CocoaPods :

    ```bash

    cd ios

    pod install

    cd ..

    ```

4. Démarrez l'application avec Expo :

    ```bash

    npx expo start

    ```

    Si vous rencontrez des problèmes, essayez de nettoyer le cache avec :

    ```bash

    npx expo start --clear

    ```

## Lancement des sites web

Les deux sites web se trouvent dans le répertoire `/Web`. Pour lancer l'un des sites, suivez ces étapes :

1. Accédez au dossier du site que vous souhaitez lancer :

    ```bash

    cd Web/Melodica
    ou
    cd Web/Echo

    ```

2. Démarrez le site :
   
Les deux sites étant en local, pour les démarrer ouvrez leurs page HTML avec Live Serveur. Vous pouvez en ouvrir un seul les deux sites web sont reliés, il vous suffira de cliquer sur le logo de l'autre site au niveau des logos partenaire.

Node.js — Run JavaScript Everywhere
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
## Support

Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.

---

Merci d'utiliser Back2Fest ! 🎉
