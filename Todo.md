## API

Endpoints:

---

## protected GET /events/:eventId

### zwraca wszystkie detale dotyczące danego wydarzenia, w szczególności (to dotyczy tylko publicznych wydarzeń):

-  czy wydarzenie jest publiczne
-  czy użytkownik jest twórcą (pole `isOwner: boolean`)
-  invite code (zwracany tylko jeśli użytkownik jest twórcą)
-  listę uczestników (zwracana zawsze, nie tylko dla twórcy) - wystarczą pola `firstName`, `lastName` i `email` każdego uczestnika

zwraca 404 (!ważne) jeśli użytkownik o danym mailu nie jest uczestnikiem wydarzenia (ani twórcą) - nie chcemy zwracać 401, bo to by pośrednio informowało osobę robiącą zapytanie że istnieje wydarzenie o takim ID - potential security breach

zwraca 404 również jeśli wydarzenie o takim ID po prostu nie istnieje

potrzebny do wyświetlania podstrony ze szczegółami danego wydarzenia

---

## protected GET /events/suggestUsers?eventId=1

### zwraca listę wszystkich użytkowników w systemie poza:

-  użytkownikiem wykonującym zapytanie (email brany z tokena)
-  użytkownikami zapisanymi już na wydarzenie o id `eventId`
-  adminem

zwraca 401 dla nieautoryzowanego i 404 dla złego eventId

potrzebny do dynamicznego podpowiadania kogo jeszcze można zaprosić na wydarzenie, wpisując email

---

## protected POST /events/addUser?eventId=1 { email: String }

### dodaje użytkownika o podanym emailu do wydarzenia o id `eventId`

zwraca 401 dla nieautoryzowanego (jeśli user z mailem z tokena nie jest twórcą wydarzenia), 400 jeśli użytkownik o mailu podanym w requeście już uczestniczy w wydarzeniu i 404 jeśli użytkownik o takim mailu nie istnieje

potrzebny do dodawania użytkowników do wydarzenia

---

## protected POST /events/removeUser?eventId=1 { email: String }

### usuwa użytkownika o podanym emailu z wydarzenia o id `eventId`

zwraca 401 dla nieautoryzowanego (jeśli user z mailem z tokena nie jest twórcą wydarzenia), 400 jeśli użytkownik o mailu podanym w requeście nie uczestniczy w wydarzeniu i 404 jeśli użytkownik o takim mailu nie istnieje

potrzebny do usuwania użytkowników z wydarzenia

---

## protected POST /events/enrollWithCode { inviteCode: string }

dodaje użytkownika do wydarzenia, którego kod zapraszający jest taki jak podany w requeście

zwraca 404 jeśli nie ma wydarzenia z takim inviteCodem, 400 jeśli użytkownik o mailu z tokena już jest zapisany na dane wydarzenie

potrzebny do dołączania do wydarzenia używając kodu
