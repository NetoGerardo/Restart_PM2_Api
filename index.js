const app = require('express')();
const PORT = 3330;
const appName = "app"

var pm2 = require('pm2');

app.get('/restart', (req, res) => {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.restart(appName, function (err) {
            pm2.disconnect();
            if (err) {
                console.log("Error on restart " + appName);
            } else {
                console.log(appName + " restarted by restartApi");
            }
        });
    });
})

app.listen(
    PORT,
    () => console.log("Restart api running on " + PORT)
);