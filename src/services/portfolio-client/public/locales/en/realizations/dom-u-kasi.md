Dom u Kasi is a website of a holiday home for rent. It contains all information about the house, rental conditions, description of the equipment, photo gallery divided into different parts of the house and the surrounding area, videos presenting the house and nearby attractions, access to the house as well as services recommended by the owner and contact details for the owner of the property.

The photo in the welcome section is cropped exactly to the size of the user's device, making the background photo show up faster and saving users mobile data.

Decorative pictures visible on the sides of the page, photo gallery and even movies and a map with indicated destination place are loaded only when they are on the screen, thus speeding up the first page loading.

The website was made with the use of `Next.js`, `React` and `Mobx` technologies. Content is compiled and served using a backend written using `Express.js`. Importantly, compilation takes place at server startup and compiled content is saved in cache folders, so that they do not have to be compiled on every request, which speeds up sending data.

The content is written in many formats such as `markdown` (rich text), `json` (contact information), or `csv` (tables). Editing is very simple, just change the content of the selected part of the page, save and restart the server.

But why don't we just have a CMS here? For two reasons:

1. reduction of site production costs
2. the person operating the website is a person who knows about computer science and copes with editing content in this way

There is also extensive documentation that describes instructions on how to edit the content of each part of the page. The documentation also describes the process of deploying the website on the VPS server.
