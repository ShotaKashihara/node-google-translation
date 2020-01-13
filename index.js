/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'kirin-0';
const location = 'global';
const text = 'Ferreri, Ernesto';

// Imports the Google Cloud Translation library
const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;
const fs = require('fs')

const json = JSON.parse(fs.readFileSync('input/composer2.json', 'utf8'))

// Instantiates a client
const translationClient = new TranslationServiceClient();
async function translateText() {
  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    contents: json,
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'en-US',
    targetLanguageCode: 'ja-JP',
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  fs.writeFileSync('output/composer2.json', JSON.stringify(response, null, 2), 'utf8')

  for (const translation of response.translations) {
    console.log(`Translation: ${translation.translatedText}`);
  }
}

// console.log(json)
translateText();