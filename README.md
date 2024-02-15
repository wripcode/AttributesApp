# For webflow

For test go to webflow acc. > Apps & Integrations > + Create new app
Fill with Dummy data:
* Name, Description, App homepage url: https://gogle.com > Continue
* Switch on Designer extension (Designer API) > Create App
* App will be listed under App development
* Click on install and select webflow project where you want to test.

## Developing

Before start developing install webflow cli to project:
```
$ npm install -g @webflow/webflow-cli
```
```
$ npm install @webflow/designer-extension-typings
```
more info here: https://docs.developers.webflow.com/reference/webflow-cli-1
Webflow api's and docs: https://docs.developers.webflow.com/reference/the-domelement-object

## Run

```
$ npm run dev
```


The above command does a few things:
* Installs dependencies
* Watches for changes in the `src/` folder and recompiles your TypeScript files, outputting an `index.js` file under the `public/` folder
* Spins up a process that serves your extension files from under `public/`

The command outputs the URL under which your extension is being served. Use this as the “Development URL” for your app in the Webflow Designer’s Apps panel. You can then launch the extension from the same place.

## Deploying

```
$ npm run build
```

This will take the contents of the `./public` folder and prepare a `bundle.zip` file ready for you to upload as a Designer extension for your App.
