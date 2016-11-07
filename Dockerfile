FROM ubuntu:14.04

# Install Node.js and npm
RUN	apt-get -y update
RUN	apt-get -y install curl
RUN	apt-get -y remove nodejs
RUN	apt-get -y install nodejs 
RUN	apt-get -y install npm
RUN	apt-get -y install wget
RUN 	npm cache clean -f

# Bundle app source
COPY . /src
# Install app dependencies
RUN	cd /src; npm install -g n; npm install -g npm@latest; npm install;n stable

RUN	ln -s /usr/local/bin/node /usr/local/bin/nodejs

EXPOSE  7778
RUN cd /src; cp config.example.js config.js
RUN cd /src; nodejs --version;./kiwi build
RUN cd /src; ./kiwi start

