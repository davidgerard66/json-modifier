var fs = require("fs");

// lire un dossier et boucler sur les fuichiers
fs.readdir("c:/node/json-modifier", function(err, items) {


    for (var i=0; i<items.length; i++) {
        var fichier = items[i];
        var ref = fichier.replace('.txt','')
        console.log(ref);

    }
});

//  tester si fichier existe

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

console.log('mt.txt existe ? : ' + fileExists('c:/node/json-modifier/mt.txt'));
console.log('tagada.pdf existe ? : ' + fileExists('c:/node/json-modifier/tagada.pdf'));


// ouvrir , modifier et refermer
var content = fs.readFileSync("mt.txt");


var jsonContent = JSON.parse(content);
var toto = jsonContent.length;
//console.log(toto);
// Get Value from JSON
console.log("backgroundFront:" + (jsonContent.scene.backgroundFront).substring(0,100));


/*jsonContent.scene.backgroundFront = "url(\"sources/templates/toto.png\")";
console.log("backgroundFront:" + (jsonContent.scene.backgroundFront).substring(0,100));
fs.writeFile("mt-conv.txt", JSON.stringify(jsonContent), function (err) {
    if (err)
        return console.log(err);
    console.log('fichier converti');
});
*/

console.log('ya du jpeg ? : '+ (jsonContent.scene.backgroundFront).indexOf('jpeg;base64'))
console.log('ya du png ? : '+ (jsonContent.scene.backgroundFront).indexOf('png;base64'))

var base64Data = (jsonContent.scene.backgroundFront).replace(/^url\("data:image\/jpeg;base64,/, "");
base64Data = base64Data.replace('")','');

/*require("fs").writeFile("out.txt", base64Data,  function(err) {
    console.log(err);
});*/

require("fs").writeFile("out.jpg", base64Data, 'base64', function(err) {
    console.log(err);
    jsonContent.scene.backgroundFront = "url(\"sources/templates/out.jpg\")";
    console.log("backgroundFront:" + (jsonContent.scene.backgroundFront).substring(0,100));
    fs.writeFile("mt-conv.txt", JSON.stringify(jsonContent), function (err) {
        if (err)
            return console.log(err);
        console.log('fichier converti');
    });

});
// url(\"data:image/jpeg;base64,
// \")