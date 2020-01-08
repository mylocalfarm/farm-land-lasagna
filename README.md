# MyLocal.Farm

The source code for the mylocal.farm application.

# Development

## Software Development Lifecycle

We're in a throwaway prototyping phase.

1. Commit to throwing it away (not evolving it).
2. Work as fast as possible... barf on the page.
3. Know that the rebuild will take at least 10x as long as the prototype.

## Project management

https://github.com/emptylab/files/blob/master/who_is_working_on_what.csv

## Branching and Merging

We're doing trunk based development. Commit and push to master daily (or more frequently).

## Running the App

Instal .NET Core and NodeJS. Then...

```
git clone git@github.com:mylocalfarm/mylocalfarm.git
cd FarmLandLasagna
dotnet watch run --environment "Development"
```

## Running from Docker

See the [Dockerfile](Dockerfile) for details.

# Continuous Deployment

We are using GoCD. 

It hosted at http://165.22.235.94:8153/go/pipelines#!/ and deploying to http://138.197.140.250/
