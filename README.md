#  EarthCompass 

EarthCompass is a modern web application that helps users explore fascinating information about every country in the world. Search by name, filter by region or language, switch between light/dark themes, and save your favorite countries. The app includes a user authentication system and a responsive UI.

---

##  Features

-  Browse all countries with detailed information
-  Search countries by name
-  Filter countries by region and language
-  Mark and view your favorite countries
-  User registration and login (via localStorage)
-  Light and dark theme toggle
-  Mobile responsive design

---
##  Endpoints Used

- GET /all — Retrieve all countries

- GET /name/{name} — Search for a country by name

- GET /region/{region} — Get countries by region

##  Getting Started

### Prerequisites

- Node.js and npm installed on your system

### Challenges Faced

- Ensuring the light/dark theme was consistently applied across all pages, especially when navigating between routes or on page reload.

- Making the Bootstrap navbar responsive and toggling it correctly across different screen sizes without unintentional collapses or expansion.

- The API returns nested and sometimes inconsistent structures (e.g., languages, currencies).


### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-PiyushiRan
cd earthcompass



