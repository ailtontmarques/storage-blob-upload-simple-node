const uuid = require('uuid');
const azure = require('azure-storage');

exports.uploadImage = async (req, res, next) => {
    // https;AccountName=azurestoreblobexample;AccountKey=eb52b14b-cfe8-40f0-985c-ee588063f82d
    const blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=azurestoreblobexample;AccountKey=mKaLE+vll6TI4m21hHlOF/iKbiRbUF9PhuKMnTGiNYDqYQXGesDAVtfAB2/cGCgPYQF7/ah8VlJI+AStqt+jJw==;EndpointSuffix=core.windows.net');
    
    // Gera um nome único para o arquivo
    let filename = uuid.v4().toString() + '.jpg';

    // Obtem a imagem em base64 do corpo da requisição
    let rawdata = await req.body.image;
    console.log('image', req.body.image);
    // Separa a hash recebida em duas partes
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    // Obtém o tipo da imagem
    let type = matches[1];

    // Obtém a imagem em si
    let buffer = new Buffer(matches[2], 'base64');

    // Salva a imagem
    await blobSvc.createBlockBlobFromText('images', filename, buffer, {
        contentType: type
    }, function (error, result, response) {
        if (error) {
            filename = 'default.png'
        }
    });


    // https://azurestoreblobexample.blob.core.windows.net/blob-azure-container-test/Captura de tela_20221230_132502.png
    const fileUrl = `https://azurestoreblobexample.blob.core.windows.net/images/${filename}`;
    return res.status(200).json({
        url: fileUrl
    });
}

