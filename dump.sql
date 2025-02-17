--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: lumaachallenge
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(32),
    description character varying(128),
    iscomplete boolean,
    userid integer
);


ALTER TABLE public.tasks OWNER TO lumaachallenge;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: lumaachallenge
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO lumaachallenge;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lumaachallenge
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: lumaachallenge
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(32),
    password text
);


ALTER TABLE public.users OWNER TO lumaachallenge;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: lumaachallenge
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO lumaachallenge;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lumaachallenge
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: lumaachallenge
--

COPY public.tasks (id, title, description, iscomplete, userid) FROM stdin;
9	Don't Do Laundry	don't	t	18
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lumaachallenge
--

COPY public.users (id, username, password) FROM stdin;
18	Applejack	$2b$10$tnRstPlLrfqxReENJiBJ6.5LQBz7Stmmz9RNCttgrYwwGJc6NKmbS
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lumaachallenge
--

SELECT pg_catalog.setval('public.tasks_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lumaachallenge
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: tasks tasks_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lumaachallenge
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

