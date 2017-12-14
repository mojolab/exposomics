FROM node:8

ARG googleMapsApiKey
ENV googleMapsApiKey=$googleMapsApiKey

ARG publicUrl
ENV publicUrl=$publicUrl

RUN yarn run build

CMD yarn start
