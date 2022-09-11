CREATE table if not exists  admin
(
 admin_id integer not null AUTO_INCREMENT,
 org_id int,
 name varchar(100) not null,
 user_name varchar(100) not null,
 user_password varchar(200) not null,
 extra_info json,
 primary key(admin_id)
 )
character set utf8;