# openaiimages 
# A sample React app for Tauri version 2

### Author: Jason Levitt
### Initial Release Date: February 28th, 2024

## openaiimages demonstrates [Tauri version 2's](https://beta.tauri.app) ability to take a [React](https://react.dev) frontend and use it to develop desktop and mobile apps for multiple platforms using only one code base. You can develop for MacOS, Windows, Linux, Android, and iOS.

<figure>
    <img src="https://i.imgur.com/FFWxw8W.png" alt="MacOS" width="800"/>
    <figcaption>MacOS</figcaption>
</figure>

## Building The App

### For prerequisites, see this page: <a href="https://beta.tauri.app/guides/prerequisites" target="_blank">Tauri prerequisites</a>
#### Note that iOS development requires a Mac (sorry). 

### After you clone this repo:
 ```sh 
$ cd openaiimages
```
### Install the Javascript packages (this is a typical React step)
 ```sh  
$ yarn
```
#### or
 ```sh  
$ npm install
```

### Then, to build and launch the desktop version (tested on MacOS and Windows):
 ```sh 
 $ yarn tauri dev
 ``` 
#### or
 ```sh 
 $ npm run tauri dev
 ``` 

### To build and launch the Android version:
 ```sh
$ yarn tauri android init
$ yarn tauri android dev
```
#### or
 ```sh
$ npm run tauri android init
$ npm run tauri android dev
```

### To build and launch the iOS version:
 ```sh
$ yarn tauri ios init
$ yarn tauri ios dev
```
#### or
 ```sh
$ npm run tauri ios init
$ npm run tauri ios dev
```
<br />

## Using The App

### This sample app requires an OpenAI API key in order to do anything interesting. You can get a free key, with $5 USD of free usage which is enough to generate over 100 images, by signing up here [no credit card required]: 
- OpenAI signup
  <a href="https://platform.openai.com/signup" target="_blank">OpenAI signup</a>
- Once you login, you can check that you have $5 of free credit
  <a href="https://platform.openai.com/account/billing/overview" target="_blank">Check your $5 free credit</a>
- Then create an API key which requires your phone number to verify
  <a href="https://platform.openai.com/api-keys" target="_blank">Create an API key</a>

#### In the app, click on the gear in the lower left-hand corner to add your API key. Once you've added your OpenAI API key, simply type a prompt into the text box and click on the "Create Image" button. When the image is loaded, which usually takes about 15 seconds, there are two other features for the desktop app (Windows/Linux/MacOS):
#### - Rolling over the image will reveal a tooltip containing the "revised prompt" if OpenAI returned one.
#### - Clicking on the image will bring up a "Save As" dialog.
#### On iOS, you can right-click on the image to see the tooltip and save the image. 

<br />
<span>
<figure>
    <img src="https://i.imgur.com/lzDo2cK.jpeg" alt="iOS" width="300"/>
    <figcaption>iOS</figcaption>
</figure>
<figure>
    <img src="https://i.imgur.com/Y3IRBji.jpeg" alt="Android" width="300"/>
    <figcaption>Android</figcaption>
</figure>
</span>
<br /><br />
<figure>
    <img src="https://i.imgur.com/ihA86Of.png" alt="Windows 10" width="800"/>
    <figcaption>Windows 10</figcaption>
</figure>

## For a list of some Tauri apps and plugins, check out this <a href="https://github.com/tauri-apps/awesome-tauri" target="_blank">Github link</a>
