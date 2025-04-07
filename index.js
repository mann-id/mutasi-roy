import axios from 'axios';
import fs from 'fs';
import moment from 'moment-timezone';
import chalk from 'chalk';
import osu from 'node-os-utils';
import express from 'express';

const username = "xxx"
const apikey = "xxx"


const app = express();
const port = process.env.PORT || 3000;
async function fetch() {
  try {
    const response = await axios.get(`https://gateway.okeconnect.com/api/mutasi/qris/${username}/${apikey}`);
    const data = response.data;
    fs.writeFileSync('mutasi.json', JSON.stringify(data, null, 2));
    
    const currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    console.log(chalk.green.bold('INFO ') + chalk.green.bold(`[`) + chalk.white.bold(`${currentTime}`) + chalk.green.bold(`]: `) + chalk.cyan('Data saved to mutasi.json'));
   setTimeout(fetch, 6000);
  } catch (error) {
    console.error(chalk.red('Error fetching or saving data:', error));
  }
}

fetch();

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/mutasi.json');
});

app.listen(port, () => {
  console.log(chalk.green(`Server berjalan di port ${port}`));
});
