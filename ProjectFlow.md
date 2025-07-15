// prisma 


// auth
npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt  

npm i -D @types/passport-jwt @types/bcrypt

ref: 
1. https://docs.nestjs.com/recipes/passport#jwt-functionality
2. https://docs.nestjs.com/security/encryption-and-hashing#hashing
3. https://docs.nestjs.com/security/authentication#jwt-token
4. https://docs.nestjs.com/recipes/passport

Generating full CRUD resource
nest g resource user/user

to write dto.ts
 npm i --save class-validator class-transformer
 ref: https://docs.nestjs.com/pipes#class-validator
