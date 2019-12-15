# app-store-ratings
Ever had the need to fetch ratings for your IOS App using node? Tired of deducing the types returned by the AppStore API? Then app-store-ratings is what you're looking for!

# Description
Simple wrapper that let's you fetch ratings for your IOS APP. Written in Typescript.

# Why
There is no exposed API that returns JSON objects of the IOS App ratings. Had to rely on converting from xml to json on several
projects and create a package for it.

# Installation
Simplest way to install app-store-ratings is to use npm, just ```npm install app-store-ratings``` which will download app-store-ratings and all dependencies.

# Usage
No extensive tutorials required. Learn by example.

# Examples

```typescript

import {fetchRatings} from 'app-store-ratings';

fetchRatings({ 
    projectId: 'XXX', // the IOS App projectId
    country: 'YYY' // Optional country if your app is available across many stores
})
.then(entries => console.log(entries))

```
