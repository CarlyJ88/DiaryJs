CREATE TABLE categories(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL, 
  colour_code TEXT NOT NULL
);

insert into categories values (1,'CSS', 'pink');
insert into categories values (2,'Design Patterns', 'red');
insert into categories values (3,'Clean Code', 'blue');

alter table entries add column category_id INTEGER;

update entries as e set category_id = (select id from categories as c where c.name = e.category);

alter table entries ALTER column category_id SET not null;
ALTER TABLE entries
    ADD CONSTRAINT fk_category_id__categories_id FOREIGN KEY (category_id) REFERENCES categories (id);

alter table entries drop column category;