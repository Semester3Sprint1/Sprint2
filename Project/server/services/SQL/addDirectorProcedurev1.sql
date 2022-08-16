
CREATE OR REPLACE PROCEDURE public."adddirector"(
	)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
		i integer;
	BEGIN
		for i IN 1..1000
        LOOP
     INSERT INTO public.film_director(director_id, film_id)
	VALUES (random_between(1,20), i);
     END LOOP;
	END
$BODY$;
ALTER PROCEDURE public."adddirector"()
    OWNER TO postgres;