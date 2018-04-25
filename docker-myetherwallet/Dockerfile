FROM ryanschulze/alpine-lighttpd-static:latest
LABEL maintainer="Ryan Schulze - https://github.com/ryanschulze"
LABEL description="MyEtherWallet as a local installation"

ARG MEW_VERSION=latest

SHELL ["/bin/bash", "-c"]

RUN [[ "${MEW_VERSION}" == 'latest' ]] && \
    MEW_VERSION=$(wget -qO - "https://api.github.com/repos/kvhnuke/etherwallet/releases/latest"|grep tag_name|cut -d\" -f4|tr -d 'v') || true && \
    echo "[i] Using MyEtherWallet version ${MEW_VERSION}" && \
    cd /var/tmp && \
    wget -O etherwallet.zip https://github.com/kvhnuke/etherwallet/releases/download/v${MEW_VERSION}/etherwallet-v${MEW_VERSION}.zip && \
    unzip ./etherwallet.zip && \
    mv etherwallet-v${MEW_VERSION}/* /app && \
    rm -rf ./etherwallet.zip etherwallet-${MEW_VERSION}/ && \
    chown -R lighttpd:lighttpd /app && \
    echo "[i] Success"

