# DO NOT EDIT -- Recommended to modify the original source of this Dockerfile
# Orignal Source:  https://gitlab.com/scottfred/angular-bootstrap

# Usage: Use GIT to pull Dockerfile into your newly created Angular Project
#    git archive --remote=git@gitlab.com:scottfred/angular-bootstrap HEAD | tar -x

# Rather than relying on Node.js:latest, be intentional
# Review versions of Angular are compatible with which versions of Node.js
# Angular and Node.js Versions: https://angular.io/guide/versions
# Node.js Docker Image tags: https://hub.docker.com/_/node/tags
FROM node:18.16.1-bullseye AS development
# Agnular 16.1.1 fails with Node.js:20.3.1
# FROM node:20.3.1-bullseye

# Try to install a newer version of npm-cli
RUN npm install -g npm@latest

# Rather than relying on Angular:latest, be intentional
# Look online to find the latest Angular-CLI version
#  https://www.npmjs.com/package/@angular/cli
RUN npm install -g @angular/cli@16.1.1

USER node

# ---- Angular build/package for production
FROM node:18.16.1-bullseye AS builder

WORKDIR /app

RUN npm install -g npm@latest
RUN npm install -g @angular/cli@16.1.1

COPY ./src /app/src/
COPY ./*.json /app/

# Minify Angular App for production deployment
RUN npm install
RUN ng build --configuration production

# ---- Docker Nginx Production image to serve Angular app
# TODO: consider moving Nginx to smaller Alpine image
FROM nginx:1.25.1 AS production

WORKDIR /app

# If we need a more complex Nginx configuration
# COPY ./nginx.conf /etc/nginx/sites-enabled/

# See https://hub.docker.com/_/nginx more more information 
#  about using Nginx Docker Container
COPY --from=builder /app/dist/housing/ /usr/share/nginx/html

# How to build:
# docker build --target production -t housing:production

# Run from command line with: 
# docker run --rm  -p 8080:80 housing:production nginx -g 'daemon off;'
# URL: localhost:8080

# https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-docker/
# OR
# with the CMD line below, run as:
# docker run --rm -p 8080:80 housing:production
# URL: localhost:8080

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]

