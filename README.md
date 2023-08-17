# portal-de-necesidades-grupo-e

**API Details**
>**GET** /services
**obtain the services availables**

> **POST /newUser** <br><br>
fields : **nombre**(required), **username**(required), **biografia**, **email**(required), **pwd**(required) 

>**POST /login**  <br><br>
fields: **email** , **pwd** <br>
output: **token**

>**POST** /addservice <br><br>
**headers**: "Authorization": token (required) <br>
formdata: 'image': file (no required)<br>
body: **title** , **description** (required)

>**POST** /newcomment <br><br>
**headers**: "Authorization": token (required) <br>
formdata: 'fichero': file (no required)<br>
fields : {service_id , comment}

>**POST** /modifyUser <br><br>
**headers**: "Authorization": token (required) <br>
formdata: 'avatar': image-file (no required)<br>
fields : **nombre**(required), **username**(required), **biografia**(required) 

>**POST** /modifyPwd/:id <br><br>
**headers**: "Authorization": token (required) <br>
fields: **pwdVieja** , **pwdNueva**

>**POST** /deleteuser/:id <br><br>
**headers**: "Authorization": token (required) <br>
fields: **pwdVieja** , **pwdNueva**

