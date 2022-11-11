CREATE table if not exists session
(
 session_id int not null AUTO_INCREMENT,
 name varchar(100) not null,
 org_id int not null,
 tag varchar(100),
 code bigint not null,
 start_time varchar(12) not null,
 recurring tinyint not null,
 password varchar(500),
 day_of_week varchar(100),
 extra_info json,
 primary key(session_id)
 )
character set utf8;