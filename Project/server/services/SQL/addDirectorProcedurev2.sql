
CREATE OR REPLACE PROCEDURE public."adddirector2"(
	)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
		i integer;
	BEGIN
		for i IN 1..1000
        LOOP
     INSERT INTO public.film_director(director_id, film_id)
	VALUES (random_between(1,20), random_between(1,1000));
     END LOOP;
	END
$BODY$;
ALTER PROCEDURE public."adddirector2"()
    OWNER TO postgres;