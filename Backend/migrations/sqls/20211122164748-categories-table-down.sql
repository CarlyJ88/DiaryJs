alter table entries add column IF NOT EXISTS category Text;

UPDATE entries as e set category = (select name from categories as c where c.id = e.category_id);

alter table entries ALTER column category SET not null;

alter table entries
  DROP CONSTRAINT fk_category_id__categories_id;

alter table entries drop column category_id;

drop table categories;
