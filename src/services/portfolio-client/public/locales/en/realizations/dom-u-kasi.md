Dom u Kasi to strona internetowa domku letniskowego do wynajęcia. Zawarte są na niej wszystkie informacje na temat domku, warunki wynajmu, opis wyposażenia, galeria zdjęć z podziałem na różne części domu oraz okolicę, filmy prezentujące domek i okoliczne atrakcje, dojazd do domku oraz polecane przez właściciela serwisy i dane kontaktowe do właściciela posiadłości.

Zdjęcie w sekcji powitalnej jest przycinane dokładnie do rozmiaru urządzenia użytkownika, dzięki czemu zdjęcie w tle pokazuje się szybciej a użytkownicy oszczędzają dane komórkowe.

Obrazki dekoracyjne widoczne po bokach strony, galeria zdjęć a nawet filmy oraz mapa ze wskazanym miejscem docelowym ładowane są dopiero gdy znajdą się na ekranie, przyśpieszając tym samym pierwsze załadowanie strony.

Witryna wykonana została przy pomocy technologii `Next.js`, `React` oraz `Mobx`. Treści są kompilowane i serwowane przy pomocy backendu napisanego przy użyciu `Express.js`. Co ważne, kompilacja odbywa się przy uruchomieniu serwera i skompilowane treści są zapiswane w folderach cache, dzięki czemu nie muszą być kompilowane przy każdym żądaniu, co przyśpiesza wysyłanie danych.

Treści zapisane są w wielu formatach takich jak `markdown` (tekst formatowany), `json` (dane kontaktowe) lub `csv` (tabele). Edycja jest bardzo prosta, wystarczy zmienić treść wybranej części strony, zapisać, oraz zrestartować serwer.

Ale dlaczego nie mamy tu po prostu CMSa? Z dwóch powodów:

1. ograniczenie kosztów produkcji witryny
2. osoba obsługująca stronę jest osobą która zna się na informatyce i radzi sobie z edycją treści w ten sposób

Dostępna jest również obszerna dokumentacja w której opisane są instrukcje edycji treści każdej części strony. W dokumentacji opisany został też proces wdrożenia strony na serwer VPS.
