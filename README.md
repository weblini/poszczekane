# Poszczekane.pl

Welcome to the repository for [poszczekane.pl](https://wwww.poszczekane.pl) – the premier dog event website!

This repository contains all the files powering the website, which serves as a connection hub for dog event organizers, including breed clubs, sport clubs, and individuals, with dog owners and enthusiasts.

## Core Technologies

This project is a cutting-edge **NextJS** website utilizing the latest React features. It incorporates a mix of **React Server Components**, **SSR** and purely client-rendered components, strategically using the new **Server Actions** to handle mutations on the NodeJS backend.

User authentication is seamlessly implemented through **Supabase** with cookies, enabling authenticated actions on both the front and backend.

## Functionality Highlights

To deliver a captivating experience for all users, we've implemented the following features:

### 1. Interactive Event Map

Users can explore our interactive WebGL vector-based map showcasing upcoming events with precision. The map utilizes **clustering** for a clean visual experience. Event locations are stored in the **PostgreSQL** database as both a string and a geographical point, enhancing user convenience.

Organizers benefit from a form powered by a **geocoding API** that matches entered addresses to exact geographical locations. They can further fine-tune the location by dragging a marker on the displayed map.

### 2. Full Text Search & Filtering

Users can enjoy a full-text search form strategically placed throughout the website. Leveraging the database's native capabilities, it generates a results URL with the exact search query for easy sharing.

Additionally, users can browse events using filters, with **parameters embedded in the URL** for straightforward sharing, storage, and browser navigation.

### 3. Events Calendar

Each user has access to a private calendar displaying all the events they've signed up for. This lightweight component is client-side rendered, with detailed information about scheduled events appearing when a date is selected.

### 4. Exciting Visuals

Large, expressive images serve as backdrops for various UI elements. These visuals engage users and set the tone for a diverse audience.

For optimal performance, all images are handled using NextJS's Image optimization features and some manual adjustments.

### 5. User-Friendly Forms

Our website's forms incorporate modern solutions to enhance user experience. These include client-side validation, dynamically fetched confirmation messages, and an intuitive design.


Join us on [poszczekane.pl](https://wwww.poszczekane.pl)!