var firebase = require("firebase");
var fs = require("fs");

var config = {
  apiKey: "AIzaSyC-_9JSzVXO52baX5t_S4EuPE62CrcRNtI",
  authDomain: "pistartool.firebaseapp.com",
  databaseURL: "https://pistartool.firebaseio.com",
  projectId: "pistartool",
  storageBucket: "pistartool.appspot.com",
  messagingSenderId: "249531707231"
};

var firebaseapp = firebase.initializeApp(config);
var db = firebaseapp.database();

// => Upload Plugins Test
console.log("=> Creating plugin package...");
console.log("==================================\n");
// load file

// JSON Plugin
var pluginObj = {
  name: "",
  constraints: "",
  metamodel: "",
  shapes: "",
  uimetamodel: ""
};

function readAddFile(name) {
  var pathName = name;
  if (pathName == "uimetamodel") {
    pathName = name.replace("ui", "ui.");
  }

  console.log("==> Reading " + pathName + ".js file...");
  //Read
  var file = fs.readFileSync("PluginTest/language/" + pathName + ".js", "utf8");
  //Replace undesired characters
  file = file.replace(/\r|\n/g, "");
  //Adding to plugin Json
  pluginObj[name] = file;
  console.log("<> File " + name + ".js added.");
}

readAddFile("constraints");
readAddFile("metamodel");
readAddFile("shapes");
readAddFile("uimetamodel");

console.log("\n==> Package created with success!");

console.log("=> Uploading plugin...");
console.log("==================================\n");

async function uploadPlugin(plugin) {
  await db.ref("Plugins/").push(plugin, function(err) {
    console.log("\n=> Plugin uploaded with success plugin...");
  });
}

uploadPlugin(pluginObj);

// let ref = db.ref("/Plugins");

// async function getPluginByName(pluginSlug) {
//   await ref.orderBy("pluginSlug").equalTo(pluginSlug).once("value", function(snapshot) {
//     let data = JSON.stringify(snapshot.val());
//     let json = JSON.parse(data);
//     console.log(json);
//   });
// }

// GET PLUGINS LIST FUNCTION
// async function getAllPlugins() {
//   await testref.once("value", function(snapshot) {
//     let data = JSON.stringify(snapshot.val());
//     let json = JSON.parse(data);
//     console.log(json);
//   });
// }

// getAllPlugins().then(() => {
//   console.log("Loaded all plugins!");
// });
