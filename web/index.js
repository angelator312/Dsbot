const path = require("path");
const { Mongostore } = require("./mongostore");
const express = require("express");
const app = express();
let session;
function start_web(client) {
  const templatePath = path.join(__dirname, "views");
  const port = process.env.PORT ?? 8080;
  // конфигурации
  app.engine(".html", require("ejs").__express);
  // конфигурираме къде се намират файловете с темплейти
  app.set("views", templatePath);
  // Конфигурираме  разширението по подразбиране за темплейтите
  app.set("view engine", ".html");
  // край на конфигурациите
  app.get("/verify/:url", async function (req, res) {
    const url = req.params.url;
    const m = await session.getkey(url);
    console.log(m);
    if (m) {
      const mid = m.mid;
      const gid = m.gid;
      const guild = client.guilds.cache.get(gid);
      const role = guild.roles.cache.find((r) => r.name == "verified");
      const member = await guild.members.fetch(mid);
      console.log(member);
      await member.roles.add(role);
      res.redirect("https://discord.gg/SuMX2Gjr3G/");
    }else
    {
      res.writeHead(404);
      res.write('<a href=https://discord.gg/SuMX2Gjr3G/> No verify permissions for discord server <strong> angelator312 public bot server<strong> </a> ');
    }
  });
  app.listen(port, () => {
    console.log("Express server listening in port %s", port);
  });
}
function init_mongo() {
  session = new Mongostore("session.json");
  // свързваме монгото-: сесия
  session.conect(process.env.MONGO_URL);
  return session;
}
module.exports = { init_mongo, start_web };
