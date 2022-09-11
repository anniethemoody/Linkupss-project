CREATE table if not exists organization
(
 org_id int not null AUTO_INCREMENT,
 name varchar(100) not null,
 address varchar(200) not null,
 org_code varchar(100) not null,
 extra_info json,
 primary key(org_id)
 )
character set utf8;