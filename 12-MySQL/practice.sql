create user 'myschool'@'localhost' identified by '123qwe!@#';

grant all privileges on myschool.* to 'myschool'@'localhost';

mysql -umyschool -p