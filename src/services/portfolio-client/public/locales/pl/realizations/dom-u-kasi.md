Dom u Kasi to strona internetowa domku letniskowego do wynajęcia. Zawarte są na niej wszystkie informacje na temat domku, regulamin wynajęcia, galeria zdjęć z wieloma kategoriami, filmy pokazujące domek i okolicę oraz sam dojazd do domku.

Zdjęcie w pierwszej sekcji powitalnej jest przycinane dokładnie do rozmiaru urządzenia oraz cacheowane po stronie serwera, dzięki czemu użytkownik który wchodzi na stronę oszczędza dane komórkowe.

Obrazki dekoracyjne, galeria zdjęć a nawet filmy oraz mapa ze wskazanym miejscem docelowym ładowane są w sposób opóźniony.

Witryna wykonana została przy pomocy technologii Next.js, React oraz Mobx. Treści są kompilowane i serwowane przy pomocy backendu napisanego przy użyciu Express.js. Co ważne, kompilacja odbywa się przy uruchomieniu serwera i skompilowane treści są zapiswane w folderach cache, dzięki czemu nie muszą być kompilowane przy każdym requeście, co przyśpiesza wysyłanie danych.

Treści zapisane są w wielu formatach takich jak markdown (tekst formatowany), json (dane kontaktowe) lub csv (tabele). Edycja jest bardzo prosta, wystarczy zmienić treść wybranej części strony, zapisać, oraz zrestartować serwer.

Ale dlaczego nie mamy tu po prostu CMSa? Z dwóch powodów:
1. ograniczenie kosztów produkcji
2. osoba obsługująca stronę jest osobą która zna się na informatyce i radzi sobie z edycją treści w ten sposób

Dostępna jest obszerna dokumentacja w której opisane są instrukcje edycji treści każdej części strony. W dokumentacji opisany został również proces wdrożenia strony na serwer VPS.
