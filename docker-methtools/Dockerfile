FROM python:2

LABEL maintainer="Ryan Schulze - https://github.com/ryanschulze"
LABEL description="methtools"

SHELL ["/bin/bash", "-c"]

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG="C.UTF-8"
ENV PATH="${PATH}:/app/methtools/"

RUN groupadd -r tools \
	&& useradd -r -m -g tools tools \
	&& mkdir -p /data /output /app \
	&& chown -R tools:tools /home/tools /data /output /app \
	&& wget -O /app/master.zip https://github.com/bgruening/methtools/archive/master.zip \
	&& unzip -o -d /app /app/master.zip \
	&& ln -sf /app/methtools-master/methtools/ /app/methtools

RUN apt-get update && \
	apt-get install -yq apt-utils && \
	apt-get install -yq \
	dumb-init \
	wget \
	&& apt-get clean \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/* /app/master.zip

COPY --chown=tools:tools ./scripts/* /app/

WORKDIR /app

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

WORKDIR /app/methtools

USER tools

ENTRYPOINT ["dumb-init", "--"]

CMD ["python"]

