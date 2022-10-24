# app-store-ratings
Ever had the need to fetch ratings for your IOS App using node? Tired of deducing the types returned by the AppStore API? Then ```app-store-ratings``` is what you're looking for!

# Description
Simple wrapper that let you fetch ratings for your IOS APP. Written in `Typescript`.

# Why

There is no well documented API that returns JSON objects for the IOS App ratings. There is an endpoint that returns XML or JSON. 
The API that returns XML contains more data than the one that returns JSON. Converting from XML to JSON on several
projects got a bit tedious. And voilà the package was born.

# Installation

## npm

```npm install app-store-ratings```

## yarn

```yarn add app-store-ratings```

# Usage
No extensive tutorials required. Learn by example.

# Examples

## Classic promise

```typescript

import { fetchRatings } from 'app-store-ratings';

function getRatings() {
    fetchRatings({ 
        projectId: 'XXX', // the IOS App projectId
        country: 'YYY' // Optional country if your app is available across many stores
    })
    .then(ratings => console.log(ratings));
}

```

## Async await

```typescript

import { fetchRatings } from 'app-store-ratings';

async function getRatings() {
    const ratings = await fetchRatings({ 
        projectId: 'XXX', // the IOS App projectId
        country: 'YYY' // Optional country if your app is available across many stores
    });
    console.log(ratings);
}

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