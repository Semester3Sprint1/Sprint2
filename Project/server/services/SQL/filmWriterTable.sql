CREATE TABLE public.film_writer
(
    film_id integer NOT NULL,
    writer_id integer NOT NULL,
    last_updated time without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (film_id, writer_id),
    CONSTRAINT "writerFilm_fk" FOREIGN KEY (writer_id)
        REFERENCES public.writer (writer_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "filmWriter_fk" FOREIGN KEY (film_id)
        REFERENCES public.film (film_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.film_writer
    OWNER to postgres;