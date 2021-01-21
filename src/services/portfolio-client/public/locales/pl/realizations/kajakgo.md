Strona internetowa firmy zajmującej się spływami kajakowymi rzeką Krutyń. Na stronie przedstawiona jest oferta firmy, sprzęt który posiadają, obsługiwane trasy spływów, prognoza pogody na najbliższe dni, okoliczne atrakcje oraz informacje kontaktowe.

Sekcja `Trasy spływów` zawiera mapkę którą można przybliżyć. Można wybrać trasę i zobaczyć w którym miejscu oraz skąd i dokąd prowadzi spływ wybraną trasą. Każda trasa jest dokładnie opisana wraz ze wszelkimi atrakcjami które można zobaczyć podczas spływu wybraną trasą. Cała sekcja jest podzielona na dwie główne kategorie:

-   `Spływ jednodniowy` - opisany wyżej, oraz
-   `Spływ wielodniowy` - czyli dokładny opis spływu wielodniowego

`Nasz sprzęt` to sekcja przedstawiająca cały sprzęt, jaki firma ma do zaoferowania. Listę można przewijać a obrazki zaczynają się ładować dopiero gdy użytkownik zjedzie do sekcji. Co ważne, ładowane są tylko obrazki aktualnie widoczne na ekranie. Gdy użytkownik przewinie listę, doładowywane są kolejne zdjęcia, pozwala to oszczędzić ilość danych komórkowych zużywanych przez stronę, oraz sprawia, że strona jest lżejsza do załadowania.

Sekcja o nazwie `Okolica` przedstawia okoliczne atrakcje, które warto zwiedzić. Zdjęcia są leniwie ładowane w określonej kolejności żeby zachować spójność animacji - od lewej do prawej, z góry na dół. Atrakcje podzielone są na kategorie względem miejscowości. Na każdym rodzaju urządzeń wyświetlana jest określona początkowa liczba atrakcji w kategorii. Dostępny jest przycisk `Więcej miejsc` który pokazuje miejsca, które nie zmieściły się w początkowej liczbie widocznych atrakcji.

Na stronie dostępna jest również sekcja opisująca prognozę pogody na następne dni. Dane dostarcza platforma Open Weather Map. Dane pobierane są przez serwer napisany na platformę `Node.js` używający biblioteki `Express` i wysyłane do klienta gdy ten zjedzie na stronie do sekcji pogodowej. Dzięki temu, nasz klucz API do platformy Open Weather Map pozostaje tajny, a poza tym serwer robi jeszcze jedną bardzo ważną rzecz: cacheuje dane z API. Po co ten cache? Open Weather Map pozwala na darmowe korzystanie z ich API tylko pod warunkiem, że nie zostanie przekroczona określona ilość żądań w ciągu doby. Serwer cacheuje dane przez wybrany czas (w tym przypadku 10 minut) i gdy klient (frontend) zażąda danych pogodowych, serwer sprawdza, czy dane nadal są aktualne i jeśli nie, to pobiera świeżą prognozę pogody, zapisuje ją, i przesyła do klienta. Pozwala to na ograniczenie użycia API platformy Open Weather Map, żeby nie przekroczyło ilości żądań, po której trzeba byłoby płacić za dane pogodowe.

W ostatniej sekcji dostępną mamy mapkę, na której wskazane jest miejsce gdzie można znaleźć siedzibę firmy. Mapka jest oczywiście ładowana dopiero w momencie gdy użytkownik zjedzie do sekcji kontaktowej.

Dodatkowo, zrobione zostało przekierowanie `DNS` wysłanych emaili z maila `kontakt@kajakgo.pl` na adres na domenie `@gmail.com`.

Całość działa na serwerze `VPS` używając odpowiedniej konfiguracji `docker-compose`. Skonfigurowane są 3 serwisy:

-   `KajakGo.Client` - cały frontend strony `kajakgo.pl`
-   `KajakGo.Server.Weather` - serwer serwujący oraz cacheujący dane pogodowe
-   `KajakGo.Proxy` - reverse proxy frontendu oraz backendu, którym w tym przypadku jest to `Nginx`

Wdrażanie nowych wersji strony zostało zrealizowane przy pomocy `Github Actions` oraz `Releases`. Działa to w ten sposób, że gdy zmienimy jakieś treści na stronie i wrzucimy zmiany do repozytorium na Githubie, to wtedy wystarczy stworzyć nowy release, opisać zmiany, zapisać i chwilę poczekać, żeby zmiany zostały zdeployowane poprzez `Github Actions` na serwer `VPS` dostępny pod adresem `kajakgo.pl`.

Dostępna jest również konfiguracja `docker-compose` dla programisty, która ułatwia rozpoczęcie edycji strony internetowej. Wystarczy pobrać repozytorium i uruchomić skrypt Powershella `start.ps1`, który pobierze wszystko za nas i uruchomi wszystkie aplikacje. W konfiguracji deweloperskiej również został użyty serwis proxy `Nginx`, który pozwala nam używać frontendu oraz api pogodowego z jednego adresu, co umożliwia udostępnienie podglądu strony klientowi przy pomocy narzędzi takich jak `localtunnel` lub `ngrok` oraz umożliwienie dla aplikacji frontendowej pobrania danych pogodowych podczas udostępniania.

Oczywiście dostępna jest dokumentacja projektu opisująca jak edytować oraz wdrożyć całą aplikację na serwer produkcyjny.
