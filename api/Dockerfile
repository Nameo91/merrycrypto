# Specify Node Version and Image
# Name Image development 
FROM node:18 AS development

# Specify Working directory inside container
WORKDIR /merrycrypto/src/app

# Copy yarn.lock and package.jsonfrom host to inside container working directory
COPY ["package.json", "yarn.lock*", "./"]

# Install deps inside container
RUN yarn install

#Bundle app source 
COPY . .

RUN yarn run build
EXPOSE 3000

###################
# Production ENV

# Build another image named production
FROM node:19 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /merrycrypto/src/app

COPY --from=development /merrycrypto/src/app/ .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]