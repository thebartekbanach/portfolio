Website of the company dealing in kayaking on the Krutyń River. The website presents the company's offer, the equipment they have, the supported rafting routes, the weather forecast for the next few days, local attractions and contact information.

The `Rafting routes` section contains a map that you can zoom in on. You can choose the route and see where, from and to where the rafting takes place along the selected route. Each route is described in detail along with all the attractions that can be seen during the rafting along the selected route. The entire section is broken down into two main categories:

-   `One-day trip` - described above, and
-   `Multi-day trip` - a detailed description of a multi-day trip

`Our equipment` is a section that presents all the equipment the company offers. The list can be scrolled and the pictures do not start loading until the user enters the section. Importantly, only the pictures currently visible on the screen are loaded. When the user scrolls through the list, more photos are loaded, which saves the amount of cellular data used by the website, and makes the website lighter to load.

The section called `Surroundings` presents the local attractions that are worth visiting. Photos are lazily loaded in a specific order to keep the animation consistent - from left to right, from top to bottom. The attractions are categorized by city name. Each device type displays a specific initial number of attractions in the category. There is a `More Places` button that shows places that did not fit into the initial number of visible attractions.

The website also has a section describing the weather forecast for the next days. The data is provided by the Open Weather Map platform. The data is downloaded by a server written for the `Node.js` platform using the `Express` library and sent to the client when the page is scrolled down to the weather section. Thanks to this, our API key to the Open Weather Map platform remains secret, and besides, the server does one more very important thing: it caches data from the API. What is this cache for? Open Weather Map allows you to use their API free of charge only if the specified number of requests per day is not exceeded. The server caches the data for the selected time (in this case 10 minutes) and when the client (frontend) requests weather data, the server checks that the data is still up-to-date and if not, it downloads a fresh weather forecast, saves it, and sends it to the client. This allows to limit the usage of the Open Weather Map platform API so that it does not exceed the number of requests at which you would have to pay for weather data.

In the last section, we have a map with indicated place of the company's headquarters. Of course, the map is loaded only when the user scrolls down to the contact section.

Addionally, the `DNS` redirection for emails from `kontakt@kajakgo.pl` to `@gmail.com` has been configured.

Everything runs on the `VPS` server using the appropriate `docker-compose` configuration. There are 3 services configured:

-   `KajakGo.Client` - the entire frontend of the `kajakgo.pl` website
-   `KajakGo.Server.Weather` - server that serves and caches weather data
-   `KajakGo.Proxy` - frontend and backend reverse proxy, which in this case is `Nginx`

The implementation of the new website versions was done with the help of `Github Actions` and `Releases`. It works in such a way that when we change some content on the page and upload changes to the Github repository, then we just need to create a new release, describe the changes, save it, and wait a moment for the changes to be deployed via `Github Actions` to the `VPS` server available under `kajakgo.pl`.

There is also a `docker-compose` configuration for the developer, which makes it easy to start editing a website. Just download the repository and run the Powershell script `start.ps1`, which will download everything for us and start all applications. In the development configuration, the `Nginx` proxy service was also used, which allows us to use the frontend and weather api from one address, which allows the client to view the website using tools such as `localtunnel` or `ngrok` and to download weather data for the frontend application while sharing.

Of course, project documentation is available describing how to edit and deploy the entire application to the production server.
