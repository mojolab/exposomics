FROM node:8-onbuild

ARG googleMapsApiKey
ENV googleMapsApiKey=$googleMapsApiKey

ARG publicUrl
ENV publicUrl=$publicUrl

RUN yarn run build

CMD yarn start
