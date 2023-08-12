create table users (
    userid serial primary key,
    email varchar(255) not null,
    password varchar(255) not null
)

create table tasks (
    taskid serial primary key,
    userid INT references users(userid),
    taskname varchar(255),
    dateofcompletion date not null,
    status boolean default 'f' 
)