Prosty prototyp kontrolera akwarystycznego z obsługą automatycznej podmiany wody i dolewki ze zbiornika rezerwowego. Akwaryści znają to z doświadczenia: w ciągu tygodnia ze standardowego akwarium potrafi odparować nawet kilkanaście litry wody, obniżając taflę wody i zostawiając brzydkie ślady na ścianach akwarium. Podmiana wody również jest uciążliwym procesem, który trzeba wykonywać zazwyczaj raz w tygodniu.

Kontroler obsługuje automatyczną dolewkę ubywającej (parującej) wody w akwarium. Co kilka minut kontroler sprawdza czy czujnik pływakowy zamontowany przy tafli wody w akwarium wykrywa wodę czy nie. Jeśli nie, rozpoczyna się proces dolewania wody dopóki woda nie zostanie uzupełniona do wyznaczonego przez czujnik pływakowy poziomu, lub nie skończy się woda w zbiorniku dolewki.

Automatyczna dolewka jest zabezpieczona przed przelaniem wody w akwarium przez ustawienie maksymalnego czasu dolewania wody: zazwyczaj wodę dolewamy w kilkadziesiąt sekund. Jeżeli woda będzie się dolewać w więcej niż te określone przez nas kilkadziesiąt sekund, może to oznaczać ze czunik pływakowy prawdopodobnie został czymś zablokowany i kontroler zatrzymuje dolewkę i raportuje błąd, oczekując na reakcję użytkownika, dzięki czemu nie ma opcji aby woda wylała się z akwarium.

Półautomatyczna podmiana wody w akwarium pozwala na usunięcie określonej przez czujnik pływakowy ilości wody oraz późniejsze uzupełnienie jej poprzez sterowanie serwozaworami odkręcającymi lub zakręcającymi dolew lub wylew wody. Podmiana również jest zabezpieczona przed zablokowaniem któregoś z serwozaworów.

Proces półautomatycznej podmiany wody uzupełnia też automatycznie wodę w zbiorniku dolewki wody. Zbiornik dolewki wody posiada dwa czujniki pływakowe, które dają odpowiednie sygnały (maksymalny oraz minimalny poziom wody) do kontrolera na temat poziomu wody w zbiorniku.

Oświetlenie ledowe akwarium sterowane jest przy pomocy sygnału `PWM`. Kontroler steruje światłami rozjaśniając oraz przyciemniając oświeltenie, symulując poranek, południe, wieczór, oraz noc w ustalonych przez użytkownika godzinach.

Kontroler obsługuje również inne urządzenia w akwarium, takie jak grzałka, lampa grzewcza, napowietrzacz i wszelkie inne urządzenia które mogą być sterowane czasowo w cyklu doby.
