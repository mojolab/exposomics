FROM 828894711537.dkr.ecr.us-west-1.amazonaws.com/node:onbuild

ARG googleMapsApiKey
ENV googleMapsApiKey=$googleMapsApiKey

ARG publicUrl
ENV publicUrl=$publicUrl

RUN yarn run build

CMD yarn start
