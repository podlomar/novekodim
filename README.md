# novekodim

The new web engine behind http://kodim.cz.

## Running locally

1. Install NPM and docker.
1. Clone the repository.
1. Go to `web` folder and run
   ```
   npm install
   ```

1. Clone the https://github.com/podlomar/kodim-content repo somewhere on your disk
1. Go to the `kodim-content` folder and run
   ```
   git submodule update --init --recursive
   ```
1. Go to the `docker` folder inside `nove-kodim`
1. Run 
   ```
   docker build -t nove.kodim.image .
   ```
1. Run
   ```
   docker run --name nove.kodim -p 8888:80 -v <absolute path to this repo>/web/dist:/app -v <absolute path to the kodim-content repo>/dist:/content nove.kodim.image
   ```
1. Go to http://localhost:8888

