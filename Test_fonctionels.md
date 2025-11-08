Tests Fonctionnels – Projet ZEK Sport

Ce document regroupe les principaux tests fonctionnels permettant de vérifier le bon fonctionnement du site et de l’espace administrateur.



## TF01 – Ajouter un produit (Admin)

Objectif  
Vérifier qu’un utilisateur admin peut ajouter un nouveau produit depuis la page Gestion des produits.

Préconditions  
- L’utilisateur est connecté avec le rôle admin.  
- La page Gestion des produits est accessible.

Étapes  
1. Accéder à l’espace admin.  
2. Aller dans Gestion des produits.  
3. Cliquer sur Ajouter un produit.  
4. Remplir le formulaire avec des données valides.  
5. Cliquer sur Enregistrer.

Résultat attendu  
Le produit est enregistré en base, apparait dans la liste des produits, et un message de confirmation s’affiche.

Résultat obtenu  
Conforme 

Priorité  
Haute

---

## TF02 – Connexion d’un utilisateur

Objectif  
Vérifier qu’un utilisateur peut se connecter avec un email et un mot de passe valides.

Préconditions  
- L’utilisateur possède un compte enregistré en base.  
- Le formulaire de connexion est accessible.

Étapes  
1. Accéder à la page de connexion.  
2. Saisir un email valide.  
3. Saisir le mot de passe associé.  
4. Cliquer sur Se connecter.

Résultat attendu  
L’utilisateur est redirigé vers son espace ou la page d’accueil, et son état connecté est actif.

Résultat obtenu  
Conforme 

Priorité  
Haute

---

## TF03 – Déconnexion d’un utilisateur

Objectif  
Vérifier qu’un utilisateur connecté peut se déconnecter correctement.

Préconditions  
- L’utilisateur est connecté.  
- Le bouton ou lien Déconnexion est visible sur la navbarre ou dashboard.

Étapes    
1. Cliquer sur Déconnexion.  

Résultat attendu  
L’utilisateur est déconnecté et redirigé vers la page d’accueil ou la page de connexion.

Résultat obtenu  
Conforme 

Priorité  
Moyenne

---
