FROM node:18

# Create app directory
WORKDIR /opt/ocm

RUN npm install -g npm
RUN npm install express accept-language-parser @fragaria/address-formatter argparse
# unsure why we need this
RUN npm install glob
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 54445

ENTRYPOINT [ "/opt/ocm/map/nodejs-campmap.js" ]

