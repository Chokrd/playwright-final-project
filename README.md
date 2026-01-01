# playwright-final-project

# Projet Final d’Automatisation E2E – SauceDemo

## 1. Présentation du projet

Ce projet a pour objectif de mettre en œuvre une **automatisation complète de tests End-to-End (E2E)** sur une application web de démonstration, en appliquant les **bonnes pratiques de test logiciel**.

Le site choisi est SauceDemo :  
https://www.saucedemo.com/

---

## 2. Objectifs pédagogiques

Ce projet vise à démontrer la maîtrise des éléments suivants :

- Automatisation de parcours utilisateurs   
- Structuration d’un projet de tests maintenable et évolutif  
- Utilisation du **Page Object Model (POM)**  
- Écriture de scénarios **BDD en Gherkin**  
- Tests de robustesse via **mocking réseau**  
- Mise en œuvre de **Playwright** dans un contexte réel  

---

## 3. Scénarios automatisés

La suite de tests couvre à la fois des **cas fonctionnels classiques** et des **situations dégradées côté serveur**.

### 3.1 Authentification
- Connexion avec un compte valide (`standard_user`)

### 3.2 Parcours d’achat complet
- Ajout de plusieurs articles au panier
- Vérification du contenu du panier
- Remplissage du formulaire de livraison (Checkout)
- Validation finale de la commande
- Vérification de la confirmation d’achat

### 3.3 Gestion du panier
- Suppression d’articles depuis le panier
- Vérification de la mise à jour des quantités et du total

### 3.4 Simulation d’erreur serveur (Mocking réseau)
- Interception des requêtes HTTP vers l’API d’inventaire
- Simulation d’une erreur **HTTP 503 – Service Unavailable**
- Vérification du comportement de l’application en cas de panne serveur
- Validation de la résilience de l’interface utilisateur

---

## 4. Architecture technique

Le projet est structuré selon des standards proches de ceux utilisés en environnement professionnel.

### 4.1 Page Object Model (POM)

Chaque page de l’application dispose de sa propre classe dédiée :

- `LoginPage`
- `ProductsPage`
- `CheckoutPage`

Cela permet :
- Une séparation claire entre logique métier et sélecteurs
- Une meilleure lisibilité du code
- Une maintenance facilitée en cas d’évolution de l’interface

### 4.2 BDD – Gherkin / Cucumber
- Scénarios rédigés en langage **Gherkin**
- Lisibilité métier accrue
- Facilitation de la collaboration entre profils techniques et non techniques

### 4.3 Playwright
- Exécution des tests End-to-End
- Gestion des navigateurs
- Synchronisation automatique
- Interception et modification des requêtes réseau
- Génération de rapports et de traces en cas d’échec

---

## 5. Installation et exécution

### 5.1 Prérequis
- Node.js (version recommandée ≥ 18)
- npm

### 5.2 Installation des dépendances
- npm install

### 5.3 Exécution des tests Playwright

Lance la suite de tests basée sur le modèle Page Object :

- npm run test

### 5.4 Exécution des scénarios BDD (Cucumber)

Lance les tests définis dans les fichiers .feature :

- npm run bdd

### 5.5 Génération de code (Playwright Codegen)

Permet d’enregistrer de nouveaux parcours utilisateurs ou de vérifier des sélecteurs :

- npm run codegen

## 6. Difficultés rencontrées et solutions apportées

### 6.1 Interception réseau sur une Single Page Application (SPA)

L’application SauceDemo étant une **Single Page Application**, certaines actions de navigation interne ne déclenchent pas systématiquement de nouvelles requêtes HTTP vers le serveur. Cela rend l’interception réseau plus complexe dans le cadre de tests de type mocking.

**Solution mise en œuvre :**
- Forcer certaines navigations à l’aide de `page.goto()`
- Faire en sorte qu’une requête HTTP soit bien envoyée pour que Playwright puisse l’intercepter et la simuler (mocking).
---

### 6.2 Gestion des timeouts

Des variations de temps de réponse ont été observées selon le navigateur et le contexte d’exécution, pouvant entraîner des échecs intermittents des tests.

**Solution mise en œuvre :**
- Augmentation du timeout global avec `setDefaultTimeout(60000)`
- Amélioration de la stabilité et de la fiabilité globale des exécutions de tests

---

## 7. Conclusion

Ce projet met en évidence :

- Une approche réaliste et professionnelle de l’automatisation de tests End-to-End  
- L’application concrète de bonnes pratiques du test logiciel  
- La capacité à couvrir à la fois des parcours fonctionnels standards et des scénarios de défaillance côté serveur  
