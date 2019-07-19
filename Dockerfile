# The instructions for the first stage
FROM keymetrics/pm2:8-alpine as builder

RUN apk update
# RUN apt-get update && apt-get install -y yarn python g++ nano curl
# Install all build dependencies
# Add bash for debugging purposes
# RUN apt-get update \
#     && apt-get install -y gcc \
#         wget \
#         git 
COPY package*.json ./

#RUN npm install
RUN npm ci --only=production

# RUN npm install --silent --production \
#    && apk del build-dependencies \
#    && rm -rf /var/cache/apk/*

# The instructions for second stage
FROM keymetrics/pm2:8-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

ENV NODE_ENV=production

COPY . .

# RUN chmod 775 /downloads

CMD [ "npm", "run", "pro" ]