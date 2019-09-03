# Stage 1: build the snippets-client
FROM node:lts-buster as build

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install some global npm packages
RUN npm install -g typescript @angular/cli

# Copy just the npm package files.  Prevents re-installing
# node_modules unless requirements change.
COPY package.json package-lock.json ./
RUN npm install && mkdir /src && mv ./node_modules /src

# Copy the current host directory files to /src
COPY . /src

# Set the working directory to /src then build the app.
WORKDIR /src
RUN ng build --prod --output-path=dist

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=

# State 2: Setup and run server
FROM nginx:1.17-alpine
# Use our config file
COPY nginx/default.conf /etc/nginx/conf.d/

# Delete the existing sample html files the default
# conf file uses as web root
RUN rm -rf /usr/share/nginx/html/*

# Copy the files we built in stage 1 to the html directory.
COPY --from=build /src/dist /usr/share/nginx/html

# Run the server.
CMD ["nginx", "-g", "daemon off;"]
