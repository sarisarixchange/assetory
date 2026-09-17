--
-- PostgreSQL database dump
--

\restrict NAReRpsd7pjqCN9cfJOEsJ4P2Ne6Q9bEYpTbn4wggDWFfdAeo3cnn2QSGzLCiGI

-- Dumped from database version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
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

--
-- Data for Name: collection_assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_assets (collection_id, asset_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
1	9
2	51
2	52
2	53
2	54
2	55
2	56
2	57
2	58
2	59
2	60
2	61
2	62
2	63
2	64
2	65
2	66
2	67
2	68
2	69
3	10
3	11
3	12
3	13
3	14
\.


--
-- Data for Name: event_assets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_assets (event_id, asset_id) FROM stdin;
1	93
1	94
1	95
2	89
2	90
2	91
2	92
\.


--
-- PostgreSQL database dump complete
--

\unrestrict NAReRpsd7pjqCN9cfJOEsJ4P2Ne6Q9bEYpTbn4wggDWFfdAeo3cnn2QSGzLCiGI

