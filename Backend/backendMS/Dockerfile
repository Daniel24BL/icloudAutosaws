FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 3040
EXPOSE 3040
ENTRYPOINT ["npm", "start"]