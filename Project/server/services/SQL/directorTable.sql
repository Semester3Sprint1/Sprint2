CREATE TABLE public.director
(
    director_id serial NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    PRIMARY KEY (director_id)
);

ALTER TABLE IF EXISTS public.director
    OWNER to postgres;