# MJPEG-Restream

MJPEG-Restream сan be used for example to restream mjpeg from [Trassir](https://trassir.com/)

## Usage

```sh
npm install       #install dependencies
npm run build     #build
npm run .         #run
```

## .env

```ENV
PORT=8888
PREFIX=https://example.com/
SUFFIX=?type=mjpeg
```

## URL

`http://localhost:8888/%any_url_to_stream%`  
transformed to  
`https://example.com/%any_url_to_stream%?type=mjpeg`