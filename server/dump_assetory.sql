--
-- PostgreSQL database dump
--

\restrict i081VaaFKzihOcJuMnKQIqPnSWDzcXJtSHp1VQUAem4M4H2gfHCjF2my02bomNd

-- Dumped from database version 13.23
-- Dumped by pg_dump version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_artist_id_fkey;
DROP INDEX public.idx_assets_visible;
DROP INDEX public.idx_assets_artist_id;
DROP INDEX public.idx_assets_active;
DROP INDEX public.idx_artists_slug;
DROP INDEX public.idx_artists_active;
ALTER TABLE ONLY public.events DROP CONSTRAINT events_slug_key;
ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_slug_key;
ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_pkey;
ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.assets ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.events_id_seq;
DROP TABLE public.events;
DROP SEQUENCE public.assets_id_seq;
DROP TABLE public.assets;
DROP TABLE public.artists;
DROP EXTENSION pgcrypto;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: sarisari_db
--

CREATE TABLE public.artists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    artist_name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    thumbnail text,
    banner_image text,
    cards jsonb DEFAULT '[]'::jsonb,
    is_active boolean DEFAULT true,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.artists OWNER TO sarisari_db;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: sarisari_db
--

CREATE TABLE public.assets (
    id integer NOT NULL,
    artist_id uuid,
    asset_name character varying(255) NOT NULL,
    creator_name character varying(255),
    keywords text,
    email character varying(255),
    story text,
    asset_type character varying(50) DEFAULT '3D Model'::character varying,
    creation_method character varying(100),
    copyright character varying(100),
    acknowledgement text,
    files jsonb DEFAULT '[]'::jsonb,
    representative_image text,
    status character varying(50) DEFAULT 'approved'::character varying,
    is_active boolean DEFAULT true,
    is_visible boolean DEFAULT true,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.assets OWNER TO sarisari_db;

--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: sarisari_db
--

CREATE SEQUENCE public.assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assets_id_seq OWNER TO sarisari_db;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sarisari_db
--

ALTER SEQUENCE public.assets_id_seq OWNED BY public.assets.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: sarisari_db
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    thumbnail character varying(255) DEFAULT 'events/placeholder.png'::character varying,
    banner_image character varying(255) DEFAULT 'events/placeholder.png'::character varying,
    cards jsonb DEFAULT '[]'::jsonb,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO sarisari_db;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: sarisari_db
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO sarisari_db;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sarisari_db
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: assets id; Type: DEFAULT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.assets ALTER COLUMN id SET DEFAULT nextval('public.assets_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: sarisari_db
--

COPY public.artists (id, artist_name, slug, thumbnail, banner_image, cards, is_active, deleted_at, created_at) FROM stdin;
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: sarisari_db
--

COPY public.assets (id, artist_id, asset_name, creator_name, keywords, email, story, asset_type, creation_method, copyright, acknowledgement, files, representative_image, status, is_active, is_visible, deleted_at, created_at) FROM stdin;
1	\N	My asset	Jessica	3D, scanned; interesting object	navarrol@mcmaster.ca	s	3D Model	s	CC BY 4.0 DEED	x	["1783118813844-2029/airplane.png"]	1783118813844-2029/airplane.png	pending	t	t	\N	2026-07-03 18:46:53.952044
2	\N	test - no vpn	Luis Navarro	3D, scanned; interesting object	luisnavarrodelangel@gmail.com	a	3D Model	a	CC BY 4.0 DEED	a	["1783434928283-990/airplane.png"]	1783434928283-990/airplane.png	pending	t	t	\N	2026-07-07 10:35:28.368478
3	\N	My asset	Jessica	3D, scanned; interesting object	navarrol@mcmaster.ca	test	3D Model	r	CC BY 4.0 DEED	r	["1783696531175-3630/airplane.png"]	1783696531175-3630/airplane.png	pending	t	t	\N	2026-07-10 11:15:31.226707
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: sarisari_db
--

COPY public.events (id, title, slug, thumbnail, banner_image, cards, is_active, created_at) FROM stdin;
\.


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sarisari_db
--

SELECT pg_catalog.setval('public.assets_id_seq', 3, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sarisari_db
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: artists artists_slug_key; Type: CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_slug_key UNIQUE (slug);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: events events_slug_key; Type: CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_slug_key UNIQUE (slug);


--
-- Name: idx_artists_active; Type: INDEX; Schema: public; Owner: sarisari_db
--

CREATE INDEX idx_artists_active ON public.artists USING btree (is_active);


--
-- Name: idx_artists_slug; Type: INDEX; Schema: public; Owner: sarisari_db
--

CREATE INDEX idx_artists_slug ON public.artists USING btree (slug);


--
-- Name: idx_assets_active; Type: INDEX; Schema: public; Owner: sarisari_db
--

CREATE INDEX idx_assets_active ON public.assets USING btree (is_active);


--
-- Name: idx_assets_artist_id; Type: INDEX; Schema: public; Owner: sarisari_db
--

CREATE INDEX idx_assets_artist_id ON public.assets USING btree (artist_id);


--
-- Name: idx_assets_visible; Type: INDEX; Schema: public; Owner: sarisari_db
--

CREATE INDEX idx_assets_visible ON public.assets USING btree (is_visible);


--
-- Name: assets assets_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sarisari_db
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict i081VaaFKzihOcJuMnKQIqPnSWDzcXJtSHp1VQUAem4M4H2gfHCjF2my02bomNd

