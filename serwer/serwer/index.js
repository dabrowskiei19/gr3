const request = require('request');
const mysql = require('mysql');
const forever = require('forever');

// Konfiguracja połączenia z bazą danych
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'zsti3',
  password: 'EciePecie666!',
  database: 'zsti3'
});

// Pobieranie danych z pliku JSON
function getData() {
  request('http://imiki/cf', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    // Przetwarzanie danych i dodawanie ich do bazy danych
    const data = {
        temp1: body.sesner1,
      temp2: body.sesner2,
      temp3: body.sesner3,
      temp4: body.sesner4,
      humidity: body.HUMIDITYANDTEMPSENSOR,
      TimeStamp: body.TEMPERATURESENSOR
    };

    connection.query('INSERT INTO measurements SET ?', data, (error, results, fields) => {
      if (error) throw error;
      console.log('Dodano pomiary do bazy danych.');
    });
  });
}

// Uruchamianie funkcji getData co minutę za pomocą biblioteki Forever
forever.startDaemon();
forever.watchFile('data.json', () => {
  getData();
}, {
  interval: 60000
});
