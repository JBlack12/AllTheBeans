FROM node:10

USER root
WORKDIR /root
COPY ./api .

RUN yarn

CMD ["yarn", "start"]