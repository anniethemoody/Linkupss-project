CREATE table if not exists session
(
 session_id int not null AUTO_INCREMENT,
 name varchar(100) not null,
 org_id int not null,
 tag varchar(100),
 url varchar(500) not null,
 start_time timestamp not null default now(),
 invite_sent boolean,
 password varchar(100),
 extra_info json,
 primary key(session_id)
 )
character set utf8;