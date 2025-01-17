# Etapa de construção (build)
FROM node:20 AS build

WORKDIR /app

# Copiar arquivos de dependências e instalar
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa de execução (run)
FROM node:20

WORKDIR /app

# Copiar as dependências já instaladas da etapa de construção
COPY --from=build /app /app

# Expõe a porta em que a aplicação vai rodar
EXPOSE 3002

# Comando para rodar o aplicativo
CMD ["npm", "run", "dev"]
