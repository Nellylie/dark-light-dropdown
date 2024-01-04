
# Composant DropDown

Un composant dropdown permettant de selectionner un élement dans une liste d'objets ou une liste de chaines de caractères pour les applications React, avec la possibilité de choisir entre un thème clair ou sombre.

## Installation

Ajoutez le composant DropDown à votre projet, Assurez-vous d'avoir les dépendances suivantes dans votre projet :

- `react` et `react-dom`

## Utilisation

Voici comment vous pouvez utiliser le composant `DropDown` dans votre application :

```jsx
import React from 'react';
import DropDown from 'dark-light-dropdown'; 

function App(){
  const options = [
    { name: 'titre 1', abbreviation: 'O1' },
    { name: 'titre 2', abbreviation: 'O2' },
  ];

  const handleChange = (selected) => {
    console.log(selected); // récupere la valeur selectionnée, la valeur pourra être stockée avec useState par ex
  };

  return (
    <div>
      <DropDown
        label="Sélectionnez une option"
        name="uniqueName"
        id="uniqueId"
        options={options}
        onChange={handleChange}
        theme="dark" // ou "light"
      />
    </div>
  );
};

export default App;
```

## Props

- `label` (string): Texte du label pour le dropdown.
- `name` (string): Le nom du dropdown, utilisé lors de la soumission du formulaire.
- `id` (string): Identifiant unique pour le dropdown.
- `options` (array): Tableau des options pour le dropdown. Chaque option peut être une simple chaîne de caractères ou un objet avec les propriétés `name` et `abbreviation`.
- `onChange` (function): Fonction de rappel qui est appelée lorsque l'option sélectionnée change. Elle reçoit la nouvelle valeur comme argument.
- `theme` (string): Thème du dropdown. Accepte "light" ou "dark".

## Style

Le composant repose sur `dropdownstyle.css` pour le style. Assurez-vous d'importer la feuille de style dans votre application ou écrivez vos propres styles selon vos besoins.

### Liste des classes css

```css
.selector-container {
  /* Styles du conteneur */
}

.selector-value {

}

.selector-option {
}

.selector-light {

}

.selector-dark {

}
```

## Licence

Ce projet est sous licence ISC.
