# ใช้ Node.js version 16
FROM node:16

# ตั้ง working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# รันคำสั่งเริ่มต้น
CMD ["npm", "run", "start:dev"]
