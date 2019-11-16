# MyLocal.Farm

The source code for the mylocal.farm application.

# Development

## Software Development Lifecycle

We're in a throwaway prototyping phase.

1. Commit to throwing it away (not evolving it).
2. Work as fast as possible... barf on the page.
3. Know that the rebuild will take at least 10x as long as the prototype.

## Branching and Merging

We're doing trunk based development. Commit and push to master daily (or more frequently).

## Running the App

Instal .NET Core and NodeJS. Then...

```
git clone git@github.com:mylocalfarm/mylocalfarm.git
cd FarmLandLasagna
dotnet run
```

## Running from Docker

```
docker build --pull -t farm-land-lasanga .
docker run --name farm --rm -it -p 8000:80 farm-land-lasanga
```

