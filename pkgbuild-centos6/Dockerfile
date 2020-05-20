FROM centos:6

LABEL maintainer="Ryan Schulze - https://github.com/ryanschulze"
LABEL description="CentOS 6 package build environment"

RUN yum install -y epel-release && \
    yum update -y && \
    yum groupinstall -y 'Development Tools' && \
    yum install -y gcc gcc-c++ \
                   libtool libtool-ltdl \
                   make cmake \
                   pkgconfig \
                   automake autoconf \
                   yum-utils rpmdevtools rpm-build \
                   sudo tree tar git wget && \
    yum clean all

RUN useradd build -u 1000 -m -G users,wheel && \
    echo "build ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    mkdir /home/build/scripts/ /home/build/src/ && \
    chown -R build /home/build/ && \
    sudo -u build /usr/bin/rpmdev-setuptree

COPY --chown=build ./scripts/* /home/build/scripts/

USER build

WORKDIR /home/build/

ENV FLAVOR=rpmbuild OS=centos DIST=el6

CMD ["/bin/bash"]

