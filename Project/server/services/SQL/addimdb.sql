DO $$
BEGIN
FOR r IN 1..1000 
	LOOP
	UPDATE public.film
	SET imdb= random_between(1,10)
	WHERE film_id = r;
	end loop;
end $$;