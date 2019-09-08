FROM node:current-slim

LABEL maintainer="Ryan Schulze - https://github.com/ryanschulze"
LABEL description="Puppeteer"

ARG Puppeteer_VERSION=latest
SHELL ["/bin/bash", "-c"]

RUN Puppeteer_VERSION=$(wget -qO - "https://api.github.com/repos/GoogleChrome/puppeteer/releases/latest"|grep tag_name|cut -d\" -f4|tr -d 'v') || true && \
    [[ -z ${Puppeteer_VERSION} ]] && Puppeteer_VERSION=latest || true && \
    echo "[i] Using Puppeteer version ${Puppeteer_VERSION}" && \
    apt-get update && \
	apt-get install -yq apt-utils && \
	apt-get install -yq \
	gconf-service \
	libasound2 \
	libatk1.0-0 \
	libc6 \
	libcairo2 \
	libcups2 \
	libdbus-1-3 \
	libexpat1 \
	libfontconfig1 \
	libgcc1 \
	libgconf-2-4 \
	libgdk-pixbuf2.0-0 \
	libglib2.0-0 \
	libgtk-3-0 \
	libnspr4 \
	libpango-1.0-0 \
	libpangocairo-1.0-0 \
	libstdc++6 \
	libx11-6 \
	libx11-xcb1 \
	libxcb1 \
	libxcomposite1 \
	libxcursor1 \
	libxdamage1 \
	libxext6 \
	libxfixes3 \
	libxi6 \
	libxrandr2 \
	libxrender1 \
	libxss1 \
	libxtst6 \
	fonts-ipafont-gothic \
	fonts-wqy-zenhei \
	fonts-thai-tlwg \
	fonts-kacst \
	ttf-freefont \
	ca-certificates \
	fonts-liberation \
	libappindicator1 \
	libnss3 \
	lsb-release \
	xdg-utils \
	wget \
	&& wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb \
	&& dpkg -i dumb-init_*.deb \
	&& rm -f dumb-init_*.deb \
	&& apt-get clean \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt-get purge --auto-remove -y curl \
	&& rm -rf /src/*.deb \
	&& yarn global add puppeteer@${Puppeteer_VERSION} && yarn cache clean \
	&& groupadd -r puppet \
	&& useradd -r -g puppet -G audio,video puppet \
	&& mkdir -p /home/puppet/Downloads /output /app \
	&& chown -R puppet:puppet /home/puppet /output /app \
	&& chown -R puppet:puppet /usr/local/share/.config/yarn/global/node_modules

COPY --chown=puppet:puppet ./scripts/*.js /app/

ENV NODE_PATH="/usr/local/share/.config/yarn/global/node_modules:${NODE_PATH}"
ENV LANG="C.UTF-8"

WORKDIR /app

USER puppet

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "index.js"]
