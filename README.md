#  GameVault Documentazione del progetto

GameVault è un'applicazione web sviluppata con React che permette agli utenti di scoprire, cercare e interagire con una vasta libreria di videogiochi.
L'applicazione offre un'interfaccia intuitiva per esplorare i giochi in base a generi e piattaforme, con la possibilità di filtrare i risultati, visualizzare i dettagli di un titolo, leggere e scrivere recensioni, e gestire una collezione personale di giochi preferiti.
Gli utenti autenticati possono inoltre partecipare alla chat live, scrivere recensioni e modificare le proprie informazioni e attività nella dashboard personale.
---
API
---
Il progetto utilizza l'API di Rawg.io (https://rawg.io/apidocs) per ottenere dati dai videogiochi e Supabase come BaaS per autenticazione, archiviazione del database e chat in tempo reale.
---
Stile
---
L'applicazione è realizzata in CSS e Bootstrap 5.3 per lo stile.
---
Pagine
Home Page - Elenco dei videogiochi, con la possibilità di filtrarli a piacimento
Pagina Dettaglio - Elenco informazioni del gioco scelto, con possibilità di aggiungere o rimuovere dai preferiti, visualizzarne gli screenshot con le immagini di gioco, leggere o partecipare alla live chat, leggere o lasciare una recensione.
Risultati di Ricerca - Mostra giochi filtrati in base ai criteri di ricerca come nome, genere, e piattaforma
Pagine di Autenticazione - Pagine per registrazione e accesso
Pagina Profilo - Visualizza le informazioni dell'utente, giochi salvati tra i preferiti e le recensioni fatte, e modifica dei dati utente.
---
User Interactions
Utenti non autenticati:
Sfogliare l'elenco completo dei giochi
Cercare giochi per nome
Filtrare giochi secondo vari criteri e parametri
Visualizzare informazioni dettagliate di un gioco specifico
Registrarsi con email e password
Utenti autenticati:
Creare e gestire una lista di preferiti
Lasciare recensioni
Partecipare alla live chat
Visualizzare e aggiornare le informazioni del proprio profilo
---
Context
L'applicazione utilizza il Context Provider React:
SessionContext - Gestisce i dati della sessione dell'utente
---
Dipendenze
Lista delle dipendenze usate nel progetto:

"@supabase/supabase-js"
"bootstrap"
"bootstrap-icons"
"@vercel/analytics"
"react"
"react-dom"
"react-router"
"react-spinners"
"Material-UI"
"Sonner"
"date fns"
---
##  **Funzionalità principali**

✅ ** Ricerca giochi** → Gli utenti possono cercare giochi tramite una barra di ricerca avanzata
✅ ** Visualizzazione giochi** → Naviga tra i giochi per genere e piattaforma
✅ ** Aggiunta ai preferiti** → Salva i giochi nella propria lista personale
✅ ** Recensioni giochi** → Scrivi e visualizza recensioni lasciate da altri utenti
✅ ** Autenticazione utenti** → Login, registrazione e gestione del profilo
✅ ** Dashboard utente** → Visualizza giochi preferiti e recensioni personali
✅ ** Responsive design** → Ottimizzato per dispositivi desktop e mobile
✅ ** Notifiche in tempo reale** → Sistema di alert per azioni eseguite
---
