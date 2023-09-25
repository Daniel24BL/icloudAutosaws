FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 3030
EXPOSE 3030
ENTRYPOINT ["npm", "start"]