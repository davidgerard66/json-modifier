var fs = require("fs");

// lire un dossier et boucler sur les fuichiers
fs.readdir("C:/node/to convert", function(err, items) {


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


ecrire = function(toto){

    fs.writeFile(toto, imgdata, 'base64', function(err) {
        console.log(toto+" enregistre");
    });

};

// ouvrir , modifier et refermer
var content = fs.readFileSync("b06.txt")



var jsonContent = JSON.parse(content);





for (var i=0; i<jsonContent.fieldsBack.length; i++) {

    if (jsonContent.fieldsBack[i].header.type=="img") {

        if ((jsonContent.fieldsBack[i].content.data).indexOf("png;base64")>0) {

            console.log("1 png trouve");
            var imgdata = (jsonContent.fieldsBack[i].content.data).split("png;base64");
            imgdata = imgdata[1].replace('">','');
             ctr = 1;


            ecrire("png-"+i+".png");
        }

    }

};