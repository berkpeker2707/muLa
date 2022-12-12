FROM node:alpine

ENV dbKEY=mongodb+srv://berk_muLa_user:6z9IQe8F1GnvpMmy@cluster0.1xbrw8j.mongodb.net/muLa_user?retryWrites=true&w=majority
ENV JWT_KEY=ijasdfarf9raueit0924ujr2WFDAW#$Rq43t43t4tafWFA$ET
ENV SENDINBLUE_API_KEY=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
ENV RESET_PASSWORD_KEY=accountpasswordreset00000
ENV CLIENT_URL=http://localhost:3000
ENV SERVER_URL=http://localhost:1000
ENV CLOUDINARY_CLOUD_NAME=mula-images
ENV CLOUDINARY_API_KEY=944279253834115
ENV CLOUDINARY_API_SECRET=x47NMEpUV-w4qFMKNEDUAcH34Gs

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# EXPOSE 1100

CMD ["sh", "-c", "npm run auth"]