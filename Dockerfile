FROM node:7.10-alpine

RUN mkdir /tour-of-heroes
ADD ./ /tour-of-heroes
WORKDIR /tour-of-heroes

RUN if [ -d dist ]; then \
      rm -r dist; \
    fi

RUN if [ -d node_modules ]; then \
      rm -r node_modules; \
    fi

RUN npm install
RUN npm run build:prod

EXPOSE 3080

CMD ["npm", "run", "server:prod"]
