FROM node:current-buster

RUN apt-get update && \
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
libappindicator3-1 libatk-bridge2.0-0 libgbm1 \
ca-certificates libappindicator1 libnss3 lsb-release xdg-utils wget && \
apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/pa11y/app
RUN groupadd -r pa11y && useradd -r -g pa11y -G audio,video pa11y \
    && chown -R pa11y:pa11y /home/pa11y

USER pa11y

WORKDIR /home/pa11y/app
COPY --chown=pa11y package.json package.json
COPY --chown=pa11y src src
RUN mkdir reports

RUN npm install --production

CMD [ "npm", "start", "--no-update-notifier" ]
