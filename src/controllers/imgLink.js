var path = require('path');
var fs = require('fs');

const imgLink = async (req, res) => {

  const id = req.params.id;
  try {
    const img = fs.readFileSync(path.join(__dirname + '/../users/' + id))
    if (!img) {
      res.end(fs.readFileSync(path.join(__dirname + '/../users/not-found.png')))
    }
    else {
      res.end(img)
    }
  } catch (error) {
    res.send('imagen no encontrada')
  }

}




module.exports = imgLink;
