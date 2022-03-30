alter table categories add user_id TEXT;
alter table entries add user_id TEXT;

alter table categories ALTER column user_id SET not null; -- still needs to be added

alter table entries ALTER column user_id SET not null; -- still needs to be added


-- update categories as c set user_id = category_id = (select id from categories as c where c.name = e.category);
-- update entries as e set category_id = (select id from categories as c where c.name = e.category);