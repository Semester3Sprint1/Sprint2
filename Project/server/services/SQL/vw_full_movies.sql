CREATE VIEW public.vw_full_movies
 AS
SELECT f.title as movie,

a.actor_id,
c.category_id as genre_id,
d.director_id,
f.film_id,
w.writer_id,
f.description as plot,
f.fulltext, 
f.release_year, 
f.length, 
f.rating as rated, 
l.name as language, 
a.first_name || ' ' ||a.last_name as actor,
c.name as genre,
d.first_name || ' ' ||d.last_name as director,
w.first_name || ' ' ||w.last_name as writer,
f.poster,
f.imdb
FROM film f
JOIN film_category fc USING(film_id)
JOIN category c USING(category_id)
JOIN language l USING(language_id)
JOIN film_actor fa USING(film_id)
JOIN actor a USING(actor_id)
JOIN film_director fd USING(film_id)
JOIN director d USING(director_id)
JOIN film_writer fw USING(film_id)
JOIN writer w USING(writer_id)
WHERE c.type = 'generic';

ALTER TABLE public.vw_full_movies
    OWNER TO postgres;