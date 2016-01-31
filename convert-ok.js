var fs = require("fs");

// lire un dossier et boucler sur les fuichiers
fs.readdir("C:/node/to convert/", function(err, items) {

console.log("c parti");
    for (var i=0; i<items.length; i++) {
        var fichier = items[i];

        console.log(fichier);
        convertir(fichier);
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


ecrire = function(nomfichier, imgdata){

    fs.writeFile(nomfichier, imgdata, 'base64', function(err) {
       // console.log(toto+" enregistre");
    });

};

// ouvrir , modifier et refermer
convertir = function(fichier) {


    var content = fs.readFileSync("C:/node/to convert/"+fichier);
    var ref = fichier.replace('.txt', '');
    var jsonContent = JSON.parse(content);

    if (jsonContent.scene.backgroundBack==jsonContent.scene.backgroundFront) {
        console.log(" le verso a le meme background  que le recto");
    }

    var jpg = (jsonContent.scene.backgroundFront).indexOf('jpeg;base64');
    var png = (jsonContent.scene.backgroundFront).indexOf('png;base64');
    var extension = '';

    if (jpg>0) {
        var base64Data = (jsonContent.scene.backgroundFront).replace(/^url\("data:image\/jpeg;base64,/, "");
         extension = ".jpg"
    } else {
        if (png>0) {
            var base64Data = (jsonContent.scene.backgroundFront).replace(/^url\("data:image\/png;base64,/, "");
             extension = ".png"
        }
    }
    if (extension!='') {
        // enregistrement du backgournd
        base64Data = base64Data.replace('")', '');
        ecrire("C:/node/converted/backgrounds/" +ref + extension, base64Data);
        // enregiustrement du json
        jsonContent.scene.backgroundFront = "url(\"sources/template/backgrounds/LD/"+ref+extension+"\")";
    }



if ((jsonContent.scene).hasOwnProperty("backgroundBack")) {

            var jpg = (jsonContent.scene.backgroundBack).indexOf('jpeg;base64');
            var png = (jsonContent.scene.backgroundBack).indexOf('png;base64');
            var extension = '';

            if (jpg > 0) {
                var base64Data = (jsonContent.scene.backgroundBack).replace(/^url\("data:image\/jpeg;base64,/, "");
                extension = ".jpg"
            } else {
                if (png > 0) {
                    var base64Data = (jsonContent.scene.backgroundBack).replace(/^url\("data:image\/png;base64,/, "");
                    extension = ".png"
                }
            }
            if (extension != '') {
                // enregistrement du backgournd
                base64Data = base64Data.replace('")', '');
                ecrire("C:/node/converted/backgrounds/" + ref + "-verso" + extension, base64Data);
                // enregiustrement du json
                jsonContent.scene.backgroundBack = "url(\"sources/template/backgrounds/LD/" + ref + "-verso" + extension + "\")";
            }

}
    fs.writeFileSync("C:/node/converted/txt/"+ ref+".txt", JSON.stringify(jsonContent));


}

