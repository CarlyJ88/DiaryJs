alter table categories add user_id TEXT;
alter table entries add user_id TEXT;

alter table entries ALTER column user_id SET not null;