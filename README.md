# app-store-ratings
Ever had the need to fetch ratings for your IOS App using node? Tired of deducing the types returned by the AppStore API? Then ```app-store-ratings``` is what you're looking for!

# Description
Simple wrapper that let's you fetch ratings for your IOS APP. Written in Typescript.

# Why
There is no well documented API that returns JSON objects for the IOS App ratings. There is an endpoint that returns XML or JSON. 
The API that returns XML contains more data than the one that returns JSON. Converting from XML to JSON on several
projects got a bit tedious. And voila the package was born.

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
.then(ratings => console.log(ratings))

```

# Entry type

```typescript

export interface IAppStoreRating {
    id: string;
    title: string;
    updatedAt: string;
    content: string;
    rating: number;
    voteCount: number;
    voteSum: number;
    version: string;
    author: {
        name: string;
        uri: string;
    };
}

```