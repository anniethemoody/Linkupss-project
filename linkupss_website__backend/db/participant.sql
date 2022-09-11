CREATE table if not exists participant
(
 participant_id int not null AUTO_INCREMENT,
 org_id int not null,
 name varchar(100) not null,
 extra_info json,
 primary key(participant_id)
 )
character set utf8;