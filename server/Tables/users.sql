create table USERS (
    USER_ID int not null AUTO_INCREMENT primary key,
    USERNAME varchar(200) not null,
    FIRST_NAME varchar(200) not null default 'User',
    LAST_NAME varchar(200) not null,
    CURRENCY_AVAILABLE int not null default 0,
    LAST_MODIFIED_DATE timestamp default now(),
    INSERT_DATE timestamp default now()
);