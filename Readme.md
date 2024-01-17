# todo-list-app
ระบบ todo list ที่สามารถเพื่ม ลบ อ่าน เขียนและแก้ไขได้โดยใช้ Angular Framework และ Backend อย่าง ExpressJS ที่ใช้ภาษาอย่าง TypeScript และ Database คือ MongoDB

![image]('https://img5.pic.in.th/file/secure-sv1/main56aad7f7888d6872.png')


## Tech Stack
### Frontend
- **Angular** ใช้ในการพัฒนาเว็บไซต์ในส่วนของหน้าบ้าน
- **Angular TailwindCSS** ใช้ในการเพิ่ม TailwindCSS ใน Angular
- **Tailwind UI Component ( DaisyUI )** ใช้ในการเพิ่ม Component UI สำเร็จรูปใน TailwindCSS

### Backend
- **ExpressJS (TypeScript)** : ใช้ในการพัฒนา API สำหรับจัดการข้อมูลของระบบตั้งแต่การเก็บข้อมูลงใน Database ไปจนถึงการส่งข้อมูลระหว่างหลังบ้านและหน้าบ้านอย่างไร้รอยต่อ
- **MongoDB** : ใช้ในการเก็บข้อมูลของระบบ

## Deployment
- **Docker Compose** ใช้ในการ Deploy ระบบโดยใช้ Docker และ Docker Compose ในการสร้าง Container ของระบบ

## Testing Automation
- **Cypress** ใช้ในการทดสอบทั้ง E2E และ Unit Test ของระบบ
- **Postman** ใช้ในการทดสอบ API ของระบบ
### การทดสอบระบบด้วย Cypress
```
# เข้าไปในโฟลเดอร์ของระบบ
cd .\my-angular-project\

# ติดตั้ง dependencies ของระบบ
npm install

# ทดสอบระบบ
npx cypress open
```
จากนั้นสามารถเลือกทดสอบได้ทั้ง E2E และ Unit Test ของระบบ

### การทดสอบระบบด้วย Postman
ไฟล์ของ Postman สามารถนำไปใช้งานได้ทันทีโดยเปิดไฟล์ที่อยู่ใน 
`./my-express-api/api-test/todos.postman_collection.json`

## การติดตั้งระบบ
### Docker Compose

เปิด Container ของ Angular ด้วย Docker Compose
```
cd .\my-angular-project\

docker-compose up --build
```

เปิด Container ของ MongoDB และ ExpressJS ด้วย Docker Compose
```
cd .\my-express-api\

docker-compose up --build
```

![image]('https://img2.pic.in.th/pic/Docker.png')

