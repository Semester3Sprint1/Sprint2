CREATE TABLE public.writer
(
    writer_id serial NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    PRIMARY KEY (writer_id)
);

ALTER TABLE IF EXISTS public.writer
    OWNER to postgres;