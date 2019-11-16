#
# Usage
#
# docker build --pull -t farm_app_image
# docker run --name farm_app_container --rm -it -p 8000:80 farm_app_image
#
# Then visit localhost:8000
#

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
ARG NODE_OPTIONS
ARG GENERATE_SOURCEMAP
WORKDIR /app

# prevent 'Warning: apt-key output should not be parsed (stdout is not a terminal)'
ENV ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# install NodeJS
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

# check the maximim memory size of v8
RUN node -e 'console.log(v8.getHeapStatistics().total_available_size / 1024 / 1024)'

# copy csproj and restore as distinct layers
COPY *.sln .
COPY FarmLandLasanga/*.csproj ./FarmLandLasanga/
RUN dotnet restore

# copy everything else and build app
COPY FarmLandLasanga/. ./FarmLandLasanga/
WORKDIR /app/FarmLandLasanga
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/FarmLandLasanga/out ./
ENTRYPOINT ["dotnet", "FarmLandLasanga.dll"]
     
