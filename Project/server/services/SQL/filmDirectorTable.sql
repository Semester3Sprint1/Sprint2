CREATE TABLE public.film_director
(
    director_id integer NOT NULL,
    film_id integer NOT NULL,
    last_updated time without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (director_id, film_id),
    CONSTRAINT "filmDir_fk" FOREIGN KEY (film_id)
        REFERENCES public.film (film_id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT "DirectorFilm_fk" FOREIGN KEY (director_id)
        REFERENCES public.director (director_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

ALTER TABLE IF EXISTS public.film_director
    OWNER to postgres;